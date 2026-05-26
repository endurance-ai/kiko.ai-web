import {ImageResponse} from "next/og";
import {readFile} from "node:fs/promises";
import {join} from "node:path";

export const alt = "kiko.ai — Stop browsing. Ask kiko.";
export const size = {width: 1200, height: 630};
export const contentType = "image/png";

async function loadFont(file: string) {
  return readFile(join(process.cwd(), "public/fonts", file));
}

async function loadImageDataUrl(file: string, mime: string) {
  const buf = await readFile(join(process.cwd(), "public", file));
  return `data:${mime};base64,${buf.toString("base64")}`;
}

export default async function OG() {
  const [regular, semibold, black, cat] = await Promise.all([
    loadFont("inter-tight-400.woff"),
    loadFont("inter-tight-600.woff"),
    loadFont("inter-tight-900.woff"),
    loadImageDataUrl("kiko-cat.png", "image/png"),
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
          padding: "72px 80px",
          background: "#F0F0F2",
          color: "#0D0D0D",
          fontFamily: "Inter Tight",
          position: "relative",
        }}
      >
        {/* Cat — top right, sized so it sits beside the headline without overlap */}
        <img
          src={cat}
          alt=""
          width={300}
          height={300}
          style={{
            position: "absolute",
            top: 56,
            right: 64,
            width: 300,
            height: 300,
            objectFit: "contain",
            objectPosition: "top right",
          }}
        />

        {/* Headline — stacked */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 132,
            lineHeight: 0.94,
            letterSpacing: -6,
            fontWeight: 900,
          }}
        >
          <span style={{display: "flex"}}>Stop browsing.</span>
          <span style={{display: "flex", color: "rgba(13,13,13,0.3)"}}>
            Ask kiko.
          </span>
        </div>

        {/* Bottom row — description + CTA */}
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
              flexDirection: "column",
              gap: 14,
              maxWidth: 720,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 30,
                lineHeight: 1.35,
                color: "rgba(13,13,13,0.65)",
                fontWeight: 400,
              }}
            >
              Drop any link. Kiko finds a piece with the same vibe — for less.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                fontWeight: 600,
                color: "rgba(13,13,13,0.4)",
              }}
            >
              kikoai.me
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
              padding: "20px 36px",
              borderRadius: 9999,
              background: "#0D0D0D",
              color: "#FFFFFF",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: -0.5,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{display: "flex"}}>Join the waitlist&nbsp;&nbsp;→</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {name: "Inter Tight", data: regular, weight: 400, style: "normal"},
        {name: "Inter Tight", data: semibold, weight: 600, style: "normal"},
        {name: "Inter Tight", data: black, weight: 900, style: "normal"},
      ],
    }
  );
}
