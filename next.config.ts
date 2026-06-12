import type {NextConfig} from "next";

// next build forces NODE_ENV=production, so 'unsafe-eval' never ships to prod.
const isDev = process.env.NODE_ENV === "development";

const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" // React dev needs eval()
  : "script-src 'self' 'unsafe-inline'";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // GTM and GA4 require googletagmanager.com and google-analytics.com
      scriptSrc + " https://www.googletagmanager.com",
      // Pretendard font is served from jsdelivr CDN (loaded in app/layout.tsx <head>)
      "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
      "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
      "font-src 'self' https://cdn.jsdelivr.net",
      // Waitlist form submits to Google Forms via fetch (no-cors)
      // GA4 sends data to google-analytics.com and analytics.google.com
      "connect-src 'self' https://docs.google.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net",
      // GTM noscript iframe
      "frame-src https://www.googletagmanager.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' https://docs.google.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/price",
        destination: "/#pricing",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
