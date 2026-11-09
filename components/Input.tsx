import { useId, type InputHTMLAttributes } from "react";
import { cx } from "./cx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  /** 입력 아래 도움말. */
  help?: string;
  /** 오류 문구. 있으면 도움말 대신 보이고 입력이 is-invalid가 된다. */
  error?: string;
};

/** `.wl-field` + `.wl-label` + `.wl-input` + `.wl-help`. 라벨과 도움말을 입력에 연결한다. */
export function Input({ label, help, error, id, className, ...rest }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const message = error ?? help;
  const messageId = message ? `${inputId}-help` : undefined;

  return (
    <div className="wl-field">
      <label className="wl-label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={cx("wl-input", error && "is-invalid", className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={messageId}
        {...rest}
      />
      {message ? (
        <p id={messageId} className={cx("wl-help", error && "wl-help--error")}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
