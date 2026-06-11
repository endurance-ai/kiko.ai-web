import {DemoReel} from "@/components/landing/demo-reel";

// Dedicated 9:16 full-viewport route — used by both local preview and
// the Playwright recorder (scripts/record-demo.mjs).
export default function DemoReelRecordPage() {
  return (
    <div
      style={{
        background: "#000",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          width: "min(100vw, calc(100vh * 9 / 16))",
          aspectRatio: "9 / 16",
          maxHeight: "100vh",
        }}
      >
        <DemoReel />
      </div>
    </div>
  );
}
