#!/bin/bash
# Elgasmi.eu Deployment Script
# Usage: ./deploy.sh [docker|pm2|manual]

set -e

echo "==================================="
echo "  Elgasmi.eu Deployment Script"
echo "==================================="

# Check if .env exists
if [ ! -f .env ]; then
    echo "ERROR: .env file not found!"
    echo "Please create .env from .env.example:"
    echo "  cp .env.example .env"
    echo "  # Edit .env with your values"
    exit 1
fi

# Load environment variables
source .env

# Validate required environment variables
validate_env() {
    local missing=0

    if [ -z "$DATABASE_URL" ]; then
        echo "ERROR: DATABASE_URL is not set"
        missing=1
    fi

    if [ -z "$JWT_SECRET" ] || [ ${#JWT_SECRET} -lt 32 ]; then
        echo "ERROR: JWT_SECRET must be at least 32 characters"
        missing=1
    fi

    if [ -z "$ENCRYPTION_KEY" ] || [ ${#ENCRYPTION_KEY} -lt 32 ]; then
        echo "ERROR: ENCRYPTION_KEY must be at least 32 characters"
        missing=1
    fi

    if [ $missing -eq 1 ]; then
        echo ""
        echo "Please fix the above errors in your .env file"
        exit 1
    fi

    echo "Environment validation passed"
}

# Build the application
build_app() {
    echo "Building application..."
    pnpm install --frozen-lockfile
    pnpm run build
    pnpm run check
    echo "Build completed successfully"
}

# Deploy with Docker
deploy_docker() {
    echo "Deploying with Docker..."
    docker-compose down || true
    docker-compose up -d --build
    echo "Docker deployment completed"
    echo "Application running at http://localhost:3000"
}

# Deploy with PM2
deploy_pm2() {
    echo "Deploying with PM2..."
    pm2 delete elgasmi-eu || true
    pm2 start ecosystem.config.cjs
    pm2 save
    echo "PM2 deployment completed"
    echo "Use 'pm2 logs elgasmi-eu' to view logs"
}

# Manual deployment (just build)
deploy_manual() {
    echo "Manual deployment - build only"
    echo "To start the server, run:"
    echo "  NODE_ENV=production node dist/index.js"
}

# Main
validate_env

case "${1:-docker}" in
    docker)
        build_app
        deploy_docker
        ;;
    pm2)
        build_app
        deploy_pm2
        ;;
    manual)
        build_app
        deploy_manual
        ;;
    *)
        echo "Usage: $0 [docker|pm2|manual]"
        exit 1
        ;;
esac

echo ""
echo "==================================="
echo "  Deployment Complete!"
echo "==================================="
