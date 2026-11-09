import type {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID || '';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt: string | null;
  tags: string[];
  coverImage: string | null;
  readingTime: number | null;
};

function extractPlainText(richText: RichTextItemResponse[]): string {
  return richText.map(text => text.plain_text).join('').trim();
}

export function isValidBlogSlug(slug: string): boolean {
  return slug.length > 0
    && slug.length <= 200
    && !/[\s/?#\\%]/u.test(slug)
    && slug !== '.'
    && slug !== '..';
}

function reliableDate(value: string | undefined | null): string | null {
  if (!value || Number.isNaN(Date.parse(value))) {
    return null;
  }

  return value;
}

function isPublishedPage(page: PageObjectResponse): boolean {
  const published = page.properties.Published;
  const privateProperty = page.properties.Private;
  const publicProperty = page.properties.Public;
  const isPrivate = privateProperty?.type === 'checkbox' && privateProperty.checkbox;
  const isExplicitlyNotPublic = publicProperty?.type === 'checkbox' && !publicProperty.checkbox;
  const isInTrash = 'in_trash' in page && page.in_trash === true;

  return !page.archived
    && !isInTrash
    && !isPrivate
    && !isExplicitlyNotPublic
    && published?.type === 'checkbox'
    && published.checkbox;
}

function pageToPost(page: PageObjectResponse): BlogPost | null {
  if (!isPublishedPage(page)) {
    return null;
  }

  const properties = page.properties;
  const titleProperty = properties.Title || properties.Name || properties['Tytuł'];
  const slugProperty = properties.Slug;
  const descriptionProperty = properties.Description || properties.Opis;
  const publishedProperty = properties.PublishedAt || properties.Date || properties.Data;
  const modifiedProperty = properties.ModifiedAt || properties.UpdatedAt;
  const tagsProperty = properties.Tags || properties.Tagi;
  const readingTimeProperty = properties.ReadingTime;

  const title = titleProperty?.type === 'title'
    ? extractPlainText(titleProperty.title)
    : '';
  const slug = slugProperty?.type === 'rich_text'
    ? extractPlainText(slugProperty.rich_text)
    : '';
  const publishedAt = publishedProperty?.type === 'date'
    ? reliableDate(publishedProperty.date?.start)
    : null;

  if (!title || !isValidBlogSlug(slug) || !publishedAt) {
    return null;
  }

  const explicitModifiedAt = modifiedProperty?.type === 'date'
    ? reliableDate(modifiedProperty.date?.start)
    : null;
  const modifiedAt = explicitModifiedAt || reliableDate(page.last_edited_time);
  const description = descriptionProperty?.type === 'rich_text'
    ? extractPlainText(descriptionProperty.rich_text)
    : '';
  const tags = tagsProperty?.type === 'multi_select'
    ? tagsProperty.multi_select.map(tag => tag.name).filter(Boolean)
    : [];
  const readingTime = readingTimeProperty?.type === 'number'
    && readingTimeProperty.number
    && readingTimeProperty.number > 0
    ? readingTimeProperty.number
    : null;

  let coverImage: string | null = null;
  if (page.cover?.type === 'external') {
    coverImage = page.cover.external.url;
  } else if (page.cover?.type === 'file') {
    coverImage = page.cover.file.url;
  }

  return {
    id: page.id,
    slug,
    title,
    description,
    publishedAt,
    modifiedAt,
    tags,
    coverImage,
    readingTime,
  };
}

function isDatabasePage(page: PageObjectResponse): boolean {
  if (page.parent.type !== 'database_id') {
    return false;
  }

  return page.parent.database_id.replaceAll('-', '') === databaseId.replaceAll('-', '');
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!databaseId || !process.env.NOTION_API_KEY) {
    console.warn('Notion blog credentials are not configured');
    return [];
  }

  try {
    const posts: BlogPost[] = [];
    let cursor: string | undefined;

    do {
      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'Published',
          checkbox: { equals: true },
        },
        sorts: [{ property: 'PublishedAt', direction: 'descending' }],
        page_size: 100,
        start_cursor: cursor,
      });

      for (const result of response.results) {
        if ('properties' in result) {
          const post = pageToPost(result as PageObjectResponse);
          if (post) {
            posts.push(post);
          }
        }
      }

      cursor = response.has_more ? response.next_cursor || undefined : undefined;
    } while (cursor);

    const uniquePosts = new Map<string, BlogPost>();
    for (const post of posts) {
      if (!uniquePosts.has(post.slug)) {
        uniquePosts.set(post.slug, post);
      }
    }

    return [...uniquePosts.values()];
  } catch (error) {
    console.error('Unable to fetch published blog posts from Notion:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!databaseId || !process.env.NOTION_API_KEY || !isValidBlogSlug(slug)) {
    return null;
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          { property: 'Slug', rich_text: { equals: slug } },
          { property: 'Published', checkbox: { equals: true } },
        ],
      },
      page_size: 1,
    });
    const page = response.results[0];
    return page && 'properties' in page
      ? pageToPost(page as PageObjectResponse)
      : null;
  } catch (error) {
    console.error(`Unable to fetch blog post "${slug}" from Notion:`, error);
    return null;
  }
}

