"use client";

import {useEffect, useState} from "react";
import Image from "next/image";

export type Channel = "imessage" | "telegram";

const CYCLE_MS = 20_000; // matches animation-duration

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
  refine: {
    ask: string;
    reply: string;
    closing: string;
    products: Array<{
      brand: string;
      item: string;
      price: string;
      save: string;
      color: string;
    }>;
  };
  // Used by Scene C — derived from refine.products[1] (the 2nd / user's pick).
  purchasedSaved: string;
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
    refine: {
      ask: "no leather tho 🥲",
      reply: "got u — canvas trio 🐾",
      closing: "thanks! the 2nd one ✨",
      products: [
        {brand: "Baggu", item: "Cloud Bag", price: "$54", save: "−96%", color: "#C8B89E"},
        {brand: "Telfar", item: "Shopping Bag", price: "$202", save: "−84%", color: "#7A6B58"},
        {brand: "Battenwear", item: "Drawstring", price: "$128", save: "−90%", color: "#9E8D74"},
      ],
    },
    purchasedSaved: "$1,088",
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
    refine: {
      ask: "slim cut instead?",
      reply: "on it — slim trio 🐾",
      closing: "yes the 2nd one ✨",
      products: [
        {brand: "Levi's", item: "511 Slim", price: "$89", save: "−96%", color: "#26354F"},
        {brand: "A.P.C.", item: "Petit New Standard", price: "$245", save: "−85%", color: "#1F2A3D"},
        {brand: "Edwin", item: "Slim Tapered", price: "$185", save: "−90%", color: "#2E3E5A"},
      ],
    },
    purchasedSaved: "$980",
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
  // lg needs ~400px to fit Scene B2 comfortably (6 stacked elements + safe margin).
  const sceneHeight = isLg ? "400px" : "220px";
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
              gap: isLg ? "8px" : "6px",
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
                  width: isLg ? "min(260px, 70%)" : "min(180px, 60%)",
                  boxShadow: "0 2px 8px rgba(0,122,255,0.18)",
                }}
              >
                <Image
                  src={scenario.image}
                  alt={scenario.title}
                  width={isLg ? 260 : 180}
                  height={isLg ? 140 : 90}
                  style={{
                    width: "100%",
                    height: isLg ? "120px" : "90px",
                    objectFit: "cover",
                    objectPosition: "center 75%",
                    display: "block",
                    background: "#FFFFFF",
                  }}
                />
                <div
                  style={{
                    padding: isLg ? "10px 14px 11px" : "8px 12px 9px",
                    lineHeight: 1.25,
                    letterSpacing: "-0.005em",
                    textAlign: "left",
                  }}
                >
                  <div style={{fontSize: isLg ? "0.92rem" : "0.78rem", fontWeight: 600}}>
                    {scenario.title}
                  </div>
                  <div
                    style={{
                      fontSize: isLg ? "0.78rem" : "0.68rem",
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
                gap: isLg ? "8px" : "6px",
              }}
            >
              <Image
                src="/kiko-cat.png"
                alt="Kiko"
                width={isLg ? 38 : 32}
                height={isLg ? 38 : 32}
                style={{
                  width: isLg ? "38px" : "32px",
                  height: isLg ? "38px" : "32px",
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
                  fontSize: isLg ? "1rem" : "0.84rem",
                  fontWeight: 500,
                  lineHeight: 1.3,
                  padding: isLg ? "10px 16px" : "8px 12px",
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
                    width: isLg ? "12px" : "10px",
                    height: isLg ? "12px" : "10px",
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
                gap: isLg ? "8px" : "6px",
              }}
            >
              <Image
                src="/kiko-cat.png"
                alt="Kiko"
                width={isLg ? 38 : 32}
                height={isLg ? 38 : 32}
                style={{
                  width: isLg ? "38px" : "32px",
                  height: isLg ? "38px" : "32px",
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
                  fontSize: isLg ? "1rem" : "0.84rem",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  padding: isLg ? "10px 16px" : "8px 12px",
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
                    gap: isLg ? "14px" : "10px",
                    padding: isLg ? "10px 14px" : "7px 10px",
                    background: "rgba(13,13,13,0.025)",
                    border: "1px solid rgba(13,13,13,0.05)",
                    borderRadius: "12px",
                    marginBottom: isLg ? "7px" : "5px",
                  }}
                >
                  <div
                    style={{
                      width: isLg ? "42px" : "30px",
                      height: isLg ? "42px" : "30px",
                      borderRadius: "9px",
                      background: p.color,
                      flexShrink: 0,
                      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.06)",
                    }}
                  />
                  <div style={{flex: 1, minWidth: 0}}>
                    <div
                      style={{
                        fontSize: isLg ? "0.95rem" : "0.76rem",
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
                        fontSize: isLg ? "0.78rem" : "0.68rem",
                        color: "rgba(13,13,13,0.5)",
                        marginTop: "2px",
                        lineHeight: 1.1,
                      }}
                    >
                      {p.item}
                    </div>
                  </div>
                  <div style={{textAlign: "right"}}>
                    <div
                      style={{
                        fontSize: isLg ? "1rem" : "0.8rem",
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
                        fontSize: isLg ? "0.7rem" : "0.6rem",
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

        {/* SCENE B2 — Refinement: user follow-up → kiko trio → user closing */}
        <div className="kiko-scene kiko-scene-B2" style={sceneStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              height: "100%",
              gap: isLg ? "8px" : "5px",
              padding: "2px 2px 0",
            }}
          >
            {/* user follow-up */}
            <div
              className="kiko-msg kiko-msg-r1"
              style={{display: "flex", justifyContent: "flex-end"}}
            >
              <div
                style={{
                  background: userBg,
                  color: userFg,
                  padding: isLg ? "10px 16px" : "8px 12px",
                  borderRadius: "16px 16px 4px 16px",
                  fontSize: isLg ? "1rem" : "0.84rem",
                  fontWeight: 600,
                  letterSpacing: "-0.005em",
                  boxShadow: "0 2px 8px rgba(0,122,255,0.18)",
                }}
              >
                {scenario.refine.ask}
              </div>
            </div>

            {/* kiko reply */}
            <div
              className="kiko-msg kiko-msg-r2"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                gap: isLg ? "8px" : "6px",
              }}
            >
              <Image
                src="/kiko-cat.png"
                alt="Kiko"
                width={isLg ? 38 : 32}
                height={isLg ? 38 : 32}
                style={{
                  width: isLg ? "38px" : "32px",
                  height: isLg ? "38px" : "32px",
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
                  fontSize: isLg ? "1rem" : "0.84rem",
                  fontWeight: 500,
                  lineHeight: 1.3,
                  padding: isLg ? "10px 16px" : "8px 12px",
                  borderRadius: "16px 16px 16px 4px",
                  letterSpacing: "-0.005em",
                  border:
                    channel === "telegram"
                      ? "1px solid rgba(13,13,13,0.06)"
                      : "none",
                }}
              >
                {scenario.refine.reply}
              </div>
            </div>

            {/* 3 product cards (bot side, share an avatar gutter) */}
            <div
              style={{
                display: "flex",
                gap: isLg ? "8px" : "6px",
                alignItems: "flex-end",
              }}
            >
              <div style={{width: isLg ? "38px" : "32px", flexShrink: 0}} />
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: isLg ? "6px" : "4px",
                  minWidth: 0,
                }}
              >
                {scenario.refine.products.map((p, i) => {
                  return (
                    <div
                      key={p.brand}
                      className={`kiko-msg kiko-msg-r${3 + i}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: isLg ? "12px" : "10px",
                        background: botBg,
                        borderRadius: "14px",
                        padding: isLg ? "10px 14px" : "8px 10px",
                        border:
                          channel === "telegram"
                            ? "1px solid rgba(13,13,13,0.06)"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          width: isLg ? "44px" : "34px",
                          height: isLg ? "44px" : "34px",
                          borderRadius: "10px",
                          background: p.color,
                          flexShrink: 0,
                          boxShadow: "inset 0 -8px 12px rgba(0,0,0,0.12)",
                        }}
                      />
                      <div style={{flex: 1, minWidth: 0}}>
                        <div
                          style={{
                            fontSize: isLg ? "0.95rem" : "0.78rem",
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
                            fontSize: isLg ? "0.78rem" : "0.68rem",
                            color: "rgba(13,13,13,0.55)",
                            marginTop: "2px",
                            lineHeight: 1.1,
                          }}
                        >
                          {p.item}
                        </div>
                      </div>
                      <div style={{textAlign: "right"}}>
                        <div
                          style={{
                            fontSize: isLg ? "1rem" : "0.82rem",
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
                            fontSize: isLg ? "0.68rem" : "0.6rem",
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
                  );
                })}
              </div>
            </div>

            {/* user closing reply */}
            <div
              className="kiko-msg kiko-msg-r6"
              style={{display: "flex", justifyContent: "flex-end"}}
            >
              <div
                style={{
                  background: userBg,
                  color: userFg,
                  padding: isLg ? "10px 16px" : "8px 12px",
                  borderRadius: "16px 16px 4px 16px",
                  fontSize: isLg ? "1rem" : "0.84rem",
                  fontWeight: 600,
                  letterSpacing: "-0.005em",
                  boxShadow: "0 2px 8px rgba(0,122,255,0.18)",
                }}
              >
                {scenario.refine.closing}
              </div>
            </div>
          </div>
        </div>

        {/* SCENE C — Purchase complete (the 2nd refine pick) */}
        <div className="kiko-scene kiko-scene-C" style={{...sceneStyle, zIndex: 2}}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: isLg ? "10px" : "8px",
              textAlign: "center",
            }}
          >
            <div
              className="kiko-check"
              style={{
                width: isLg ? "68px" : "56px",
                height: isLg ? "68px" : "56px",
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
                width={isLg ? 34 : 28}
                height={isLg ? 34 : 28}
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
                fontSize: isLg ? "1.2rem" : "1rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#0D0D0D",
              }}
            >
              Purchase complete
            </div>
            <div
              style={{
                fontSize: isLg ? "0.92rem" : "0.78rem",
                color: "rgba(13,13,13,0.55)",
                fontWeight: 500,
              }}
            >
              {scenario.refine.products[1].brand}{" "}
              {scenario.refine.products[1].item} ·{" "}
              <span style={{color: "#0D0D0D", fontWeight: 700}}>
                {scenario.refine.products[1].price}
              </span>{" "}
              ·{" "}
              <span style={{color: "#1B8A3A", fontWeight: 700}}>
                saved {scenario.purchasedSaved}
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
          animation-duration: 20s;
          animation-timing-function: cubic-bezier(0.2, 0.9, 0.25, 1);
        }
        .kiko-scene-A  { animation-name: kikoScA; }
        .kiko-scene-B  { animation-name: kikoScB; }
        .kiko-scene-B2 { animation-name: kikoScB2; }
        .kiko-scene-C  { animation-name: kikoScC; }

        /* 20s cycle:
           Scene A   0-6s    (0-30%)
           Scene B   5.6-9.4s (28-47%)
           Scene B2  9.2-15.2s (46-76%)
           Scene C   15.2-20s (76-100%) */
        @keyframes kikoScA {
          0%   { opacity: 1; transform: none; }
          27%  { opacity: 1; transform: none; }
          30%  { opacity: 0; transform: translateY(-24px) scale(0.96); }
          100% { opacity: 0; }
        }
        @keyframes kikoScB {
          0%, 28%  { opacity: 0; transform: translateY(40px) scale(0.94); }
          32%      { opacity: 1; transform: translateY(0) scale(1); }
          44%      { opacity: 1; transform: translateY(0) scale(1); }
          47%      { opacity: 0; transform: translateY(-18px) scale(0.96); }
          100%     { opacity: 0; }
        }
        @keyframes kikoScB2 {
          0%, 46%  { opacity: 0; transform: translateY(30px) scale(0.97); }
          49%      { opacity: 1; transform: translateY(0) scale(1); }
          74%      { opacity: 1; transform: translateY(0) scale(1); }
          76%      { opacity: 0; transform: translateY(-12px) scale(0.98); }
          100%     { opacity: 0; }
        }
        @keyframes kikoScC {
          0%, 76%  { opacity: 0; transform: translateY(14px) scale(0.9); }
          79%      { opacity: 1; transform: translateY(0) scale(1); }
          97%      { opacity: 1; transform: translateY(0) scale(1); }
          100%     { opacity: 0; transform: translateY(-10px) scale(0.97); }
        }

        .kiko-check {
          animation: kikoCheckDrop 20s ease-out infinite;
          animation-fill-mode: both;
          transform-origin: center center;
          will-change: transform, opacity;
        }
        @keyframes kikoCheckDrop {
          0%, 77%  { transform: translateY(-30px); opacity: 0; }
          81%      { transform: translateY(4px);   opacity: 1; }
          84%      { transform: translateY(0);     opacity: 1; }
          97%      { transform: translateY(0);     opacity: 1; }
          100%     { transform: translateY(-10px); opacity: 0; }
        }

        .kiko-msg {
          opacity: 0;
          animation-fill-mode: both;
          animation-iteration-count: infinite;
          animation-duration: 20s;
          animation-timing-function: cubic-bezier(0.2, 0.9, 0.25, 1);
        }
        .kiko-msg-1 { animation-name: kikoMsg1; }
        .kiko-msg-2 { animation-name: kikoMsg2; }
        .kiko-msg-3 { animation-name: kikoMsg3; }
        .kiko-msg-r1 { animation-name: kikoMsgR1; }
        .kiko-msg-r2 { animation-name: kikoMsgR2; }
        .kiko-msg-r3 { animation-name: kikoMsgR3; }
        .kiko-msg-r4 { animation-name: kikoMsgR4; }
        .kiko-msg-r5 { animation-name: kikoMsgR5; }
        .kiko-msg-r6 { animation-name: kikoMsgR6; }

        @keyframes kikoMsg1 {
          0%, 2%   { opacity: 0; transform: translateY(6px) translateX(8px); }
          5%       { opacity: 1; transform: translateY(0) translateX(0); }
          33%      { opacity: 1; transform: translateY(0) translateX(0); }
          100%     { opacity: 1; }
        }
        @keyframes kikoMsg2 {
          0%, 10%  { opacity: 0; transform: translateY(6px) translateX(-8px); }
          13%      { opacity: 1; transform: translateY(0) translateX(0); }
          33%      { opacity: 1; transform: translateY(0) translateX(0); }
          100%     { opacity: 1; }
        }
        @keyframes kikoMsg3 {
          0%, 21%  { opacity: 0; transform: translateY(6px) translateX(-8px); }
          24%      { opacity: 1; transform: translateY(0) translateX(0); }
          33%      { opacity: 1; transform: translateY(0) translateX(0); }
          100%     { opacity: 1; }
        }
        /* Scene B2 (46-76%, 6s window) — natural ask/reply, then snappy cards, immediate closing:
           r1 user ask        @47%   (~9.4s,  0.4s after scene in)
           r2 kiko reply      @54%   (~10.8s, 1.4s gap — natural conversation)
           r3 product 1       @59%   (~11.8s, 1.0s gap — short beat then burst)
           r4 product 2       @61%   (~12.2s, 0.4s gap — snappy)
           r5 product 3       @63%   (~12.6s, 0.4s gap — snappy)
           r6 user closing    @66%   (~13.2s, 0.6s after last card) */
        @keyframes kikoMsgR1 {
          0%, 46%  { opacity: 0; transform: translateY(6px) translateX(8px); }
          48%      { opacity: 1; transform: translateY(0) translateX(0); }
          74%      { opacity: 1; transform: translateY(0) translateX(0); }
          100%     { opacity: 1; }
        }
        @keyframes kikoMsgR2 {
          0%, 53%  { opacity: 0; transform: translateY(6px) translateX(-8px); }
          55%      { opacity: 1; transform: translateY(0) translateX(0); }
          74%      { opacity: 1; transform: translateY(0) translateX(0); }
          100%     { opacity: 1; }
        }
        @keyframes kikoMsgR3 {
          0%, 58%  { opacity: 0; transform: translateY(10px) scale(0.96); }
          60%      { opacity: 1; transform: translateY(0) scale(1); }
          74%      { opacity: 1; transform: translateY(0) scale(1); }
          100%     { opacity: 1; }
        }
        @keyframes kikoMsgR4 {
          0%, 60%  { opacity: 0; transform: translateY(10px) scale(0.96); }
          62%      { opacity: 1; transform: translateY(0) scale(1); }
          74%      { opacity: 1; transform: translateY(0) scale(1); }
          100%     { opacity: 1; }
        }
        @keyframes kikoMsgR5 {
          0%, 62%  { opacity: 0; transform: translateY(10px) scale(0.96); }
          64%      { opacity: 1; transform: translateY(0) scale(1); }
          74%      { opacity: 1; transform: translateY(0) scale(1); }
          100%     { opacity: 1; }
        }
        @keyframes kikoMsgR6 {
          0%, 65%  { opacity: 0; transform: translateY(8px) translateX(8px); }
          67%      { opacity: 1; transform: translateY(0) translateX(0); }
          74%      { opacity: 1; transform: translateY(0) translateX(0); }
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
