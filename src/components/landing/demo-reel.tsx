"use client";

import Image from "next/image";

// 32s punchy reel (9:16). 9 scenes, snap-cut pacing (~2-5s each).
// 0.0-3.5s  S1  Pinterest scroll → zoom on a pin (the desire moment)
// 3.5-5s    S2  "what IS this??" punch
// 5-10s     S3  Chat: send to kiko → identify "Bottega Veneta Jodie · $3,500"
// 10-11s    S4  "$3,500??" red punch
// 11-20s    S5  "lemme find dupes 🐾" + 3 alternatives cascade
// 20-25s    S6  User: "bigger one?" → kiko adapts instantly
// 25-27s    S7  User picks → "ordered ✨"
// 27-30s    S8  Price contrast: $3,500 → $98 — saved $3,402
// 30-32s    S9  kiko_ wordmark + CTA
const TOTAL_S = 32;

const sceneAbs: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "6% 7%",
};

// Pinterest grid: faux bag/outfit pins
const PINS = [
  {color: "#5B4533", aspect: 1.2, tag: "saved · bag"},
  {color: "#D9C9B2", aspect: 1.4, tag: "saved · outfit"},
  {color: "#C9D8E2", aspect: 1.1, tag: "saved · shoes"},
  {color: "#1F2A3D", aspect: 1.35, tag: "saved · coat"},
  {color: "#E5D4BC", aspect: 1.0, tag: "saved · bag"},
  {color: "#A89880", aspect: 1.5, tag: "saved · dress"},
  {color: "#3D506E", aspect: 1.2, tag: "saved · denim"},
  {color: "#C2B19A", aspect: 1.3, tag: "saved · bag"},
  {color: "#465A7C", aspect: 1.1, tag: "saved · jacket"},
  {color: "#B5A48C", aspect: 1.4, tag: "saved · skirt"},
];

const DUPES = [
  {brand: "Mansur Gavriel", item: "Bucket Hobo", price: "$495", color: "#C9B8A0"},
  {brand: "Cuyana", item: "Mini Tote", price: "$268", color: "#D6C9B5"},
  {brand: "Anthropologie", item: "Slouch Bag", price: "$98", color: "#A89880"},
];

