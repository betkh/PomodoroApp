# 🐳 Docker Setup for Pomodoro App

This document explains how to use Docker with the Pomodoro Timer App.

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- No need to install Node.js, Expo CLI, or any other dependencies locally

### One-Command Setup

```bash
# Start development server
./docker-run.sh dev

# Or use Makefile
make dev
```

## 📋 Available Commands

### Using the Shell Script
```bash
./docker-run.sh dev      # Development server (port 8081)
./docker-run.sh web      # Production web server (port 3000)
./docker-run.sh build    # Build standalone app
./docker-run.sh clean    # Clean up Docker resources
./docker-run.sh help     # Show help
```

### Using Makefile
```bash
make dev      # Development server
make web      # Production web server
make build    # Build standalone app
make clean    # Clean up Docker resources
make help     # Show help
```

### Using Docker Compose Directly
```bash
# Development
docker-compose --profile dev up --build

# Production web
docker-compose --profile prod up --build -d

# Standalone build
docker-compose --profile build up --build
```

## 🏗️ Docker Architecture

### Multi-Stage Build
The Dockerfile uses a multi-stage approach for optimal performance:

1. **Base Stage**: Common dependencies and setup
2. **Development Stage**: Hot-reload development environment
3. **Production Web Stage**: Optimized web build with static server
4. **Standalone Build Stage**: Build for distribution

### Stage Details

#### Development Stage
- **Purpose**: Live development with hot-reload
- **Port**: 8081
- **Features**: Volume mounting, live code changes
- **Use Case**: Active development and debugging

#### Production Web Stage
- **Purpose**: Optimized web application
- **Port**: 3000
- **Features**: Static file serving, production build
- **Use Case**: Web deployment and testing

#### Standalone Build Stage
- **Purpose**: Build for mobile platforms
- **Output**: `./dist` directory
- **Features**: Platform-specific builds
- **Use Case**: App store distribution

## 🔧 Configuration

### Environment Variables
```bash
NODE_ENV=development|production
EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
```

### Ports
- **Development**: 8081 (Expo dev server)
- **Production Web**: 3000 (Static file server)

### Volumes
- **Development**: Source code mounted for live changes
- **Production**: Built files served statically

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Stop all containers
docker-compose down

# Clean up
./docker-run.sh clean
```

#### 2. Build Cache Issues
```bash
# Rebuild without cache
docker-compose build --no-cache
```

#### 3. Permission Issues
```bash
# Make script executable
chmod +x docker-run.sh
```

#### 4. Docker Not Running
```bash
# Start Docker Desktop
open -a Docker
```

### Debugging Commands

```bash
# Check Docker status
docker info

# List running containers
docker ps

# View container logs
docker-compose logs

# Access container shell
docker-compose exec pomodoro-dev sh
```

## 📊 Performance

### Build Times
- **Development**: ~2-3 minutes (first build)
- **Production Web**: ~1-2 minutes (first build)
- **Subsequent builds**: ~30 seconds (cached layers)

### Image Sizes
- **Development**: ~500MB
- **Production Web**: ~200MB
- **Base**: ~150MB

### Memory Usage
- **Development**: ~200MB RAM
- **Production Web**: ~100MB RAM

## 🔒 Security

### Best Practices
- Uses Alpine Linux for smaller attack surface
- Runs as non-root user where possible
- Minimal dependencies in production
- Regular base image updates

### Network Security
- Only necessary ports exposed
- Internal container communication
- No sensitive data in images

## 🚀 Deployment

### Local Development
```bash
# Start development server
./docker-run.sh dev

# Access at http://localhost:8081
```

### Production Web
```bash
# Build and run production
./docker-run.sh web

# Access at http://localhost:3000
```

### Cloud Deployment
```bash
# Build production image
docker build --target production-web -t pomodoro-app .

# Run in cloud
docker run -p 3000:3000 pomodoro-app
```

## 📝 Development Workflow

### 1. Start Development
```bash
./docker-run.sh dev
```

### 2. Make Changes
- Edit files in your IDE
- Changes automatically reload in container

### 3. Test Production Build
```bash
./docker-run.sh web
```

### 4. Build for Distribution
```bash
./docker-run.sh build
```

### 5. Clean Up
```bash
./docker-run.sh clean
```

## 🎯 Benefits

### For Developers
- ✅ No local Node.js/Expo setup required
- ✅ Consistent environment across team
- ✅ Easy onboarding for new developers
- ✅ Isolated development environment

### For Operations
- ✅ Reproducible builds
- ✅ Easy deployment
- ✅ Scalable architecture
- ✅ Version control for dependencies

### For Beginners
- ✅ Simple commands
- ✅ No complex setup
- ✅ Clear documentation
- ✅ Easy troubleshooting

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)

---

**Happy Dockerizing! 🐳🍅** 