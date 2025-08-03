# Makefile for Pomodoro App Docker Operations

.PHONY: help dev web build clean docker-build docker-clean

# Default target
help:
	@echo "🍅 Pomodoro App Docker Commands"
	@echo ""
	@echo "Available commands:"
	@echo "  make dev      - Start development server"
	@echo "  make web      - Build and run production web server"
	@echo "  make build    - Build standalone app"
	@echo "  make clean    - Clean up Docker resources"
	@echo "  make help     - Show this help message"
	@echo ""

# Development server
dev:
	@echo "🚀 Starting development server..."
	./docker-run.sh dev

# Production web server
web:
	@echo "🌐 Starting production web server..."
	./docker-run.sh web

# Build standalone app
build:
	@echo "📦 Building standalone app..."
	./docker-run.sh build

# Clean Docker resources
clean:
	@echo "🧹 Cleaning up Docker resources..."
	./docker-run.sh clean

# Build Docker images
docker-build:
	@echo "🔨 Building Docker images..."
	docker-compose build

# Clean Docker images
docker-clean:
	@echo "🗑️  Cleaning Docker images..."
	docker system prune -f 