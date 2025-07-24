# Makefile for Dinesh's Personal Website
# Usage: make <command>

.PHONY: help run build stop deploy clean status logs

# Default target
.DEFAULT_GOAL := help

# Docker settings
IMAGE_NAME := dinesh-live
CONTAINER_NAME := dinesh-personal-website
PORT := 8080

## Help - Show available commands
help:
	@echo "🚀 Dinesh's Personal Website - Make Commands"
	@echo ""
	@echo "Available commands:"
	@echo "  make run         - Start the website server (Docker)"
	@echo "  make build       - Build the Docker image"
	@echo "  make stop        - Stop the running container"
	@echo "  make deploy      - Deploy to GitHub Pages (commit & push)"
	@echo "  make status      - Check container status"
	@echo "  make logs        - View container logs"
	@echo "  make clean       - Clean up Docker resources and deployment artifacts"
	@echo "  make clean-deploy - Clean deployment artifacts only"
	@echo "  make dev         - Start local development server (Python)"
	@echo "  make help        - Show this help message"
	@echo ""
	@echo "🌐 After running 'make run', visit: http://localhost:$(PORT)"

## Run - Start the website server using Docker Compose
run:
	@echo "🚀 Starting website server..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d
	@echo "✅ Server started successfully!"
	@echo "🌐 Visit: http://localhost:$(PORT)"
	@echo "📝 Use 'make logs' to view logs or 'make stop' to stop"

## Build - Build the Docker image
build:
	@echo "🔨 Building Docker image..."
	@chmod +x docker/docker-build.sh
	@cd docker && ./docker-build.sh

## Stop - Stop the running container
stop:
	@echo "🛑 Stopping website server..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down
	@echo "✅ Server stopped successfully!"

## Deploy - Commit changes and push to GitHub (triggers GitHub Pages)
deploy:
	@echo "🚀 Deploying to GitHub Pages..."
	@echo "📁 Copying app files to root for GitHub Pages..."
	@cp app/index.html .
	@cp app/style.css .
	@cp app/script.js .
	@cp -r app/images . 2>/dev/null || true
	@echo "📝 Adding all changes..."
	@git add .
	@echo "💬 Enter commit message (or press Enter for default):"
	@read -p "Commit message: " msg; \
	if [ -z "$$msg" ]; then \
		git commit -m "Update website - $(shell date '+%Y-%m-%d %H:%M:%S')"; \
	else \
		git commit -m "$$msg"; \
	fi
	@echo "📤 Pushing to GitHub..."
	@git push origin main
	@echo "✅ Deployed! Changes will be live at GitHub Pages in a few minutes"
	@echo "🌐 Live URL: https://dineshguduru.github.io/dinesh-live/"

## Status - Check container status
status:
	@echo "📊 Container Status:"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) ps

## Logs - View container logs
logs:
	@echo "📋 Container Logs:"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) logs -f

## Clean - Clean up Docker resources and deployment artifacts
clean:
	@echo "🧹 Cleaning up Docker resources..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down --rmi all --volumes --remove-orphans 2>/dev/null || true
	@docker system prune -f
	@echo "🧹 Cleaning up deployment artifacts..."
	@rm -rf index.html style.css script.js images/ 2>/dev/null || true
	@echo "✅ Cleanup completed!"

## Clean Deploy - Clean deployment artifacts only
clean-deploy:
	@echo "🧹 Cleaning deployment artifacts..."
	@rm -rf index.html style.css script.js images/ 2>/dev/null || true
	@echo "✅ Deployment artifacts cleaned!"

## Dev - Start local development server (Python)
dev:
	@echo "🔧 Starting local development server..."
	@echo "🌐 Visit: http://localhost:8000"
	@echo "🛑 Press Ctrl+C to stop"
	@cd app && python3 -m http.server 8000

## Quick commands for common tasks
restart: stop run
rebuild: clean build run 