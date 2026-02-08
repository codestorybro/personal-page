'use client';

import type { BlogPost } from '@/libs/notion';

import type { FC } from 'react';
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { FadeInUp, StaggerContainer, StaggerItem } from './AnimatedElements';
import Input from './Input';

type BlogPostCardProps = {
  post: BlogPost;
  translations: {
    read_more: string;
    min_read: string;
  };
  formatDate: (date: string) => string;
  locale: string;
};

const BlogPostCard: FC<BlogPostCardProps> = ({ post, translations: t, formatDate, locale }) => {
  return (
    <Link href={`/${locale}/blog/${post.slug}`}>
      <motion.article
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/10"
        whileHover={{ scale: 1.01, y: -2 }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        {/* Glow effect on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-transparent to-green-500/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        <div className="relative z-10">
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
            {post.tags.map(tag => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gray-300"
              >
                {tag}
              </span>
            ))}
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
  locale: string;
};

export const BlogList: FC<BlogListProps> = ({ posts, translations: t, locale }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet).sort();
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
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      {/* Search and filters */}
      <FadeInUp>
        <div className="space-y-4">
          {/* Search input */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-green-500/20 opacity-50 blur-xl" />
            <div className="relative flex items-center">
              <MagnifyingGlassIcon
                size={20}
                className="pointer-events-none absolute left-4 text-gray-400"
              />
              <Input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.search_placeholder}
                className="px-14"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-gray-400 hover:text-white"
                >
                  <XIcon size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Tags filter */}
          <div className="flex flex-wrap gap-2">
            <motion.button
              type="button"
              onClick={() => setSelectedTag(null)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                selectedTag === null
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.all_tags}
            </motion.button>
            {allTags.map(tag => (
              <motion.button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  selectedTag === tag
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.button>
            ))}
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
              <StaggerContainer key="posts-list">
                <div className="grid gap-6">
                  {filteredPosts.map(post => (
                    <StaggerItem key={post.id}>
                      <BlogPostCard post={post} translations={t} formatDate={formatDate} locale={locale} />
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            )}
      </AnimatePresence>
    </div>
  );
};
