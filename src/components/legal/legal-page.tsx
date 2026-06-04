import {readFile} from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type LegalPageProps = {
  slug: "terms" | "privacy";
};

export async function LegalPage({slug}: LegalPageProps) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "legal",
    `${slug}.md`,
  );
  const md = await readFile(filePath, "utf-8");

  return (
    <div className="w-full" style={{background: "#F0F0F2"}}>
      <main className="mx-auto w-full max-w-[720px] px-5 py-12 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="inline-block text-sm"
          style={{
            color: "rgba(13,13,13,0.55)",
            letterSpacing: "-0.005em",
            marginBottom: "1.5rem",
          }}
        >
          ← kiko.ai
        </Link>
        <article className="legal-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
