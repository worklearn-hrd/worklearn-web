import { Play, Plus, Search } from "lucide-react";
import type { ReactNode } from "react";
import { Brand } from "@/components/Brand";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { StatusBadge } from "@/components/StatusBadge";
import { Tag } from "@/components/Tag";

// 임시 화면: 기본 컴포넌트를 한눈에 확인하는 미리보기. 첫 화면(L1 로그인)이 생기면 이 페이지는 바꾼다.

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-12">
      <h2 className="text-heading-16">{title}</h2>
      {children}
    </section>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-12">{children}</div>;
}

export default function Home() {
  return (
    <main className="mx-auto flex max-w-content-max flex-col gap-28 px-24 py-32">
      <header className="flex flex-col gap-8">
        <Brand />
        <h1 className="text-title-22">컴포넌트 미리보기</h1>
        <p className="text-body-13 text-ink-secondary">
          디자인 토큰과 기본 컴포넌트 · Button · Input · Card · Tag · StatusBadge
        </p>
      </header>

      <Section title="Button">
        <Card>
          <div className="flex flex-col gap-16">
            <Row>
              <Button variant="primary" leadingIcon={<Play />}>
                이어보기
              </Button>
              <Button>취소</Button>
              <Button variant="danger">테넌트 정지</Button>
              <Button variant="tint" leadingIcon={<Plus />}>
                태그 추가
              </Button>
              <Button variant="dashed" leadingIcon={<Plus />}>
                콘텐츠 추가
              </Button>
              <Button variant="primary" disabled>
                저장 중…
              </Button>
            </Row>
            <Row>
              <Button variant="pill" active>
                전체
              </Button>
              <Button variant="pill">Spring</Button>
              <Button variant="pill">리더십</Button>
              <Button iconOnly aria-label="검색">
                <Search />
              </Button>
            </Row>
            <Row>
              <Button variant="primary" size="sm">
                승인
              </Button>
              <Button variant="primary">저장</Button>
              <Button variant="primary" size="lg">
                시작하기
              </Button>
              <Button variant="primary" size="xl">
                로그인
              </Button>
            </Row>
            <div className="max-w-mobile-width">
              <Button variant="primary" size="xl" block>
                로그인
              </Button>
            </div>
            <div className="flex rounded-12 bg-dark-ground p-16">
              <Button variant="dark">1.25x</Button>
            </div>
          </div>
        </Card>
      </Section>

      <Section title="Input">
        <Card>
          <div className="flex max-w-mobile-width flex-col gap-16">
            <Input label="이메일" type="email" placeholder="hr@company.com" />
            <Input label="비밀번호" type="password" help="8자 이상 입력하세요." />
            <Input
              label="이름"
              defaultValue="홍"
              error="이름은 2자 이상이어야 합니다."
            />
          </div>
        </Card>
      </Section>

      <Section title="Card">
        <div className="grid grid-cols-2 items-start gap-16">
          <Card>
            <p className="text-heading-16">기본</p>
            <p className="text-body-13 text-ink-secondary">PC 카드·패널 · radius-14 · space-20</p>
          </Card>
          <Card variant="row">
            <p className="text-body-13">row · 한 줄짜리 설정 행</p>
          </Card>
          <Card variant="compact">
            <p className="text-heading-16-medium">compact</p>
            <p className="text-caption-12 text-ink-secondary">모바일 목록 카드 · radius-12 · space-12</p>
          </Card>
          <Card variant="tint">
            <p className="text-caption-12-strong text-accent">학습 이어하기</p>
            <p className="text-heading-16-medium">Spring Bean 생명주기</p>
            <p className="text-body-13 text-ink-secondary">10분만 더 보면 끝나요</p>
          </Card>
          <Card elevated>
            <p className="text-heading-16">elevated</p>
            <p className="text-body-13 text-ink-secondary">로그인·가입 카드에만 쓰는 그림자</p>
          </Card>
        </div>
      </Section>

      <Section title="Tag">
        <Card>
          <Row>
            <Tag>Spring</Tag>
            <Tag>DI</Tag>
            <Tag strong>AOP</Tag>
            <Tag size="sm">Spring</Tag>
            <Tag tone="neutral">+2</Tag>
          </Row>
        </Card>
      </Section>

      <Section title="StatusBadge">
        <Card>
          <div className="flex flex-col gap-16">
            <Row>
              <StatusBadge tone="success">공개됨</StatusBadge>
              <StatusBadge tone="warning">검토 필요</StatusBadge>
              <StatusBadge tone="critical">실패</StatusBadge>
              <StatusBadge tone="accent">처리 중</StatusBadge>
              <StatusBadge tone="neutral">초안</StatusBadge>
              <StatusBadge tone="dday">D-3</StatusBadge>
            </Row>
            <Row>
              <div className="flex rounded-12 bg-dark-ground p-16">
                <StatusBadge tone="dark-accent">재생 중</StatusBadge>
              </div>
              {/* overlay 배지는 섬네일 위에 겹쳐 쓴다. */}
              <div className="wl-thumb">
                <StatusBadge tone="overlay">38:02</StatusBadge>
              </div>
              <div className="wl-thumb">
                <StatusBadge tone="overlay" accent>
                  Shorts
                </StatusBadge>
              </div>
            </Row>
          </div>
        </Card>
      </Section>
    </main>
  );
}