export function DemoReel() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#0D0D0D",
        color: "#F0F0F2",
        fontFamily:
          '"Helvetica Neue", Helvetica, "Pretendard Variable", Pretendard, ui-sans-serif, system-ui, -apple-system, sans-serif',
        letterSpacing: "-0.005em",
      }}
    >
      {/* ───────────────────── S1 — Pinterest scroll → pin zoom ───────────────────── */}
      <div className="reel-scene reel-s1" style={{...sceneAbs, padding: 0}}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            background: "#0D0D0D",
          }}
        >
          {/* Two-column pin grid */}
          <div
            className="reel-pin-track"
            style={{
              position: "absolute",
              top: "8%",
              left: "5%",
              right: "5%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
            }}
          >
            {[...PINS, ...PINS, ...PINS].map((p, i) => (
              <div
                key={i}
                style={{
                  background: p.color,
                  borderRadius: "10px",
                  aspectRatio: String(1 / p.aspect),
                  boxShadow: "inset 0 -16px 22px rgba(0,0,0,0.18)",
                }}
              />
            ))}
          </div>
          {/* Highlight pin that we'll zoom into */}
          <div className="reel-pin-spot">
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#5B4533",
                borderRadius: "14px",
                boxShadow:
                  "0 0 0 4px rgba(168,224,176,0.0), inset 0 -28px 38px rgba(0,0,0,0.25)",
                position: "relative",
              }}
            >
              <div
                className="reel-pin-spot-ring"
                style={{
                  position: "absolute",
                  inset: "-6px",
                  borderRadius: "18px",
                  border: "3px solid #A8E0B0",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
          {/* Status bar mock */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "16px",
              right: "16px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "rgba(240,240,242,0.85)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <span>pinterest</span>
            <span>{`>>`}</span>
          </div>
        </div>
      </div>

      {/* ───────────────────── S2 — "what IS this??" punch ───────────────────── */}
      <div className="reel-scene reel-s2" style={sceneAbs}>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            lineHeight: 0.92,
            letterSpacing: "-0.045em",
            fontWeight: 900,
          }}
        >
          <div
            className="reel-s2-l1"
            style={{
              fontSize: "clamp(2.8rem, 13vw, 5rem)",
              color: "rgba(240,240,242,0.45)",
            }}
          >
            what
          </div>
          <div
            className="reel-s2-l2"
            style={{
              fontSize: "clamp(3.6rem, 17vw, 6.5rem)",
              color: "#F0F0F2",
              marginTop: "4px",
            }}
          >
            IS this??
          </div>
        </div>
      </div>

      {/* ───────────────────── S3 — Chat: send → kiko identifies ───────────────────── */}
      <div
        className="reel-scene reel-s3"
        style={{...sceneAbs, background: "#F0F0F2", color: "#0D0D0D"}}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            justifyContent: "flex-end",
            height: "100%",
          }}
        >
          {/* User msg — pinned image */}
          <div className="reel-msg reel-s3-m1" style={{display: "flex", justifyContent: "flex-end"}}>
            <div
              style={{
                background: "#007AFF",
                color: "#FFFFFF",
                borderRadius: "20px 20px 6px 20px",
                overflow: "hidden",
                width: "55%",
                boxShadow: "0 4px 14px rgba(0,122,255,0.22)",
              }}
            >
              <div
                style={{
                  height: "120px",
                  background: "#5B4533",
                  boxShadow: "inset 0 -24px 32px rgba(0,0,0,0.25)",
                }}
              />
              <div style={{padding: "8px 12px"}}>
                <div style={{fontSize: "0.74rem", fontWeight: 600}}>saved · bag</div>
                <div style={{fontSize: "0.62rem", opacity: 0.75, marginTop: "1px"}}>
                  pinterest.com
                </div>
              </div>
            </div>
          </div>
          {/* User text */}
          <div className="reel-msg reel-s3-m2" style={{display: "flex", justifyContent: "flex-end"}}>
            <div
              style={{
                background: "#007AFF",
                color: "#FFFFFF",
                padding: "9px 14px",
                borderRadius: "20px 20px 6px 20px",
                fontSize: "0.92rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              this 😭😭😭
            </div>
          </div>
          {/* Kiko ID */}
          <KikoBubble cls="reel-msg reel-s3-m3">
            that&apos;s the bottega veneta jodie 👀
          </KikoBubble>
          <KikoBubble cls="reel-msg reel-s3-m4" bold>
            $3,500 btw
          </KikoBubble>
        </div>
      </div>

      {/* ───────────────────── S4 — "$3,500??" red punch ───────────────────── */}
      <div
        className="reel-scene reel-s4"
        style={{...sceneAbs, background: "#0D0D0D"}}
      >
        <div
          className="reel-s4-amount"
          style={{
            fontSize: "clamp(4rem, 18vw, 7rem)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            color: "#FF4D4D",
            lineHeight: 0.9,
            fontVariantNumeric: "tabular-nums",
            textAlign: "center",
          }}
        >
          $3,500??
        </div>
      </div>

      {/* ───────────────────── S5 — "lemme find dupes" + 3 cards ───────────────────── */}
      <div
        className="reel-scene reel-s5"
        style={{...sceneAbs, background: "#F0F0F2", color: "#0D0D0D"}}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            justifyContent: "flex-start",
            height: "100%",
            paddingTop: "5%",
          }}
        >
          <KikoBubble cls="reel-msg reel-s5-m1">
            lemme cook 🐾
          </KikoBubble>
          <div
            className="reel-s5-grid"
            style={{
              marginTop: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {DUPES.map((d, i) => (
              <div
                key={d.brand}
                className={`reel-card reel-s5-card-${i + 1}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "10px 12px",
                  boxShadow: "0 2px 10px rgba(13,13,13,0.06)",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: d.color,
                    flexShrink: 0,
                    boxShadow: "inset 0 -8px 12px rgba(0,0,0,0.12)",
                  }}
                />
                <div style={{flex: 1, minWidth: 0}}>
                  <div
                    style={{
                      fontSize: "0.92rem",
                      fontWeight: 800,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.1,
                    }}
                  >
                    {d.brand}
                  </div>
                  <div
                    style={{
                      fontSize: "0.74rem",
                      color: "rgba(13,13,13,0.55)",
                      marginTop: "2px",
                    }}
                  >
                    {d.item}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "#0D0D0D",
                  }}
                >
                  {d.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ───────────────────── S6 — Refinement: "bigger?" → adapts ───────────────────── */}
      <div
        className="reel-scene reel-s6"
        style={{...sceneAbs, background: "#F0F0F2", color: "#0D0D0D"}}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            justifyContent: "flex-end",
            height: "100%",
          }}
        >
          <div className="reel-msg reel-s6-m1" style={{display: "flex", justifyContent: "flex-end"}}>
            <div
              style={{
                background: "#007AFF",
                color: "#FFFFFF",
                padding: "9px 14px",
                borderRadius: "20px 20px 6px 20px",
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
            >
              the cuyana but bigger?
            </div>
          </div>
          <KikoBubble cls="reel-msg reel-s6-m2">
            otp 🐾
          </KikoBubble>
          <div
            className={`reel-card reel-s6-card`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "10px 12px",
              boxShadow: "0 2px 10px rgba(13,13,13,0.06)",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "#A89880",
                flexShrink: 0,
                boxShadow: "inset 0 -8px 12px rgba(0,0,0,0.12)",
              }}
            />
            <div style={{flex: 1, minWidth: 0}}>
              <div
                style={{
                  fontSize: "0.92rem",
                  fontWeight: 800,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.1,
                }}
              >
                Cuyana
              </div>
              <div
                style={{
                  fontSize: "0.74rem",
                  color: "rgba(13,13,13,0.55)",
                  marginTop: "2px",
                }}
              >
                Classic Tote · 14&quot;
              </div>
            </div>
            <div
              style={{
                fontSize: "1.05rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              $98
            </div>
          </div>
          <KikoBubble cls="reel-msg reel-s6-m3">
            same vibe, fits a laptop 👜
          </KikoBubble>
        </div>
      </div>

      {/* ───────────────────── S7 — Pick + order ───────────────────── */}
      <div
        className="reel-scene reel-s7"
        style={{...sceneAbs, background: "#F0F0F2", color: "#0D0D0D"}}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div className="reel-msg reel-s7-m1" style={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
            <div
              style={{
                background: "#007AFF",
                color: "#FFFFFF",
                padding: "10px 16px",
                borderRadius: "22px 22px 8px 22px",
                fontSize: "1.05rem",
                fontWeight: 700,
              }}
            >
              that one ✨
            </div>
          </div>
          <div
            className="reel-s7-check"
            style={{
              marginTop: "10px",
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2EBD52, #1B8A3A)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 22px rgba(27,138,58,0.28)",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                stroke="#FFF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className="reel-s7-label"
            style={{
              fontSize: "1.15rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginTop: "6px",
            }}
          >
            ordered
          </div>
        </div>
      </div>

      {/* ───────────────────── S8 — Price contrast $3500 → $98 ───────────────────── */}
      <div
        className="reel-scene reel-s8"
        style={{...sceneAbs, background: "#0D0D0D", padding: "10% 8%"}}
      >
        <div
          style={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <div
            className="reel-s8-from"
            style={{
              fontSize: "clamp(2.6rem, 13vw, 4.6rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "rgba(240,240,242,0.35)",
              textDecoration: "line-through",
              textDecorationThickness: "4px",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            $3,500
          </div>
          <div
            className="reel-s8-arrow"
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              color: "rgba(240,240,242,0.45)",
              lineHeight: 1,
            }}
          >
            ↓
          </div>
          <div
            className="reel-s8-to"
            style={{
              fontSize: "clamp(4.5rem, 22vw, 8rem)",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              color: "#A8E0B0",
              lineHeight: 0.9,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            $98
          </div>
          <div
            className="reel-s8-saved"
            style={{
              marginTop: "16px",
              fontSize: "clamp(1rem, 4.5vw, 1.4rem)",
              fontWeight: 700,
              color: "#F0F0F2",
              letterSpacing: "-0.01em",
            }}
          >
            saved <span style={{color: "#A8E0B0"}}>$3,402</span>
          </div>
        </div>
      </div>

      {/* ───────────────────── S9 — Wordmark outro ───────────────────── */}
      <div className="reel-scene reel-s9" style={sceneAbs}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            className="reel-s9-cat"
            style={{
              width: "84px",
              height: "84px",
              borderRadius: "50%",
              background: "#A8E0B0",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/kiko-cat.png"
              alt="Kiko"
              width={68}
              height={68}
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </div>
          <div
            className="reel-s9-mark"
            style={{
              fontFamily:
                '"Courier New", ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: "clamp(3rem, 14vw, 4.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#F0F0F2",
              lineHeight: 1,
            }}
          >
            kiko_
          </div>
          <div
            className="reel-s9-tag"
            style={{
              fontSize: "0.98rem",
              color: "rgba(240,240,242,0.65)",
              fontWeight: 500,
              textAlign: "center",
              maxWidth: "260px",
              lineHeight: 1.3,
            }}
          >
            your fashion-hunting cat
          </div>
          <div
            className="reel-s9-cta"
            style={{
              marginTop: "8px",
              background: "#A8E0B0",
              color: "#0D0D0D",
              padding: "10px 20px",
              borderRadius: "999px",
              fontSize: "0.95rem",
              fontWeight: 800,
              letterSpacing: "-0.005em",
            }}
          >
            kikoai.me
          </div>
        </div>
      </div>

      <style>{`
        .reel-scene {
          opacity: 0;
          animation-duration: ${TOTAL_S}s;
          animation-iteration-count: infinite;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.2, 0.9, 0.25, 1);
          will-change: opacity, transform;
        }

        /* Scene windows over ${TOTAL_S}s:
           S1 0-3.5s   (0-11%)
           S2 3.5-5s   (11-15.6%)
           S3 5-10s    (15.6-31.25%)
           S4 10-11s   (31.25-34.4%)
           S5 11-20s   (34.4-62.5%)
           S6 20-25s   (62.5-78.1%)
           S7 25-27s   (78.1-84.4%)
           S8 27-30s   (84.4-93.75%)
           S9 30-32s   (93.75-100%) */

        .reel-s1 { animation-name: reelS1; }
        .reel-s2 { animation-name: reelS2; }
        .reel-s3 { animation-name: reelS3; }
        .reel-s4 { animation-name: reelS4; }
        .reel-s5 { animation-name: reelS5; }
        .reel-s6 { animation-name: reelS6; }
        .reel-s7 { animation-name: reelS7; }
        .reel-s8 { animation-name: reelS8; }
        .reel-s9 { animation-name: reelS9; }

        @keyframes reelS1 {
          0%   { opacity: 1; }
          10%  { opacity: 1; }
          11%  { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes reelS2 {
          0%, 10%   { opacity: 0; }
          11%       { opacity: 1; }
          15%       { opacity: 1; }
          16%       { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS3 {
          0%, 15%   { opacity: 0; }
          16%       { opacity: 1; }
          30%       { opacity: 1; }
          31%       { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS4 {
          0%, 30%   { opacity: 0; }
          31.2%     { opacity: 1; }
          33.5%     { opacity: 1; }
          34.4%     { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS5 {
          0%, 33.5% { opacity: 0; }
          34.5%     { opacity: 1; }
          61.5%     { opacity: 1; }
          62.5%     { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS6 {
          0%, 61.5% { opacity: 0; }
          62.5%     { opacity: 1; }
          77%       { opacity: 1; }
          78%       { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS7 {
          0%, 77%   { opacity: 0; }
          78.1%     { opacity: 1; }
          83.5%     { opacity: 1; }
          84.4%     { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS8 {
          0%, 83.5% { opacity: 0; }
          84.5%     { opacity: 1; }
          93%       { opacity: 1; }
          93.7%     { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS9 {
          0%, 93%   { opacity: 0; }
          94%       { opacity: 1; }
          100%      { opacity: 1; }
        }

        /* ─── S1 internals: pin grid scrolls fast, then highlight zooms in ─── */
        .reel-pin-track {
          animation: reelPinScroll ${TOTAL_S}s steps(1, end) infinite, reelPinScrollMove 2s linear infinite;
        }
        @keyframes reelPinScrollMove {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-30%); }
        }
        @keyframes reelPinScroll {
          0%, 6%   { opacity: 1; }
          6.5%     { opacity: 0.25; }
          11%      { opacity: 0.25; }
        }
        .reel-pin-spot {
          position: absolute;
          opacity: 0;
          animation: reelPinSpot ${TOTAL_S}s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-fill-mode: both;
        }
        @keyframes reelPinSpot {
          0%, 6%   { opacity: 0; top: 42%; left: 28%; width: 44%; height: 38%; }
          7%       { opacity: 1; top: 42%; left: 28%; width: 44%; height: 38%; }
          10%      { opacity: 1; top: 26%; left: 12%; width: 76%; height: 56%; }
          11%      { opacity: 0; top: 26%; left: 12%; width: 76%; height: 56%; }
          100%     { opacity: 0; }
        }
        .reel-pin-spot-ring {
          animation: reelRingPulse 0.9s ease-in-out infinite;
        }
        @keyframes reelRingPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(168,224,176,0.5); }
          50%      { box-shadow: 0 0 0 8px rgba(168,224,176,0); }
        }

        /* ─── S2 punch lines stagger ─── */
        .reel-s2-l1, .reel-s2-l2 {
          opacity: 0;
          animation-duration: ${TOTAL_S}s;
          animation-iteration-count: infinite;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.2, 0.9, 0.25, 1);
        }
        .reel-s2-l1 { animation-name: reelS2L1; }
        .reel-s2-l2 { animation-name: reelS2L2; }
        @keyframes reelS2L1 {
          0%, 11%  { opacity: 0; transform: translateY(10px); }
          12%      { opacity: 1; transform: none; }
          15%      { opacity: 1; transform: none; }
          16%      { opacity: 0; }
          100%     { opacity: 0; }
        }
        @keyframes reelS2L2 {
          0%, 12%  { opacity: 0; transform: scale(0.85); }
          13.5%    { opacity: 1; transform: scale(1.05); }
          14.2%    { opacity: 1; transform: scale(1); }
          15%      { opacity: 1; transform: scale(1); }
          16%      { opacity: 0; }
          100%     { opacity: 0; }
        }

        /* ─── Chat bubble base ─── */
        .reel-msg {
          opacity: 0;
          animation-duration: ${TOTAL_S}s;
          animation-iteration-count: infinite;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.2, 0.9, 0.25, 1);
        }

        /* S3 bubbles: t = 16% start, ends 31%. 15% window = 4.8s. 4 bubbles → 1.2s gaps */
        .reel-s3-m1 { animation-name: reelS3M1; }
        .reel-s3-m2 { animation-name: reelS3M2; }
        .reel-s3-m3 { animation-name: reelS3M3; }
        .reel-s3-m4 { animation-name: reelS3M4; }
        @keyframes reelS3M1 {
          0%, 16%  { opacity: 0; transform: translateY(8px) scale(0.96); }
          17%      { opacity: 1; transform: none; }
          30%      { opacity: 1; }
          31%      { opacity: 0; }
          100%     { opacity: 0; }
        }
        @keyframes reelS3M2 {
          0%, 19%  { opacity: 0; transform: translateY(8px) scale(0.96); }
          20%      { opacity: 1; transform: none; }
          30%      { opacity: 1; }
          31%      { opacity: 0; }
          100%     { opacity: 0; }
        }
        @keyframes reelS3M3 {
          0%, 23%  { opacity: 0; transform: translateY(8px) translateX(-8px); }
          24%      { opacity: 1; transform: none; }
          30%      { opacity: 1; }
          31%      { opacity: 0; }
          100%     { opacity: 0; }
        }
        @keyframes reelS3M4 {
          0%, 27%  { opacity: 0; transform: translateY(8px) translateX(-8px); }
          28%      { opacity: 1; transform: none; }
          30%      { opacity: 1; }
          31%      { opacity: 0; }
          100%     { opacity: 0; }
        }

        /* S4 punch — number snap */
        .reel-s4-amount {
          opacity: 0;
          animation: reelS4Punch ${TOTAL_S}s cubic-bezier(0.2, 0.9, 0.25, 1) infinite;
          animation-fill-mode: both;
        }
        @keyframes reelS4Punch {
          0%, 30%  { opacity: 0; transform: scale(0.6); }
          31.5%    { opacity: 1; transform: scale(1.1); }
          32.5%    { opacity: 1; transform: scale(0.98); }
          33%      { opacity: 1; transform: scale(1); }
          33.5%    { opacity: 1; }
          34.4%    { opacity: 0; }
          100%     { opacity: 0; }
        }

        /* S5 cards cascade — 34.5% start, ends 62%. 4 elements over ~27% window */
        .reel-s5-m1   { animation-name: reelS5M1; }
        .reel-s5-card-1 {
          opacity: 0;
          animation: reelS5C1 ${TOTAL_S}s cubic-bezier(0.2, 0.9, 0.25, 1) infinite;
          animation-fill-mode: both;
        }
        .reel-s5-card-2 {
          opacity: 0;
          animation: reelS5C2 ${TOTAL_S}s cubic-bezier(0.2, 0.9, 0.25, 1) infinite;
          animation-fill-mode: both;
        }
        .reel-s5-card-3 {
          opacity: 0;
          animation: reelS5C3 ${TOTAL_S}s cubic-bezier(0.2, 0.9, 0.25, 1) infinite;
          animation-fill-mode: both;
        }
        @keyframes reelS5M1 {
          0%, 34.5% { opacity: 0; transform: translateY(8px); }
          36%       { opacity: 1; transform: none; }
          61%       { opacity: 1; }
          62%       { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS5C1 {
          0%, 40%   { opacity: 0; transform: translateY(16px) scale(0.97); }
          42%       { opacity: 1; transform: none; }
          61%       { opacity: 1; }
          62%       { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS5C2 {
          0%, 47%   { opacity: 0; transform: translateY(16px) scale(0.97); }
          49%       { opacity: 1; transform: none; }
          61%       { opacity: 1; }
          62%       { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS5C3 {
          0%, 54%   { opacity: 0; transform: translateY(16px) scale(0.97); }
          56%       { opacity: 1; transform: none; }
          61%       { opacity: 1; }
          62%       { opacity: 0; }
          100%      { opacity: 0; }
        }

        /* S6 refinement — 62.5% start, ends 78%. 4 elements over ~15% */
        .reel-s6-m1 { animation-name: reelS6M1; }
        .reel-s6-m2 { animation-name: reelS6M2; }
        .reel-s6-card {
          opacity: 0;
          animation: reelS6Card ${TOTAL_S}s cubic-bezier(0.2, 0.9, 0.25, 1) infinite;
          animation-fill-mode: both;
        }
        .reel-s6-m3 { animation-name: reelS6M3; }
        @keyframes reelS6M1 {
          0%, 63%   { opacity: 0; transform: translateY(8px) scale(0.96); }
          64%       { opacity: 1; transform: none; }
          77%       { opacity: 1; }
          78%       { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS6M2 {
          0%, 66%   { opacity: 0; transform: translateY(8px) translateX(-8px); }
          67%       { opacity: 1; transform: none; }
          77%       { opacity: 1; }
          78%       { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS6Card {
          0%, 69%   { opacity: 0; transform: translateY(16px) scale(0.97); }
          71%       { opacity: 1; transform: none; }
          77%       { opacity: 1; }
          78%       { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS6M3 {
          0%, 73%   { opacity: 0; transform: translateY(8px) translateX(-8px); }
          74%       { opacity: 1; transform: none; }
          77%       { opacity: 1; }
          78%       { opacity: 0; }
          100%      { opacity: 0; }
        }

        /* S7 — pick & order. 78-84% */
        .reel-s7-m1 { animation-name: reelS7M1; }
        .reel-s7-check {
          opacity: 0;
          animation: reelS7Check ${TOTAL_S}s cubic-bezier(0.2, 0.9, 0.25, 1) infinite;
          animation-fill-mode: both;
        }
        .reel-s7-label {
          opacity: 0;
          animation: reelS7Label ${TOTAL_S}s ease-out infinite;
          animation-fill-mode: both;
        }
        @keyframes reelS7M1 {
          0%, 78.5% { opacity: 0; transform: translateY(8px) scale(0.96); }
          79.5%     { opacity: 1; transform: none; }
          83%       { opacity: 1; }
          84%       { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS7Check {
          0%, 80%   { opacity: 0; transform: scale(0); }
          81%       { opacity: 1; transform: scale(1.15); }
          82%       { opacity: 1; transform: scale(1); }
          83%       { opacity: 1; }
          84%       { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS7Label {
          0%, 81%   { opacity: 0; transform: translateY(6px); }
          82%       { opacity: 1; transform: none; }
          83%       { opacity: 1; }
          84%       { opacity: 0; }
          100%      { opacity: 0; }
        }

        /* S8 — price contrast. 84.5-93.5% */
        .reel-s8-from {
          opacity: 0;
          animation: reelS8From ${TOTAL_S}s cubic-bezier(0.2, 0.9, 0.25, 1) infinite;
          animation-fill-mode: both;
        }
        .reel-s8-arrow {
          opacity: 0;
          animation: reelS8Arrow ${TOTAL_S}s cubic-bezier(0.2, 0.9, 0.25, 1) infinite;
          animation-fill-mode: both;
        }
        .reel-s8-to {
          opacity: 0;
          animation: reelS8To ${TOTAL_S}s cubic-bezier(0.2, 0.9, 0.25, 1) infinite;
          animation-fill-mode: both;
        }
        .reel-s8-saved {
          opacity: 0;
          animation: reelS8Saved ${TOTAL_S}s ease-out infinite;
          animation-fill-mode: both;
        }
        @keyframes reelS8From {
          0%, 85%   { opacity: 0; transform: translateY(10px); }
          86%       { opacity: 1; transform: none; }
          93%       { opacity: 1; }
          93.5%     { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS8Arrow {
          0%, 87%   { opacity: 0; }
          88%       { opacity: 1; }
          93%       { opacity: 1; }
          93.5%     { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS8To {
          0%, 88%   { opacity: 0; transform: scale(0.5); }
          89.5%     { opacity: 1; transform: scale(1.1); }
          90.5%     { opacity: 1; transform: scale(1); }
          93%       { opacity: 1; }
          93.5%     { opacity: 0; }
          100%      { opacity: 0; }
        }
        @keyframes reelS8Saved {
          0%, 91%   { opacity: 0; transform: translateY(6px); }
          92%       { opacity: 1; transform: none; }
          93%       { opacity: 1; }
          93.5%     { opacity: 0; }
          100%      { opacity: 0; }
        }

        /* S9 outro */
        .reel-s9-cat, .reel-s9-mark, .reel-s9-tag, .reel-s9-cta {
          opacity: 0;
          animation-duration: ${TOTAL_S}s;
          animation-iteration-count: infinite;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.2, 0.9, 0.25, 1);
        }
        .reel-s9-cat  { animation-name: reelS9Cat; }
        .reel-s9-mark { animation-name: reelS9Mark; }
        .reel-s9-tag  { animation-name: reelS9Tag; }
        .reel-s9-cta  { animation-name: reelS9Cta; }
        @keyframes reelS9Cat {
          0%, 94%   { opacity: 0; transform: scale(0.7); }
          95%       { opacity: 1; transform: scale(1); }
          100%      { opacity: 1; }
        }
        @keyframes reelS9Mark {
          0%, 95%   { opacity: 0; transform: translateY(8px); letter-spacing: 0.08em; }
          96%       { opacity: 1; transform: none; letter-spacing: -0.03em; }
          100%      { opacity: 1; letter-spacing: -0.03em; }
        }
        @keyframes reelS9Tag {
          0%, 96%   { opacity: 0; transform: translateY(6px); }
          97%       { opacity: 1; transform: none; }
          100%      { opacity: 1; }
        }
        @keyframes reelS9Cta {
          0%, 97%   { opacity: 0; transform: translateY(6px); }
          98%       { opacity: 1; transform: none; }
          100%      { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function KikoBubble({
  cls,
  children,
  bold,
}: {
  cls?: string;
  children: React.ReactNode;
  bold?: boolean;
}) {
  return (
    <div
      className={cls}
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "8px",
        justifyContent: "flex-start",
      }}
    >
      <Image
        src="/kiko-cat.png"
        alt="Kiko"
        width={34}
        height={34}
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          objectFit: "cover",
          objectPosition: "center top",
          background: "#FFFFFF",
          border: "1px solid rgba(13,13,13,0.08)",
          flexShrink: 0,
        }}
      />
      <div
        style={{
          background: "#E9E9EB",
          color: "#0D0D0D",
          padding: "9px 14px",
          borderRadius: "20px 20px 20px 6px",
          fontSize: bold ? "1.05rem" : "0.95rem",
          fontWeight: bold ? 800 : 600,
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
          maxWidth: "82%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
