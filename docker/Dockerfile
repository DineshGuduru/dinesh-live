# Use the official nginx image as base
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static website files to nginx html directory
COPY app/ .

# Copy custom nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Add labels for better container management
LABEL maintainer="dineshvarma.guduru@gmail.com"
LABEL description="Dineshvarma Guduru's Personal Website"
LABEL version="1.0"

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 