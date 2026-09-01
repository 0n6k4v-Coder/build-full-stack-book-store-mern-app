# =============================================================================
# Backend Dockerfile — Node.js / Express API
# Single-stage, production-ready with non-root user
# =============================================================================

FROM node:lts-alpine AS base
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
COPY . .
EXPOSE 5000
USER node
CMD ["node", "server.js"]
