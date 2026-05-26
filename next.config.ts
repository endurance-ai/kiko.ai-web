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
      scriptSrc,
      // Pretendard font is served from jsdelivr CDN (loaded in app/layout.tsx <head>)
      "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
      "img-src 'self' data: blob:",
      "font-src 'self' https://cdn.jsdelivr.net",
      // Waitlist form submits to Google Forms via fetch (no-cors)
      "connect-src 'self' https://docs.google.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      // Google Forms POST is fetch (under connect-src), but a plain <form action="..."> fallback
      // would need https://docs.google.com here too.
      "form-action 'self' https://docs.google.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
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
