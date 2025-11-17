# BanquitoCore - Jakarta EE Application for Payara

## Descripción
Aplicación web de servicios de crédito desarrollada con Jakarta EE 10 para ser ejecutada en Payara Server.

## Requisitos del Sistema

- **Java 11 o superior**
- **Payara Server 6.x** (compatible con Jakarta EE 10)
- **MySQL 8.x**
- **Maven 3.8+**

## Configuración de la Base de Datos

1. Instalar MySQL Server 8.x
2. Crear la base de datos `banquito_core`
3. Ejecutar los scripts SQL para crear las tablas necesarias:
   - cliente
   - cuenta
   - movimiento
   - credito
   - amortizacion

## Configuración de Payara

### 1. Instalar Payara Server
Descargar desde: https://www.payara.fish/downloads/

### 2. Configurar DataSource

#### Opción A: Usando Admin Console (Recomendado)
1. Acceder a: http://localhost:4848
2. Navegar a: Resources > JDBC > JDBC Connection Pools
3. Crear nuevo pool con la configuración:
   - Pool Name: `BanquitoPool`
   - Resource Type: `javax.sql.DataSource`
   - Database Driver Vendor: `MySQL`
   - Driver Classname: `com.mysql.cj.jdbc.Driver`
   - URL: `jdbc:mysql://localhost:3306/banquito_core?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true`
   - User: `root`
   - Password: `root`

4. Navegar a: Resources > JDBC > JDBC Resources
5. Crear nuevo resource:
   - JNDI Name: `jdbc/BanquitoDB`
   - Pool Name: `BanquitoPool`

#### Opción B: Usando línea de comandos
```bash
# Crear Connection Pool
asadmin create-jdbc-connection-pool \
  --datasourceclassname com.mysql.cj.jdbc.DataSource \
  --restype javax.sql.DataSource \
  --property user=root:password=root:url="jdbc\:mysql\://localhost\:3306/banquito_core?useSSL\=false&serverTimezone\=UTC&allowPublicKeyRetrieval\=true" \
  BanquitoPool

# Crear JDBC Resource
asadmin create-jdbc-resource --connectionpoolid BanquitoPool jdbc/BanquitoDB

# Verificar conexión
asadmin ping-connection-pool BanquitoPool
```

### 3. Copiar Driver MySQL
Copiar `mysql-connector-j-8.2.0.jar` a `payara6/glassfish/lib/`

## Compilación y Despliegue

### 1. Compilar el proyecto
```bash
mvn clean package
```

### 2. Desplegar en Payara

#### Opción A: Admin Console
1. Acceder a: http://localhost:4848
2. Navegar a: Applications
3. Subir el archivo `target/BanquitoCore.war`
4. Context Root: `/BanquitoCore`

#### Opción B: Línea de comandos
```bash
asadmin deploy --force=true --contextroot=BanquitoCore target/BanquitoCore.war
```

#### Opción C: Script automatizado (Windows)
```bash
deploy-payara.bat
```

## Endpoints de la API

Base URL: `http://localhost:8080/BanquitoCore/api/credito`

### Servicios disponibles:

1. **Test de conectividad**
   - GET `/test`

2. **Validar sujeto de crédito**
   - GET `/validar/{cedula}`

3. **Obtener monto máximo**
   - GET `/monto-maximo/{cedula}`

4. **Otorgar crédito**
   - POST `/otorgar`
   - Body: `{"cedula": "1234567890", "precioElectrodomestico": 1200.0, "numeroCuotas": 12}`

5. **Obtener tabla de amortización**
   - GET `/tabla-amortizacion/{idCredito}`

## Ejemplo de uso

```bash
# Test
curl http://localhost:8080/BanquitoCore/api/credito/test

# Validar cliente
curl http://localhost:8080/BanquitoCore/api/credito/validar/1234567890

# Otorgar crédito
curl -X POST http://localhost:8080/BanquitoCore/api/credito/otorgar \
  -H "Content-Type: application/json" \
  -d '{"cedula":"1234567890","precioElectrodomestico":1200.0,"numeroCuotas":12}'
```

## Tecnologías Utilizadas

- **Jakarta EE 10**
- **JAX-RS** (REST API)
- **CDI** (Dependency Injection)
- **JPA** (Persistence)
- **MySQL** (Base de datos)
- **Payara Server 6** (Application Server)
- **Maven** (Build tool)

## Estructura del Proyecto

```
src/
├── main/
│   ├── java/
│   │   └── ec/edu/monster/
│   │       ├── RestApplication.java
│   │       ├── controller/
│   │       │   └── CreditoController.java
│   │       ├── service/
│   │       │   └── CreditoService.java
│   │       ├── dao/
│   │       │   └── CreditoDAO.java
│   │       ├── model/
│   │       ├── util/
│   │       │   └── DatabaseConnection.java
│   │       └── filter/
│   │           └── CorsFilter.java
│   ├── resources/
│   │   └── META-INF/
│   │       └── persistence.xml
│   └── webapp/
│       ├── index.html
│       └── WEB-INF/
│           ├── web.xml
│           ├── beans.xml
│           └── payara-web.xml
└── test/
```

## Solución de Problemas

### Error: DataSource not found
- Verificar que el DataSource esté configurado correctamente en Payara
- Verificar que el nombre JNDI sea `jdbc/BanquitoDB`

### Error: ClassNotFoundException MySQL Driver
- Copiar el driver MySQL a `payara6/glassfish/lib/`
- Reiniciar Payara Server

### Error de conexión a base de datos
- Verificar que MySQL esté ejecutándose
- Verificar las credenciales de base de datos
- Hacer ping al connection pool: `asadmin ping-connection-pool BanquitoPool`

## Notas Adicionales

- La aplicación usa CDI para inyección de dependencias
- Soporta tanto DataSource de Jakarta EE como conexiones JDBC directas
- Incluye filtro CORS para desarrollo
- Compatible con Payara Server 6.x y Jakarta EE 10
