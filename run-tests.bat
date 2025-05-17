@echo off
echo Starting Vite development server...
start cmd /k "cd /d C:\Users\ADMIN\Downloads\project\project && npm run dev"

timeout /t 5 /nobreak >nul

echo Running Selenium tests...
cd /d C:\Users\ADMIN\Downloads\project\test
npm test

pause
