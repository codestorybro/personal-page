import type { Metadata } from 'next';
import GA from '@/app/ga';
import { NavigationProgress } from '@/components/NavigationProgress';
import { SpeedInsights } from '@vercel/speed-insights/next';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import '@/styles/global.css';

const rushDriver = localFont({
  src: '../../public/assets/fonts/RushDriver-Italic.otf',
  variable: '--font-rush-driver',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://codestorybro.com'),
  title: {
    default: 'CodeStoryBro | Mówię głośno o IT to, co większość branży myśli po cichu',
    template: '%s | CodeStoryBro',
  },
  description: 'Przestań czuć się jak code monkey. Odzyskaj sens, energię i\u00A0kierunek w\u00A0świecie pełnym korpo-ściemy, przebodźcowania pseudo-sukcesami i\u00A0AI.',
  authors: [{ name: 'Marcin Kołodziej', url: 'https://codestorybro.com' }],
  creator: 'Marcin Kołodziej',
  publisher: 'CodeStoryBro',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'CodeStoryBro',
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
    <html lang="pl" className={`bg-black ${rushDriver.variable}`}>
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
