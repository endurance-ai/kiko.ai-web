import type {ReactNode} from "react";

type Step = {
  num: string;
  title: string;
  body: ReactNode;
};

const B = ({children}: {children: ReactNode}) => (
  <strong style={{color: "#0D0D0D", fontWeight: 700}}>{children}</strong>
);

const STEPS: Step[] = [
  {
    num: "01",
    title: "패션 링크를 보내세요.",
    body: (
      <>
        핀터레스트 무드보드, 인스타그램 피드, 사진 한 장 —{" "}
        <B>뭐든 괜찮아요.</B>{" "}
        입을 수 있는 것이라면 Kiko가 읽어냅니다.
      </>
    ),
  },
  {
    num: "02",
    title: "Kiko가 옷장을 뒤집니다.",
    body: (
      <>
        핀터레스트에서 본 무드를 실제 살 수 있는 옷으로 바꾸는 데 <B>평균 30초</B>.
        원하는 만큼 즉시 무제한 디깅 — 당신이 만족할 때까지 멈추지 않아요.
      </>
    ),
  },
  {
    num: "03",
    title: "마음에 드는 옷이 없나요? 걱정 마세요.",
    body: (
      <>
        키코와 대화하면서 계속 옷을 탐색하세요.
        베타 이용자의 <B>86%</B>가 원하는 옷을 찾아 구매까지 이어졌습니다.
      </>
    ),
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="px-5 py-16 sm:px-6 sm:py-20"
      style={{background: "#E8E2D0"}}
    >
      <div className="mx-auto w-full max-w-[720px]">
        <div
          className="mb-8 font-bold leading-[0.98] tracking-[-0.03em]"
          style={{fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)"}}
        >
          모든 SNS 링크를 공유하세요.
          <br />
          <span style={{color: "rgba(13,13,13,0.3)"}}>동일 감도, 더 나은 가격</span>
        </div>

        {/* Visual showcase */}
        <div
          className="mb-3 overflow-hidden"
          style={{borderRadius: "20px"}}
        >
          <img
            src="/showcase-v2.png"
            alt="핀터레스트 이미지가 실제 상품으로"
            className="w-full block"
            style={{objectFit: "cover"}}
          />
        </div>

        <ol className="flex flex-col gap-3">
          {STEPS.map((s) => (
            <li
              key={s.num}
              className="flex gap-4 p-5 sm:gap-5 sm:p-6"
              style={{background: "#FFFFFF", borderRadius: "18px"}}
            >
              <div
                className="shrink-0 font-bold leading-none"
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 2.2rem)",
                  letterSpacing: "-0.035em",
                  color: "rgba(13,13,13,0.25)",
                  minWidth: "50px",
                }}
              >
                {s.num}
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className="font-bold"
                  style={{
                    fontSize: "clamp(1.1rem, 3.2vw, 1.25rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                  }}
                >
                  {s.title}
                </div>
                <div
                  className="mt-1.5"
                  style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.5,
                    color: "rgba(13,13,13,0.65)",
                    letterSpacing: "-0.005em",
                  }}
                >
                  {s.body}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
