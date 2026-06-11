"use client";

const TELEGRAM_URL = "https://t.me/kiko_fashion_ai_bot";

export function InstallSection() {
  return (
    <section
      id="waitlist"
      className="px-5 py-10 sm:px-6 sm:py-20"
      style={{background: "#0D0D0D"}}
    >
      <div className="mx-auto w-full max-w-[720px]">
        <div
          className="mb-5 sm:mb-8 font-bold leading-[0.98] tracking-[-0.03em]"
          style={{fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)"}}
        >
          <div style={{color: "#FFFFFF"}}>지금 바로 시작하세요</div>
          <div style={{color: "rgba(255,255,255,0.3)"}}>베타 오픈 중</div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* 텔레그램 */}
          <div
            className="flex flex-col p-6"
            style={{
              background: "#C9D8E2",
              borderRadius: "20px",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#0D0D0D">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.6l-2.965-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.963.959z"/>
              </svg>
              <span className="font-semibold" style={{fontSize: "0.82rem", color: "rgba(13,13,13,0.55)", letterSpacing: "-0.01em"}}>Telegram</span>
              <span
                className="font-semibold"
                style={{
                  fontSize: "0.78rem",
                  background: "#A8E0B0",
                  color: "#0D0D0D",
                  borderRadius: "999px",
                  padding: "5px 12px",
                  marginLeft: "auto",
                  letterSpacing: "-0.01em",
                }}
              >
                베타 오픈 중
              </span>
            </div>

            <div
              className="font-bold mb-2"
              style={{fontSize: "1.25rem", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#0D0D0D"}}
            >
              텔레그램에서 만나보기
            </div>
            <div
              className="mb-6 flex-1"
              style={{fontSize: "0.875rem", color: "rgba(13,13,13,0.55)", lineHeight: 1.5}}
            >
              SNS 링크로 즉시 시작하세요.
            </div>

            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-bold transition-transform duration-150 hover:-translate-y-0.5"
              style={{
                background: "#0D0D0D",
                color: "#FFFFFF",
                borderRadius: "12px",
                padding: "13px",
                fontSize: "0.92rem",
                letterSpacing: "-0.01em",
                textDecoration: "none",
              }}
            >
              Get started →
            </a>
          </div>

          {/* iOS 앱 */}
          <div
            className="flex flex-col p-6"
            style={{
              background: "#E8E2D0",
              borderRadius: "20px",
              opacity: 0.55,
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(13,13,13,0.5)">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="font-semibold" style={{fontSize: "0.82rem", color: "rgba(13,13,13,0.45)", letterSpacing: "-0.01em"}}>iOS App</span>
              <span
                className="font-semibold"
                style={{
                  fontSize: "0.78rem",
                  background: "rgba(13,13,13,0.1)",
                  color: "rgba(13,13,13,0.45)",
                  borderRadius: "999px",
                  padding: "5px 12px",
                  marginLeft: "auto",
                  letterSpacing: "-0.01em",
                }}
              >
                준비 중
              </span>
            </div>

            <div
              className="font-bold mb-2"
              style={{fontSize: "1.25rem", letterSpacing: "-0.025em", lineHeight: 1.1, color: "rgba(13,13,13,0.55)"}}
            >
              iOS 앱 출시 예정
            </div>
            <div
              className="mb-6 flex-1"
              style={{fontSize: "0.875rem", color: "rgba(13,13,13,0.4)", lineHeight: 1.5}}
            >
              더 빠르고 편리한 네이티브 앱을 준비하고 있어요.
            </div>

            <div
              className="inline-flex items-center justify-center font-bold"
              style={{
                background: "rgba(13,13,13,0.1)",
                color: "rgba(13,13,13,0.3)",
                borderRadius: "12px",
                padding: "13px",
                fontSize: "0.92rem",
                letterSpacing: "-0.01em",
                cursor: "not-allowed",
              }}
            >
              Coming soon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
