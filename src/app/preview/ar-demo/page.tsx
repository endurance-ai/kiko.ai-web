import {ArDemo} from "@/components/landing/ar-demo";

// 9:16 full-viewport route for AR concept demo.
// Record via: RECORD_URL=http://localhost:3001/preview/ar-demo pnpm demo:record
export default function ArDemoPage() {
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
        <ArDemo />
      </div>
    </div>
  );
}
