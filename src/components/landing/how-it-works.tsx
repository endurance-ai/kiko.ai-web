type Step = {
  num: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "Drop a link.",
    body: "Pinterest, Instagram, TikTok, a screenshot, or any product page. Even a photo of someone on the street works.",
  },
  {
    num: "02",
    title: "Kiko hunts.",
    body: "She reads the image, identifies the look, and scans the web for the same vibe — usually finding 8 alternatives in about 30 seconds.",
  },
  {
    num: "03",
    title: "Buy in chat.",
    body: "Tap to checkout. No tab juggling, no price-comparison rabbit holes. Kiko learns your taste with every reply.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="px-5 py-16 sm:px-6 sm:py-20"
      style={{background: "#E8E2D0"}}
    >
      <div className="mx-auto w-full max-w-[720px]">
        <div
          className="mb-8 font-bold leading-[0.98] tracking-[-0.03em]"
          style={{fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)"}}
        >
          How it works
          <br />
          <span style={{color: "rgba(13,13,13,0.3)"}}>in three steps</span>
        </div>

        <ol className="flex flex-col gap-3">
          {STEPS.map((s) => (
            <li
              key={s.num}
              className="flex gap-4 p-5 sm:gap-5 sm:p-6"
              style={{background: "#FFFFFF", borderRadius: "18px"}}
            >
              <div
                className="shrink-0 font-bold leading-none"
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 2.2rem)",
                  letterSpacing: "-0.035em",
                  color: "rgba(13,13,13,0.25)",
                  minWidth: "50px",
                }}
              >
                {s.num}
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className="font-bold"
                  style={{
                    fontSize: "clamp(1.1rem, 3.2vw, 1.25rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                  }}
                >
                  {s.title}
                </div>
                <div
                  className="mt-1.5"
                  style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.5,
                    color: "rgba(13,13,13,0.65)",
                    letterSpacing: "-0.005em",
                  }}
                >
                  {s.body}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
