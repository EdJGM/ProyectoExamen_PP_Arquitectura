@echo off
echo ======================================
echo Configurando DataSource en Payara
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

echo Creando JDBC Connection Pool...
"%PAYARA_HOME%\bin\asadmin.bat" create-jdbc-connection-pool ^
    --datasourceclassname com.mysql.cj.jdbc.DataSource ^
    --restype javax.sql.DataSource ^
    --property user=root:password=root:url="jdbc\:mysql\://localhost\:3308/banquito_core?useSSL\=false&serverTimezone\=UTC&allowPublicKeyRetrieval\=true":useUnicode=true:characterEncoding=UTF-8 ^
    BanquitoPool

if %ERRORLEVEL% neq 0 (
    echo Error creando Connection Pool
    pause
    exit /b 1
)

echo Creando JDBC Resource...
"%PAYARA_HOME%\bin\asadmin.bat" create-jdbc-resource ^
    --connectionpoolid BanquitoPool ^
    jdbc/BanquitoDB

if %ERRORLEVEL% neq 0 (
    echo Error creando JDBC Resource
    pause
    exit /b 1
)

echo Verificando conexión...
"%PAYARA_HOME%\bin\asadmin.bat" ping-connection-pool BanquitoPool

if %ERRORLEVEL% neq 0 (
    echo Warning: No se pudo verificar la conexión. Verifique que MySQL esté ejecutándose.
) else (
    echo DataSource configurado correctamente!
)

echo ======================================
echo Configuración completada
echo ======================================

echo Para verificar la configuración:
echo 1. Acceda a http://localhost:4848
echo 2. Vaya a Resources ^> JDBC ^> JDBC Resources
echo 3. Debe ver 'jdbc/BanquitoDB' listado
echo ======================================
pause
