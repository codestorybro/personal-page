'use client';

import type { BlogPost } from '@/libs/notion';

import type { FC } from 'react';
import { getTagColor, tagColors } from '@/libs/tagColors';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { FadeInUp, StaggerContainer, StaggerItem } from './AnimatedElements';
import { BlogThreadsBanner } from './BlogThreadsBanner';
import Input from './Input';

type BlogPostCardProps = {
  post: BlogPost;
  translations: {
    read_more: string;
    min_read: string;
  };
  formatDate: (date: string) => string;
  tagColorMap: Map<string, typeof tagColors[0]>;
};

const BlogPostCard: FC<BlogPostCardProps> = ({ post, translations: t, formatDate, tagColorMap }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link href={`/blog/${post.slug}`} className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
      <motion.article
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-300 hover:border-indigo-500/30 hover:bg-white/10"
        whileHover={{ scale: 1.01, y: -2 }}
        transition={{ type: 'tween', duration: 0.2 }}
        tabIndex={-1}
        whileTap={{ scale: 0.98 }}
      >
        {/* Glow effect on hover */}
        <div
          className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-transparent to-green-500/10 opacity-0 blur-xl transition-opacity duration-300 will-change-transform group-hover:opacity-100"
          aria-hidden="true"
          style={{ WebkitTransform: 'translateZ(0)' }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row">
          {/* Cover image */}
          {post.coverImage && (
            <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-48 md:w-56">
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-white/10" />
              )}
              <Image
                src={`/api/blog-image/${post.id}`}
                alt={post.title}
                fill
                className={`object-cover transition-all duration-300 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                sizes="(max-width: 640px) 100vw, 224px"
                unoptimized
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 sm:bg-gradient-to-l" />
            </div>
          )}

          <div className="flex-1 p-6">
            {/* Header with date and reading time */}
            <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span className="text-white/20">•</span>
              <span>
                {post.readingTime}
                {' '}
                {t.min_read}
              </span>
            </div>

            {/* Title */}
            <h2 className="mb-2 text-xl font-bold text-white transition-colors duration-200 group-hover:text-indigo-400 sm:text-2xl">
              {post.title}
            </h2>

            {/* Description */}
            <p className="mb-4 line-clamp-2 text-gray-400">
              {post.description}
            </p>

            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => {
                const color = tagColorMap.get(tag) || tagColors[0]!;
                return (
                  <span
                    key={tag}
                    className={`group/tag relative rounded-full border px-3 py-1 text-xs font-medium ${color.bg} ${color.border} ${color.text}`}
                  >
                    <span
                      className={`pointer-events-none absolute -inset-1 rounded-full ${color.glow} opacity-0 blur-md transition-opacity duration-300 will-change-transform group-hover/tag:opacity-60`}
                      aria-hidden="true"
                      style={{ WebkitTransform: 'translateZ(0)' }}
                    />
                    <span className="relative z-10">{tag}</span>
                  </span>
                );
              })}
            </div>

            {/* Read more */}
            <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 transition-colors duration-200 group-hover:text-indigo-300">
              {t.read_more}
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

type BlogListProps = {
  posts: BlogPost[];
  translations: {
    search_placeholder: string;
    read_more: string;
    min_read: string;
    no_posts: string;
    all_tags: string;
    clear_filters: string;
  };
};

export const BlogList: FC<BlogListProps> = ({ posts, translations: t }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags and create color map
  const { allTags, tagColorMap } = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
    const tags = Array.from(tagSet).sort();
    const colorMap = new Map<string, typeof tagColors[0]>();
    tags.forEach((tag, index) => {
      colorMap.set(tag, getTagColor(index));
    });
    return { allTags: tags, tagColorMap: colorMap };
  }, [posts]);

  // Filter posts based on search and tags
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = searchQuery === ''
        || post.title.toLowerCase().includes(searchQuery.toLowerCase())
        || post.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      <FadeInUp>
        <BlogThreadsBanner variant="list" />
      </FadeInUp>

      {/* Search and filters */}
      <FadeInUp>
        <div className="space-y-4">
          {/* Search input */}
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-2 rounded-xl bg-gradient-to-r from-indigo-500/20 to-green-500/20 opacity-50 blur-xl will-change-transform"
              style={{ WebkitTransform: 'translateZ(0)' }}
            />
            <div className="relative flex items-center">
              <Input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.search_placeholder}
              />
            </div>
          </div>

          {/* Tags filter */}
          <div className="flex flex-wrap gap-2">
            <motion.button
              type="button"
              onClick={() => setSelectedTag(null)}
              className={`relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                selectedTag === null
                  ? 'border-indigo-500 bg-indigo-500/30 text-white'
                  : 'border-white/20 bg-white/5 text-gray-400 hover:border-white/40 hover:bg-white/10 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedTag === null && (
                <span
                  className="pointer-events-none absolute -inset-1 rounded-full bg-indigo-500/50 blur-md will-change-transform"
                  aria-hidden="true"
                  style={{ WebkitTransform: 'translateZ(0)' }}
                />
              )}
              <span className="relative z-10">{t.all_tags}</span>
            </motion.button>
            {allTags.map((tag) => {
              const color = tagColorMap.get(tag) || tagColors[0]!;
              const isSelected = selectedTag === tag;
              return (
                <motion.button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    isSelected
                      ? `${color.border} ${color.bg} text-white`
                      : 'border-white/20 bg-white/5 text-gray-400 hover:border-white/40 hover:bg-white/10 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSelected && (
                    <span
                      className={`pointer-events-none absolute -inset-1 rounded-full ${color.glow} blur-md will-change-transform`}
                      aria-hidden="true"
                      style={{ WebkitTransform: 'translateZ(0)' }}
                    />
                  )}
                  <span className="relative z-10">{tag}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Clear filters */}
          {(searchQuery || selectedTag) && (
            <motion.button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
              }}
              className="text-sm text-indigo-400 hover:text-indigo-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {t.clear_filters}
            </motion.button>
          )}
        </div>
      </FadeInUp>

      {/* Posts list */}
      <AnimatePresence mode="wait">
        {filteredPosts.length === 0
          ? (
              <motion.div
                key="no-posts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-12 text-center"
              >
                <p className="text-gray-400">{t.no_posts}</p>
              </motion.div>
            )
          : (
              <StaggerContainer key={`posts-${filteredPosts.map(p => p.id).join('-')}`}>
                <div className="grid gap-6">
                  {filteredPosts.map(post => (
                    <StaggerItem key={post.id}>
                      <BlogPostCard post={post} translations={t} formatDate={formatDate} tagColorMap={tagColorMap} />
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            )}
      </AnimatePresence>
    </div>
  );
};
