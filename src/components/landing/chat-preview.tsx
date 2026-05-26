"use client";

import {useEffect, useState} from "react";
import Image from "next/image";

export type Channel = "imessage" | "telegram";

const CYCLE_MS = 16_000; // matches animation-duration

type Scenario = {
  image: string;
  title: string;
  domain: string;
  products: Array<{
    brand: string;
    item: string;
    price: string;
    save: string;
    color: string;
  }>;
  purchased: {brand: string; item: string; price: string; saved: string};
};

const SCENARIOS: Record<Channel, Scenario> = {
  imessage: {
    image: "/preview-bag.png",
    title: "Miu Miu Wander",
    domain: "tiktok.com",
    products: [
      {brand: "Polène", item: "Numéro Un", price: "$580", save: "−55%", color: "#D9C9B2"},
      {brand: "Mansur Gavriel", item: "Bucket", price: "$495", save: "−62%", color: "#C9B8A0"},
      {brand: "Wandler", item: "Hortensia", price: "$620", save: "−52%", color: "#E5D4BC"},
      {brand: "Demellier", item: "Tokyo", price: "$415", save: "−68%", color: "#B5A48C"},
      {brand: "Cuyana", item: "Mini Tote", price: "$268", save: "−79%", color: "#D6C9B5"},
      {brand: "Strathberry", item: "Mosaic", price: "$545", save: "−58%", color: "#A89880"},
      {brand: "Jamie Haller", item: "Petite", price: "$320", save: "−75%", color: "#C2B19A"},
      {brand: "Mark Cross", item: "Grace Box", price: "$690", save: "−47%", color: "#A18F76"},
    ],
    purchased: {brand: "Polène", item: "Numéro Un", price: "$580", saved: "$710"},
  },
  telegram: {
    image: "/preview-denim.jpg",
    title: "find me jeans like these",
    domain: "pinterest.com",
    products: [
      {brand: "A.P.C.", item: "Petit Standard", price: "$245", save: "−85%", color: "#2C3E5C"},
      {brand: "Acne Studios", item: "River", price: "$290", save: "−82%", color: "#1F2A3D"},
      {brand: "Carhartt WIP", item: "Single Knee", price: "$148", save: "−92%", color: "#3A4A6B"},
      {brand: "Levi's", item: "501 Original", price: "$98", save: "−96%", color: "#26354F"},
      {brand: "Wrangler", item: "Cowboy Cut", price: "$69", save: "−98%", color: "#1A2438"},
      {brand: "Stan Ray", item: "Painter Pant", price: "$128", save: "−94%", color: "#465A7C"},
      {brand: "Edwin", item: "Slim Tapered", price: "$185", save: "−90%", color: "#2E3E5A"},
      {brand: "Lee", item: "Rider Jean", price: "$79", save: "−97%", color: "#3D506E"},
    ],
    purchased: {brand: "A.P.C.", item: "Petit Standard", price: "$245", saved: "$980"},
  },
};

const sceneStyle: React.CSSProperties = {position: "absolute", inset: 0};

