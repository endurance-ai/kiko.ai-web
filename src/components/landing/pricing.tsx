"use client";

import {useState} from "react";

type Plan = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
  style: "white" | "black" | "green";
  paid: boolean;
  badge?: string;
};

const PLANS: Plan[] = [
  {
    name: "Free",
    price: "₩0",
    tagline: "영원히 무료",
    features: [
      "5,000+ 브랜드 기반 디깅",
      "하루 10회 검색",
      "텍스트 · 링크로 검색",
      "iMessage · Telegram",
      "기본 취향 프로필",
    ],
    cta: "Waitlist 등록",
    style: "white",
    paid: false,
  },
  {
    name: "Pro",
    price: "₩7,900/월",
    tagline: "더 빠른 패션 디깅",
    features: [
      "5,000+ 브랜드 기반 디깅",
      "24시간 백그라운드 서칭",
      "하루 50회 검색",
      "이미지, 링크 기반 디깅",
      "관심 브랜드 발매·드롭 알림",
      "취향 저장 → 갈수록 정확해져요",
    ],
    cta: "Pro 시작하기",
    style: "black",
    paid: true,
    badge: "Most popular",
  },
  {
    name: "MAX",
    price: "₩15,900/월",
    tagline: "패션 크리에이터 플랜",
    features: [
      "5,000+ 브랜드 기반 디깅",
      "검색 횟수 제한 없음",
      "관심 브랜드 모든 드롭 매일 알림",
      "내 취향 닮은 새 브랜드 추천",
      "릴스·블로그 소재 자동 수집",
      "우선 응답",
    ],
    cta: "MAX 시작하기",
    style: "green",
    paid: true,
  },
];

type CardStyle = {
  bg: string;
  color: string;
  sub: string;
  ctaBg: string;
  ctaColor: string;
  badgeBg: string;
  badgeColor: string;
};

const STYLES: Record<Plan["style"], CardStyle> = {
  white: {
    bg: "#FFFFFF",
    color: "#0D0D0D",
    sub: "rgba(13,13,13,0.45)",
    ctaBg: "#0D0D0D",
    ctaColor: "#FFFFFF",
    badgeBg: "rgba(13,13,13,0.07)",
    badgeColor: "#0D0D0D",
  },
  black: {
    bg: "#0D0D0D",
    color: "#FFFFFF",
    sub: "rgba(255,255,255,0.45)",
    ctaBg: "#A8E0B0",
    ctaColor: "#0D0D0D",
    badgeBg: "rgba(168,224,176,0.18)",
    badgeColor: "#A8E0B0",
  },
  green: {
    bg: "#A8E0B0",
    color: "#0D0D0D",
    sub: "rgba(13,13,13,0.45)",
    ctaBg: "#0D0D0D",
    ctaColor: "#FFFFFF",
    badgeBg: "rgba(13,13,13,0.08)",
    badgeColor: "#0D0D0D",
  },
};

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleCta = (plan: Plan) => {
    if (!plan.paid) {
      document.getElementById("waitlist")?.scrollIntoView({behavior: "smooth"});
      return;
    }
    setSelectedPlan(plan.name);
  };

  return (
    <>
      <section id="pricing" className="px-5 py-10 sm:px-6 sm:py-20" style={{background: "#F0F0F2"}}>
        <div className="mx-auto w-full max-w-[720px]">
          <div
            className="mb-5 sm:mb-8 font-bold leading-[0.98] tracking-[-0.03em]"
            style={{fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)"}}
          >
            심플한 가격
            <br />
            <span style={{color: "rgba(13,13,13,0.3)"}}>숨겨진 비용 없음</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {PLANS.map((plan) => {
              const s = STYLES[plan.style];
              return (
                <div
                  key={plan.name}
                  className="flex flex-col p-5 sm:p-6"
                  style={{background: s.bg, borderRadius: "20px", color: s.color}}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold" style={{color: s.sub}}>
                      {plan.name}
                    </span>
                    {plan.badge && (
                      <span
                        style={{
                          background: s.badgeBg,
                          color: s.badgeColor,
                          borderRadius: "999px",
                          padding: "5px 12px",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div
                    className="font-bold mb-1"
                    style={{fontSize: "clamp(1.35rem, 4vw, 1.65rem)", letterSpacing: "-0.03em", lineHeight: 1}}
                  >
                    {plan.price}
                  </div>

                  <div className="mb-5 text-sm" style={{color: s.sub, letterSpacing: "-0.005em"}}>
                    {plan.tagline}
                  </div>

                  <ul className="flex-1 mb-5 space-y-2.5">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm"
                        style={{
                          color: plan.style === "black" ? "rgba(255,255,255,0.72)" : "rgba(13,13,13,0.68)",
                          lineHeight: 1.4,
                          letterSpacing: "-0.005em",
                        }}
                      >
                        <span style={{opacity: 0.45, fontSize: "0.8rem", marginTop: "1px", flexShrink: 0}}>✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleCta(plan)}
                    className="w-full py-3 font-bold transition-transform duration-150 hover:-translate-y-0.5"
                    style={{
                      background: s.ctaBg,
                      color: s.ctaColor,
                      borderRadius: "12px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {plan.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedPlan && (
        <FakeDoorModal planName={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </>
  );
}

function FakeDoorModal({planName, onClose}: {planName: string; onClose: () => void}) {
  const handleWaitlist = () => {
    onClose();
    setTimeout(() => {
      document.getElementById("waitlist")?.scrollIntoView({behavior: "smooth"});
    }, 150);
  };

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
          결제 기능 준비 중이에요
        </div>

        <div
          className="mb-6"
          style={{fontSize: "0.9rem", color: "rgba(13,13,13,0.55)", lineHeight: 1.6, letterSpacing: "-0.005em"}}
        >
          <span className="font-semibold" style={{color: "#0D0D0D"}}>{planName}</span> 플랜에 관심 가져주셔서 감사해요. 베타 오픈과 함께 결제 기능도 함께 열릴 예정이에요. Waitlist에 등록하시면 가장 먼저 알려드릴게요.
        </div>

        <button
          onClick={handleWaitlist}
          className="w-full py-3.5 font-bold transition-transform duration-150 hover:-translate-y-0.5"
          style={{
            background: "#0D0D0D",
            color: "#FFFFFF",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontSize: "0.92rem",
            letterSpacing: "-0.01em",
            marginBottom: "8px",
          }}
        >
          Waitlist 등록하기 →
        </button>

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
