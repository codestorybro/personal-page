import GA from '@/app/ga';
import { pageMetadata } from '@/utils/Metadata';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import { seoLocale } from '../../packages/seo/content';
import { LocaleProvider } from '../../packages/ui/Locale';
import '@/styles/global.css';
import '../../packages/ui/footer.css';
import '../../packages/ui/interaction.css';
import '../../packages/ui/header.css';

const inter = localFont({
  src: '../../public/assets/fonts/inter-latin-ext.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
  style: 'normal',
  fallback: ['Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

export const metadata = pageMetadata('home', 'pl');
export const viewport = { themeColor: '#191919', colorScheme: 'dark' };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = seoLocale((await headers()).get('x-codestorybro-language'));
  return (
    <html data-site="home" lang={locale} className={inter.variable}>
      <body suppressHydrationWarning>
        <GA />
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
