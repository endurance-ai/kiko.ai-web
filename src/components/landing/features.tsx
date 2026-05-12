import {Camera, Link2, MessageSquareText, ShoppingBag, Sparkles, TrendingDown,} from "lucide-react";
import type {ComponentType, SVGProps} from "react";

type Feature = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
  wash: string;
  accent: string;
};

const FEATURES: Feature[] = [
  {
    icon: TrendingDown,
    title: "Cheaper than the source.",
    body: "Send a link from any site. kiko hunts the same item across the web and pings you the moment it costs less.",
    wash: "from-[#F5A623]/[0.07] via-[#F5A623]/[0.02]",
    accent: "text-[#F5A623]",
  },
  {
    icon: MessageSquareText,
    title: "Just text. No app.",
    body: "kiko lives in Telegram (iMessage soon). No install, no learning curve — it's a conversation, not a dashboard.",
    wash: "from-white/[0.05] via-white/[0.02]",
    accent: "text-white/80",
  },
  {
    icon: Link2,
    title: "Drop any link.",
    body: "Pinterest, Instagram, TikTok, blogs, even screenshots. If it's a product, kiko will find it for you.",
    wash: "from-[#E8622A]/[0.07] via-[#E8622A]/[0.02]",
    accent: "text-[#E8622A]",
  },
  {
    icon: Sparkles,
    title: "Knows your fit.",
    body: "Tell kiko once — your sizes, your brands, the styles you live in. Every reply gets sharper.",
    wash: "from-[#D43A1A]/[0.08] via-[#D43A1A]/[0.02]",
    accent: "text-[#E8622A]",
  },
  {
    icon: Camera,
    title: "Photo → product.",
    body: "Take a picture. Drop it in. kiko reverse-searches the exact item, not just “similar vibes.”",
    wash: "from-[#8B1A00]/[0.08] via-[#8B1A00]/[0.02]",
    accent: "text-[#F5A623]",
  },
  {
    icon: ShoppingBag,
    title: "Checkout in chat.",
    body: "One tap to the right seller. Skip the tab-juggling and price-comparison rabbit holes.",
    wash: "from-[#F5A623]/[0.07] via-[#F5A623]/[0.02]",
    accent: "text-[#F5A623]",
  },
];

export function Features() {
  return (
    <section className="relative z-10 px-6 pb-28 pt-12 lg:px-10 lg:pb-32 lg:pt-20">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-2xl lg:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
            <span className="size-1.5 rounded-full bg-[#F5A623]" />
            What kiko does
          </span>
          <h2 className="mt-5 text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white">
            One thread. Every shopping habit handled.
          </h2>
          <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-white/55 lg:text-[16px]">
            Most shopping apps want your attention. kiko wants your link. Send,
            wait 30 seconds, get the right answer.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <article
      className={`group relative overflow-hidden rounded-[20px] border border-white/8 bg-gradient-to-br ${feature.wash} to-transparent p-6 transition-colors hover:border-white/15`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04),transparent_70%)] blur-xl"
      />

      <div
        className={`inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${feature.accent}`}
      >
        <Icon className="size-[18px]" strokeWidth={1.6} />
      </div>

      <h3 className="mt-5 text-[17px] font-bold leading-snug tracking-[-0.02em] text-white">
        {feature.title}
      </h3>
      <p className="mt-2 text-[13.5px] leading-[1.55] text-white/55">
        {feature.body}
      </p>
    </article>
  );
}
