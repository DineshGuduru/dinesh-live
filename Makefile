# Makefile for Dinesh's Personal Website
# Usage: make <command>

.PHONY: help dev stop clean push pull status logs check

# Default target
.DEFAULT_GOAL := help

# Docker commands
DOCKER_COMPOSE := docker compose
DOCKER_COMPOSE_FILE := docker/docker-compose.yml
PORT := 8080

## Help - Show available commands
help:
	@echo "🚀 Dinesh's Personal Website - Simplified Commands"
	@echo ""
	@echo "🔥 Essential Commands:"
	@echo "  make dev         - 🚀 Main development workflow (rebuild + serve)"
	@echo "  make stop        - 🛑 Stop the server"
	@echo "  make clean       - 🧹 Clean up all Docker resources"
	@echo "  make push        - ⬆️  Push changes to current branch"
	@echo "  make pull        - ⬇️  Pull latest changes from current branch"
	@echo ""
	@echo "📊 Monitoring:"
	@echo "  make status      - 📈 Check container status"
	@echo "  make logs        - 📋 View container logs"
	@echo ""
	@echo "🔧 Optional:"
	@echo "  make check       - ✅ Validate config.yml syntax"
	@echo ""
	@echo "🌐 Development server: http://localhost:$(PORT)"
	@echo "💡 Start with: make dev"

## Dev - Main development workflow (rebuild website + run server)
dev:
	@echo "🔄 Starting development workflow..."
	@echo "📦 Rebuilding website with updated templates in Docker..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) build --no-cache
	@echo "🚀 Starting website server..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d
	@echo "✅ Development server ready! Visit http://localhost:$(PORT)"

## Stop - Stop the running container
stop:
	@echo "🛑 Stopping website server..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down
	@echo "✅ Server stopped!"

## Clean - Clean up all Docker resources
clean:
	@echo "🧹 Cleaning up Docker resources..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down --rmi all --volumes --remove-orphans || true
	@docker builder prune -f || true
	@echo "✅ Cleanup completed!"

## Push - Commit changes and push to GitHub (triggers deployment)
push:
	@echo "🚀 Deploying to GitHub Pages..."
	@git add .
	@read -p "💬 Commit message (or press Enter for default): " msg; \
	if [ -z "$$msg" ]; then \
		git commit -m "Deploy website - $(shell date '+%Y-%m-%d %H:%M:%S')"; \
	else \
		git commit -m "$$msg"; \
	fi
	@CURRENT_BRANCH=$$(git rev-parse --abbrev-ref HEAD); \
	echo "📤 Pushing to branch: $$CURRENT_BRANCH"; \
	git push origin "$$CURRENT_BRANCH"
	@echo "✅ Deployment started! Check status at: https://github.com/DineshGuduru/dinesh-live/actions"

## Pull - Pull latest changes from current branch
pull:
	@echo "🔄 Pulling latest changes..."
	@CURRENT_BRANCH=$$(git rev-parse --abbrev-ref HEAD); \
	echo "📥 Pulling from branch: $$CURRENT_BRANCH"; \
	git pull origin "$$CURRENT_BRANCH"
	@echo "✅ Pull completed!"

## Status - Check container status
status:
	@echo "📊 Container Status:"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) ps

## Logs - View container logs
logs:
	@echo "📋 Container Logs:"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) logs -f

## Check - Validate YAML syntax (optional, requires Python)
check:
	@echo "🔍 Checking config.yml syntax..."
	@command -v python3 >/dev/null 2>&1 || { echo "❌ Python3 not found. Skipping YAML validation."; exit 0; }
	@cd app && python3 -c "import yaml; yaml.safe_load(open('config.yml'))" 2>/dev/null && echo "✅ YAML syntax is valid!" || echo "❌ YAML validation failed or PyYAML not installed"

blog:
	@read -p "Enter blog post title: " title; \
	filename=$$(echo "$$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-'); \
	filepath="app/blog/$$filename.md"; \
	if [ -f "$$filepath" ]; then \
		echo "❌ Blog post already exists!"; \
	else \
		echo "---" > "$$filepath"; \
		echo "title: $$title" >> "$$filepath"; \
		echo "date: $$(date '+%Y-%m-%d')" >> "$$filepath"; \
		echo "tags: []" >> "$$filepath"; \
		echo "description: " >> "$$filepath"; \
		echo "---" >> "$$filepath"; \
		echo "" >> "$$filepath"; \
		echo "# $$title" >> "$$filepath"; \
		echo "" >> "$$filepath"; \
		echo "✅ Created new blog post: $$filepath"; \
		echo "📝 Edit the blog post and run 'make dev' to see the changes."; \
	fi
