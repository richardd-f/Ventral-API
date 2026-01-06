FROM node:22-alpine AS builder

RUN apk add --no-cache python3 make g++

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
COPY prisma ./prisma/

RUN pnpm install --frozen-lockfile

ENV DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy"

COPY . .

RUN pnpm exec prisma generate
RUN pnpm run build


FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g pnpm

COPY pnpm-lock.yaml package.json ./
COPY prisma ./prisma/

RUN pnpm install --prod --frozen-lockfile

# 🔑 regenerate prisma client HERE
ENV DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy"
RUN pnpm exec prisma generate

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
