import type {Metadata} from "next";
import {LegalPage} from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "이용약관 — kiko.ai",
  description: "kiko.ai 이용약관",
};

export default function Page() {
  return <LegalPage slug="terms" />;
}
