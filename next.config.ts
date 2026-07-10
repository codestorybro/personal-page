import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

const config: NextConfig = {
  eslint: {
    dirs: ['.'],
  },
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:locale(en|pl)/blog/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
    ];
  },
  // Ensure consistent URL handling (no trailing slash)
  trailingSlash: false,
};

export default withBundleAnalyzer(config);
