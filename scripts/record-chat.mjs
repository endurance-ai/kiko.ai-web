// scripts/record-chat.mjs
// Headless Chromium 으로 /preview/chat 을 열어 채팅 애니메이션을 녹화한다.
// 한 시나리오 = 16초, iMessage→Telegram 두 사이클 = 32초.
// 출력: out/chat.webm (raw) → out/chat.mp4 (web/threads) → out/chat.gif (optional)
//
// 사용: pnpm record  (내부에서 이 스크립트를 호출)
// 사전 요건: dev 서버가 localhost:3001 에서 떠 있어야 함.

import {chromium} from "playwright";
import {mkdirSync, existsSync, readdirSync, renameSync, rmSync} from "node:fs";
import {execSync} from "node:child_process";
import {join} from "node:path";

const URL = process.env.RECORD_URL ?? "http://localhost:3001/preview/chat";
const DURATION_MS = Number(process.env.RECORD_DURATION_MS ?? 33_000);
const WIDTH = 800;
const HEIGHT = 360;
const OUT_DIR = "out";

const has = (cmd) => {
  try {
    execSync(`command -v ${cmd}`, {stdio: "ignore"});
    return true;
  } catch {
    return false;
  }
};

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, {recursive: true});

  console.log(`▶ launching headless chromium`);
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: {width: WIDTH, height: HEIGHT},
    deviceScaleFactor: 2,
    recordVideo: {
      dir: OUT_DIR,
      size: {width: WIDTH, height: HEIGHT},
    },
  });
  const page = await context.newPage();

  console.log(`▶ navigating → ${URL}`);
  await page.goto(URL, {waitUntil: "networkidle"});

  // Warm-up: wait one frame so initial animations engage
  await page.waitForTimeout(300);

  console.log(`▶ recording ${DURATION_MS / 1000}s`);
  await page.waitForTimeout(DURATION_MS);

  await context.close();
  await browser.close();

  // Playwright writes <random>.webm — rename to chat.webm
  const files = readdirSync(OUT_DIR).filter((f) => f.endsWith(".webm"));
  if (files.length === 0) {
    throw new Error("no .webm produced");
  }
  // Take the newest
  files.sort();
  const latest = files[files.length - 1];
  const webmPath = join(OUT_DIR, "chat.webm");
  if (latest !== "chat.webm") {
    if (existsSync(webmPath)) rmSync(webmPath);
    renameSync(join(OUT_DIR, latest), webmPath);
  }
  console.log(`✓ ${webmPath}`);

  if (!has("ffmpeg")) {
    console.log(`! ffmpeg not found — skipping mp4/gif conversion.`);
    console.log(`  webm 파일을 직접 사용하거나 ezgif.com 에 올려 변환하세요.`);
    return;
  }

  // → MP4 (H.264, web-friendly, Threads upload-ready)
  const mp4Path = join(OUT_DIR, "chat.mp4");
  console.log(`▶ converting → ${mp4Path}`);
  execSync(
    `ffmpeg -y -i ${webmPath} -movflags faststart -pix_fmt yuv420p ` +
      `-vf "fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -crf 20 -preset slow ${mp4Path}`,
    {stdio: "inherit"}
  );
  console.log(`✓ ${mp4Path}`);

  // → GIF (optional, lower quality, larger file — for places that need GIF)
  const gifPath = join(OUT_DIR, "chat.gif");
  console.log(`▶ converting → ${gifPath}`);
  execSync(
    `ffmpeg -y -i ${webmPath} -vf "fps=15,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 ${gifPath}`,
    {stdio: "inherit"}
  );
  console.log(`✓ ${gifPath}`);

  console.log(`\n완료. out/ 에 chat.webm · chat.mp4 · chat.gif 가 생겼습니다.`);
  console.log(`Threads 에는 chat.mp4 를 그대로 올리면 됩니다.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
