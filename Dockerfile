# Multi-package deployment for the UI app
FROM node:18-alpine AS deps
WORKDIR /app
COPY ui/package*.json ./ui/
RUN cd ui && npm install --production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/ui/node_modules ./ui/node_modules
COPY . .
RUN cd ui && npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/ui/.next ./ui/.next
COPY --from=builder /app/ui/public ./ui/public
COPY ui/package*.json ./ui/
EXPOSE 3000
CMD ["npm", "--prefix", "ui", "start"]