export async function getPublishedBlogPostById(id: string): Promise<BlogPost | null> {
  if (!databaseId || !process.env.NOTION_API_KEY) {
    return null;
  }

  try {
    const page = await notion.pages.retrieve({ page_id: id });
    if (!('properties' in page) || !isDatabasePage(page as PageObjectResponse)) {
      return null;
    }

    return pageToPost(page as PageObjectResponse);
  } catch {
    return null;
  }
}

async function getAllBlockChildren(blockId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor,
    });
    blocks.push(...response.results.filter(
      (block): block is BlockObjectResponse => 'type' in block,
    ));
    cursor = response.has_more ? response.next_cursor || undefined : undefined;
  } while (cursor);

  return blocks;
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
  })[character] || character);
}

function safeUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return ['http:', 'https:', 'mailto:'].includes(url.protocol) ? escapeHtml(value) : null;
  } catch {
    return null;
  }
}

function renderRichText(richText: RichTextItemResponse[]): string {
  return richText.map((text) => {
    let content = escapeHtml(text.plain_text);
    if (text.annotations.bold) {
      content = `<strong>${content}</strong>`;
    }
    if (text.annotations.italic) {
      content = `<em>${content}</em>`;
    }
    if (text.annotations.strikethrough) {
      content = `<del>${content}</del>`;
    }
    if (text.annotations.underline) {
      content = `<u>${content}</u>`;
    }
    if (text.annotations.code) {
      content = `<code>${content}</code>`;
    }

    if (text.type === 'text' && text.text.link) {
      const href = safeUrl(text.text.link.url);
      if (href) {
        content = `<a href="${href}" rel="noopener noreferrer">${content}</a>`;
      }
    }

    return content;
  }).join('');
}

async function renderBlock(block: BlockObjectResponse, depth = 0): Promise<string> {
  const children = block.has_children
    ? await renderBlocks(await getAllBlockChildren(block.id), depth + 1)
    : '';

  switch (block.type) {
    case 'paragraph': {
      const text = renderRichText(block.paragraph.rich_text);
      return text ? `<p>${text}</p>` : '';
    }
    case 'heading_1':
      return `<h2>${renderRichText(block.heading_1.rich_text)}</h2>`;
    case 'heading_2':
      return `<h2>${renderRichText(block.heading_2.rich_text)}</h2>`;
    case 'heading_3':
      return `<h3>${renderRichText(block.heading_3.rich_text)}</h3>`;
    case 'bulleted_list_item':
      return `<li>${renderRichText(block.bulleted_list_item.rich_text)}${children}</li>`;
    case 'numbered_list_item':
      return `<li>${renderRichText(block.numbered_list_item.rich_text)}${children}</li>`;
    case 'quote':
      return `<blockquote>${renderRichText(block.quote.rich_text)}</blockquote>`;
    case 'code':
      return `<pre tabindex="0"><code>${escapeHtml(extractPlainText(block.code.rich_text))}</code></pre>`;
    case 'callout': {
      const icon = block.callout.icon?.type === 'emoji'
        ? `<span aria-hidden="true">${escapeHtml(block.callout.icon.emoji)}</span>`
        : '';
      return `<aside>${icon}<div>${renderRichText(block.callout.rich_text)}</div></aside>`;
    }
    case 'divider':
      return '<hr />';
    case 'image': {
      const source = block.image.type === 'external'
        ? safeUrl(block.image.external.url)
        : safeUrl(block.image.file.url);
      if (!source || !source.startsWith('https:')) {
        return '';
      }
      const caption = extractPlainText(block.image.caption);
      const alt = escapeHtml(caption || 'Article illustration');
      return `<figure><img src="${source}" alt="${alt}" loading="lazy" />${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ''}</figure>`;
    }
    default:
      return '';
  }
}

async function renderBlocks(blocks: BlockObjectResponse[], depth = 0): Promise<string> {
  let html = '';
  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index];
    if (!block) {
      index += 1;
      continue;
    }

    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      const type = block.type;
      const tag = type === 'bulleted_list_item' ? 'ul' : 'ol';
      html += `<${tag}>`;
      while (blocks[index]?.type === type) {
        html += await renderBlock(blocks[index]!, depth);
        index += 1;
      }
      html += `</${tag}>`;
      continue;
    }

    html += await renderBlock(block, depth);
    index += 1;
  }

  return html;
}

export async function renderBlocksToHtml(pageId: string): Promise<string> {
  try {
    return await renderBlocks(await getAllBlockChildren(pageId));
  } catch (error) {
    console.error('Unable to render Notion article blocks:', error);
    return '';
  }
}
