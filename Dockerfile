# Multi-stage Dockerfile for Expo React Native App
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies for native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Development stage
FROM base AS development

# Install all dependencies including devDependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port for Expo development server
EXPOSE 8081

# Start development server
CMD ["npm", "run", "start"]

# Production stage for web build
FROM base AS production-web

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Build for web
RUN npx expo export --platform web

# Install serve for static file serving
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Serve the built web app
CMD ["serve", "-s", "web-build", "-l", "3000"]

# Production stage for standalone build
FROM base AS production-standalone

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Build standalone app
RUN npx expo export --platform all

# The built app will be in the dist/ directory
# This stage is for building, not running
CMD ["echo", "Standalone build completed"] 