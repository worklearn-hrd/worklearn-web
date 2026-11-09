import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";

// 변수 이름은 design-system/tokens.css의 --font-sans가 참조한다.
const plexSansKr = IBM_Plex_Sans_KR({
  variable: "--font-ibm-plex-sans-kr",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "워크런",
  description: "기업 학습 플랫폼",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${plexSansKr.variable} h-full`}>
      <body className="wl min-h-full bg-ground">{children}</body>
    </html>
  );
}
