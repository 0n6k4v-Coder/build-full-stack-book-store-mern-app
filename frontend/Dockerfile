# =============================================================================
# Stage 1: Builder
# =============================================================================
# ใช้ node:lts-alpine เพื่อความเล็กและ security (Alpine-based)
FROM node:lts-alpine AS builder

# ตั้ง working directory
WORKDIR /app

# Copy เฉพาะ dependency files ก่อน เพื่อ leverage Docker layer cache
# Docker จะ re-run npm ci เฉพาะเมื่อ package*.json เปลี่ยนเท่านั้น
COPY package.json package-lock.json ./

# ติดตั้ง dependencies แบบ clean install (ไม่แก้ไข package-lock.json)
RUN npm ci

# Copy source code ทั้งหมด
COPY . .

# Build production bundle (tsc type-check + vite build → /app/dist)
RUN npm run build

# =============================================================================
# Stage 2: Production Runtime
# =============================================================================
# ใช้ nginx:stable-alpine — image เล็ก, stable, เหมาะสำหรับ serve static files
FROM nginx:stable-alpine AS production

# สร้าง non-root user เพื่อ security (ตาม Docker best practices)
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Copy built static files จาก builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ปรับ permission ให้ nginx สามารถ write logs/cache ได้ในฐานะ non-root
RUN chown -R appuser:appgroup /var/cache/nginx /var/log/nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown appuser:appgroup /var/run/nginx.pid

# เปลี่ยนไปใช้ non-root user
USER appuser

# Expose port 80 (nginx default)
EXPOSE 80

# Health check — ตรวจสอบว่า nginx ยังทำงานอยู่
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://127.0.0.1:80/ || exit 1

# รัน nginx ใน foreground (daemon off คือ Docker best practice)
CMD ["nginx", "-g", "daemon off;"]
