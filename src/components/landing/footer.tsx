import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="px-5 py-10 sm:px-6"
      style={{
        fontSize: "0.78rem",
        color: "rgba(13,13,13,0.4)",
        letterSpacing: "-0.005em",
      }}
    >
      <div className="mx-auto flex w-full max-w-[720px] flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>© {new Date().getFullYear()} kiko.ai</span>
          <span style={{color: "rgba(13,13,13,0.2)"}}>·</span>
          <Link
            href="/terms"
            style={{color: "rgba(13,13,13,0.55)"}}
          >
            이용약관
          </Link>
          <span style={{color: "rgba(13,13,13,0.2)"}}>·</span>
          <Link
            href="/privacy"
            style={{color: "rgba(13,13,13,0.55)"}}
          >
            개인정보처리방침
          </Link>
        </div>
        <a
          href="https://apps.apple.com/kr/app/kiko-ai/id6787153872"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold"
          style={{color: "rgba(13,13,13,0.55)"}}
        >
          Download on the App Store →
        </a>
      </div>
    </footer>
  );
}
