"use client";

import {useState, type FormEvent} from "react";

// ────────────────────────────────────────────────────────────────────
// Google Form 연결 — 폼 만들고 두 값만 채우면 작동.
// 1) https://forms.google.com 에서 새 폼 생성, "단답형" 이메일 질문 1개 추가
// 2) 우상단 "보내기 (Send)" → 링크 아이콘 → URL 복사
//    예: https://docs.google.com/forms/d/e/FAIp.../viewform
//    여기서 /viewform → /formResponse 로 바꾼 게 FORM_ACTION
// 3) 폼 페이지 우측 점3개 → "사전 입력된 링크 가져오기" → 이메일 칸에 아무 값 입력
//    → 링크 받기 → 받은 링크에서 entry.XXXXXXX 부분이 EMAIL_FIELD
// ────────────────────────────────────────────────────────────────────
const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSepk1RPVL_FTexWyhIQK6ggzGXK7nVquBgjF5vNZ5eXwAQv7Q/formResponse";
const EMAIL_FIELD = "entry.245608156";

export function InstallSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const valid = /\S+@\S+\.\S+/.test(email);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    try {
      const body = new FormData();
      body.append(EMAIL_FIELD, email);
      await fetch(FORM_ACTION, {method: "POST", mode: "no-cors", body});
    } catch {
      // no-cors response is opaque — assume success
    }
    setSent(true);
    setSubmitting(false);
  };

  return (
    <section
      id="waitlist"
      className="px-5 py-16 sm:px-6 sm:py-20"
      style={{background: "#0D0D0D", color: "#FFFFFF"}}
    >
      <div className="mx-auto w-full max-w-[720px]">
        <div
          className="mb-4 font-bold leading-[0.98] tracking-[-0.03em]"
          style={{fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)"}}
        >
          Join the waitlist
          <br />
          <span style={{color: "rgba(255,255,255,0.35)"}}>
            be first to chat
          </span>
        </div>

        <p
          className="mb-8 max-w-[480px]"
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: "0.98rem",
            lineHeight: 1.5,
            letterSpacing: "-0.005em",
          }}
        >
          Kiko rolls out channel-by-channel. Drop your email and we&apos;ll send
          the install link the moment your spot opens.
        </p>

        {/* iMessage panel backdrop (blurred, decorative) + email overlay */}
        <div className="relative">
          <ImessageBackdrop />

          {/* Glassmorphism overlay holding the email form */}
          <div
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-6"
            style={{
              background: "rgba(13,13,13,0.08)",
              backdropFilter: "blur(2.5px) saturate(130%)",
              WebkitBackdropFilter: "blur(2.5px) saturate(130%)",
              borderRadius: "18px",
            }}
          >
            <form
              onSubmit={onSubmit}
              className="w-full max-w-[420px]"
              style={{
                background: "#FFFFFF",
                color: "#0D0D0D",
                borderRadius: "16px",
                padding: "18px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
              }}
            >
              <div
                className="mb-3 font-bold"
                style={{fontSize: "1.1rem", letterSpacing: "-0.015em"}}
              >
                Get your install link
              </div>

              {sent ? (
                <div
                  style={{
                    background: "#A8E0B0",
                    borderRadius: "12px",
                    padding: "14px 16px",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    color: "#0D0D0D",
                    lineHeight: 1.4,
                  }}
                >
                  ✓ You&apos;re on the list. Check your inbox soon 🐾
                </div>
              ) : (
                <>
                  <div className="flex items-stretch gap-2">
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@gmail.com"
                      className="min-w-0 flex-1 border-0 outline-none"
                      style={{
                        background: "rgba(13,13,13,0.04)",
                        borderRadius: "12px",
                        padding: "14px 16px",
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        color: "#0D0D0D",
                        letterSpacing: "-0.005em",
                      }}
                    />
                    <button
                      type="submit"
                      disabled={!valid || submitting}
                      className="flex items-center justify-center border-0 transition-transform duration-150 ease-out hover:translate-x-0.5"
                      style={{
                        borderRadius: "12px",
                        minWidth: "56px",
                        background: valid ? "#0D0D0D" : "rgba(13,13,13,0.15)",
                        color: valid ? "#fff" : "rgba(13,13,13,0.35)",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        cursor:
                          valid && !submitting ? "pointer" : "not-allowed",
                      }}
                    >
                      {submitting ? "…" : "→"}
                    </button>
                  </div>
                  <div
                    className="mt-2.5"
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(13,13,13,0.55)",
                      lineHeight: 1.35,
                    }}
                  >
                    We&apos;ll only email you once — when your spot opens.
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Decorative iMessage-style card peeking through the glass overlay. */
function ImessageBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none select-none"
      style={{
        background: "#A8E0B0",
        borderRadius: "18px",
        padding: "24px",
        minHeight: "260px",
      }}
    >
      <div
        className="mb-3 font-bold"
        style={{fontSize: "1.2rem", color: "#0D0D0D", letterSpacing: "-0.015em"}}
      >
        Text yourself the link
      </div>
      <div className="flex items-stretch gap-2">
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            padding: "0 14px",
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "#0D0D0D",
            display: "flex",
            alignItems: "center",
          }}
        >
          +82
        </div>
        <div
          className="flex-1"
          style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            padding: "14px 16px",
            fontWeight: 500,
            fontSize: "0.95rem",
            color: "rgba(13,13,13,0.35)",
          }}
        >
          010 0000 0000
        </div>
        <div
          style={{
            borderRadius: "12px",
            width: "48px",
            background: "#0D0D0D",
            color: "#fff",
            fontSize: "1.2rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          →
        </div>
      </div>
      <div
        className="mt-2.5"
        style={{
          fontSize: "0.8rem",
          color: "rgba(13,13,13,0.55)",
          lineHeight: 1.35,
        }}
      >
        We&apos;ll text you the install link.
      </div>
    </div>
  );
}
