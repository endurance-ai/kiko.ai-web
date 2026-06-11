"use client";

// 32s AR concept demo (9:16). Terminal-style text-only HUD overlaid on a
// real photo of 더현대 5F. Focus: "which store can I sit at RIGHT NOW".
// One store gets the bright hero label; the rest are dimmed to gray.
//
// 0.0-3.0s   S1  Boot — "FLOORVIEW · v0.1" terminal intro
// 3.0-7.0s   S2  Floor map scan + position lock
// 7.0-10.0s  S3  Camera view boot — scanning text
// 10.0-22.0s S4  Photo + dimmed store labels + ONE bright hero
// 22.0-27.0s S5  Hero zoom — full availability detail in mono
// 27.0-32.0s S6  Sign-off
const TOTAL_S = 32;

const MONO =
  '"JetBrains Mono", "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

type Status = "available" | "busy" | "full";

const STATUS_TAG: Record<Status, string> = {
  available: "[ AVAILABLE ]",
  busy: "[ BUSY ]",
  full: "[ FULL ]",
};

const STORES: {
  name: string;
  status: Status;
  seats: number; // 0 if not available
  waitMin: number;
  distance: number; // meters
  // Anchor on the photo background (% of image).
  x: number;
  y: number;
  // Approx position on the floor map.
  mapX: number;
  mapY: number;
  // Text alignment relative to anchor
  align: "left" | "right" | "center";
}[] = [
  {name: "BERLIN", status: "available", seats: 4, waitMin: 0, distance: 12, x: 50, y: 50, mapX: 38, mapY: 58, align: "center"},
  {name: "BALI", status: "busy", seats: 0, waitMin: 14, distance: 18, x: 80, y: 56, mapX: 68, mapY: 52, align: "right"},
  {name: "LOS_ANGELES", status: "busy", seats: 0, waitMin: 6, distance: 14, x: 72, y: 64, mapX: 55, mapY: 25, align: "right"},
  {name: "GARDEN_CAFÉ", status: "full", seats: 0, waitMin: 22, distance: 22, x: 38, y: 32, mapX: 38, mapY: 18, align: "left"},
  {name: "ROOFTOP_BAR", status: "busy", seats: 0, waitMin: 8, distance: 16, x: 22, y: 70, mapX: 18, mapY: 65, align: "left"},
];

const HERO = STORES.find((s) => s.status === "available")!;

const sceneAbs: React.CSSProperties = {
  position: "absolute",
  inset: 0,
};

