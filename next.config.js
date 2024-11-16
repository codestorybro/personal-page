const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
      }
}

module.exports = withNextIntl(nextConfig)
