@echo off
setlocal

echo ===================================================
echo Iniciando o site Aniversario Cosmico (NASA APOD)...
echo ===================================================

:: Start Python Backend
echo [1/2] Iniciando o servidor backend...
cd backend
start "Backend NASA API" cmd /c ".\venv\Scripts\python.exe main.py"
cd ..

:: Start Frontend Server
echo [2/2] Iniciando o servidor frontend...
cd frontend
start "Frontend NASA APOD" cmd /c "python -m http.server 8000"
cd ..

echo.
echo Tudo pronto! O navegador vai abrir o site agora.
start http://localhost:8000

echo Pressione qualquer tecla para encerrar os servidores...
pause >nul

:: Opcional: tentar matar as janelas abertas se o usuario fechar
taskkill /fi "WINDOWTITLE eq Backend NASA API*" >nul 2>&1
taskkill /fi "WINDOWTITLE eq Frontend NASA APOD*" >nul 2>&1