export function ChatPreview({
  channel: channelProp,
  size = "default",
  autoCycle = true,
}: {
  channel?: Channel;
  size?: "default" | "lg";
  autoCycle?: boolean;
}) {
  const [internalChannel, setInternalChannel] = useState<Channel>("imessage");

  useEffect(() => {
    if (channelProp || !autoCycle) return;
    const id = setInterval(() => {
      setInternalChannel((c) => (c === "imessage" ? "telegram" : "imessage"));
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [channelProp, autoCycle]);

  const channel = channelProp ?? internalChannel;
  const userBg = channel === "imessage" ? "#007AFF" : "#3B95E2";
  const userFg = "#FFFFFF";
  const botBg = channel === "imessage" ? "#E9E9EB" : "#FFFFFF";
  const botFg = "#0D0D0D";
  const scenario = SCENARIOS[channel];

  const isLg = size === "lg";
  const sceneHeight = isLg ? "260px" : "152px";
  const outerPad = isLg ? "20px" : "14px";

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "20px",
        padding: outerPad,
        marginBottom: "4px",
        boxShadow: "inset 0 0 0 1px rgba(13,13,13,0.04)",
        overflow: "hidden",
      }}
    >
      <div
        key={channel}
        style={{position: "relative", height: sceneHeight, overflow: "hidden"}}
      >
        {/* SCENE A — Real-time chat */}
        <div className="kiko-scene kiko-scene-A" style={sceneStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              height: "100%",
              gap: "6px",
              padding: "2px 2px 0",
            }}
          >
            <div
              className="kiko-msg kiko-msg-1"
              style={{display: "flex", justifyContent: "flex-end"}}
            >
              <div
                style={{
                  background: userBg,
                  color: userFg,
                  borderRadius: "16px 16px 4px 16px",
                  overflow: "hidden",
                  width: "180px",
                  boxShadow: "0 2px 8px rgba(0,122,255,0.18)",
                }}
              >
                <Image
                  src={scenario.image}
                  alt={scenario.title}
                  width={180}
                  height={90}
                  style={{
                    width: "100%",
                    height: "90px",
                    objectFit: "cover",
                    objectPosition: "center 75%",
                    display: "block",
                    background: "#FFFFFF",
                  }}
                />
                <div
                  style={{
                    padding: "8px 12px 9px",
                    lineHeight: 1.25,
                    letterSpacing: "-0.005em",
                  }}
                >
                  <div style={{fontSize: "0.78rem", fontWeight: 600}}>
                    {scenario.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 500,
                      opacity: 0.7,
                      marginTop: "1px",
                    }}
                  >
                    {scenario.domain}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="kiko-msg kiko-msg-2"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                gap: "6px",
              }}
            >
              <Image
                src="/kiko-cat.png"
                alt="Kiko"
                width={32}
                height={32}
                style={{
                  width: "32px",
                  height: "32px",
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
                  background: botBg,
                  color: botFg,
                  fontSize: "0.84rem",
                  fontWeight: 500,
                  lineHeight: 1.3,
                  padding: "8px 12px",
                  borderRadius: "16px 16px 16px 4px",
                  letterSpacing: "-0.005em",
                  border:
                    channel === "telegram"
                      ? "1px solid rgba(13,13,13,0.06)"
                      : "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  className="kiko-spinner"
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    border: "1.5px solid rgba(13,13,13,0.15)",
                    borderTopColor: "rgba(13,13,13,0.6)",
                    display: "inline-block",
                  }}
                />
                one sec, on the hunt 🐾
              </div>
            </div>

            <div
              className="kiko-msg kiko-msg-3"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                gap: "6px",
              }}
            >
              <Image
                src="/kiko-cat.png"
                alt="Kiko"
                width={32}
                height={32}
                style={{
                  width: "32px",
                  height: "32px",
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
                  background: botBg,
                  color: botFg,
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  padding: "8px 12px",
                  borderRadius: "16px 16px 16px 4px",
                  letterSpacing: "-0.005em",
                  border:
                    channel === "telegram"
                      ? "1px solid rgba(13,13,13,0.06)"
                      : "none",
                }}
              >
                got 8 🐾 same vibe, up to{" "}
                <span style={{color: "#1B8A3A", fontWeight: 700}}>−79%</span>
              </div>
            </div>
          </div>
        </div>

        {/* SCENE B — Product list scrolling */}
        <div className="kiko-scene kiko-scene-B" style={sceneStyle}>
          <div
            style={{
              position: "relative",
              height: "100%",
              overflow: "hidden",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
            }}
          >
            <div className="kiko-product-track">
              {[...scenario.products, ...scenario.products].map((p, i) => (
                <div
                  key={`${p.brand}-${i}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "7px 10px",
                    background: "rgba(13,13,13,0.025)",
                    border: "1px solid rgba(13,13,13,0.05)",
                    borderRadius: "10px",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "7px",
                      background: p.color,
                      flexShrink: 0,
                      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.06)",
                    }}
                  />
                  <div style={{flex: 1, minWidth: 0}}>
                    <div
                      style={{
                        fontSize: "0.76rem",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        color: "#0D0D0D",
                        lineHeight: 1.1,
                      }}
                    >
                      {p.brand}
                    </div>
                    <div
                      style={{
                        fontSize: "0.68rem",
                        color: "rgba(13,13,13,0.5)",
                        marginTop: "1px",
                        lineHeight: 1.1,
                      }}
                    >
                      {p.item}
                    </div>
                  </div>
                  <div style={{textAlign: "right"}}>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        letterSpacing: "-0.015em",
                        color: "#0D0D0D",
                        lineHeight: 1,
                      }}
                    >
                      {p.price}
                    </div>
                    <div
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        color: "#1B8A3A",
                        marginTop: "2px",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {p.save}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SCENE C — Purchase complete */}
        <div className="kiko-scene kiko-scene-C" style={{...sceneStyle, zIndex: 2}}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: "8px",
              textAlign: "center",
            }}
          >
            <div
              className="kiko-check"
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2EBD52 0%, #1B8A3A 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 4px 10px rgba(27,138,58,0.18), inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#0D0D0D",
              }}
            >
              Purchase complete
            </div>
            <div
              style={{
                fontSize: "0.78rem",
                color: "rgba(13,13,13,0.55)",
                fontWeight: 500,
              }}
            >
              {scenario.purchased.brand} {scenario.purchased.item} ·{" "}
              <span style={{color: "#0D0D0D", fontWeight: 700}}>
                {scenario.purchased.price}
              </span>{" "}
              ·{" "}
              <span style={{color: "#1B8A3A", fontWeight: 700}}>
                saved {scenario.purchased.saved}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .kiko-scene {
          opacity: 0;
          animation-fill-mode: both;
          animation-iteration-count: infinite;
          animation-duration: 16s;
          animation-timing-function: cubic-bezier(0.2, 0.9, 0.25, 1);
        }
        .kiko-scene-A { animation-name: kikoScA; }
        .kiko-scene-B { animation-name: kikoScB; }
        .kiko-scene-C { animation-name: kikoScC; }

        @keyframes kikoScA {
          0%   { opacity: 1; transform: none; }
          34%  { opacity: 1; transform: none; }
          38%  { opacity: 0; transform: translateY(-24px) scale(0.96); }
          100% { opacity: 0; }
        }
        @keyframes kikoScB {
          0%, 36%  { opacity: 0; transform: translateY(60px) scale(0.94); }
          42%      { opacity: 1; transform: translateY(0) scale(1); }
          78%      { opacity: 1; transform: translateY(0) scale(1); }
          82%      { opacity: 0; transform: translateY(-18px) scale(0.96); }
          100%     { opacity: 0; }
        }
        @keyframes kikoScC {
          0%, 82%  { opacity: 0; transform: translateY(14px) scale(0.88); }
          86%      { opacity: 1; transform: translateY(0) scale(1); }
          96%      { opacity: 1; transform: translateY(0) scale(1); }
          100%     { opacity: 0; transform: translateY(-10px) scale(0.96); }
        }

        .kiko-check {
          animation: kikoCheckDrop 16s ease-out infinite;
          animation-fill-mode: both;
          transform-origin: center center;
          will-change: transform, opacity;
        }
        @keyframes kikoCheckDrop {
          0%, 83%  { transform: translateY(-30px); opacity: 0; }
          89%      { transform: translateY(4px);   opacity: 1; }
          92%      { transform: translateY(0);     opacity: 1; }
          97%      { transform: translateY(0);     opacity: 1; }
          100%     { transform: translateY(-10px); opacity: 0; }
        }

        .kiko-msg {
          opacity: 0;
          animation-fill-mode: both;
          animation-iteration-count: infinite;
          animation-duration: 16s;
          animation-timing-function: cubic-bezier(0.2, 0.9, 0.25, 1);
        }
        .kiko-msg-1 { animation-name: kikoMsg1; }
        .kiko-msg-2 { animation-name: kikoMsg2; }
        .kiko-msg-3 { animation-name: kikoMsg3; }

        @keyframes kikoMsg1 {
          0%, 2%   { opacity: 0; transform: translateY(6px) translateX(8px); }
          6%       { opacity: 1; transform: translateY(0) translateX(0); }
          42%      { opacity: 1; transform: translateY(0) translateX(0); }
          100%     { opacity: 1; }
        }
        @keyframes kikoMsg2 {
          0%, 12%  { opacity: 0; transform: translateY(6px) translateX(-8px); }
          16%      { opacity: 1; transform: translateY(0) translateX(0); }
          42%      { opacity: 1; transform: translateY(0) translateX(0); }
          100%     { opacity: 1; }
        }
        @keyframes kikoMsg3 {
          0%, 26%  { opacity: 0; transform: translateY(6px) translateX(-8px); }
          30%      { opacity: 1; transform: translateY(0) translateX(0); }
          42%      { opacity: 1; transform: translateY(0) translateX(0); }
          100%     { opacity: 1; }
        }

        .kiko-product-track {
          animation: kikoProductScroll 3s linear infinite;
        }
        @keyframes kikoProductScroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        .kiko-spinner {
          animation: kikoSpin 0.8s linear infinite;
        }
        @keyframes kikoSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
