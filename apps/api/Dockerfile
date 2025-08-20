# ---------- Build stage ----------
FROM node:22-alpine AS build
WORKDIR /app

# Enable corepack (bundles yarn)
RUN corepack enable

# Copy manifests first (better cache)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source and build
COPY . .
RUN yarn build

# ---------- Runtime stage ----------
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Use node_modules from build (already resolved with yarn)
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist ./dist

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --retries=10 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "dist/main.js"]
