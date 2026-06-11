"use client";

const TELEGRAM_URL = "https://t.me/kiko_fashion_ai_bot";

export function TelegramModal({onClose}: {onClose: () => void}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{background: "rgba(13,13,13,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)"}}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[360px] p-7"
        style={{background: "#FFFFFF", borderRadius: "24px", boxShadow: "0 32px 80px rgba(0,0,0,0.25)"}}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 text-3xl">🐾</div>

        <div
          className="mb-2 font-bold"
          style={{fontSize: "1.3rem", letterSpacing: "-0.025em", lineHeight: 1.1, color: "#0D0D0D"}}
        >
          Kiko와 대화 시작하기
        </div>

        <div
          className="mb-6"
          style={{fontSize: "0.9rem", color: "rgba(13,13,13,0.55)", lineHeight: 1.6, letterSpacing: "-0.005em"}}
        >
          텔레그램에서 Kiko를 찾아보세요. 링크를 보내면 바로 시작할 수 있어요.
        </div>

        <div className="flex items-center gap-4 mb-5">
          <img
            src="/qr-telegram.png"
            alt="Telegram QR"
            style={{width: "80px", height: "80px", borderRadius: "10px", border: "1px solid rgba(13,13,13,0.08)", padding: "4px"}}
          />
          <div>
            <div style={{fontSize: "0.78rem", color: "rgba(13,13,13,0.4)", marginBottom: "2px"}}>텔레그램 봇</div>
            <div style={{fontSize: "0.95rem", fontWeight: 700, color: "#0D0D0D", letterSpacing: "-0.01em"}}>@kiko_fashion_ai_bot</div>
          </div>
        </div>

        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 font-bold transition-transform duration-150 hover:-translate-y-0.5"
          style={{
            background: "#229ED9",
            color: "#FFFFFF",
            borderRadius: "12px",
            padding: "14px",
            fontSize: "0.95rem",
            letterSpacing: "-0.01em",
            marginBottom: "8px",
            textDecoration: "none",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.6l-2.965-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.963.959z"/>
          </svg>
          Telegram 열기
        </a>

        <button
          onClick={onClose}
          className="w-full py-2.5"
          style={{background: "transparent", color: "rgba(13,13,13,0.35)", border: "none", cursor: "pointer", fontSize: "0.85rem"}}
        >
          나중에
        </button>
      </div>
    </div>
  );
}
