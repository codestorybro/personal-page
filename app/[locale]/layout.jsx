import React from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "../../i18n/routing"
import Header from "../../components/header"
import { Toaster } from "react-hot-toast"
import Scripts from "./Scripts"
import PropTypes from "prop-types"
import "../../public/main.scss"
import { SubscribeForm } from "../../components/subscribe-form"

export const metadata = {
  title: "CodeStoryBro",
  description:
    "CodeStoryBro is here to guide you through the challenges, help you set clear career paths, and unlock your potential in the tech world. Whether you’re just starting out or looking to advance, personalized mentoring will give you the tools, support, and real-world insights to fast-track your growth.",
  keywords: ["React", "JavaScript", "TypeScript"],
  authors: [{ name: "Marcin Kołodziej" }],
  creator: "CodeStoryBro",
  publisher: "Marcin Kołodziej",
  openGraph: {
    title: "CodeStoryBro - Empower Your Coding Journey",
    description:
      "CodeStoryBro is here to guide you through the challenges, help you set clear career paths, and unlock your potential in the tech world. Whether you’re just starting out or looking to advance, personalized mentoring will give you the tools, support, and real-world insights to fast-track your growth.",
    url: "https://codestorybro.com",
    siteName: "CodeStoryBro",
    locale: "en",
    type: "website",
    images: {
      url: "https://www.codestorybro.com/assets/img/og-image.png",
      width: 1200,
      height: 630,
      alt: "CodeStoryBro",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeStoryBro - Empower Your Coding Journey",
    site: "@codestorybro",
    creator: "@codestorybro",
    description:
      "CodeStoryBro is here to guide you through the challenges, help you set clear career paths, and unlock your potential in the tech world. Whether you’re just starting out or looking to advance, personalized mentoring will give you the tools, support, and real-world insights to fast-track your growth.",
    images: {
      url: "https://www.codestorybro.com/assets/img/og-image.png",
      width: 1200,
      height: 630,
      alt: "CodeStoryBro",
    },
  },
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params

  if (!routing.locales.includes(locale)) {
    notFound()
  }
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          // eslint-disable-next-line no-undef
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Scripts />
          <Toaster />
          <div className="page-wrapper page-wrapper-2">
            <Header locale={locale} />
            <div className="bostami-page-area z-index-3">
              <div className="container">
                <div className="bostami-page-wrap pt-60 pl-80 pr-80">
                  {children}
                </div>

                <SubscribeForm />
                <div className="footer-copyright text-center pt-25 pb-25">
                  <span style={{ fontSize: 16 }}>
                    ©{new Date().getFullYear()} {messages.general["copy"]}{" "}
                    <span
                      style={{
                        fontFamily: "Adrip",
                        fontSize: 32,
                      }}
                    >
                      <span style={{ fontSize: 48 }}>c</span>
                      ode$toryBro
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
  params: PropTypes.object.isRequired,
}
