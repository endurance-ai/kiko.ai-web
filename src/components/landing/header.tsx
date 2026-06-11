"use client";

export function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-6"
      style={{
        height: "56px",
        background: "rgba(240,240,242,0.82)",
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        borderBottom: "1px solid rgba(13,13,13,0.07)",
      }}
    >
      <div className="flex items-end" style={{gap: "0px"}}>
        <img
          src="/kiko-cat.png"
          alt="kiko"
          style={{height: "52px", width: "auto", alignSelf: "flex-end"}}
        />
        <div
          className="hidden sm:block"
          style={{
            background: "#FFFFFF",
            borderRadius: "16px 16px 16px 4px",
            padding: "7px 12px",
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "#0D0D0D",
            letterSpacing: "-0.01em",
            marginBottom: "8px",
            whiteSpace: "nowrap",
          }}
        >
          Hello Fashion lovers !
        </div>
      </div>

      <a
        href="https://t.me/kiko_fashion_ai_bot"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-1.5 font-bold transition-transform duration-150 ease-out hover:-translate-y-0.5"
        style={{
          background: "#0D0D0D",
          color: "#FFFFFF",
          fontSize: "0.88rem",
          letterSpacing: "-0.015em",
          padding: "9px 18px",
          borderRadius: "999px",
        }}
      >
        Get started
        <span aria-hidden style={{fontSize: "1rem", lineHeight: 1}}>→</span>
      </a>
    </header>
  );
}
