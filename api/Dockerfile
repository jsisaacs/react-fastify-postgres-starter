FROM node:lts

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY api/package.json api/

RUN pnpm install --frozen-lockfile --filter api

COPY api/. api/

WORKDIR /app/api

CMD ["pnpm", "run", "dev"]