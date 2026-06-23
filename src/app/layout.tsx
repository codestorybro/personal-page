import type { Metadata } from 'next';
import GA from '@/app/ga';
import { NavigationProgress } from '@/components/NavigationProgress';
import { AppConfig } from '@/utils/AppConfig';
import { SpeedInsights } from '@vercel/speed-insights/next';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import '@/styles/global.css';

const rushDriver = localFont({
  src: '../../public/assets/fonts/RushDriver-Italic.otf',
  variable: '--font-rush-driver',
  display: 'swap',
});

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
  },
  twitter: {
    card: 'summary_large_image',
    site: '@codestorybro',
    creator: '@codestorybro',
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
    <html lang="pl" className={`bg-black ${inter.variable} ${rushDriver.variable}`}>
      <body suppressHydrationWarning>
        <NavigationProgress />
        <GA />
        <Toaster />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
