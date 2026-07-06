// scripts/record-demo.mjs
// Headless Chromium 으로 /preview/demo 를 열어 45초 데모 릴을 9:16 비율로 녹화한다.
// 출력: out/demo.webm (raw) → out/demo.mp4 (소셜 업로드용) → out/demo.gif (옵션)
//
// 사용: pnpm demo:record
// 사전 요건: dev 서버가 PORT(기본 3001) 에서 떠 있어야 함.

import {chromium} from "playwright";
import {mkdirSync, existsSync, readdirSync, renameSync, rmSync} from "node:fs";
import {execSync} from "node:child_process";
import {join} from "node:path";

const URL = process.env.RECORD_URL ?? "http://localhost:3001/preview/demo";
// 32s reel + 1s warm-up buffer at start so first scene is fully visible.
const DURATION_MS = Number(process.env.RECORD_DURATION_MS ?? 33_000);
// 9:16 mobile portrait. 540x960 = good balance of quality vs upload size.
const WIDTH = 540;
const HEIGHT = 960;
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

  console.log(`▶ launching headless chromium @ ${WIDTH}x${HEIGHT}`);
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

  // Warm-up: wait so initial paint + fonts settle, then animations engage.
  await page.waitForTimeout(800);

  console.log(`▶ recording ${DURATION_MS / 1000}s`);
  await page.waitForTimeout(DURATION_MS);

  await context.close();
  await browser.close();

  // Playwright writes <random>.webm — rename to demo.webm
  const files = readdirSync(OUT_DIR).filter(
    (f) => f.endsWith(".webm") && !f.startsWith("chat")
  );
  if (files.length === 0) {
    throw new Error("no .webm produced");
  }
  files.sort();
  const latest = files[files.length - 1];
  const webmPath = join(OUT_DIR, "demo.webm");
  if (latest !== "demo.webm") {
    if (existsSync(webmPath)) rmSync(webmPath);
    renameSync(join(OUT_DIR, latest), webmPath);
  }
  console.log(`✓ ${webmPath}`);

  if (!has("ffmpeg")) {
    console.log(`! ffmpeg not found — skipping mp4/gif conversion.`);
    return;
  }

  // → MP4 (H.264, web-friendly, social-ready). Skip first 0.8s warm-up.
  const mp4Path = join(OUT_DIR, "demo.mp4");
  console.log(`▶ converting → ${mp4Path}`);
  execSync(
    `ffmpeg -y -ss 0.8 -i ${webmPath} -movflags faststart -pix_fmt yuv420p ` +
      `-vf "fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -crf 20 -preset slow ${mp4Path}`,
    {stdio: "inherit"}
  );
  console.log(`✓ ${mp4Path}`);

  // → GIF (lower fps, smaller size). Useful for X/Threads preview.
  const gifPath = join(OUT_DIR, "demo.gif");
  console.log(`▶ converting → ${gifPath}`);
  execSync(
    `ffmpeg -y -ss 0.8 -i ${webmPath} -vf "fps=15,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 ${gifPath}`,
    {stdio: "inherit"}
  );
  console.log(`✓ ${gifPath}`);

  console.log(`\n완료. out/ 에 demo.webm · demo.mp4 · demo.gif 가 생겼습니다.`);
  console.log(`소셜에는 demo.mp4 (9:16) 그대로 올리면 됩니다.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
