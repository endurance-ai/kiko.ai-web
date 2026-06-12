import type {Metadata} from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "kiko.ai — Stop browsing. Ask kiko.ai",
  description:
    "Drop any link. Kiko finds a piece with the same vibe — for less. Chat with kiko on iMessage or Telegram.",
  metadataBase: new URL("https://kikoai.me"),
  openGraph: {
    title: "kiko.ai — Stop browsing. Ask kiko.ai",
    description:
      "Drop any link. Kiko finds a piece with the same vibe — for less.",
    url: "https://kikoai.me",
    siteName: "kiko.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "kiko.ai — Stop browsing. Ask kiko.ai",
    description:
      "Drop any link. Kiko finds a piece with the same vibe — for less.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NK6MHQKD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`,
          }}
        />
        <Script
          id="gtm"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NK6MHQKD"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
