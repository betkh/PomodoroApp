#!/bin/bash

# Docker run script for Pomodoro App

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev     - Start development server"
    echo "  web     - Build and run production web server"
    echo "  build   - Build standalone app"
    echo "  clean   - Clean up Docker containers and images"
    echo "  help    - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 dev     # Start development server"
    echo "  $0 web     # Run production web server"
    echo "  $0 build   # Build standalone app"
}

# Function to clean up Docker resources
clean_docker() {
    print_header "Cleaning up Docker resources"
    
    # Stop and remove containers
    docker-compose down --remove-orphans
    
    # Remove unused images
    docker image prune -f
    
    # Remove unused volumes
    docker volume prune -f
    
    print_status "Cleanup completed"
}

# Function to start development server
start_dev() {
    print_header "Starting Development Server"
    
    # Build and start development container
    docker-compose --profile dev up --build
    
    print_status "Development server started at http://localhost:8081"
    print_status "Press Ctrl+C to stop"
}

# Function to start production web server
start_web() {
    print_header "Starting Production Web Server"
    
    # Build and start production web container
    docker-compose --profile prod up --build -d
    
    print_status "Production web server started at http://localhost:3000"
    print_status "To stop: docker-compose --profile prod down"
}

# Function to build standalone app
build_standalone() {
    print_header "Building Standalone App"
    
    # Build standalone container
    docker-compose --profile build up --build
    
    print_status "Standalone build completed"
    print_status "Check the ./dist directory for built files"
}

# Main script logic
case "${1:-help}" in
    "dev")
        start_dev
        ;;
    "web")
        start_web
        ;;
    "build")
        build_standalone
        ;;
    "clean")
        clean_docker
        ;;
    "help"|*)
        show_usage
        ;;
esac 