# ---------- STAGE 1: builder (install all deps and build) ----------
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm@10.17.1

WORKDIR /app
# Use development here so pnpm will install dev deps
ENV NODE_ENV=development

# Copy package files and install ALL dependencies (dev + prod)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy app source and build
COPY . .
RUN pnpm run build

# ---------- STAGE 2: runtime (only production deps) ----------
FROM node:20-alpine AS runtime

# Install pnpm (used to install production deps)
RUN npm install -g pnpm@10.17.1

WORKDIR /app
ENV NODE_ENV=production

# Copy package files (needed for installing prod deps)
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies in the runtime image
RUN pnpm install --frozen-lockfile --prod

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

EXPOSE 9000
CMD ["node", "dist/index.js"]
