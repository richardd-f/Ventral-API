# -------- Stage 1: Builder --------
FROM node:22-alpine AS builder

RUN apk add --no-cache python3 make g++

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
COPY prisma ./prisma/

RUN pnpm install --frozen-lockfile

# Dummy DB for Prisma generate (no real connection)
ENV DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy"

COPY . .

RUN pnpm exec prisma generate
RUN pnpm run build


# -------- Stage 2: Runner --------
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

# Install only production deps
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000

CMD ["node", "dist/main.js"]
