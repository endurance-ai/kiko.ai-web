export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-6 py-8 text-[11px] text-white/35 lg:px-10">
      <div className="mx-auto max-w-6xl">
        © {new Date().getFullYear()} kiko.ai
      </div>
    </footer>
  );
}
