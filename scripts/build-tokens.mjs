// design-system/tokens.json → design-system/tokens.css
// 스타일 값의 원본은 tokens.json 하나다. tokens.json을 바꾸면 `npm run tokens`로 다시 만든다.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const tokensUrl = new URL("../design-system/tokens.json", import.meta.url);
const cssUrl = new URL("../design-system/tokens.css", import.meta.url);

/** 글꼴 이름을 next/font가 선언하는 CSS 변수 이름으로 바꾼다. 'IBM Plex Sans KR' → --font-ibm-plex-sans-kr */
export function fontVariableName(family) {
  const slug = family.replace(/['"]/g, "").trim().toLowerCase().replace(/\s+/g, "-");
  return `--font-${slug}`;
}

/** 글꼴 스택의 첫 글꼴만 next/font 변수로 바꾸고 폴백은 그대로 둔다. */
function fontStack(stack) {
  const [first, ...fallbacks] = stack.split(",").map((part) => part.trim());
  return [`var(${fontVariableName(first)})`, ...fallbacks].join(", ");
}

function block(selector, sections) {
  const body = sections
    .map(([title, lines]) => [`  /* ${title} */`, ...lines.map((line) => `  ${line}`)].join("\n"))
    .join("\n\n");
  return `${selector} {\n${body}\n}`;
}

export function buildTokensCss(tokens) {
  const colors = tokens.color.tokens;
  const spacing = tokens.spacing.tokens;
  const radius = tokens.radius.tokens;
  const shadows = tokens.shadow.tokens;
  const sizes = tokens.size.tokens;
  const layout = tokens.layout.tokens;
  const sans = fontStack(tokens.type.families.sans);
  const textStyles = tokens.type.groups.flatMap((group) => group.styles);

  // bundle.css의 .wl-* 클래스가 읽는 변수. 이름은 토큰 이름 그대로다.
  const root = block(":root", [
    ["color", colors.map((t) => `--${t.name}: ${t.value};`)],
    ["type", [`--font-sans: ${sans};`]],
    ["spacing", spacing.map((t) => `--${t.name}: ${t.value};`)],
    ["radius", radius.map((t) => `--${t.name}: ${t.value};`)],
    ["shadow", shadows.map((t) => `--${t.name}: ${t.value};`)],
    ["size", sizes.map((t) => `--${t.name}: ${t.value};`)],
    ["layout", layout.map((t) => `--${t.name}: ${t.value};`)],
  ]);

  // Tailwind 유틸리티. 기본 테마의 색·간격·반지름·그림자·글자 크기를 비우고 토큰만 남긴다.
  // 예: bg-accent, text-ink-secondary, p-16, gap-8, h-control, max-w-content-max, rounded-10, shadow-card, text-title-22
  const theme = block("@theme inline", [
    [
      "기본 테마 비우기",
      [
        "--color-*: initial;",
        "--spacing: initial;",
        "--spacing-*: initial;",
        "--radius-*: initial;",
        "--shadow-*: initial;",
        "--text-*: initial;",
      ],
    ],
    ["color", colors.map((t) => `--color-${t.name}: ${t.value};`)],
    ["type", [`--font-sans: ${sans};`]],
    [
      "text",
      textStyles.flatMap((style) => {
        const key = `--text-${style.name}`;
        const lines = [
          `${key}: ${style.fontSize};`,
          `${key}--line-height: ${style.lineHeight};`,
          `${key}--font-weight: ${style.fontWeight};`,
        ];
        if (style.letterSpacing) lines.push(`${key}--letter-spacing: ${style.letterSpacing};`);
        return lines;
      }),
    ],
    ["spacing", spacing.map((t) => `--spacing-${t.name.replace(/^space-/, "")}: ${t.value};`)],
    ["size · layout (h-control, w-sidebar-width, max-w-content-max …)", [...sizes, ...layout].map((t) => `--spacing-${t.name}: ${t.value};`)],
    ["radius", radius.map((t) => `--${t.name}: ${t.value};`)],
    ["shadow", shadows.map((t) => `--${t.name}: ${t.value};`)],
  ]);

  return [
    "/* 생성 파일 — 직접 고치지 않는다. 원본: design-system/tokens.json, 생성: npm run tokens */",
    "",
    root,
    "",
    theme,
    "",
  ].join("\n");
}

export function readTokens() {
  return JSON.parse(readFileSync(tokensUrl, "utf8"));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeFileSync(cssUrl, buildTokensCss(readTokens()));
  console.log("design-system/tokens.css 생성 완료");
}
