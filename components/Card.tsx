import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { cx } from "./cx";

type CardOwnProps = {
  /** 지정하지 않으면 PC 카드(radius-14, space-20). */
  variant?: "row" | "compact" | "tint";
  /** shadow-card. 로그인·가입 카드에만 쓴다. */
  elevated?: boolean;
};

type CardProps =
  | (CardOwnProps & { as?: "div" | "section" } & HTMLAttributes<HTMLElement>)
  | (CardOwnProps & { as: "a" } & AnchorHTMLAttributes<HTMLAnchorElement>);

/** `.wl-card`. 머리·본문 배치는 자식이 정한다. */
export function Card({ as: Element = "div", variant, elevated, className, ...rest }: CardProps) {
  const classes = cx(
    "wl-card",
    variant && `wl-card--${variant}`,
    elevated && "wl-card--elevated",
    className,
  );

  if (Element === "a") {
    return <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }
  return <Element className={classes} {...(rest as HTMLAttributes<HTMLElement>)} />;
}
