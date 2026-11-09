# Node 버전은 .nvmrc와 맞춘다.
ARG NODE_VERSION=22.22.0-slim

# 1단계(build): 의존성을 설치하고 standalone 출력으로 빌드한다.
FROM node:${NODE_VERSION} AS build
WORKDIR /app

# 패키지 정의만 먼저 복사해 의존성을 설치한다.
# 소스만 바뀐 빌드에서는 이 층이 캐시에서 재사용된다.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 2단계(run): standalone 서버와 정적 파일만 담는다. node_modules 전체와 소스는 남지 않는다.
FROM node:${NODE_VERSION}
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

# 실행 중 생기는 캐시를 비root 계정이 쓸 수 있게 한다.
RUN mkdir .next && chown node:node .next

COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]
