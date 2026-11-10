import type { Metadata } from 'next';
import GA from '@/app/ga';
import { AppConfig } from '@/utils/AppConfig';
import localFont from 'next/font/local';
import '@/styles/global.css';
import '../../packages/ui/footer.css';

const inter = localFont({
  src: '../../public/assets/fonts/inter-latin-ext.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
  style: 'normal',
  fallback: ['Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

export const metadata: Metadata = {
  metadataBase: new URL(AppConfig.url),
  title: {
    default: AppConfig.title,
    template: '%s | CodeStoryBro',
  },
  description: AppConfig.description,
  applicationName: AppConfig.name,
  authors: [{ name: AppConfig.author.name, url: AppConfig.url }],
  creator: AppConfig.author.name,
  publisher: AppConfig.name,
  openGraph: {
    type: 'website',
    locale: AppConfig.locale,
    siteName: AppConfig.name,
    title: AppConfig.openGraphTitle,
    description: AppConfig.openGraphDescription,
    images: [
      {
        url: '/assets/img/og-image.png',
        width: 1536,
        height: 1024,
        alt: AppConfig.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@codestorybro',
    creator: '@codestorybro',
    title: AppConfig.twitterTitle,
    description: AppConfig.twitterDescription,
    images: [
      {
        url: '/assets/img/og-image.png',
        width: 1536,
        height: 1024,
        alt: AppConfig.ogImageAlt,
      },
    ],
  },
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={AppConfig.language} className={inter.variable}>
      <body suppressHydrationWarning>
        <GA />
        {children}
      </body>
    </html>
  );
}