export function ArDemo() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#06070A",
        color: "#F2F4F8",
        fontFamily: MONO,
        letterSpacing: "0",
        fontVariantLigatures: "none",
      }}
    >
      {/* ───────────────────── S1 — Boot ───────────────────── */}
      <div className="ar-scene ar-s1" style={sceneAbs}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, #0B1018 0%, #06070A 75%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "10% 8%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: 13,
            lineHeight: 1.7,
            color: "#9CA3B5",
          }}
        >
          <div className="ar-typ-1" style={{color: "#34D399"}}>
            $ floorview --boot
          </div>
          <div className="ar-typ-2">› initializing sensors……… ok</div>
          <div className="ar-typ-3">› locating user……………………… ok</div>
          <div className="ar-typ-4">› scanning floor 5……………… ok</div>
          <div className="ar-typ-5" style={{color: "#F2F4F8"}}>
            ─────────────────────────
          </div>
          <div
            className="ar-typ-6"
            style={{
              marginTop: 18,
              fontSize: 38,
              color: "#F2F4F8",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            FLOORVIEW
          </div>
          <div
            className="ar-typ-7"
            style={{marginTop: 8, fontSize: 13, color: "#6B7280"}}
          >
            v0.1 · find_a_seat
          </div>
        </div>
      </div>

      {/* ───────────────────── S2 — Floor map localize ───────────────────── */}
      <div className="ar-scene ar-s2" style={sceneAbs}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, #0A0E18 0%, #06070A 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "6%",
            left: "8%",
            right: "8%",
            fontSize: 11,
            color: "#6B7280",
            letterSpacing: "0.08em",
          }}
        >
          › locating user
        </div>
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "8%",
            right: "8%",
            fontSize: 17,
            color: "#F2F4F8",
            fontWeight: 500,
          }}
        >
          HYUNDAI_SEOUL / 5F / SOUNDSFOREST
        </div>
        {/* Floor map */}
        <div
          className="ar-s2-map"
          style={{
            position: "absolute",
            top: "22%",
            left: "8%",
            right: "8%",
            aspectRatio: "1 / 1.05",
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.015)",
            overflow: "hidden",
          }}
        >
          <svg
            viewBox="0 0 100 110"
            style={{position: "absolute", inset: 0, width: "100%", height: "100%"}}
          >
            <defs>
              <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path
                  d="M5 0H0V5"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.25"
                />
              </pattern>
            </defs>
            <rect width="100" height="110" fill="url(#grid)" />
            {/* Atrium */}
            <ellipse
              cx="50"
              cy="55"
              rx="32"
              ry="18"
              fill="none"
              stroke="rgba(180,200,230,0.25)"
              strokeWidth="0.4"
            />
            <ellipse
              cx="50"
              cy="55"
              rx="22"
              ry="11"
              fill="none"
              stroke="rgba(180,200,230,0.18)"
              strokeWidth="0.3"
            />
            <path
              d="M8 20 H92 M8 90 H92 M15 20 V90 M85 20 V90"
              stroke="rgba(180,200,230,0.18)"
              strokeWidth="0.3"
              fill="none"
            />
            {STORES.map((s, i) => (
              <g key={i}>
                <rect
                  x={s.mapX - 4.5}
                  y={s.mapY - 3.5}
                  width={9}
                  height={7}
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="0.25"
                />
                <text
                  x={s.mapX}
                  y={s.mapY + 0.7}
                  fontSize="2"
                  fontFamily={MONO}
                  fill="rgba(200,210,230,0.55)"
                  textAnchor="middle"
                >
                  {s.name.split("_")[0].slice(0, 6)}
                </text>
              </g>
            ))}
          </svg>
          <div className="ar-s2-sweep" />
          <div className="ar-s2-pin">
            <div className="ar-s2-pin-ring" />
            <div className="ar-s2-pin-dot" />
          </div>
        </div>
        <div
          className="ar-s2-status"
          style={{
            position: "absolute",
            bottom: "8%",
            left: "8%",
            right: "8%",
            fontSize: 12,
            color: "#34D399",
          }}
        >
          ✓ position_locked · soundsforest_center
        </div>
      </div>

      {/* ───────────────────── S3 — Camera scanning ───────────────────── */}
      <div className="ar-scene ar-s3" style={sceneAbs}>
        <PhotoBg dim />
        <div className="ar-s3-grid" />
        <CornerBrackets />
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            fontSize: 10,
            color: "#9CA3B5",
            letterSpacing: "0.06em",
            lineHeight: 1.7,
          }}
        >
          <div className="ar-s3-t1">› cam_5f / live</div>
          <div className="ar-s3-t2">› detecting venues……</div>
          <div className="ar-s3-t3" style={{color: "#34D399"}}>
            › 5 found · 1 available
          </div>
        </div>
      </div>

      {/* ───────────────────── S4 — Photo + text-only HUD ───────────────────── */}
      <div className="ar-scene ar-s4" style={sceneAbs}>
        <div className="ar-s4-stage">
          <PhotoBg />
          {/* Dimmed labels for non-available stores */}
          {STORES.filter((s) => s.status !== "available").map((s) => (
            <DimLabel key={s.name} store={s} />
          ))}
          {/* Hero label */}
          <HeroLabel store={HERO} />
        </div>
        <CornerBrackets />
        {/* Top status line */}
        <div
          style={{
            position: "absolute",
            top: 22,
            left: 22,
            right: 22,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 10,
            color: "#9CA3B5",
            letterSpacing: "0.06em",
          }}
        >
          <span>FLOORVIEW · 5F</span>
          <span style={{color: "#34D399"}} className="ar-s4-blink">
            ● LIVE
          </span>
        </div>
        {/* Bottom summary */}
        <div
          className="ar-s4-bottom"
          style={{
            position: "absolute",
            bottom: "8%",
            left: 22,
            right: 22,
            textAlign: "center",
            fontSize: 11,
            color: "#9CA3B5",
            letterSpacing: "0.08em",
          }}
        >
          › 5 stores scanned · 1 seat_available · 4 wait
        </div>
      </div>

      {/* ───────────────────── S5 — Hero detail (text block) ───────────────────── */}
      <div className="ar-scene ar-s5" style={sceneAbs}>
        <PhotoBg dim />
        <CornerBrackets />
        <div
          style={{
            position: "absolute",
            top: "26%",
            left: "8%",
            right: "8%",
            color: "#F2F4F8",
            lineHeight: 1.7,
          }}
        >
          <div
            className="ar-s5-l1"
            style={{fontSize: 11, color: "#6B7280", letterSpacing: "0.08em"}}
          >
            › selected
          </div>
          <div
            className="ar-s5-l2"
            style={{
              marginTop: 6,
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {HERO.name}
          </div>
          <div
            className="ar-s5-l3"
            style={{
              marginTop: 24,
              fontSize: 14,
              color: "#34D399",
              letterSpacing: "0.04em",
            }}
          >
            {STATUS_TAG.available}
          </div>
          <div
            className="ar-s5-l4"
            style={{
              marginTop: 18,
              fontSize: 13,
              color: "#C8D1E5",
              lineHeight: 2,
            }}
          >
            seats_open     ──  <b style={{color: "#F2F4F8"}}>{HERO.seats}</b><br />
            distance       ──  <b style={{color: "#F2F4F8"}}>{HERO.distance}m</b><br />
            wait           ──  <b style={{color: "#F2F4F8"}}>0min</b>
          </div>
          <div
            className="ar-s5-l5"
            style={{
              marginTop: 26,
              paddingTop: 14,
              borderTop: "1px dashed rgba(255,255,255,0.18)",
              fontSize: 11,
              color: "#6B7280",
              letterSpacing: "0.06em",
            }}
          >
            › next_available_in 4min @ LOS_ANGELES
          </div>
        </div>
      </div>

      {/* ───────────────────── S6 — Sign-off ───────────────────── */}
      <div className="ar-scene ar-s6" style={sceneAbs}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, #0B1018 0%, #06070A 75%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "0 8%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            color: "#9CA3B5",
            fontSize: 14,
            lineHeight: 1.8,
          }}
        >
          <div className="ar-s6-l1" style={{color: "#34D399"}}>
            $ floorview
          </div>
          <div className="ar-s6-l2">› stop_waiting</div>
          <div className="ar-s6-l3">› start_sitting</div>
          <div
            className="ar-s6-l4"
            style={{
              marginTop: 26,
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#F2F4F8",
              lineHeight: 1,
            }}
          >
            FLOORVIEW
          </div>
          <div
            className="ar-s6-l5"
            style={{marginTop: 10, fontSize: 12, color: "#6B7280"}}
          >
            coming_soon · 더현대_서울_5F
          </div>
        </div>
      </div>

      {/* ───────────────────── Styles ───────────────────── */}
      <style>{`
        .ar-scene { opacity: 0; }
        .ar-s1 { animation: arS1 ${TOTAL_S}s linear both; }
        .ar-s2 { animation: arS2 ${TOTAL_S}s linear both; }
        .ar-s3 { animation: arS3 ${TOTAL_S}s linear both; }
        .ar-s4 { animation: arS4 ${TOTAL_S}s linear both; }
        .ar-s5 { animation: arS5 ${TOTAL_S}s linear both; }
        .ar-s6 { animation: arS6 ${TOTAL_S}s linear both; }

        @keyframes arS1 {
          0% { opacity: 0; }
          1% { opacity: 1; }
          9% { opacity: 1; }
          11% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes arS2 {
          0%, 9% { opacity: 0; }
          11% { opacity: 1; }
          21% { opacity: 1; }
          23% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes arS3 {
          0%, 21% { opacity: 0; }
          23% { opacity: 1; }
          30% { opacity: 1; }
          32% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes arS4 {
          0%, 30% { opacity: 0; }
          32% { opacity: 1; }
          68% { opacity: 1; }
          70% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes arS5 {
          0%, 68% { opacity: 0; }
          70% { opacity: 1; }
          83% { opacity: 1; }
          85% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes arS6 {
          0%, 83% { opacity: 0; }
          85% { opacity: 1; }
          100% { opacity: 1; }
        }

        /* S1 boot typing */
        .ar-typ-1 { opacity: 0; animation: typeIn 0.3s steps(20) 0.1s both; }
        .ar-typ-2 { opacity: 0; animation: typeIn 0.35s steps(28) 0.5s both; }
        .ar-typ-3 { opacity: 0; animation: typeIn 0.35s steps(28) 0.9s both; }
        .ar-typ-4 { opacity: 0; animation: typeIn 0.35s steps(28) 1.3s both; }
        .ar-typ-5 { opacity: 0; animation: fadeIn 0.3s ease 1.7s both; }
        .ar-typ-6 { opacity: 0; animation: fadeIn 0.5s ease 1.85s both; }
        .ar-typ-7 { opacity: 0; animation: fadeIn 0.4s ease 2.2s both; }
        @keyframes typeIn {
          0% { opacity: 0; clip-path: inset(0 100% 0 0); }
          1% { opacity: 1; }
          100% { opacity: 1; clip-path: inset(0 0 0 0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        /* S2 scanning */
        .ar-s2-sweep {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(52,211,153,0.18) 50%, transparent 100%);
          height: 30%;
          animation: sweep 2.2s ease-in-out 0s 2;
        }
        @keyframes sweep {
          0% { transform: translateY(-30%); }
          100% { transform: translateY(330%); }
        }
        .ar-s2-pin {
          position: absolute;
          left: 47%; top: 49%;
          width: 14px; height: 14px;
          opacity: 0;
          animation: pinDrop 0.5s ease-out 4.4s both;
        }
        @keyframes pinDrop {
          0% { opacity: 0; transform: translateY(-30px) scale(0.5); }
          70% { opacity: 1; transform: translateY(4px) scale(1.1); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ar-s2-pin-ring {
          position: absolute; inset: -8px;
          border: 1.5px solid rgba(52,211,153,0.6);
          animation: pulse 1.4s ease-out 4.7s infinite;
        }
        .ar-s2-pin-dot {
          position: absolute; inset: 0;
          background: #34D399;
          box-shadow: 0 0 14px rgba(52,211,153,0.8);
        }
        @keyframes pulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .ar-s2-status { opacity: 0; animation: fadeIn 0.5s ease 5.4s both; }

        /* S3 scanning grid */
        .ar-s3-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(180,200,230,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(180,200,230,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%);
          animation: gridPulse 1.6s ease-in-out infinite;
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
        .ar-s3-t1 { opacity: 0; animation: typeIn 0.3s steps(16) 7.3s both; }
        .ar-s3-t2 { opacity: 0; animation: typeIn 0.3s steps(20) 7.7s both; }
        .ar-s3-t3 { opacity: 0; animation: typeIn 0.3s steps(22) 8.3s both; }

        /* S4 stage — slow Ken Burns */
        .ar-s4-stage {
          position: absolute; inset: 0;
          transform-origin: 50% 55%;
          animation: kenBurns 12s ease-out 10s both;
          will-change: transform;
        }
        @keyframes kenBurns {
          0%   { transform: scale(1.12); }
          100% { transform: scale(1.00); }
        }

        /* Dim labels (non-hero) — fade in subtle */
        .ar-dim {
          opacity: 0;
          color: #6B7280;
        }
        .ar-dim-0 { animation: dimIn 0.5s ease 10.6s both; }
        .ar-dim-1 { animation: dimIn 0.5s ease 11.0s both; }
        .ar-dim-2 { animation: dimIn 0.5s ease 11.4s both; }
        .ar-dim-3 { animation: dimIn 0.5s ease 11.8s both; }
        @keyframes dimIn {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 0.55; transform: translateY(0); }
        }

        /* Hero label — typewriter reveal, dramatic */
        .ar-hero {
          opacity: 0;
          animation: heroIn 0.5s ease 13.0s both;
        }
        @keyframes heroIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .ar-hero-line {
          opacity: 0;
          clip-path: inset(0 100% 0 0);
        }
        .ar-hero-l1 { animation: typeIn 0.4s steps(14) 13.2s both; }
        .ar-hero-l2 { animation: typeIn 0.5s steps(22) 13.7s both; }
        .ar-hero-l3 { animation: typeIn 0.4s steps(18) 14.3s both; }
        .ar-hero-tick { animation: tickPulse 1.2s ease-in-out 14.8s infinite; }
        @keyframes tickPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        /* Live blink */
        .ar-s4-blink { animation: blink 1.4s ease-in-out infinite; }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .ar-s4-bottom { opacity: 0; animation: fadeIn 0.5s ease 16s both; }

        /* S5 detail typewriter */
        .ar-s5-l1 { opacity: 0; animation: typeIn 0.3s steps(12) 22.2s both; }
        .ar-s5-l2 { opacity: 0; animation: heroIn 0.4s ease 22.5s both; }
        .ar-s5-l3 { opacity: 0; animation: typeIn 0.4s steps(16) 23.0s both; }
        .ar-s5-l4 { opacity: 0; animation: fadeIn 0.5s ease 23.5s both; }
        .ar-s5-l5 { opacity: 0; animation: typeIn 0.5s steps(34) 24.5s both; }

        /* S6 sign-off */
        .ar-s6-l1 { opacity: 0; animation: typeIn 0.3s steps(12) 27.2s both; }
        .ar-s6-l2 { opacity: 0; animation: typeIn 0.3s steps(14) 27.6s both; }
        .ar-s6-l3 { opacity: 0; animation: typeIn 0.3s steps(15) 28.0s both; }
        .ar-s6-l4 { opacity: 0; animation: heroIn 0.5s ease 28.5s both; }
        .ar-s6-l5 { opacity: 0; animation: fadeIn 0.5s ease 29.1s both; }
      `}</style>
    </div>
  );
}

