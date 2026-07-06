"use client";

import {ChatPreview} from "./chat-preview";
import {useState, useEffect} from "react";

const SNS = [
  {src: "/logos/pinterest-wordmark.svg", label: "Pinterest"},
  {src: "/logos/instagram-wordmark.svg", label: "Instagram"},
];

export function Hero() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % SNS.length);
        setVisible(true);
      }, 220);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-5 pt-8 pb-14 sm:px-6 sm:pt-12 sm:pb-20" style={{overflowX: "hidden"}}>
      <div className="mx-auto w-full max-w-[720px] flex flex-col items-center text-center">

        {/* Headline */}
        <h1
          className="font-bold leading-[0.95] tracking-[-0.035em]"
          style={{fontSize: "clamp(2.2rem, 6vw, 3.5rem)"}}
        >
          Shop 5000+ fashion brand
          <br />
          <span
            className="inline-flex items-center justify-center gap-2"
            style={{color: "rgba(13,13,13,0.3)"}}
          >
            through{" "}
            <span style={{display: "inline-block", position: "relative", width: "3.6em", height: "1.0em", verticalAlign: "middle"}}>
              {SNS.map(({src, label}, i) => (
                <img
                  key={label}
                  src={src}
                  alt={label}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    transform: "translateY(-50%)",
                    width: "100%",
                    height: "auto",
                    opacity: i === idx && visible ? 1 : 0,
                    transition: "opacity 0.22s ease",
                  }}
                />
              ))}
            </span>
            {" "}link.
          </span>
        </h1>

        {/* Description */}
        <p
          className="mt-9 max-w-[560px]"
          style={{
            color: "rgba(13,13,13,0.65)",
            fontSize: "clamp(1.05rem, 2.4vw, 1.2rem)",
            lineHeight: 1.5,
            letterSpacing: "-0.005em",
          }}
        >
<span style={{color: "#0D0D0D", fontWeight: 700}}>{"GPT와 구글은 당신의 패션 취향을 모릅니다."}</span><br />{"당신 취향을 아는 AI로 5,000개+ 디자이너 브랜드를 디깅하세요."}
        </p>

        {/* CTAs */}
        <div className="mt-7 flex justify-center gap-2">
          <a
            href="https://t.me/kiko_fashion_ai_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 font-bold transition-transform duration-150 ease-out hover:-translate-y-0.5"
            style={{
              background: "#0D0D0D",
              color: "#FFFFFF",
              fontSize: "1rem",
              letterSpacing: "-0.015em",
              padding: "12px 22px",
              borderRadius: "999px",
              boxShadow: "0 6px 16px rgba(13,13,13,0.15)",
            }}
          >
            Get started
            <span aria-hidden style={{fontSize: "1rem", lineHeight: 1}}>→</span>
          </a>
          <a
            href="#how"
            className="inline-flex items-center justify-center font-bold transition-colors"
            style={{
              background: "rgba(13,13,13,0.05)",
              color: "#0D0D0D",
              fontSize: "1rem",
              letterSpacing: "-0.015em",
              padding: "12px 22px",
              borderRadius: "999px",
            }}
          >
            어떻게 작동해요?
          </a>
        </div>

        {/* Demo / Chat preview */}
        <div className="mt-10 w-full">
          <ChatPreview size="lg" />
        </div>

      </div>
    </section>
  );
}
