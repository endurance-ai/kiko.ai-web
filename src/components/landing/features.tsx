type Feature = {
  title: string;
  body: string;
  color: string;
};

const FEATURES: Feature[] = [
  {
    title: "Same outfit, cheaper.",
    body: "Original designer piece, the high-street alternative, and how much you saved — every reply. Real taste-match shopping, not exact-product detection.",
    color: "#E8E2D0",
  },
  {
    title: "No app. Just text.",
    body: "Kiko lives inside iMessage and Telegram. Nothing to install, nothing to learn. It's a conversation with your fashion-savvy friend, not another shopping app.",
    color: "#A8E0B0",
  },
  {
    title: "Any fashion link, any photo.",
    body: "Pinterest outfits, Instagram fits, TikTok hauls, blog posts, product pages, screenshots, even a stranger's outfit on the street. If it's wearable, Kiko finds it.",
    color: "#C9D8E2",
  },
  {
    title: "Knows your fit.",
    body: "Tell Kiko your sizes, favorite brands, and the styles you live in — once. Every recommendation gets sharper, more you, from there.",
    color: "#F0E0D0",
  },
];

export function Features() {
  return (
    <section className="px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-[720px]">
        <div
          className="mb-8 font-bold leading-[0.98] tracking-[-0.03em]"
          style={{fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)"}}
        >
          What kiko does
          <br />
          <span style={{color: "rgba(13,13,13,0.3)"}}>in one thread</span>
        </div>

        <div className="flex flex-col gap-3">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              className="p-5 transition-transform duration-150 ease-out hover:translate-x-0.5 sm:p-7"
              style={{
                background: f.color,
                borderRadius: "20px",
                color: "#0D0D0D",
              }}
            >
              <div className="flex items-start justify-between gap-4 sm:gap-6">
                <div className="min-w-0 flex-1">
                  <div
                    className="font-bold"
                    style={{
                      fontSize: "clamp(1.2rem, 3.8vw, 1.5rem)",
                      letterSpacing: "-0.025em",
                      lineHeight: 1.05,
                    }}
                  >
                    {f.title}
                  </div>
                  <div
                    className="mt-2.5 max-w-[540px]"
                    style={{
                      fontSize: "0.92rem",
                      lineHeight: 1.5,
                      color: "rgba(13,13,13,0.65)",
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {f.body}
                  </div>
                </div>
                <div
                  className="shrink-0 font-bold leading-none"
                  style={{
                    fontSize: "clamp(1.2rem, 3.5vw, 1.6rem)",
                    letterSpacing: "-0.035em",
                    opacity: 0.45,
                  }}
                >
                  {`0${i + 1}`}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