function CornerBrackets() {
  return (
    <>
      {[
        {top: 14, left: 14, rotate: 0},
        {top: 14, right: 14, rotate: 90},
        {bottom: 14, right: 14, rotate: 180},
        {bottom: 14, left: 14, rotate: 270},
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...p,
            width: 18,
            height: 18,
            borderTop: "1px solid rgba(180,200,230,0.55)",
            borderLeft: "1px solid rgba(180,200,230,0.55)",
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </>
  );
}

function PhotoBg({dim = false}: {dim?: boolean}) {
  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "#06070A"}}>
      <img
        src="/preview/hyundai-5f.jpg"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "55% 55%",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: dim
            ? "linear-gradient(180deg, rgba(6,7,10,0.78) 0%, rgba(6,7,10,0.78) 100%)"
            : "linear-gradient(180deg, rgba(6,7,10,0.50) 0%, rgba(6,7,10,0.30) 40%, rgba(6,7,10,0.60) 100%)",
        }}
      />
      {/* Cover the screenshot watermark in top-right */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "22%",
          height: "10%",
          background:
            "linear-gradient(225deg, rgba(6,7,10,0.95) 30%, transparent 100%)",
        }}
      />
    </div>
  );
}

function DimLabel({store}: {store: (typeof STORES)[number]}) {
  const i = STORES.filter((s) => s.status !== "available").indexOf(store);
  const align = store.align;
  const wait = store.status === "full" ? "FULL" : `${store.waitMin}m wait`;
  return (
    <div
      className={`ar-dim ar-dim-${i}`}
      style={{
        position: "absolute",
        left: `${store.x}%`,
        top: `${store.y}%`,
        transform:
          align === "center"
            ? "translate(-50%, -50%)"
            : align === "right"
            ? "translate(-100%, -50%)"
            : "translate(0, -50%)",
        textAlign: align,
        fontSize: 10,
        lineHeight: 1.5,
        whiteSpace: "nowrap",
        letterSpacing: "0.04em",
      }}
    >
      <div style={{fontWeight: 600}}>{store.name}</div>
      <div style={{fontSize: 9, opacity: 0.8}}>{wait}</div>
    </div>
  );
}

function HeroLabel({store}: {store: (typeof STORES)[number]}) {
  return (
    <div
      className="ar-hero"
      style={{
        position: "absolute",
        left: `${store.x}%`,
        top: `${store.y}%`,
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        whiteSpace: "nowrap",
        color: "#F2F4F8",
        textShadow: "0 0 16px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)",
      }}
    >
      {/* Connector line up to indicator */}
      <div
        className="ar-hero-tick"
        style={{
          width: 1,
          height: 36,
          background: "#34D399",
          margin: "0 auto 6px",
          boxShadow: "0 0 6px #34D399",
        }}
      />
      <div
        className="ar-hero-line ar-hero-l1"
        style={{
          fontSize: 11,
          letterSpacing: "0.12em",
          color: "#34D399",
        }}
      >
        ── HERE ──
      </div>
      <div
        className="ar-hero-line ar-hero-l2"
        style={{
          marginTop: 6,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.01em",
        }}
      >
        {store.name}
      </div>
      <div
        className="ar-hero-line ar-hero-l3"
        style={{
          marginTop: 4,
          fontSize: 12,
          color: "#C8D1E5",
          letterSpacing: "0.06em",
        }}
      >
        {store.seats} seats · {store.distance}m
      </div>
    </div>
  );
}
