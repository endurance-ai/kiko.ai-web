import type {Metadata} from "next";
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NK6MHQKD');`,
          }}
        />
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
      </body>
    </html>
  );
}
