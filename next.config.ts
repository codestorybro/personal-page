/** @type {import('next').NextConfig} */
const config = {
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  // Ensure consistent URL handling (no trailing slash)
  trailingSlash: false,
};

export default config;
