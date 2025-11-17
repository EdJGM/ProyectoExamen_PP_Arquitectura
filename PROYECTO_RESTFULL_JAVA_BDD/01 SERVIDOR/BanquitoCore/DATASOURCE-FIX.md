# SOLUCIÓN AL ERROR DE DATASOURCE JNDI

## Error Original
```
WARNING: This web app [/C:/Users/victo/Documents/NetBeansProjects/BanquitoCore/target/BanquitoCore/] has no resource reference by the name of [jdbc/BanquitoDB]
SEVERE: JNDI lookup failed for the resource: Name: java:module/env/ec.edu.monster.util.DatabaseConnection/dataSource, Lookup: jdbc/BanquitoDB, Type: javax.sql.DataSource.
```

## Causa del Error
El error ocurre porque:
1. El DataSource `jdbc/BanquitoDB` no está configurado en Payara Server
2. Falta la referencia del recurso en web.xml
3. La aplicación intenta inyectar un DataSource que no existe

## Solución Implementada

### 1. ✅ Agregada referencia en web.xml
```xml
<resource-ref>
    <description>BanQuito Database</description>
    <res-ref-name>jdbc/BanquitoDB</res-ref-name>
    <res-type>javax.sql.DataSource</res-type>
    <res-auth>Container</res-auth>
    <res-sharing-scope>Shareable</res-sharing-scope>
</resource-ref>
```

### 2. ✅ DatabaseConnection actualizado
- Removida inyección problemática `@Resource`
- Implementado lookup JNDI manual en `@PostConstruct`
- Fallback automático a conexión JDBC directa
- Logging detallado para debugging

### 3. ✅ Scripts de configuración
- `setup-datasource.bat` - Configura DataSource automáticamente
- `deploy-payara.bat` - Deployment completo

## Pasos para Solucionar

### Opción A: Configurar DataSource (Recomendado)

1. **Ejecutar script de configuración**:
   ```bash
   setup-datasource.bat
   ```

2. **O configurar manualmente via asadmin**:
   ```bash
   # Crear Connection Pool
   asadmin create-jdbc-connection-pool \
     --datasourceclassname com.mysql.cj.jdbc.DataSource \
     --restype javax.sql.DataSource \
     --property user=root:password=root:url="jdbc\:mysql\://localhost\:3308/banquito_core?useSSL\=false&serverTimezone\=UTC&allowPublicKeyRetrieval\=true" \
     BanquitoPool

   # Crear JDBC Resource
   asadmin create-jdbc-resource --connectionpoolid BanquitoPool jdbc/BanquitoDB

   # Verificar
   asadmin ping-connection-pool BanquitoPool
   ```

3. **Verificar en Admin Console**:
   - http://localhost:4848
   - Resources > JDBC > JDBC Resources
   - Debe aparecer `jdbc/BanquitoDB`

### Opción B: Usar solo JDBC directo

Si no deseas configurar DataSource, la aplicación funcionará automáticamente con JDBC directo usando el fallback implementado.

## Configuración de Base de datos

Asegúrate de que:
- MySQL esté ejecutándose en puerto 3308
- Base de datos `banquito_core` exista
- Usuario `root` con password `root` tenga permisos

## Verificación Post-Deployment

1. **Verificar logs de Payara**:
   ```
   INFO: DataSource jdbc/BanquitoDB configurado correctamente via JNDI lookup
   ```
   O:
   ```
   INFO: DataSource no disponible via JNDI, usando JDBC directo
   ```

2. **Probar endpoint de test**:
   ```bash
   curl http://localhost:8080/BanquitoCore/api/credito/test
   ```

## Archivos Modificados

- ✅ `web.xml` - Agregada resource-ref
- ✅ `DatabaseConnection.java` - Lookup manual + fallback
- ✅ `CreditoDAO.java` - Actualizado uso de DatabaseConnection
- ✅ `setup-datasource.bat` - Script de configuración
- ✅ `DATASOURCE-FIX.md` - Esta documentación

## Beneficios de la Solución

- ✅ **Flexible**: Funciona con o sin DataSource
- ✅ **Robusto**: Fallback automático
- ✅ **Observable**: Logs claros del comportamiento
- ✅ **Mantenible**: Código limpio y documentado

## Notas Importantes

- El puerto MySQL está configurado en 3308 (no estándar)
- Si usas puerto 3306, cambia la URL en `DatabaseConnection.java`
- El DataSource es opcional, la aplicación funciona sin él
- Para producción, siempre usa DataSource para mejor performance
