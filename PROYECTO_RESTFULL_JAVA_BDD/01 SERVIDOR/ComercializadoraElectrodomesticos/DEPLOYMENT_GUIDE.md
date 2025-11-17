# Deployment Guide for Payara Server

## Prerequisites
- Java 17 or higher installed
- Payara Server 6.x (Jakarta EE 10 compatible)
- MySQL 8.0+ database server

## Configuration Steps

### 1. Database Setup
- Create a MySQL database for the application
- Update the database connection details in `DatabaseConnection.java` if needed
- Ensure MySQL is running and accessible

### 2. Payara Server Configuration
- Start Payara Server
- Access Admin Console (usually http://localhost:4848)
- Configure JDBC connection pool if using DataSource (optional)

### 3. Deploy the Application
1. Build the project: `mvn clean package`
2. Deploy the WAR file located at: `target/ComercializadoraElectrodomesticos-1.0.war`
3. Deploy via Admin Console or use asadmin command:
   ```bash
   asadmin deploy target/ComercializadoraElectrodomesticos-1.0.war
   ```

### 4. Access the Application
- Web Interface: http://localhost:8080/ComercializadoraElectrodomesticos-1.0/
- REST API Base: http://localhost:8080/ComercializadoraElectrodomesticos-1.0/api/

## Key Changes Made for Payara/Jakarta EE 10 Compatibility

### Dependencies Updated:
- Java version: 1.8 → 17
- Jersey: 2.35 → 3.1.3 (Jakarta EE 10 compatible)
- MySQL Connector: mysql-connector-java → mysql-connector-j (8.2.0)
- JSTL: javax.servlet.jstl → jakarta.servlet.jsp.jstl (3.0.1)

### Imports Migrated:
- `javax.ws.rs.*` → `jakarta.ws.rs.*`
- `javax.servlet.*` → `jakarta.servlet.*`

### Configuration Files:
- NetBeans configuration updated for Payara 6
- Added payara-web.xml for Payara-specific configuration
- web.xml and persistence.xml already using Jakarta EE format

### Build Configuration:
- Maven compiler updated to 3.11.0 with Java 17 target
- Maven WAR plugin updated to 3.3.2

## Troubleshooting

### Common Issues:
1. **ClassNotFoundException**: Ensure all javax dependencies are replaced with jakarta
2. **Deployment errors**: Check Payara server logs for detailed error messages
3. **Database connection issues**: Verify MySQL connection parameters and ensure driver is accessible

### Verification:
- Check if REST endpoints respond: http://localhost:8080/ComercializadoraElectrodomesticos-1.0/api/electrodomesticos
- Verify servlet access: http://localhost:8080/ComercializadoraElectrodomesticos-1.0/electrodomesticos-manager
- Review Payara server logs for any startup issues
