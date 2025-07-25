# Stage 1: Generate HTML from templates
FROM python:3.11-alpine AS generator

# Install dependencies
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY app/ .

# Generate the complete index.html from templates
RUN python scripts/generate_content.py

# Stage 2: Serve with nginx
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy generated website files from the generator stage
COPY --from=generator /app/ .

# Copy custom nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Add labels for better container management
LABEL maintainer="dineshvarma.guduru@gmail.com"
LABEL description="Personal website of Dineshvarma Guduru - Generated from templates"
LABEL version="2.0"

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 