@echo off
echo ======================================
echo Deploying BanquitoCore to Payara Server
echo ======================================

rem Set Payara home directory (adjust as needed)
set PAYARA_HOME=C:\payara6

rem Check if Payara is installed
if not exist "%PAYARA_HOME%\bin\asadmin.bat" (
    echo Error: Payara not found at %PAYARA_HOME%
    echo Please set PAYARA_HOME to your Payara installation directory
    pause
    exit /b 1
)

rem Build the project
echo Building project...
call mvn clean package

if %ERRORLEVEL% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)

rem Deploy to Payara
echo Deploying to Payara...
"%PAYARA_HOME%\bin\asadmin.bat" deploy --force=true --contextroot=BanquitoCore target\BanquitoCore.war

if %ERRORLEVEL% neq 0 (
    echo Deployment failed!
    pause
    exit /b 1
)

echo ======================================
echo Deployment completed successfully!
echo Application available at: http://localhost:8080/BanquitoCore
echo API endpoints at: http://localhost:8080/BanquitoCore/api/credito/test
echo ======================================
pause
