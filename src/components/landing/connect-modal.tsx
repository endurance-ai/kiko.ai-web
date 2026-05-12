"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Send,
  Sparkles,
  X,
} from "lucide-react";

export type ConnectTab = "telegram" | "sms";

export function ConnectModal({
  initialTab,
  onClose,
}: {
  initialTab: ConnectTab;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<ConnectTab>(initialTab);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="connect-title"
    >
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-3xl border border-white/10 bg-[#0e0e10] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[radial-gradient(circle,rgba(245,166,35,0.18),transparent_70%)] blur-2xl"
        />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        <div className="relative px-7 pb-8 pt-7">
          {/* Tabs */}
          <div className="mx-auto inline-flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 text-[12.5px] font-semibold">
            <TabButton
              active={tab === "sms"}
              onClick={() => setTab("sms")}
              icon={<MessageSquare className="size-3.5" />}
            >
              iMessage
            </TabButton>
            <TabButton
              active={tab === "telegram"}
              onClick={() => setTab("telegram")}
              icon={<Send className="size-3.5" />}
            >
              Telegram
            </TabButton>
          </div>

          {tab === "telegram" ? <TelegramPanel /> : <SmsPanel />}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-colors ${
        active
          ? "bg-white text-black"
          : "text-white/60 hover:text-white"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function TelegramPanel() {
  return (
    <div className="mt-6">
      <h2
        id="connect-title"
        className="text-center text-[22px] font-extrabold tracking-[-0.02em] text-white"
      >
        Scan with Telegram
      </h2>
      <p className="mt-1.5 text-center text-[13.5px] text-white/55">
        Scan the code to open{" "}
        <span className="font-semibold text-white/80">
          @kiko_fashion_ai_bot
        </span>
        .
      </p>

      <div className="mx-auto mt-6 w-fit overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <Image
          src="/qr-telegram.png"
          alt="Scan to chat with kiko on Telegram"
          width={240}
          height={252}
          className="block size-[240px] object-contain"
        />
      </div>

      <div className="mt-6 text-center text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/40">
        Or open the bot directly
      </div>

      <a
        href="https://t.me/kiko_fashion_ai_bot"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-between gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/[0.08]"
      >
        <span className="mono">@kiko_fashion_ai_bot</span>
        <Send className="size-4 text-[#F5A623]" />
      </a>
    </div>
  );
}

function SmsPanel() {
  return (
    <div className="mt-6">
      <div className="mx-auto inline-flex w-fit items-center gap-1.5 rounded-full border border-[#F5A623]/30 bg-[#F5A623]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F5A623]">
        <Sparkles className="size-3" />
        Coming soon
      </div>

      <h2 className="mt-4 text-center text-[22px] font-extrabold tracking-[-0.02em] text-white">
        iMessage support is on the way.
      </h2>
      <p className="mx-auto mt-3 max-w-[340px] text-center text-[13.5px] leading-relaxed text-white/55">
        We&apos;re still wiring up iMessage. In the meantime, you can chat with
        kiko on Telegram — same features, no waiting.
      </p>

      <div className="mt-6 flex flex-col gap-2">
        <a
          href="https://t.me/kiko_fashion_ai_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-black transition-transform hover:-translate-y-[1px]"
        >
          <Send className="size-4" />
          Open Telegram instead
        </a>
      </div>
    </div>
  );
}
