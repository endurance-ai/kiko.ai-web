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
      // https: 전체 허용 — /explore·/chat 랜딩(app 컨테이너 프록시)이 외부 상품 이미지 CDN 다수를 로드
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://cdn.jsdelivr.net",
      // Waitlist form submits to Google Forms via fetch (no-cors)
      // GA4 sends data to google-analytics.com and analytics.google.com
      // *.amplitude.com — 랜딩(/explore·/chat) Amplitude 계측 전송
      "connect-src 'self' https://docs.google.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://*.amplitude.com",
      // GTM noscript iframe
      "frame-src https://www.googletagmanager.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' https://docs.google.com",
    ].join("; "),
  },
];

// 웹 랜딩(/explore·/chat)은 같은 도커 네트워크의 kiko.ai-app 컨테이너(app:3000)가 서빙.
// fallback rewrite 라 이 원페이저가 가진 페이지·자산이 항상 우선하고,
// 여기 없는 경로(랜딩 페이지·API·랜딩 빌드의 /_next 자산)만 app 으로 프록시된다.
const LANDING_APP_ORIGIN = process.env.LANDING_APP_ORIGIN ?? "http://app:3000";
const LANDING_PATHS = [
  "/explore",
  "/explore/:path*",
  "/chat",
  "/chat/:path*",
  "/api/chat/:path*",
  "/api/web-finder/:path*",
  "/api/product/:path*",
  "/api/stats/:path*",
  "/kiko-logo.svg",
  "/_next/:path*",
];

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return {
      fallback: LANDING_PATHS.map((source) => ({
        source,
        destination: `${LANDING_APP_ORIGIN}${source}`,
      })),
    };
  },
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
