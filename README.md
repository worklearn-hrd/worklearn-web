# worklearn-web

워크런(WorkLearn)의 프론트엔드. 학습자(모바일·PC), 운영자, 플랫폼 운영자 화면을 Next.js(App Router)와 TypeScript로 만든다. 화면 배치와 스타일 규칙은 [worklearn-docs](https://github.com/worklearn-hrd/worklearn-docs)의 디자인 브리프와 디자인 시스템을 따른다.

## 실행

Node 버전은 `.nvmrc`를 따른다.

```sh
npm ci
npm run dev    # http://localhost:3000
```

| 명령 | 하는 일 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run lint` | ESLint |
| `npx next typegen && npx tsc --noEmit` | 타입 검사 |

CI는 PR마다 타입 검사, lint, 빌드를 돌린다.

## Docker

```sh
docker build -t worklearn-web .
docker run --rm -p 3000:3000 worklearn-web
```
