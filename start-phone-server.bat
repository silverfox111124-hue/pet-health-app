@echo off
cd /d "%~dp0"
echo.
echo Pet Health Note smartphone server
echo.
echo Open this address on your smartphone:
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /C:"IPv4"') do (
  for /f "tokens=* delims= " %%B in ("%%A") do echo http://%%B:8080/index.html
)
echo.
echo Keep this window open while using the app on your smartphone.
echo Press Ctrl+C to stop.
echo.
python -m http.server 8080 --bind 0.0.0.0
pause
