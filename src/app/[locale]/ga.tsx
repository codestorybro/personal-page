import Script from 'next/script';

const GA: React.FC = () => (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}`}
    />
    <Script strategy="lazyOnload" id="ga">
      {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            });`}
    </Script>
  </>
);

export default GA;
