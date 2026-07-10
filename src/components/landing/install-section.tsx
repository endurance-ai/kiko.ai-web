"use client";

const APP_STORE_URL = "https://apps.apple.com/kr/app/kiko-ai/id6787153872";

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
          <div style={{color: "rgba(255,255,255,0.3)"}}>iPhone에서 만나보기</div>
        </div>

        <div
          className="flex flex-col sm:flex-row overflow-hidden"
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
          }}
        >
          {/* iOS 앱 정보 + CTA */}
          <div className="flex flex-col p-6 sm:p-7 sm:flex-1">
            <div className="flex items-center gap-2 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#0D0D0D">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="font-semibold" style={{fontSize: "0.82rem", color: "rgba(13,13,13,0.55)", letterSpacing: "-0.01em"}}>iOS App</span>
            </div>

            <div
              className="font-bold mb-2"
              style={{fontSize: "1.35rem", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#0D0D0D"}}
            >
              iPhone에서 만나보세요
            </div>
            <div
              className="mb-6 flex-1"
              style={{fontSize: "0.9rem", color: "rgba(13,13,13,0.55)", lineHeight: 1.5}}
            >
              App Store에서 지금 바로 다운로드하고, 대화 한 번으로 취향에 맞는 브랜드를 찾아보세요.
            </div>

            <a
              href={APP_STORE_URL}
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store에서 받기
            </a>
          </div>

          {/* QR 코드 — 데스크톱에서만 노출 */}
          <div
            className="hidden sm:flex sm:flex-col sm:items-center sm:justify-center sm:p-7"
            style={{
              background: "#F0F0F2",
              borderLeft: "1px solid rgba(13,13,13,0.06)",
              minWidth: "220px",
            }}
          >
            <div
              className="mb-3"
              style={{
                background: "#FFFFFF",
                borderRadius: "14px",
                padding: "10px",
                boxShadow: "0 4px 12px rgba(13,13,13,0.06)",
              }}
            >
              <img
                src="/qr-appstore.svg"
                alt="App Store QR"
                style={{width: "140px", height: "140px", display: "block"}}
              />
            </div>
            <div
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "rgba(13,13,13,0.55)",
                letterSpacing: "-0.005em",
                textAlign: "center",
                lineHeight: 1.4,
              }}
            >
              iPhone 카메라로<br />QR을 스캔하세요
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
