# Stage 1: Dependencies & Build
FROM node:22-alpine AS builder

# Install build essentials for native modules like bcrypt
RUN apk add --no-cache python3 make g++ 

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy lockfile and package.json first for better caching
COPY pnpm-lock.yaml package.json ./
COPY prisma ./prisma/

# Install all dependencies
RUN pnpm install --frozen-lockfile
ENV DATABASE_URL="postgresql://postgres:12345678@localhost:5432/asdfg"

# Copy source code
COPY . .

# Generate Prisma Client and build TypeScript
RUN pnpm exec prisma generate
RUN pnpm run build

# --- Stage 2: Production Runner ---
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Install pnpm in runner stage as well
RUN npm install -g pnpm

# Only copy production dependencies and built files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]