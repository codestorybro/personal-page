import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

const config: NextConfig = {
  distDir: process.env.CODESTORYBRO_DIST_DIR || '.next',
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
      { source: '/blog/:path*', destination: '/', permanent: true },
      {
        source: '/:locale(en|pl)/blog/:slug*',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // Ensure consistent URL handling (no trailing slash)
  trailingSlash: false,
};

export default withBundleAnalyzer(config);
