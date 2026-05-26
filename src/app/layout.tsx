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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
