"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import {Check, ChevronLeft, MoreVertical, Send} from "lucide-react";

type Step =
  | { kind: "idle" }
  | { kind: "typing"; text: string }
  | { kind: "user-sent"; text: string }
  | { kind: "kiko-typing" }
  | { kind: "kiko-msg"; index: number };

const USER_INPUT = "https://pin.it/3kQ8mZx";

const KIKO_MESSAGES: Array<{ body: React.ReactNode; key: string }> = [
  { key: "found", body: <>Got it — scanning the pin… 🔍</> },
  {
    key: "match",
    body: (
      <>
        Found a match:
        <br />
        <b>Vintage Leather Tote — Cognac</b>
      </>
    ),
  },
  {
    key: "compare",
    body: (
      <div>
        <div className="flex items-center justify-between gap-3 text-[13px]">
          <span className="text-white/70 line-through">Pinterest seller · $245</span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-3 text-[15px] font-semibold">
          <span>eBay (verified)</span>
          <span className="text-[#F5A623]">$128</span>
        </div>
        <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#F5A623]/15 px-2 py-0.5 text-[11px] font-semibold text-[#F5A623]">
          −47% · same item
        </div>
      </div>
    ),
  },
  { key: "cta", body: <>Want me to send the checkout link? 🛒</> },
];

export function TelegramMockup() {
  const [step, setStep] = useState<Step>({ kind: "idle" });

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const after = (ms: number) =>
      new Promise<void>((res) => {
        const t = setTimeout(() => res(), ms);
        timers.push(t);
      });

    (async () => {
      await after(900);
      if (cancelled) return;

      // Typing the URL
      for (let i = 1; i <= USER_INPUT.length; i++) {
        if (cancelled) return;
        setStep({ kind: "typing", text: USER_INPUT.slice(0, i) });
        await after(48);
      }

      await after(450);
      if (cancelled) return;
      setStep({ kind: "user-sent", text: USER_INPUT });

      await after(750);
      if (cancelled) return;
      setStep({ kind: "kiko-typing" });

      for (let i = 0; i < KIKO_MESSAGES.length; i++) {
        await after(i === 0 ? 1100 : 1200);
        if (cancelled) return;
        setStep({ kind: "kiko-msg", index: i });
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const userSent = step.kind !== "idle" && step.kind !== "typing";
  const kikoCount = step.kind === "kiko-msg" ? step.index + 1 : 0;
  const inputText = step.kind === "typing" ? step.text : "";

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* Soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[48px] bg-[radial-gradient(circle_at_50%_40%,rgba(245,166,35,0.18),transparent_60%)] blur-2xl"
      />

      {/* Phone frame */}
      <div className="overflow-hidden rounded-[36px] border border-white/10 bg-[#0e0e10] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)_inset]">
        {/* Top bar (Telegram-ish) */}
        <div className="flex items-center gap-3 border-b border-white/5 bg-[#17212b] px-4 py-3">
          <ChevronLeft className="size-4 text-[#6ab4f0]" />
          <Image
            src="/logo.jpg"
            alt="kiko.ai"
            width={36}
            height={36}
            className="size-9 rounded-full"
          />
          <div className="flex-1 leading-tight">
            <div className="text-[14px] font-semibold text-white">
              kiko.ai
              <span className="ml-1" aria-hidden>
                🧶
              </span>
            </div>
            <div className="text-[11px] text-[#7da3c3]">bot · online</div>
          </div>
          <MoreVertical className="size-4 text-[#7da3c3]" />
        </div>

        {/* Chat body */}
        <div
          className="relative h-[460px] overflow-hidden px-3 py-4"
          style={{
            background:
              "linear-gradient(180deg,#0e1621 0%,#11212f 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />

          <div className="relative flex h-full flex-col justify-end gap-2">
            {userSent && <UserBubble text={USER_INPUT} />}

            {step.kind === "kiko-typing" && <KikoTyping />}

            {KIKO_MESSAGES.slice(0, kikoCount).map((m) => (
              <KikoBubble key={m.key}>{m.body}</KikoBubble>
            ))}
          </div>
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 border-t border-white/5 bg-[#17212b] px-3 py-2.5">
          <div className="flex-1 rounded-full bg-[#242f3d] px-4 py-2 text-[13px] text-white/80">
            {inputText ? (
              <>
                <span className="text-white">{inputText}</span>
                <span
                  aria-hidden
                  className="ml-0.5 inline-block h-3.5 w-[1.5px] -translate-y-px bg-[#F5A623] align-middle"
                  style={{ animation: "caret 1s steps(1) infinite" }}
                />
              </>
            ) : (
              <span className="text-white/40">Message</span>
            )}
          </div>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            className="flex size-9 items-center justify-center rounded-full bg-[#6ab4f0] text-white"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes caret { 50% { opacity: 0 } }
        @keyframes bubbleIn {
          0% { opacity: 0; transform: translateY(6px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-2px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div
      className="ml-auto max-w-[78%] rounded-[14px] rounded-br-sm bg-[#2b5278] px-3 py-2 text-[13.5px] text-white shadow-sm"
      style={{ animation: "bubbleIn .25s ease both" }}
    >
      <span className="break-all">{text}</span>
      <span className="ml-1.5 inline-flex items-center text-[10px] text-white/60">
        12:34
        <Check className="ml-0.5 size-3" />
      </span>
    </div>
  );
}

function KikoBubble({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="max-w-[82%] rounded-[14px] rounded-bl-sm bg-[#182533] px-3.5 py-2.5 text-[13.5px] leading-snug text-white shadow-sm"
      style={{ animation: "bubbleIn .25s ease both" }}
    >
      {children}
    </div>
  );
}

function KikoTyping() {
  return (
    <div
      className="inline-flex w-fit items-center gap-1 rounded-[14px] rounded-bl-sm bg-[#182533] px-3.5 py-2.5"
      style={{ animation: "bubbleIn .25s ease both" }}
    >
      {[0, 0.15, 0.3].map((d, i) => (
        <span
          key={i}
          className="block size-1.5 rounded-full bg-white/60"
          style={{ animation: `typingDot 1.1s ${d}s infinite ease-in-out` }}
        />
      ))}
    </div>
  );
}
