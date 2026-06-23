import Script from 'next/script';

const GA: React.FC = () => {
  const measurementId = process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID;

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        id="google-analytics"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script strategy="lazyOnload" id="ga">
        {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              });`}
      </Script>
    </>
  );
};

export default GA;
