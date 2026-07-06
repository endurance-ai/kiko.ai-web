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
    title: "채팅으로 간단하게 시작하세요.",
    body: (
      <>
        인스타그램 링크, 핀터레스트 공유하기, 이미지, 텍스트로{" "}
        <B>시작하기.</B>
      </>
    ),
  },
  {
    num: "02",
    title: "머릿속 그 옷, 마법처럼 눈 앞에.",
    body: (
      <>
        당신 취향을 아는 Kiko가 수천 개 인디 디자이너 브랜드를 대신 뒤져, 원하는 옷을 찾아옵니다.
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
      className="px-5 py-10 sm:px-6 sm:py-20"
      style={{background: "#E8E2D0"}}
    >
      <div className="mx-auto w-full max-w-[720px]">
        <div
          className="mb-5 sm:mb-8 font-bold leading-[0.98] tracking-[-0.03em]"
          style={{fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)"}}
        >
          채팅 하나로 시작하세요.
          <br />
          <span style={{color: "rgba(13,13,13,0.3)"}}>수천 개 인디 디자이너 브랜드 디깅</span>
        </div>

        {/* Visual showcase */}
        <div
          className="mb-3 overflow-hidden"
          style={{borderRadius: "20px"}}
        >
          <img
            src="/showcase-v3.png"
            alt="핀터레스트 이미지가 실제 상품으로"
            className="w-full block"
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
