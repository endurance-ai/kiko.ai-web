"use client";

export function Header() {
  return (
    <header
      className="header-mobile-fade fixed top-0 left-0 right-0 z-50 flex items-center justify-between pl-4 pr-3 sm:px-6 h-[54px] sm:h-14"
    >
      <div className="flex items-center">
        <img
          src="/kiko-logo.svg"
          alt="kiko"
          className="h-[22px] sm:h-7 w-auto"
        />
      </div>

      <a
        href="https://t.me/kiko_fashion_ai_bot"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-1.5 font-bold transition-transform duration-150 ease-out hover:-translate-y-0.5 text-[0.82rem] sm:text-[0.88rem] px-[18px] py-[6px] sm:px-[18px] sm:py-[9px]"
        style={{
          background: "#0D0D0D",
          color: "#FFFFFF",
          letterSpacing: "-0.015em",
          borderRadius: "999px",
        }}
      >
        Get started
        <span aria-hidden className="text-[0.9rem] sm:text-base leading-none">→</span>
      </a>
    </header>
  );
}
