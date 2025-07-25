# Stage 1: Generate static content
FROM python:3.11-alpine as generator

# Install git for potential use in the build process
RUN apk add --no-cache git

WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY app/ .

# Create necessary directories
RUN mkdir -p images/blog

# Generate the complete index.html and blog HTML files from templates
RUN python scripts/generate_content.py

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy generated files from builder
COPY --from=generator /app/ .

# Create necessary directories and set permissions
RUN mkdir -p /var/log/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && chown -R nginx:nginx /usr/share/nginx/html

# Switch to non-root user
USER nginx

# Expose port 80
EXPOSE 80

# Add labels for better container management
LABEL maintainer="dineshvarma.guduru@gmail.com"
LABEL description="Personal website of Dineshvarma Guduru - Generated from templates"
LABEL version="2.0"

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 