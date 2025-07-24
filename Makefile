# Makefile for Dinesh's Personal Website
# Usage: make <command>

.PHONY: help run build stop deploy clean status logs test-deploy dev restart rebuild clean-test

# Default target
.DEFAULT_GOAL := help

# Docker settings
IMAGE_NAME := dinesh-live
CONTAINER_NAME := dinesh-personal-website
PORT := 8080

# Auto-detect docker compose command (newer Docker uses 'docker compose', older uses 'docker-compose')
DOCKER_COMPOSE := $(shell if command -v docker-compose >/dev/null 2>&1; then echo "docker-compose"; else echo "docker compose"; fi)
DOCKER_COMPOSE_FILE := docker/docker-compose.yml

## Help - Show available commands
help:
	@echo "🚀 Dinesh's Personal Website - Make Commands"
	@echo ""
	@echo "Available commands:"
	@echo "  make run         - Start the website server (Docker)"
	@echo "  make dev         - Start local development server (Python)"
	@echo "  make build       - Build the Docker image"
	@echo "  make test-deploy - Test Docker deployment locally"
	@echo "  make deploy      - Deploy to GitHub Pages via Docker"
	@echo "  make stop        - Stop the running container"
	@echo "  make status      - Check container status"
	@echo "  make logs        - View container logs"
	@echo "  make clean       - Clean up Docker resources"
	@echo "  make clean-test  - Clean up test deployment"
	@echo ""
	@echo "🌐 After running 'make run', visit: http://localhost:$(PORT)"

## Run - Start the website server using Docker Compose
run:
	@echo "🚀 Starting website server..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d
	@echo "✅ Server running at http://localhost:$(PORT)"

## Build - Build the Docker image
build:
	@echo "🔨 Building Docker image..."
	@docker build -f docker/Dockerfile -t $(IMAGE_NAME):latest .

## Stop - Stop the running container
stop:
	@echo "🛑 Stopping website server..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down
	@echo "✅ Server stopped!"

## Deploy - Commit changes and push to GitHub (triggers Docker-based GitHub Pages deployment)
deploy:
	@echo "🚀 Deploying to GitHub Pages..."
	@git add .
	@read -p "💬 Commit message (or press Enter for default): " msg; \
	if [ -z "$$msg" ]; then \
		git commit -m "Deploy website - $(shell date '+%Y-%m-%d %H:%M:%S')"; \
	else \
		git commit -m "$$msg"; \
	fi
	@git push origin main
	@echo "✅ Deployment started! Check status at: https://github.com/DineshGuduru/dinesh-live/actions"

## Status - Check container status
status:
	@echo "📊 Container Status:"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) ps

## Logs - View container logs
logs:
	@echo "📋 Container Logs:"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) logs -f

## Clean - Clean up Docker resources
clean:
	@echo "🧹 Cleaning up Docker resources..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down --rmi all --volumes --remove-orphans 2>/dev/null || true
	@docker system prune -f
	@echo "✅ Cleanup completed!"

## Test Deploy - Test the Docker-based deployment locally
test-deploy: build
	@echo "🚀 Starting test deployment..."
	@docker run -d -p $(PORT):80 --name $(CONTAINER_NAME)-test $(IMAGE_NAME):latest
	@echo "✅ Test deployment running at http://localhost:$(PORT)"
	@echo "🛑 Stop with: make clean-test"

## Clean Test - Clean up test deployment
clean-test:
	@echo "🧹 Stopping test deployment..."
	@docker stop $(CONTAINER_NAME)-test 2>/dev/null || true
	@docker rm $(CONTAINER_NAME)-test 2>/dev/null || true
	@echo "✅ Test deployment cleaned up!"

## Dev - Start local development server (Python)
dev:
	@echo "🔧 Starting development server at http://localhost:8000"
	@echo "🛑 Press Ctrl+C to stop"
	@cd app && python3 -m http.server 8000

## Quick commands for common tasks
restart: stop run
rebuild: clean build run 