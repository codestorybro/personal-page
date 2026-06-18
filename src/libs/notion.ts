import type {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { Client } from '@notionhq/client';
import { createHighlighter, type Highlighter } from 'shiki';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID || '';

// Cached shiki highlighter instance
let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark'],
      langs: [
        'javascript',
        'typescript',
        'jsx',
        'tsx',
        'json',
        'html',
        'css',
        'bash',
        'shell',
        'python',
        'sql',
        'yaml',
        'markdown',
        'plaintext',
      ],
    });
  }
  return highlighterPromise;
}

// Map Notion language names to shiki language names
function mapNotionLangToShiki(notionLang: string): string {
  const langMap: Record<string, string> = {
    'javascript': 'javascript',
    'typescript': 'typescript',
    'jsx': 'jsx',
    'tsx': 'tsx',
    'json': 'json',
    'html': 'html',
    'css': 'css',
    'bash': 'bash',
    'shell': 'shell',
    'python': 'python',
    'sql': 'sql',
    'yaml': 'yaml',
    'markdown': 'markdown',
    'plain text': 'plaintext',
    'plaintext': 'plaintext',
    // Common aliases
    'js': 'javascript',
    'ts': 'typescript',
    'sh': 'bash',
    'zsh': 'bash',
    'py': 'python',
    'md': 'markdown',
  };
  return langMap[notionLang.toLowerCase()] || 'plaintext';
}

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  coverImage: string | null;
  content?: string;
  readingTime: number;
};

// Helper to extract plain text from rich text
function extractPlainText(richText: RichTextItemResponse[]): string {
  return richText.map(text => text.plain_text).join('');
}

// Convert Notion page to BlogPost
function pageToPost(page: PageObjectResponse): BlogPost {
  const properties = page.properties;

  // Extract title - using bracket notation due to dynamic property names
  /* eslint-disable dot-notation */
  const titleProp = properties['Title'] || properties['Name'] || properties['Tytuł'];
  const title = titleProp?.type === 'title'
    ? extractPlainText(titleProp.title)
    : 'Bez tytułu';

  // Extract slug
  const slugProp = properties['Slug'];
  const slug = slugProp?.type === 'rich_text'
    ? extractPlainText(slugProp.rich_text) || page.id
    : page.id;

  // Extract description
  const descProp = properties['Description'] || properties['Opis'];
  const description = descProp?.type === 'rich_text'
    ? extractPlainText(descProp.rich_text)
    : '';

  // Extract published date
  const dateProp = properties['PublishedAt'] || properties['Date'] || properties['Data'];
  const publishedAt = dateProp?.type === 'date' && dateProp.date
    ? dateProp.date.start
    : new Date().toISOString().split('T')[0]!;

  // Extract tags
  const tagsProp = properties['Tags'] || properties['Tagi'];

  // Extract reading time
  const readingTimeProp = properties['ReadingTime'];
  /* eslint-enable dot-notation */
  const tags = tagsProp?.type === 'multi_select'
    ? tagsProp.multi_select.map(tag => tag.name)
    : [];

  const readingTime = readingTimeProp?.type === 'number' && readingTimeProp.number
    ? readingTimeProp.number
    : 5; // Default 5 min if not set

  // Extract cover image
  let coverImage: string | null = null;
  if (page.cover) {
    if (page.cover.type === 'external') {
      coverImage = page.cover.external.url;
    } else if (page.cover.type === 'file') {
      coverImage = page.cover.file.url;
    }
  }

  return {
    id: page.id,
    slug,
    title,
    description,
    publishedAt,
    tags,
    coverImage,
    readingTime,
  };
}

