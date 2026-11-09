import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // 컴포넌트는 서버 렌더링 결과(HTML 문자열)로 스냅샷을 찍는다. 브라우저 환경이 필요 없다.
    environment: "node",
    include: ["components/**/*.test.tsx", "design-system/**/*.test.ts"],
  },
});
