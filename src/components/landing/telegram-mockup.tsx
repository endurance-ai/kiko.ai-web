"use client";

import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {Check, ChevronLeft, MoreVertical, Send,} from "lucide-react";

const USER_URL = "https://pin.it/2OsJs9zM6";

type ProductCard = {
  name: string;
  brand: string;
  price: string;
  store: string;
  image: string;
  highlight: "cheaper" | "more";
};

const CARD_FIRST: ProductCard = {
  name: "RELAXED LINEN SHIRT",
  brand: "COS",
  price: "$149",
  store: "cos.com",
  image: "/products/shirt-cos.avif",
  highlight: "cheaper",
};

const CARD_SECOND: ProductCard = {
  name: "LINEN SHIRT — RELAXED FIT",
  brand: "Zara",
  price: "$59",
  store: "zara.com",
  image: "/products/shirt-zara.jpg",
  highlight: "more",
};

const CARD_BUTTONS = [
  { emoji: "♥", label: "More", match: "more" },
  { emoji: "✕", label: "Other", match: null },
  { emoji: "💰", label: "Cheaper", match: "cheaper" },
  { emoji: "👀", label: "Details", match: null },
] as const;

const TYPING_DELAYS = [0, 0.15, 0.3] as const;

type Bubble =
  | { kind: "user-url"; key: string }
  | { kind: "user-chip"; key: string; emoji: string; label: string }
  | { kind: "kiko-text"; key: string; body: React.ReactNode }
  | { kind: "kiko-card"; key: string; product: ProductCard };

