# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build static files
COPY . .
RUN npm run build

# Stage 2: Production Server
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Clean default Nginx files and copy static build
RUN rm -rf ./*
COPY --from=build /app/dist .

# Configure Nginx for static SPA/SSG routing
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    error_page 404 /404.html; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
