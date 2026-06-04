import type {Metadata} from "next";
import {LegalPage} from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "개인정보처리방침 — kiko.ai",
  description: "kiko.ai 개인정보처리방침",
};

export default function Page() {
  return <LegalPage slug="privacy" />;
}
