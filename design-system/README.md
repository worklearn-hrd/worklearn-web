# design-system

워크런 디자인 시스템의 값과 클래스. 원본은 `worklearn-docs/design/design-system/`이고, 여기 있는 것은 그 복사본과 복사본에서 만든 파일이다.

| 파일 | 내용 | 고치는 법 |
| --- | --- | --- |
| `tokens.json` | 색·글자·간격·반지름·크기 토큰 | 원본에서 복사 |
| `bundle.css` | `.wl-*` 컴포넌트 클래스 | 원본에서 복사 |
| `tokens.css` | `tokens.json`에서 만든 CSS 변수와 Tailwind 테마 | `npm run tokens` |

출처 커밋: `worklearn-hrd/worklearn-docs@6ae8a9d72e70c29c8d640781b4dd95006cf55ebc`

## 원본이 바뀌었을 때

1. `tokens.json`과 `bundle.css`를 원본에서 다시 복사한다. `bundle.css` 머리의 출처 주석은 유지한다.
2. 이 문서와 `bundle.css` 머리의 출처 커밋을 고친다.
3. `npm run tokens`로 `tokens.css`를 다시 만든다.
4. `npm test`로 스냅샷과 규칙 검사를 돌린다.

## 쓰는 법

- 컴포넌트는 `components/`의 React 컴포넌트를 쓴다. `.wl-*` 클래스 하나에 컴포넌트 하나다.
- 화면 배치에는 토큰 이름의 Tailwind 유틸리티만 쓴다: `bg-ground`, `text-ink-secondary`, `p-20`, `gap-16`, `rounded-14`, `text-title-22`, `h-control`, `max-w-content-max`.
- `style` 속성, 색상 코드, `px` 숫자, `p-[13px]` 같은 임의 값은 쓰지 않는다. `npm test`가 검사한다.
