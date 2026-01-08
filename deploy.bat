@echo off
REM Elgasmi.eu Deployment Script for Windows
REM Usage: deploy.bat [docker|pm2|manual]

echo ===================================
echo   Elgasmi.eu Deployment Script
echo ===================================

REM Check if .env exists
if not exist .env (
    echo ERROR: .env file not found!
    echo Please create .env from .env.example:
    echo   copy .env.example .env
    echo   REM Edit .env with your values
    exit /b 1
)

set DEPLOY_TYPE=%1
if "%DEPLOY_TYPE%"=="" set DEPLOY_TYPE=manual

echo Building application...
call pnpm install
if errorlevel 1 exit /b 1

call pnpm run build
if errorlevel 1 exit /b 1

call pnpm run check
if errorlevel 1 exit /b 1

echo Build completed successfully

if "%DEPLOY_TYPE%"=="docker" (
    echo Deploying with Docker...
    docker-compose down 2>nul
    docker-compose up -d --build
    echo Docker deployment completed
    echo Application running at http://localhost:3000
    goto :end
)

if "%DEPLOY_TYPE%"=="pm2" (
    echo Deploying with PM2...
    pm2 delete elgasmi-eu 2>nul
    pm2 start ecosystem.config.cjs
    pm2 save
    echo PM2 deployment completed
    echo Use 'pm2 logs elgasmi-eu' to view logs
    goto :end
)

if "%DEPLOY_TYPE%"=="manual" (
    echo Manual deployment - build only
    echo To start the server, run:
    echo   set NODE_ENV=production
    echo   node dist/index.js
    goto :end
)

echo Usage: deploy.bat [docker^|pm2^|manual]
exit /b 1

:end
echo.
echo ===================================
echo   Deployment Complete!
echo ===================================
