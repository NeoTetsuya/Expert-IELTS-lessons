@echo off
title Expert IELTS - Push to GitHub
color 0A

echo =======================================================
echo   EXPERT IELTS PRESENTATIONS - SYNC & PUSH TO GITHUB
echo =======================================================
echo.

cd /d "%~dp0"

echo [1/3] Updating Master Hub index.html...
node "%~dp0scripts\update-index.js"
echo.

echo [2/3] Staging and Committing changes...
git add .
set /p commit_msg="Enter commit message (or press ENTER for default): "
if "%commit_msg%"=="" set commit_msg="Update course presentation decks and assets"
git commit -m "%commit_msg%"
echo.

echo [3/3] Pushing to GitHub repository...
git push origin main
echo.

echo =======================================================
echo   Sync Complete! All files are live on GitHub.
echo =======================================================
echo.
pause
