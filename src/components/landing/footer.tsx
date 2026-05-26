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
        <span
          className="font-semibold"
          style={{color: "rgba(13,13,13,0.55)"}}
        >
          @kiko_fashion_ai_bot
        </span>
      </div>
    </footer>
  );
}
