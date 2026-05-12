import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "kiko.ai — Stop browsing. Ask kiko.ai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const KIKO_GRADIENT =
  "linear-gradient(105deg,#8B1A00 0%,#D43A1A 25%,#E8622A 50%,#D43A1A 75%,#8B1A00 100%)";

async function loadFont(file: string) {
  return readFile(join(process.cwd(), "public/fonts", file));
}

export default async function OG() {
  const [regular, semibold, black] = await Promise.all([
    loadFont("inter-tight-400.woff"),
    loadFont("inter-tight-600.woff"),
    loadFont("inter-tight-900.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 84px",
          background: "#000",
          color: "#fff",
          fontFamily: "Inter Tight",
        }}
      >
        {/* Subtle starfield — static SVG dots */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            inset: 0,
            opacity: 0.5,
          }}
        >
          <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 90 }).map((_, i) => {
              const x = (i * 137.5) % 1200;
              const y = (i * 89.3) % 630;
              const r = i % 11 === 0 ? 1.6 : i % 5 === 0 ? 1.1 : 0.6;
              const a = i % 11 === 0 ? 0.9 : i % 5 === 0 ? 0.6 : 0.3;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={r}
                  fill={`rgba(255,255,255,${a})`}
                />
              );
            })}
          </svg>
        </div>

        {/* Pill — NO APP. JUST TEXT. */}
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            alignItems: "center",
            gap: 12,
            padding: "8px 18px",
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: "#F5A623",
            }}
          />
          NO APP. JUST TEXT.
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 156,
            lineHeight: 0.98,
            letterSpacing: -7,
            fontWeight: 900,
          }}
        >
          <span style={{ display: "flex" }}>Stop browsing.</span>
          <span style={{ display: "flex" }}>
            Ask&nbsp;
            <span
              style={{
                display: "flex",
                backgroundImage: KIKO_GRADIENT,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              kiko.ai
            </span>
            <span>.</span>
          </span>
        </div>

        {/* Description + handle */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 760,
              fontWeight: 400,
            }}
          >
            Drop a Pinterest or product link into Telegram. kiko finds it
            cheaper — usually in under 30 seconds.
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
              fontSize: 20,
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.4)" }}>kikoai.me</span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
              @kiko_fashion_ai_bot
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: regular, weight: 400, style: "normal" },
        { name: "Inter Tight", data: semibold, weight: 600, style: "normal" },
        { name: "Inter Tight", data: black, weight: 900, style: "normal" },
      ],
    },
  );
}
