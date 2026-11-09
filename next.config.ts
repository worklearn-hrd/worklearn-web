import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Docker 이미지에 실행에 필요한 파일만 담도록 .next/standalone을 만든다.
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
