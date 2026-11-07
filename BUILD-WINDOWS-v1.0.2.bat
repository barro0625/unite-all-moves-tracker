@echo off
setlocal
cd /d "%~dp0"
title Pokemon Unite Tracker - Build Windows Installer v1.0.2

echo ================================================
echo  Pokemon Unite Tracker - Windows Build v1.0.2
echo ================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not installed or is not in PATH.
  echo Install Node.js 20 or newer, then run this file again.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm was not found. Please reinstall Node.js.
  pause
  exit /b 1
)

echo [1/2] Installing build dependencies...
call npm install
if errorlevel 1 (
  echo.
  echo [ERROR] Dependency installation failed. Check your network and npm configuration.
  pause
  exit /b 1
)

echo.
echo [2/2] Building Windows x64 installer...
call npm run dist:win
if errorlevel 1 (
  echo.
  echo [ERROR] Windows installer build failed.
  pause
  exit /b 1
)

echo.
echo [DONE] Installer output:
echo %CD%\dist\Pokemon-Unite-Tracker-Setup-1.0.2.exe
pause