// Internal function to fetch blog posts from Notion
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!databaseId) {
    console.warn('NOTION_DATABASE_ID is not set');
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'PublishedAt',
          direction: 'descending',
        },
      ],
    });

    const posts = response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map(page => pageToPost(page));

    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Internal function to fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!databaseId) {
    console.warn('NOTION_DATABASE_ID is not set');
    return null;
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Slug',
            rich_text: {
              equals: slug,
            },
          },
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    const page = response.results[0];
    if (!page || !('properties' in page)) {
      return null;
    }

    const post = pageToPost(page as PageObjectResponse);
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Get all unique tags from posts
export async function getAllTags(): Promise<string[]> {
  const posts = await getBlogPosts();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach(tag => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

// Get list style based on nesting depth
function getListStyle(depth: number): string {
  const styles = ['decimal', 'lower-alpha', 'lower-roman'];
  return styles[depth % styles.length] || 'decimal';
}

// Recursively render a single block to HTML
async function renderBlock(blockObj: BlockObjectResponse, depth: number = 0): Promise<string> {
  let html = '';
  let childrenHtml = '';

  // Check if block has children and fetch them
  if (blockObj.has_children) {
    const children = await notion.blocks.children.list({
      block_id: blockObj.id,
      page_size: 100,
    });
    childrenHtml = await renderBlocksArray(children.results as BlockObjectResponse[], depth + 1);
  }

  switch (blockObj.type) {
    case 'paragraph': {
      const text = renderRichText(blockObj.paragraph.rich_text);
      if (text) {
        html += `<p class="mb-4 text-gray-300 leading-relaxed">${text}</p>`;
      }
      break;
    }
    case 'heading_1': {
      const text = renderRichText(blockObj.heading_1.rich_text);
      html += `<h1 class="text-3xl font-bold text-white mt-8 mb-4">${text}</h1>`;
      break;
    }
    case 'heading_2': {
      const text = renderRichText(blockObj.heading_2.rich_text);
      html += `<h2 class="text-2xl font-bold text-white mt-6 mb-3">${text}</h2>`;
      break;
    }
    case 'heading_3': {
      const text = renderRichText(blockObj.heading_3.rich_text);
      html += `<h3 class="text-xl font-bold text-white mt-4 mb-2">${text}</h3>`;
      break;
    }
    case 'bulleted_list_item': {
      const text = renderRichText(blockObj.bulleted_list_item.rich_text);
      html += `<li class="mb-2 text-gray-300">${text}${childrenHtml}</li>`;
      break;
    }
    case 'numbered_list_item': {
      const text = renderRichText(blockObj.numbered_list_item.rich_text);
      html += `<li class="mb-2 text-gray-300">${text}${childrenHtml}</li>`;
      break;
    }
    case 'quote': {
      const text = renderRichText(blockObj.quote.rich_text);
      html += `<blockquote class="border-l-4 border-indigo-500 pl-4 my-4 italic text-gray-400">${text}</blockquote>`;
      break;
    }
    case 'code': {
      const text = extractPlainText(blockObj.code.rich_text);
      const notionLang = blockObj.code.language || 'plain text';
      const lang = mapNotionLangToShiki(notionLang);

      try {
        const highlighter = await getHighlighter();
        const highlighted = highlighter.codeToHtml(text, {
          lang,
          theme: 'github-dark',
        });
        // Wrap in custom container and override some styles
        html += `<div class="my-4 overflow-x-auto rounded-lg [&_pre]:!bg-white/5 [&_pre]:!p-4 [&_pre]:!m-0 [&_code]:!text-sm">${highlighted}</div>`;
      } catch {
        // Fallback if highlighting fails
        html += `<pre class="bg-white/5 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-sm text-gray-300">${escapeHtml(text)}</code></pre>`;
      }
      break;
    }
    case 'callout': {
      const text = renderRichText(blockObj.callout.rich_text);
      const emoji = blockObj.callout.icon?.type === 'emoji' ? blockObj.callout.icon.emoji : '💡';
      html += `<div class="bg-white/5 border border-white/10 rounded-lg p-4 my-4 flex gap-3"><span class="text-xl">${emoji}</span><div class="text-gray-300">${text}</div></div>`;
      break;
    }
    case 'divider': {
      html += `<hr class="my-8 border-white/10" />`;
      break;
    }
    case 'image': {
      let src = '';
      if (blockObj.image.type === 'external') {
        src = blockObj.image.external.url;
      } else if (blockObj.image.type === 'file') {
        src = blockObj.image.file.url;
      }
      const caption = blockObj.image.caption ? extractPlainText(blockObj.image.caption) : '';
      const safeSrc = escapeHtml(src);
      const safeCaption = escapeHtml(caption);
      const imageAlt = safeCaption || 'Ilustracja do artykułu CodeStoryBro';
      html += `<figure class="my-6"><img src="${safeSrc}" alt="${imageAlt}" class="rounded-lg w-full" />${safeCaption ? `<figcaption class="text-center text-sm text-gray-500 mt-2">${safeCaption}</figcaption>` : ''}</figure>`;
      break;
    }
    default:
      break;
  }

  return html;
}

// Render an array of blocks, grouping list items into proper ul/ol wrappers
async function renderBlocksArray(blocks: BlockObjectResponse[], depth: number = 0): Promise<string> {
  let html = '';
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (!block || !('type' in block)) {
      i++;
      continue;
    }

    // Group consecutive bulleted list items
    if (block.type === 'bulleted_list_item') {
      html += '<ul class="list-disc ml-6 mb-4">';
      while (i < blocks.length && blocks[i] && 'type' in blocks[i]! && blocks[i]!.type === 'bulleted_list_item') {
        html += await renderBlock(blocks[i] as BlockObjectResponse, depth);
        i++;
      }
      html += '</ul>';
      continue;
    }

    // Group consecutive numbered list items
    if (block.type === 'numbered_list_item') {
      const listStyle = getListStyle(depth);
      html += `<ol class="ml-6 mb-4" style="list-style-type: ${listStyle}">`;
      while (i < blocks.length && blocks[i] && 'type' in blocks[i]! && blocks[i]!.type === 'numbered_list_item') {
        html += await renderBlock(blocks[i] as BlockObjectResponse, depth);
        i++;
      }
      html += '</ol>';
      continue;
    }

    // Regular block
    html += await renderBlock(block as BlockObjectResponse, depth);
    i++;
  }

  return html;
}

// Internal function to render blocks to HTML
export async function renderBlocksToHtml(pageId: string): Promise<string> {
  try {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    return await renderBlocksArray(blocks.results as BlockObjectResponse[]);
  } catch (error) {
    console.error('Error rendering blocks:', error);
    return '';
  }
}

// Render rich text with formatting
function renderRichText(richText: RichTextItemResponse[]): string {
  return richText.map((text) => {
    let content = escapeHtml(text.plain_text);

    if (text.annotations.bold) {
      content = `<strong class="font-bold text-white">${content}</strong>`;
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
      content = `<code class="bg-white/10 px-1.5 py-0.5 rounded text-indigo-400">${content}</code>`;
    }
    if (text.type === 'text' && text.text.link) {
      content = `<a href="${text.text.link.url}" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:text-indigo-300 underline">${content}</a>`;
    }

    return content;
  }).join('');
}

// Escape HTML special characters
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
  };
  return text.replace(/[&<>"']/g, char => htmlEntities[char] || char);
}
