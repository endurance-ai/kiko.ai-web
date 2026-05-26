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
        <span>© {new Date().getFullYear()} kiko.ai</span>
        <a
          href="https://t.me/kiko_fashion_ai_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold transition-opacity hover:opacity-70"
          style={{color: "rgba(13,13,13,0.55)"}}
        >
          @kiko_fashion_ai_bot
        </a>
      </div>
    </footer>
  );
}
