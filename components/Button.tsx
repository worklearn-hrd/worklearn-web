import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./cx";

type ButtonVariant = "primary" | "secondary" | "danger" | "tint" | "pill" | "dashed" | "dark";
type ButtonSize = "sm" | "lg" | "xl";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** 한 화면에 primary는 하나, 나머지는 secondary. */
  variant?: ButtonVariant;
  /** 지정하지 않으면 기본 높이(control). */
  size?: ButtonSize;
  /** 가로 100%. */
  block?: boolean;
  /** 아이콘만 있는 정사각 버튼(.wl-btn--icon). aria-label을 함께 준다. */
  iconOnly?: boolean;
  /** pill 필터의 선택 상태(is-active). */
  active?: boolean;
  /** 라벨 왼쪽 아이콘. 크기는 클래스가 정한다. */
  leadingIcon?: ReactNode;
};

/** `.wl-btn` */
export function Button({
  variant = "secondary",
  size,
  block,
  iconOnly,
  active,
  leadingIcon,
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        "wl-btn",
        `wl-btn--${variant}`,
        size && `wl-btn--${size}`,
        block && "wl-btn--block",
        iconOnly && "wl-btn--icon",
        active && "is-active",
        className,
      )}
      {...rest}
    >
      {leadingIcon}
      {children}
    </button>
  );
}
