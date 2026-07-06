import {ChatPreview} from "@/components/landing/chat-preview";

// Dedicated route Playwright records. No nav, no header, no padding.
// Body bg matches landing page (#F0F0F2).
export default function ChatPreviewRecordPage() {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        background: "#F0F0F2",
        width: "100vw",
        height: "100vh",
        padding: "0",
      }}
    >
      <div style={{width: "720px", maxWidth: "100%"}}>
        <ChatPreview size="lg" />
      </div>
    </div>
  );
}
