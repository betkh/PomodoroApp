# 🍅 Pomodoro Timer App

A beautiful Pomodoro timer app built with React Native and Expo.

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
cd PomodoroApp

# Start development server
make dev

# Run production web server
make web

# Build standalone app
make build

# Clean up
make clean
```

### Using Local Development

```bash
cd PomodoroApp
npm install
npm start
```

## 📱 Features

- ⏱️ 25-minute work sessions with 5-minute breaks
- 🎯 Clean, modern UI
- 📱 Mobile notifications
- 🔄 Easy controls (start, pause, reset)
- 📊 Session counter

## 🐳 Docker Commands

```bash
make dev      # Development server (port 8081)
make web      # Production web server (port 3000)
make build    # Build standalone app
make clean    # Clean up Docker resources
make help     # Show all commands
```

## 🔧 Troubleshooting

### Docker Issues
```bash
# Port already in use
make clean

# Build cache issues
docker-compose build --no-cache

# Permission issues
chmod +x docker-run.sh
```

### Common Issues
```bash
# Metro bundler errors
npm start --reset-cache

# iOS Simulator not opening
xcode-select --install
```

## 📚 Resources

- [Docker Setup](DOCKER.md) - Detailed Docker documentation
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)

Happy coding! 🚀 