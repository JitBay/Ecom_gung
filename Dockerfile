# Multi-stage Dockerfile for Vela Labs E-commerce Storefront

# Stage 1: Build the React + Vite static bundle
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency lock files for caching
COPY package.json package-lock.json ./

# Clean installation of dependencies
RUN npm ci

# Copy project files (respecting .dockerignore)
COPY . .

# Build the production bundle into /app/dist
RUN npm run build

# Stage 2: Production Nginx web server
FROM nginx:1.27-alpine AS runner

# Remove default static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build artifacts from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose standard HTTP port
EXPOSE 80

# Health check to ensure Nginx is serving the application
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
