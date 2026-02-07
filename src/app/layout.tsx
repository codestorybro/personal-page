import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { CustomCursor } from '@/components/CustomCursor';
import '@/styles/global.css';

const rushDriver = localFont({
  src: '../../public/assets/fonts/RushDriver-Italic.otf',
  variable: '--font-rush-driver',
  display: 'swap',
});

export const metadata: Metadata = {
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
      <body suppressHydrationWarning className="cursor-none">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
