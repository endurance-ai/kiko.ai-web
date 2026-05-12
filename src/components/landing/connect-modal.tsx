"use client";

import Image from "next/image";
import {MessageSquare, Send, Sparkles,} from "lucide-react";
import {Dialog, DialogContent, DialogTitle,} from "@/components/ui/dialog";

export type ConnectTab = "telegram" | "sms";

export function ConnectModal({
  open,
  onOpenChange,
  tab,
  onTabChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tab: ConnectTab;
  onTabChange: (tab: ConnectTab) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="relative w-full max-w-[440px] overflow-hidden rounded-3xl border border-white/10 bg-[#0e0e10] p-0 text-white ring-0 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] sm:max-w-[440px]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[radial-gradient(circle,rgba(245,166,35,0.18),transparent_70%)] blur-2xl"
        />

        <div className="relative px-7 pb-8 pt-7">
          {/* Tabs */}
          <div className="mx-auto inline-flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 text-[12.5px] font-semibold">
            <TabButton
              active={tab === "sms"}
              onClick={() => onTabChange("sms")}
              icon={<MessageSquare className="size-3.5" />}
            >
              iMessage
            </TabButton>
            <TabButton
              active={tab === "telegram"}
              onClick={() => onTabChange("telegram")}
              icon={<Send className="size-3.5" />}
            >
              Telegram
            </TabButton>
          </div>

          {tab === "telegram" ? <TelegramPanel /> : <SmsPanel />}
        </div>
      </DialogContent>
    </Dialog>
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
      <DialogTitle
        className="text-center text-[22px] font-extrabold tracking-[-0.02em] text-white"
      >
        Scan with Telegram
      </DialogTitle>
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

      <DialogTitle
        className="mt-4 text-center text-[22px] font-extrabold tracking-[-0.02em] text-white"
      >
        iMessage support is on the way.
      </DialogTitle>
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