export function TelegramMockup() {
  const [typingUrl, setTypingUrl] = useState<string | null>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [kikoTyping, setKikoTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight;
    // Only auto-scroll if user is near the bottom (within 80px).
    // Respects manual scroll-up to read earlier messages.
    if (distanceFromBottom > 80) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [bubbles, kikoTyping]);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => {
        const t = setTimeout(() => res(), ms);
        timers.push(t);
      });
    const push = (b: Bubble) =>
      setBubbles((prev) => [...prev, b]);

    (async () => {
      await wait(700);
      if (cancelled) return;

      // 1. User typing URL
      for (let i = 1; i <= USER_URL.length; i++) {
        if (cancelled) return;
        setTypingUrl(USER_URL.slice(0, i));
        await wait(40);
      }

      // 2. User sends URL
      await wait(320);
      if (cancelled) return;
      setTypingUrl(null);
      push({ kind: "user-url", key: "u-url" });

      // 3. Kiko detects 3 items
      await wait(450);
      if (cancelled) return;
      setKikoTyping(true);
      await wait(800);
      if (cancelled) return;
      setKikoTyping(false);
      push({
        kind: "kiko-text",
        key: "k1",
        body: (
          <>
            I see <b>3 items</b> in this photo 👀
            <br />
            <br />
            1️⃣ Relaxed Linen Shirt
            <br />
            2️⃣ Wide-Leg Cotton Pants
            <br />
            3️⃣ Penny Loafers
            <br />
            <br />
            Which one are you after?
          </>
        ),
      });

      // 4. User picks "1"
      await wait(1100);
      if (cancelled) return;
      push({
        kind: "user-chip",
        key: "u-1",
        emoji: "1️⃣",
        label: "Relaxed Linen Shirt",
      });

      // 5. Kiko great pick + first card
      await wait(380);
      if (cancelled) return;
      setKikoTyping(true);
      await wait(700);
      if (cancelled) return;
      setKikoTyping(false);
      if (cancelled) return;
      push({
        kind: "kiko-text",
        key: "k2",
        body: <>Great pick! Here&apos;s a match 👇</>,
      });
      await wait(280);
      if (cancelled) return;
      push({ kind: "kiko-card", key: "k-card-1", product: CARD_FIRST });

      // 6. User clicks Cheaper
      await wait(2800);
      if (cancelled) return;
      push({
        kind: "user-chip",
        key: "u-cheaper",
        emoji: "💰",
        label: "Cheaper",
      });

      // 7. Kiko cheaper + second card
      await wait(380);
      if (cancelled) return;
      setKikoTyping(true);
      await wait(750);
      if (cancelled) return;
      setKikoTyping(false);
      if (cancelled) return;
      push({
        kind: "kiko-text",
        key: "k3",
        body: <>Found one for less 👇</>,
      });
      await wait(260);
      if (cancelled) return;
      push({ kind: "kiko-card", key: "k-card-2", product: CARD_SECOND });

      // 8. User likes
      await wait(2800);
      if (cancelled) return;
      push({
        kind: "user-chip",
        key: "u-like",
        emoji: "♥",
        label: "Like",
      });

      // 9. Kiko closing
      await wait(380);
      if (cancelled) return;
      setKikoTyping(true);
      await wait(700);
      if (cancelled) return;
      setKikoTyping(false);
      if (cancelled) return;
      push({
        kind: "kiko-text",
        key: "k4",
        body: <>Saved! Learning your taste 🧶</>,
      });
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* Soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[48px] bg-[radial-gradient(circle_at_50%_40%,rgba(245,166,35,0.18),transparent_60%)] blur-2xl"
      />

      {/* Phone frame */}
      <div className="overflow-hidden rounded-[36px] border border-white/10 bg-[#0e0e10] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)_inset]">
        {/* Top bar */}
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
          ref={scrollRef}
          className="relative h-[540px] overflow-y-auto overscroll-contain px-3 py-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
          style={{
            backgroundColor: "#11212f",
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(180deg,#0e1621 0%,#11212f 100%)",
            backgroundSize: "14px 14px, 100% 100%",
            backgroundAttachment: "local, local",
          }}
        >
          <div className="flex min-h-full flex-col justify-end gap-2">
            {bubbles.map((b) => {
              if (b.kind === "user-url") {
                return <UserUrlBubble key={b.key} />;
              }
              if (b.kind === "user-chip") {
                return (
                  <UserChip key={b.key} emoji={b.emoji} label={b.label} />
                );
              }
              if (b.kind === "kiko-text") {
                return <KikoBubble key={b.key}>{b.body}</KikoBubble>;
              }
              return <KikoCard key={b.key} product={b.product} />;
            })}
            {kikoTyping && <KikoTyping />}
          </div>
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 border-t border-white/5 bg-[#17212b] px-3 py-2.5">
          <div className="flex-1 rounded-full bg-[#242f3d] px-4 py-2 text-[13px] text-white/80">
            {typingUrl ? (
              <>
                <span className="text-white">{typingUrl}</span>
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
        @keyframes btnPulse {
          0%   { background-color: rgba(36,47,61,1); box-shadow: 0 0 0 0 rgba(245,166,35,0.0); }
          30%  { background-color: rgba(245,166,35,0.18); box-shadow: 0 0 0 4px rgba(245,166,35,0.18); }
          100% { background-color: rgba(36,47,61,1); box-shadow: 0 0 0 0 rgba(245,166,35,0.0); }
        }
      `}</style>
    </div>
  );
}

function UserUrlBubble() {
  return (
    <div
      className="ml-auto max-w-[78%] rounded-[14px] rounded-br-sm bg-[#2b5278] px-3 py-2 text-[13.5px] text-white shadow-sm"
      style={{ animation: "bubbleIn .25s ease both" }}
    >
      <span className="break-all">{USER_URL}</span>
      <span className="ml-1.5 inline-flex items-center text-[10px] text-white/60">
        12:34
        <Check className="ml-0.5 size-3" />
      </span>
    </div>
  );
}

function UserChip({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div
      className="ml-auto inline-flex max-w-[78%] items-center gap-1.5 whitespace-nowrap rounded-[14px] rounded-br-sm bg-[#2b5278] px-3 py-1.5 text-[13px] font-medium text-white shadow-sm"
      style={{ animation: "bubbleIn .25s ease both" }}
    >
      <span aria-hidden>{emoji}</span>
      <span>{label}</span>
      <span className="ml-1 inline-flex items-center text-[10px] text-white/60">
        12:34
        <Check className="ml-0.5 size-3" />
      </span>
    </div>
  );
}

function KikoBubble({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="max-w-[88%] rounded-[14px] rounded-bl-sm bg-[#182533] px-3.5 py-2.5 text-[13.5px] leading-[1.45] text-white shadow-sm"
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
      {TYPING_DELAYS.map((d) => (
        <span
          key={d}
          className="block size-1.5 rounded-full bg-white/60"
          style={{ animation: `typingDot 1.1s ${d}s infinite ease-in-out` }}
        />
      ))}
    </div>
  );
}

function KikoCard({ product }: { product: ProductCard }) {
  return (
    <div
      className="w-[92%] overflow-hidden rounded-[14px] rounded-bl-sm bg-[#182533] shadow-sm"
      style={{ animation: "bubbleIn .25s ease both", pointerEvents: "none" }}
    >
      {/* Product image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0a1420]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 380px) 100vw, 380px"
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="space-y-0.5 px-3.5 pt-3">
        <div className="text-[14px] font-bold tracking-[-0.01em] text-white">
          {product.name}
        </div>
        <div className="text-[12px] text-white/55">{product.brand}</div>
        <div className="mt-1.5 flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#F5A623]">
            <span aria-hidden>💰</span>
            <span>{product.price}</span>
          </div>
          <div className="inline-flex items-center gap-1 text-[11.5px] text-white/55">
            <span aria-hidden>🏬</span>
            <span>{product.store}</span>
          </div>
        </div>
        <div className="pt-0.5 text-[10px] text-white/35">12:34</div>
      </div>

      {/* Inline keyboard */}
      <div className="grid grid-cols-2 gap-1 px-1.5 pb-1.5">
        {CARD_BUTTONS.map((b) => {
          const accent = b.match === product.highlight;
          return (
            <div
              key={b.label}
              className="flex items-center justify-center gap-1 rounded-md bg-[#242f3d] py-2 text-[12px] font-medium text-white/90"
              style={
                accent
                  ? { animation: "btnPulse 1.2s ease 0.8s 1 both" }
                  : undefined
              }
            >
              <span aria-hidden>{b.emoji}</span>
              <span>{b.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
