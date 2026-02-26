'use client';

import type { BlogPost } from '@/libs/notion';

import type { FC } from 'react';
import { getTagColor } from '@/libs/tagColors';
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { FadeInUp } from './AnimatedElements';
import { ShareButtons } from './ShareButtons';

const MotionLink = motion.create(Link);

type BlogPostViewProps = {
  post: BlogPost;
  contentHtml: string;
  translations: {
    back_to_blog: string;
    share: string;
    min_read: string;
    published_on: string;
  };
  siteUrl: string;
};

export const BlogPostView: FC<BlogPostViewProps> = ({
  post,
  contentHtml,
  translations: t,
  siteUrl,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return (
    <article className="min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-[728px]">
        {/* Back button */}
        <FadeInUp>
          <MotionLink
            href="/blog"
            className="group relative mb-8 inline-flex items-center gap-2 rounded-lg border border-[#333333] px-4 py-2 text-sm font-medium text-white hover:border-indigo-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <span
              className="pointer-events-none absolute -inset-2 rounded-lg bg-indigo-500 opacity-0 blur-[15px] transition-opacity duration-300 will-change-transform group-hover:opacity-40"
              aria-hidden="true"
              style={{ WebkitTransform: 'translateZ(0)' }}
            />
            <ArrowLeftIcon size={16} className="relative z-10" />
            <span className="relative z-10">{t.back_to_blog}</span>
          </MotionLink>
        </FadeInUp>

        {/* Header */}
        <FadeInUp delay={0.1}>
          <header className="mb-12">
            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => {
                const color = getTagColor(index);
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

            {/* Title with glow */}
            <div className="relative mb-6">
              <div
                className="pointer-events-none absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-green-500/20 to-blue-500/20 blur-2xl will-change-transform"
                aria-hidden="true"
                style={{ WebkitTransform: 'translateZ(0)' }}
              />
              <h1 className="relative text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
            </div>

            {/* Description */}
            {post.description && (
              <p className="mb-6 text-lg text-gray-400">
                {post.description}
              </p>
            )}

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CalendarIcon size={16} />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon size={16} />
                <span>
                  {post.readingTime}
                  {' '}
                  {t.min_read}
                </span>
              </div>
            </div>
          </header>
        </FadeInUp>

        {/* Cover image */}
        {post.coverImage && (
          <FadeInUp delay={0.2}>
            <motion.div
              className="relative mb-12 overflow-hidden rounded-2xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div
                className="pointer-events-none absolute -inset-4 bg-gradient-to-br from-indigo-500/20 to-green-500/20 blur-2xl will-change-transform"
                aria-hidden="true"
                style={{ WebkitTransform: 'translateZ(0)' }}
              />
              <Image
                src={`/api/blog-image/${post.id}`}
                alt={post.title}
                width={800}
                height={450}
                className="relative w-full rounded-2xl"
                unoptimized
              />
            </motion.div>
          </FadeInUp>
        )}

        {/* Content */}
        <FadeInUp delay={0.3}>
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </FadeInUp>

        {/* Share buttons */}
        <FadeInUp delay={0.4}>
          <div className="mt-12 border-t border-white/10 pt-8">
            <ShareButtons url={postUrl} title={post.title} translations={{ share: t.share }} />
          </div>
        </FadeInUp>

        {/* Back to blog */}
        <FadeInUp delay={0.5}>
          <div className="mt-12">
            <MotionLink
              href="/blog"
              className="group relative inline-flex items-center gap-2 rounded-lg border border-[#333333] px-4 py-2 text-sm font-medium text-white hover:border-indigo-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <span
                className="pointer-events-none absolute -inset-2 rounded-lg bg-indigo-500 opacity-0 blur-[15px] transition-opacity duration-300 will-change-transform group-hover:opacity-40"
                aria-hidden="true"
                style={{ WebkitTransform: 'translateZ(0)' }}
              />
              <ArrowLeftIcon size={16} className="relative z-10" />
              <span className="relative z-10">{t.back_to_blog}</span>
            </MotionLink>
          </div>
        </FadeInUp>
      </div>
    </article>
  );
};
