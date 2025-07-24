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
	@echo "  make deploy      - Deploy to GitHub Pages via Docker (commit & push)"
	@echo "  make test-deploy - Test Docker deployment locally"
	@echo "  make status      - Check container status"
	@echo "  make logs        - View container logs"
	@echo "  make clean       - Clean up Docker resources"
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

## Deploy - Commit changes and push to GitHub (triggers Docker-based GitHub Pages deployment)
deploy:
	@echo "🚀 Deploying to GitHub Pages via Docker..."
	@echo "📝 Adding all changes..."
	@git add .
	@echo "💬 Enter commit message (or press Enter for default):"
	@read -p "Commit message: " msg; \
	if [ -z "$$msg" ]; then \
		git commit -m "Deploy website - $(shell date '+%Y-%m-%d %H:%M:%S')"; \
	else \
		git commit -m "$$msg"; \
	fi
	@echo "📤 Pushing to GitHub..."
	@git push origin main
	@echo "✅ Deployment started! GitHub Actions will build and deploy using Docker."
	@echo "🔄 Check deployment status: https://github.com/DineshGuduru/dinesh-live/actions"
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

## Test Deploy - Test the Docker-based deployment locally
test-deploy:
	@echo "🔨 Testing Docker deployment locally..."
	@docker build -f docker/Dockerfile -t dinesh-live-test .
	@docker run -d -p 8080:80 --name dinesh-live-test dinesh-live-test
	@echo "✅ Test deployment running at http://localhost:8080"
	@echo "🛑 Stop with: docker stop dinesh-live-test && docker rm dinesh-live-test"

## Dev - Start local development server (Python)
dev:
	@echo "🔧 Starting local development server..."
	@echo "🌐 Visit: http://localhost:8000"
	@echo "🛑 Press Ctrl+C to stop"
	@cd app && python3 -m http.server 8000

## Quick commands for common tasks
restart: stop run
rebuild: clean build run 