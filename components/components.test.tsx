import { Play } from "lucide-react";
import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import { Brand } from "./Brand";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";
import { StatusBadge } from "./StatusBadge";
import { Tag } from "./Tag";

const html = (element: ReactElement) => renderToStaticMarkup(element);

describe("Button", () => {
  test("기본은 secondary이고 type은 button이다", () => {
    expect(html(<Button>취소</Button>)).toMatchInlineSnapshot(
      `"<button type="button" class="wl-btn wl-btn--secondary">취소</button>"`,
    );
  });

  test("variant·size·block을 modifier 클래스로 옮긴다", () => {
    expect(
      html(
        <Button variant="primary" size="xl" block type="submit">
          로그인
        </Button>,
      ),
    ).toMatchInlineSnapshot(
      `"<button type="submit" class="wl-btn wl-btn--primary wl-btn--xl wl-btn--block">로그인</button>"`,
    );
  });

  test("pill의 선택 상태는 is-active다", () => {
    expect(
      html(
        <Button variant="pill" active>
          전체
        </Button>,
      ),
    ).toMatchInlineSnapshot(
      `"<button type="button" class="wl-btn wl-btn--pill is-active">전체</button>"`,
    );
  });

  test("아이콘은 라벨 왼쪽에 온다", () => {
    const markup = html(
      <Button variant="primary" leadingIcon={<Play />}>
        이어보기
      </Button>,
    );
    expect(markup).toMatch(/^<button type="button" class="wl-btn wl-btn--primary"><svg [^>]*>.*<\/svg>이어보기<\/button>$/);
  });

  test("아이콘만 있는 버튼과 비활성", () => {
    expect(
      html(
        <Button iconOnly aria-label="검색" disabled>
          <Play />
        </Button>,
      ),
    ).toMatch(/^<button type="button" class="wl-btn wl-btn--secondary wl-btn--icon" aria-label="검색" disabled="">/);
  });
});

describe("Input", () => {
  test("라벨과 도움말을 입력에 연결한다", () => {
    expect(
      html(<Input id="email" label="이메일" type="email" help="회사 이메일을 입력하세요." />),
    ).toMatchInlineSnapshot(
      `"<div class="wl-field"><label class="wl-label" for="email">이메일</label><input id="email" class="wl-input" aria-describedby="email-help" type="email"/><p id="email-help" class="wl-help">회사 이메일을 입력하세요.</p></div>"`,
    );
  });

  test("오류가 있으면 is-invalid와 오류 문구를 보인다", () => {
    expect(
      html(<Input id="name" label="이름" help="도움말" error="이름은 2자 이상이어야 합니다." />),
    ).toMatchInlineSnapshot(
      `"<div class="wl-field"><label class="wl-label" for="name">이름</label><input id="name" class="wl-input is-invalid" aria-invalid="true" aria-describedby="name-help"/><p id="name-help" class="wl-help wl-help--error">이름은 2자 이상이어야 합니다.</p></div>"`,
    );
  });

  test("id를 주지 않아도 라벨이 입력을 가리킨다", () => {
    const markup = html(<Input label="비밀번호" type="password" />);
    const inputId = /<input id="([^"]+)"/.exec(markup)?.[1];
    expect(inputId).toBeTruthy();
    expect(markup).toContain(`<label class="wl-label" for="${inputId}">`);
    expect(markup).not.toContain("aria-describedby");
  });
});

describe("Card", () => {
  test("기본은 div다", () => {
    expect(html(<Card>내용</Card>)).toMatchInlineSnapshot(`"<div class="wl-card">내용</div>"`);
  });

  test("tint와 elevated", () => {
    expect(
      html(
        <Card as="section" variant="tint" elevated>
          내용
        </Card>,
      ),
    ).toMatchInlineSnapshot(
      `"<section class="wl-card wl-card--tint wl-card--elevated">내용</section>"`,
    );
  });

  test("링크 카드", () => {
    expect(
      html(
        <Card as="a" variant="compact" href="/courses/1">
          과정
        </Card>,
      ),
    ).toMatchInlineSnapshot(`"<a class="wl-card wl-card--compact" href="/courses/1">과정</a>"`);
  });
});

describe("Tag", () => {
  test("기본은 accent 톤이다", () => {
    expect(html(<Tag>Spring</Tag>)).toMatchInlineSnapshot(`"<span class="wl-tag">Spring</span>"`);
  });

  test("size·tone·strong", () => {
    expect(
      html(
        <Tag size="sm" tone="neutral" strong>
          +2
        </Tag>,
      ),
    ).toMatchInlineSnapshot(
      `"<span class="wl-tag wl-tag--sm wl-tag--neutral wl-tag--strong">+2</span>"`,
    );
  });
});

describe("StatusBadge", () => {
  test("tone을 modifier 클래스로 옮긴다", () => {
    expect(html(<StatusBadge tone="success">공개됨</StatusBadge>)).toMatchInlineSnapshot(
      `"<span class="wl-badge wl-badge--success">공개됨</span>"`,
    );
    expect(html(<StatusBadge tone="dday">D-3</StatusBadge>)).toMatchInlineSnapshot(
      `"<span class="wl-badge wl-badge--dday">D-3</span>"`,
    );
  });

  test("overlay의 accent는 is-accent다", () => {
    expect(
      html(
        <StatusBadge tone="overlay" accent>
          Shorts
        </StatusBadge>,
      ),
    ).toMatchInlineSnapshot(`"<span class="wl-badge wl-badge--overlay is-accent">Shorts</span>"`);
  });
});

describe("Brand", () => {
  test("로고 타일과 워드마크", () => {
    expect(html(<Brand />)).toMatchInlineSnapshot(
      `"<span class="wl-brand"><span class="wl-mark text-ink-on-accent"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 19.2 8.88 4.8l3.3 8.4 3.3-8.4L21 19.2"></path></svg></span><span class="wl-wordmark">워크런</span></span>"`,
    );
  });
});
