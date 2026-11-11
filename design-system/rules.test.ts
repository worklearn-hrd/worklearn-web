import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, test } from "vitest";
import { buildTokensCss, fontVariableName, readTokens } from "../scripts/build-tokens.mjs";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8").replace(/\r\n/g, "\n");

/** 화면과 컴포넌트 소스(.tsx). 테스트 파일은 뺀다. */
function sourceFiles(dir: string): string[] {
  return readdirSync(join(root, dir), { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx") && !entry.name.endsWith(".test.tsx"))
    .map((entry) => relative(root, join(entry.parentPath, entry.name)).replaceAll("\\", "/"));
}

describe("토큰", () => {
  test("tokens.css는 tokens.json에서 만든 그대로다 (다르면 npm run tokens)", () => {
    expect(read("design-system/tokens.css")).toBe(buildTokensCss(readTokens()));
  });

  test("bundle.css가 쓰는 변수는 모두 tokens.css에 있다", () => {
    const tokensCss = read("design-system/tokens.css");
    const rootBlock = tokensCss.slice(0, tokensCss.indexOf("@theme"));
    const used = new Set(Array.from(read("design-system/bundle.css").matchAll(/var\((--[\w-]+)/g), (m) => m[1]));
    const missing = [...used].filter((name) => !rootBlock.includes(`${name}:`));
    expect(missing).toEqual([]);
  });

  test("레이아웃이 선언하는 글꼴 변수 이름이 토큰의 글꼴과 맞는다", () => {
    const firstFamily = readTokens().type.families.sans.split(",")[0];
    expect(read("app/layout.tsx")).toContain(`"${fontVariableName(firstFamily)}"`);
  });
});

describe("스타일 값 하드코딩 금지", () => {
  const rules: Array<[string, RegExp]> = [
    ["style 속성", /\bstyle=/],
    ["색상 코드", /#[0-9a-fA-F]{3,8}\b/],
    ["px 숫자", /\d+px\b/],
    ["Tailwind 임의 값", /-\[[^\]]+\]/],
    ["다크 모드 변형", /\bdark:/],
  ];

  test.each([...sourceFiles("app"), ...sourceFiles("components")])("%s", (file) => {
    const source = read(file);
    const violations = rules.filter(([, pattern]) => pattern.test(source)).map(([name]) => name);
    expect(violations).toEqual([]);
  });
});
