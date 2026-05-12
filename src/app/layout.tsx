import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "kiko.ai — Stop browsing. Ask kiko.ai",
  description:
    "Send any Pinterest, Instagram, or product link to kiko on Telegram or iMessage. Get the cheaper alternative in 30 seconds.",
  metadataBase: new URL("https://kiko.ai"),
  openGraph: {
    title: "kiko.ai — Stop browsing. Ask kiko.ai",
    description:
      "Send any link to kiko on Telegram or iMessage. Get the cheaper alternative in 30 seconds.",
    url: "https://kiko.ai",
    siteName: "kiko.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "kiko.ai — Stop browsing. Ask kiko.ai",
    description:
      "Send any link to kiko on Telegram or iMessage. Get the cheaper alternative in 30 seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="bg-black font-sans text-white">{children}</body>
    </html>
  );
}
