/** `.wl-brand` — 로고 타일(`.wl-mark`) + 워드마크(`.wl-wordmark`). */
export function Brand() {
  return (
    <span className="wl-brand">
      <span className="wl-mark text-ink-on-accent">
        {/* worklearn-mark.svg의 W를 24 viewBox로 옮긴 것. 선 2.5, 둥근 끝. */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 19.2 8.88 4.8l3.3 8.4 3.3-8.4L21 19.2" />
        </svg>
      </span>
      <span className="wl-wordmark">워크런</span>
    </span>
  );
}
