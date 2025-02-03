FROM node:lts

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY frontend/package.json frontend/

RUN pnpm install --frozen-lockfile --filter frontend

COPY frontend/. frontend/

WORKDIR /app/frontend

CMD ["pnpm", "run", "dev"]