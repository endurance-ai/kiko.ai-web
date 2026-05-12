"use client";

import { useState } from "react";
import { MessagesSquare, Send } from "lucide-react";
import { TelegramMockup } from "./telegram-mockup";
import { ConnectModal, type ConnectTab } from "./connect-modal";

export function Hero() {
  const [modal, setModal] = useState<{ open: boolean; tab: ConnectTab }>({
    open: false,
    tab: "telegram",
  });

  const openModal = (tab: ConnectTab) => setModal({ open: true, tab });
  const closeModal = () => setModal((s) => ({ ...s, open: false }));

  return (
    <section className="relative z-10 flex min-h-screen flex-col">
      {/* Hero grid */}
      <div className="flex flex-1 items-center px-6 py-10 lg:px-10 lg:py-0">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left — copy */}
          <div className="max-w-[680px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
              <span className="size-1.5 rounded-full bg-[#F5A623]" />
              No app. Just text.
            </span>

            <h1 className="mt-6 text-[clamp(48px,8vw,92px)] font-extrabold leading-[0.98] tracking-[-0.04em]">
              Stop browsing.
              <br />
              Ask{" "}
              <span
                className="bg-clip-text text-transparent animate-kiko-shimmer"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg,#8B1A00 0%,#D43A1A 15%,#E8622A 28%,#F5A623 40%,#E8622A 52%,#D43A1A 63%,#F5A623 74%,#E8622A 84%,#8B1A00 100%)",
                  backgroundSize: "500% 500%",
                }}
              >
                kiko.ai
              </span>
              .
            </h1>

            <p className="mt-7 max-w-[480px] text-[16px] leading-[1.6] text-white/65 lg:text-[17px]">
              Drop a Pinterest, Instagram, or product link into Telegram or
              iMessage. kiko finds it cheaper — usually in under 30 seconds.
            </p>

            <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
              <button
                type="button"
                onClick={() => openModal("sms")}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13.5px] font-semibold text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                <MessagesSquare className="size-3.5" />
                iMessage
              </button>
              <button
                type="button"
                onClick={() => openModal("telegram")}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13.5px] font-semibold text-black transition-transform hover:-translate-y-[1px]"
              >
                <Send className="size-3.5" />
                Telegram
              </button>
            </div>
          </div>

          {/* Right — Telegram mockup */}
          <div className="flex justify-center lg:justify-end">
            <TelegramMockup />
          </div>
        </div>
      </div>

      {modal.open && (
        <ConnectModal initialTab={modal.tab} onClose={closeModal} />
      )}
    </section>
  );
}
