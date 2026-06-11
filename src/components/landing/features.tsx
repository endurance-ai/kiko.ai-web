"use client";

import {useState, useRef} from "react";

type Feature = {
  title: string;
  body: string;
  color: string;
};

const FEATURES: Feature[] = [
  {
    title: "5,000+ 한국 니치 브랜드, 감도 그대로.",
    body: "무신사·29CM에서 찾기 어려운 한국 니치 디자이너 브랜드 중심의 5,000개+ 카탈로그. 더 저렴한 대안을 찾아도 당신의 감도는 절대 내려가지 않도록 설계했어요.",
    color: "#E8E2D0",
  },
  {
    title: "몇 주 걸리던 디깅, 이제 30초.",
    body: "핀터레스트에서 본 무드를 실제 살 수 있는 옷으로 바꾸는 데 평균 30초. 보통 8가지 대안을 한 번에 제안해요. 탭 하나로 결제까지.",
    color: "#A8E0B0",
  },
  {
    title: "링크, 사진, 텍스트 — 전부 OK.",
    body: "핀터레스트 링크, 인스타그램 피드, 스크린샷, 블로그 포스팅까지. 입력 방식에 제한 없어요. 입을 수 있는 것이라면 Kiko가 읽어냅니다.",
    color: "#C9D8E2",
  },
  {
    title: "쓸수록 더 나다워져요.",
    body: "취향, 사이즈, 브랜드 선호도를 기억해 갈수록 더 정확한 추천을 드려요. 한 번 알려두면 매번 말할 필요 없어요.",
    color: "#F0E0D0",
  },
];

function VideoCard({src}: {src: string}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [expanded, setExpanded] = useState(false);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(13,13,13,0.15)",
          background: "#0D0D0D",
          position: "relative",
          aspectRatio: "9/16",
        }}
      >
        <video
          ref={ref}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          style={{width: "100%", height: "100%", display: "block", objectFit: "cover"}}
        />
        <button
          onClick={toggle}
          style={{
            position: "absolute", bottom: "12px", right: "52px",
            width: "34px", height: "34px", borderRadius: "50%",
            background: "rgba(13,13,13,0.6)", backdropFilter: "blur(6px)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.8rem", color: "#fff",
          }}
        >{playing ? "⏸" : "▶"}</button>
        <button
          onClick={() => setExpanded(true)}
          style={{
            position: "absolute", bottom: "12px", right: "12px",
            width: "34px", height: "34px", borderRadius: "50%",
            background: "rgba(13,13,13,0.6)", backdropFilter: "blur(6px)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.8rem", color: "#fff",
          }}
        >⤢</button>
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{background: "rgba(13,13,13,0.85)", backdropFilter: "blur(8px)"}}
          onClick={() => setExpanded(false)}
        >
          <video
            src={src}
            autoPlay loop muted playsInline controls
            style={{maxHeight: "90vh", maxWidth: "100%", borderRadius: "20px"}}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setExpanded(false)}
            style={{
              position: "absolute", top: "20px", right: "20px",
              background: "rgba(255,255,255,0.15)", border: "none",
              color: "#fff", borderRadius: "50%",
              width: "40px", height: "40px", fontSize: "1.1rem", cursor: "pointer",
            }}
          >✕</button>
        </div>
      )}
    </>
  );
}

export function Features() {
  return (
    <section className="px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-[720px]">
        <div
          className="mb-8 font-bold leading-[0.98] tracking-[-0.03em]"
          style={{fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)"}}
        >
          kiko가 하는 일
          <br />
          <span style={{color: "rgba(13,13,13,0.3)"}}>대화 하나 안에서</span>
        </div>

        {/* 영상 2개 — 첫 번째는 위, 두 번째는 아래로 offset */}
        <div className="flex gap-3 mb-8 items-start">
          <div className="flex-1 min-w-0 sm:flex-none sm:w-[260px]">
            <VideoCard src="/demo-usage.mp4" />
          </div>
          <div className="flex-1 min-w-0 sm:flex-none sm:w-[260px] mt-12 sm:mt-24">
            <VideoCard src="/demo-usage-2.mp4" />
          </div>
        </div>

        {/* 피처 카드 4개 */}
        <div className="flex flex-col gap-3">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              className="p-5 transition-transform duration-150 ease-out hover:translate-x-0.5 sm:p-7"
              style={{background: f.color, borderRadius: "20px", color: "#0D0D0D"}}
            >
              <div className="flex items-start justify-between gap-4 sm:gap-6">
                <div className="min-w-0 flex-1">
                  <div
                    className="font-bold"
                    style={{fontSize: "clamp(1.2rem, 3.8vw, 1.5rem)", letterSpacing: "-0.025em", lineHeight: 1.05}}
                  >
                    {f.title}
                  </div>
                  <div
                    className="mt-2.5 max-w-[540px]"
                    style={{fontSize: "0.92rem", lineHeight: 1.5, color: "rgba(13,13,13,0.65)", letterSpacing: "-0.005em"}}
                  >
                    {f.body}
                  </div>
                </div>
                <div
                  className="shrink-0 font-bold leading-none"
                  style={{fontSize: "clamp(1.2rem, 3.5vw, 1.6rem)", letterSpacing: "-0.035em", opacity: 0.3}}
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
