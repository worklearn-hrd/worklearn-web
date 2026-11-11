import type { ReactNode } from "react";
import { cx } from "./cx";

type StatusBadgeProps =
  | {
      tone: "success" | "warning" | "critical" | "accent" | "neutral" | "dday" | "dark-accent";
      children: ReactNode;
    }
  | {
      /** 섬네일 우하단에 겹치는 배지(재생시간 등). */
      tone: "overlay";
      /** accent 바탕(is-accent). */
      accent?: boolean;
      children: ReactNode;
    };

/** `.wl-badge`. 상태를 한 단어로 적는다. 색만으로 뜻을 전하지 않는다. */
export function StatusBadge(props: StatusBadgeProps) {
  return (
    <span
      className={cx(
        "wl-badge",
        `wl-badge--${props.tone}`,
        props.tone === "overlay" && props.accent && "is-accent",
      )}
    >
      {props.children}
    </span>
  );
}
