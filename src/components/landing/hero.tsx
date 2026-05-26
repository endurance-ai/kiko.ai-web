"use client";

import Image from "next/image";
import {ChatPreview} from "./chat-preview";

export function Hero() {
  return (
    <section className="px-5 pt-8 pb-14 sm:px-6 sm:pt-12 sm:pb-20">
      <div className="mx-auto w-full max-w-[720px]">
        {/* Headline + cat — stack on mobile, inline on sm+ */}
        <div className="flex flex-col items-start sm:flex-row sm:items-end sm:gap-0">
          <h1
            className="font-bold leading-[0.95] tracking-[-0.035em] sm:shrink-0"
            style={{fontSize: "clamp(2.4rem, 9vw, 4.8rem)"}}
          >
            Stop browsing.
            <br />
            <span style={{color: "rgba(13,13,13,0.3)"}}>Ask kiko.</span>
          </h1>
          <Image
            src="/kiko-cat.png"
            alt="Kiko"
            width={320}
            height={320}
            priority
            className="-mt-3 ml-auto block w-auto shrink-0 object-contain object-bottom sm:mt-0 sm:ml-[-8px]"
            style={{
              height: "calc(clamp(2.4rem, 9vw, 4.8rem) * 0.95 * 2)",
            }}
          />
        </div>

        <p
          className="mt-6 max-w-[540px]"
          style={{
            color: "rgba(13,13,13,0.65)",
            fontSize: "1.05rem",
            lineHeight: 1.5,
            letterSpacing: "-0.005em",
          }}
        >
          Drop any link — Pinterest, Instagram, TikTok, a screenshot, a product
          page. Kiko finds a piece with the same vibe, usually cheaper,
          delivered to your chat in about 30 seconds.
        </p>

        {/* Primary CTAs — directly under headline so they're visible above the fold */}
        <div className="mt-7 flex flex-wrap gap-2.5">
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center gap-2 font-bold transition-transform duration-150 ease-out hover:-translate-y-0.5"
            style={{
              background: "#0D0D0D",
              color: "#FFFFFF",
              fontSize: "1.05rem",
              letterSpacing: "-0.015em",
              padding: "16px 26px",
              borderRadius: "999px",
              boxShadow: "0 8px 20px rgba(13,13,13,0.18)",
            }}
          >
            Join the waitlist
            <span aria-hidden style={{fontSize: "1.2rem", lineHeight: 1}}>
              →
            </span>
          </a>
          <a
            href="#how"
            className="inline-flex items-center justify-center font-bold transition-colors"
            style={{
              background: "rgba(13,13,13,0.05)",
              color: "#0D0D0D",
              fontSize: "1.05rem",
              letterSpacing: "-0.015em",
              padding: "16px 24px",
              borderRadius: "999px",
            }}
          >
            How it works
          </a>
        </div>

        {/* Chat preview — full container width, auto-cycles iMessage ↔ Telegram */}
        <div className="mt-10">
          <ChatPreview size="lg" />
        </div>
      </div>
    </section>
  );
}
