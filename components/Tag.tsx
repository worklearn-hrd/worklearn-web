import type { ReactNode } from "react";
import { cx } from "./cx";

type TagProps = {
  /** 목록 카드 안의 작은 태그는 sm. */
  size?: "sm";
  /** 주제 태그는 accent, 중립 라벨(+2 등)은 neutral. */
  tone?: "accent" | "neutral";
  /** 굵기 600. */
  strong?: boolean;
  children: ReactNode;
};

/** `.wl-tag`. 클릭 대상이 아니다. 상태는 StatusBadge로 표시한다. */
export function Tag({ size, tone = "accent", strong, children }: TagProps) {
  return (
    <span
      className={cx(
        "wl-tag",
        size && `wl-tag--${size}`,
        tone === "neutral" && "wl-tag--neutral",
        strong && "wl-tag--strong",
      )}
    >
      {children}
    </span>
  );
}
