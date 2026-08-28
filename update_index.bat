@echo off
title Expert IELTS - Auto-Update Master Hub (index.html)
color 0B

echo =======================================================
echo   EXPERT IELTS PRESENTATIONS - AUTO-UPDATE MASTER HUB
echo =======================================================
echo.
echo Scanning presentation decks across all course folders...
echo.

node "%~dp0scripts\update-index.js"

echo.
echo =======================================================
echo   Done! All decks have been registered in index.html.
echo =======================================================
echo.
pause
