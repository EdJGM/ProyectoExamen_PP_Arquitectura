# 🎓 EXAMEN COMPLEXIVO - BANCO BANQUITO + COMERCIALIZADORA
## Implementación Completa con DOS Servidores SOAP WCF

---

## 📦 CONTENIDO ENTREGADO

### ✅ SERVIDOR 1: Banco BanQuito (COMPLETADO)
**Archivo:** `01_SERVIDOR_BANCO.

**Tecnología:** ASP.NET WCF (SOAP)
**Puerto:** 58001
**Base de Datos:** banquito_core

**Servicios implementados:**
1. `ValidarSujetoCredito(cedula)` - 4 validaciones de reglas de negocio
2. `ObtenerMontoMaximoCredito(cedula)` - Cálculo con fórmula especial
3. `OtorgarCredito(cedula, precio, numCuotas)` - Aprueba y genera tabla
4. `ObtenerTablaAmortizacion(idCredito)` - Consulta plan de pagos

---

## 🏪 SERVIDOR 2: Comercializadora de Electrodomésticos

### Arquitectura del Servidor 2

```
02_SERVIDOR_COMERCIALIZADORA/
├── Comercializadora_Soap_Dotnet.sln
└── Comercializadora_Soap_Dotnet/
    ├── Comercializadora_Soap_Dotnet.csproj
    ├── Web.config
    ├── Properties/
    │   └── AssemblyInfo.cs
    ├── ec.edu.espe.db/
    │   └── AccesoDB.cs
    ├── ec.edu.espe.modelo/
    │   ├── Electrodomestico.cs
    │   ├── Factura.cs
    │   ├── DetalleFactura.cs
    │   └── RespuestaVenta.cs
    ├── ec.edu.espe.servicio/
    │   ├── ElectrodomesticoService.cs
    │   └── FacturacionService.cs
    ├── ec.edu.espe.soapclient/
    │   └── BanQuitoClient.cs (consume SOAP del banco)
    └── ec.edu.espe.ws/
        ├── ComercializadoraWS.svc
        ├── ComercializadoraWS.svc.cs
        └── IComercializadoraWS.cs
```

### Servicios SOAP de la Comercializadora

#### 1. Gestión de Electrodomésticos
```csharp
List<Electrodomestico> ListarElectrodomesticos()
Electrodomestico ObtenerElectrodomestico(int id)
string CrearElectrodomestico(string nombre, string descripcion, double precio)
string ActualizarElectrodomestico(int id, string nombre, string descripcion, double precio)
string EliminarElectrodomestico(int id)
```

#### 2. Facturación
```csharp
RespuestaVenta ProcesarVentaEfectivo(
    string cedula, 
    List<int> idsElectrodomesticos, 
    List<int> cantidades
)

RespuestaVenta ProcesarVentaCredito(
    string cedula, 
    List<int> idsElectrodomesticos, 
    List<int> cantidades,
    int numeroCuotas
)
```

#### 3. Consulta de Amortización
```csharp
List<TablaAmortizacion> ConsultarTablaAmortizacion(int idCreditoBanco)
```

---

## 🔗 COMUNICACIÓN ENTRE SERVIDORES

### Flujo de Venta a Crédito:

```
┌────────────────────────────────────────────────────────────┐
│ PASO 1: Cliente solicita compra a crédito                 │
│ ─────────────────────────────────────────────────────────│
│ Input: Cédula, Electrodomésticos, Número de cuotas        │
└───────────────────────┬────────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────────┐
│ PASO 2: Servidor Comercializadora llama a Banco           │
│ ─────────────────────────────────────────────────────────│
│ BanQuitoClient.ValidarSujetoCredito(cedula)               │
│                                                             │
│ ¿Es sujeto de crédito?                                    │
│ NO → Rechaza venta ❌                                      │
│ SÍ → Continúa ✅                                           │
└───────────────────────┬────────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────────┐
│ PASO 3: Verificar monto máximo                            │
│ ─────────────────────────────────────────────────────────│
│ BanQuitoClient.ObtenerMontoMaximoCredito(cedula)          │
│                                                             │
│ Total > Monto Máximo?                                     │
│ SÍ → Rechaza venta ❌                                      │
│ NO → Continúa ✅                                           │
└───────────────────────┬────────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────────┐
│ PASO 4: Otorgar crédito                                   │
│ ─────────────────────────────────────────────────────────│
│ BanQuitoClient.OtorgarCredito(cedula, total, cuotas)      │
│                                                             │
│ Banco:                                                     │
│ - Crea registro en tabla Creditos                         │
│ - Genera tabla de amortización                            │
│ - Retorna ID de crédito + cuota mensual                   │
└───────────────────────┬────────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────────┐
│ PASO 5: Registrar factura                                 │
│ ─────────────────────────────────────────────────────────│
│ Comercializadora:                                          │
│ - Guarda factura en BD local                              │
│ - Incluye IdCreditoBanco                                  │
│ - Retorna comprobante al cliente                          │
└────────────────────────────────────────────────────────────┘
```

---

## 💾 BASES DE DATOS

### Base de Datos 1: banquito_core (Banco)

```sql
-- Tablas existentes
Clientes (IdCliente, Cedula, Nombres, Apellidos, FechaNacimiento, 
          EstadoCivil, Direccion, Telefono, Email, Estado)

Cuentas (IdCuenta, IdCliente, NumeroCuenta, TipoCuenta, Saldo, 
         FechaApertura, Estado)

Movimientos (IdMovimiento, IdCuenta, TipoMovimiento, Monto, Fecha, 
             Descripcion)

-- Tablas NUEVAS
Creditos (IdCredito, IdCliente, MontoCreditoOtorgado, TasaInteres, 
          NumeroCuotas, FechaOtorgamiento, Estado)

TablaAmortizacion (IdAmortizacion, IdCredito, NumeroCuota, ValorCuota, 
                   Interes, CapitalPagado, Saldo)
```

### Base de Datos 2: comercializadora_db

```sql
Electrodomesticos (IdElectrodomestico, Nombre, Descripcion, Precio, 
                   Estado, FechaRegistro)

Facturas (IdFactura, Cedula, FormaPago, FechaVenta, Descuento, 
          Subtotal, Total, IdCreditoBanco, Estado)

DetallesFactura (IdDetalle, IdFactura, IdElectrodomestico, Cantidad, 
                 PrecioUnitario, Subtotal)
```

---

## 🚀 PASOS PARA EJECUTAR

### 1. Preparar Base de Datos del Banco
```sql
-- Ejecutar en SQL Server
CREATE DATABASE banquito_core;
GO

USE banquito_core;
GO

-- Ejecutar script de creación de tablas
-- (Ver archivo SQL adjunto)
```

### 2. Preparar Base de Datos Comercializadora
```sql
CREATE DATABASE comercializadora_db;
GO

USE comercializadora_db;
GO

-- Ejecutar script de creación de tablas
```

### 3. Configurar Servidor del Banco
```xml
<!-- Web.config -->
<connectionStrings>
  <add name="BanQuitoDB"
       connectionString="Data Source=localhost\SQLEXPRESS;Initial Catalog=banquito_core;..."
       providerName="System.Data.SqlClient" />
</connectionStrings>
```

### 4. Ejecutar Servidor del Banco
- Abrir Visual Studio
- Cargar `BanQuito_Soap_Dotnet.sln`
- F5 (Run)
- Verificar en: http://localhost:58001/ec.edu.monster.ws/BanQuitoWS.svc

### 5. Configurar Servidor Comercializadora
```xml
<!-- Web.config -->
<connectionStrings>
  <add name="ComercializadoraDB"
       connectionString="Data Source=localhost\SQLEXPRESS;Initial Catalog=comercializadora_db;..."
       providerName="System.Data.SqlClient" />
</connectionStrings>

<appSettings>
  <!-- URL del servicio SOAP del banco -->
  <add key="BanQuitoServiceURL" value="http://localhost:58001/ec.edu.monster.ws/BanQuitoWS.svc" />
</appSettings>
```

### 6. Agregar Referencia de Servicio
1. Click derecho en proyecto Comercializadora
2. "Add Service Reference"
3. URL: http://localhost:58001/ec.edu.monster.ws/BanQuitoWS.svc
4. Namespace: BanQuitoServiceReference
5. OK

### 7. Ejecutar Servidor Comercializadora
- Abrir segunda instancia de Visual Studio
- Cargar `Comercializadora_Soap_Dotnet.sln`
- F5 (Run)
- Verificar en: http://localhost:58002/ec.edu.monster.ws/ComercializadoraWS.svc

---

## 🧪 PRUEBAS

### Probar Servicio del Banco (SoapUI o Postman)

**Endpoint:** http://localhost:58001/ec.edu.monster.ws/BanQuitoWS.svc

Header 1	Content-Type: text/xml; charset=utf-8
Header 2	SOAPAction: "http://tempuri.org/IBanQuitoWS/ValidarSujetoCredito"

**Request 1: Validar Sujeto**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:ValidarSujetoCredito>
         <tem:cedula>1234567890</tem:cedula>
      </tem:ValidarSujetoCredito>
   </soapenv:Body>
</soapenv:Envelope>

```

"http://tempuri.org/IBanQuitoWS/ObtenerMontoMaximoCredito"
**Request 2: Monto Máximo**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:ObtenerMontoMaximoCredito>
         <tem:cedula>1234567890</tem:cedula>
      </tem:ObtenerMontoMaximoCredito>
   </soapenv:Body>
</soapenv:Envelope>
```

"http://tempuri.org/IBanQuitoWS/OtorgarCredito"
**Request 3: Otorgar Crédito**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:OtorgarCredito>
         <tem:cedula>1234567890</tem:cedula>
         <tem:precioElectrodomestico>800</tem:precioElectrodomestico>
         <tem:numeroCuotas>12</tem:numeroCuotas>
      </tem:OtorgarCredito>
   </soapenv:Body>
</soapenv:Envelope>
```
Probar Comunicación BANCO → Comercializadora

Endpoint: http://localhost:58002/ec.edu.monster.ws/ComercializadoraWS.svc
Content-Type: text/xml; charset=utf-8
SOAPAction: "http://tempuri.org/IComercializadoraWS/ProcesarVentaCredito"

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:tem="http://tempuri.org/">
   <soapenv:Body>
      <tem:ProcesarVentaCredito>
         <tem:cedula>1234567890</tem:cedula>
         <tem:idsElectrodomesticos>
            <tem:int>1</tem:int>
            <tem:int>2</tem:int>
         </tem:idsElectrodomesticos>
         <tem:cantidades>
            <tem:int>1</tem:int>
            <tem:int>1</tem:int>
         </tem:cantidades>
         <tem:numeroCuotas>12</tem:numeroCuotas>
      </tem:ProcesarVentaCredito>
   </soapenv:Body>
</soapenv:Envelope>

---

## 🧪 RUTA COMPLETA DE PRUEBAS DE INTEGRACIÓN

### **PASO 1: Validar cliente con crédito activo**

**Endpoint:** `http://localhost:58001/ec.edu.monster.ws/BanQuitoWS.svc`

**Headers:**
- Content-Type: `text/xml; charset=utf-8`
- SOAPAction: `"http://tempuri.org/IBanQuitoWS/ValidarSujetoCredito"`

**Request:**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:ValidarSujetoCredito>
         <tem:cedula>1234567890</tem:cedula>
      </tem:ValidarSujetoCredito>
   </soapenv:Body>
</soapenv:Envelope>
```

**✅ Resultado esperado:**
```xml
<a:EsSujetoCredito>false</a:EsSujetoCredito>
<a:Mensaje>Rechazado</a:Mensaje>
<a:Razones>
   <b:string>Ya tiene un crédito activo</b:string>
</a:Razones>
```

---

### **PASO 2: Validar cliente SIN crédito activo**

**Endpoint:** `http://localhost:58001/ec.edu.monster.ws/BanQuitoWS.svc`

**Headers:**
- Content-Type: `text/xml; charset=utf-8`
- SOAPAction: `"http://tempuri.org/IBanQuitoWS/ValidarSujetoCredito"`

**Request:**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:ValidarSujetoCredito>
         <tem:cedula>6677889900</tem:cedula>
      </tem:ValidarSujetoCredito>
   </soapenv:Body>
</soapenv:Envelope>
```

**✅ Resultado esperado:**
```xml
<a:EsSujetoCredito>true</a:EsSujetoCredito>
<a:Mensaje>Aprobado</a:Mensaje>
```

---

### **PASO 3: Obtener monto máximo de crédito**

**Endpoint:** `http://localhost:58001/ec.edu.monster.ws/BanQuitoWS.svc`

**Headers:**
- Content-Type: `text/xml; charset=utf-8`
- SOAPAction: `"http://tempuri.org/IBanQuitoWS/ObtenerMontoMaximoCredito"`

**Request:**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:ObtenerMontoMaximoCredito>
         <tem:cedula>6677889900</tem:cedula>
      </tem:ObtenerMontoMaximoCredito>
   </soapenv:Body>
</soapenv:Envelope>
```

**✅ Resultado esperado:**
```xml
<ObtenerMontoMaximoCreditoResult>2025</ObtenerMontoMaximoCreditoResult>
```

---

### **PASO 4: Otorgar crédito directamente desde el Banco**

**Endpoint:** `http://localhost:58001/ec.edu.monster.ws/BanQuitoWS.svc`

**Headers:**
- Content-Type: `text/xml; charset=utf-8`
- SOAPAction: `"http://tempuri.org/IBanQuitoWS/OtorgarCredito"`

**Request:**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:OtorgarCredito>
         <tem:cedula>0987654321</tem:cedula>
         <tem:precioElectrodomestico>800</tem:precioElectrodomestico>
         <tem:numeroCuotas>12</tem:numeroCuotas>
      </tem:OtorgarCredito>
   </soapenv:Body>
</soapenv:Envelope>
```

**✅ Resultado esperado:**
```xml
<a:Aprobado>true</a:Aprobado>
<a:Mensaje>Credito aprobado exitosamente</a:Mensaje>
<a:IdCredito>2</a:IdCredito>
<a:CuotaMensual>72.58</a:CuotaMensual>
```

---

### **PASO 5: Consultar tabla de amortización desde el Banco**

**Endpoint:** `http://localhost:58001/ec.edu.monster.ws/BanQuitoWS.svc`

**Headers:**
- Content-Type: `text/xml; charset=utf-8`
- SOAPAction: `"http://tempuri.org/IBanQuitoWS/ObtenerTablaAmortizacion"`

**Request:**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:ObtenerTablaAmortizacion>
         <tem:idCredito>2</tem:idCredito>
      </tem:ObtenerTablaAmortizacion>
   </soapenv:Body>
</soapenv:Envelope>
```

**✅ Resultado esperado:** 12 cuotas con datos completos (ValorCuota, Interes, CapitalPagado, Saldo)

```xml
<a:tablaAmortizacion>
   <a:IdAmortizacion>13</a:IdAmortizacion>
   <a:IdCredito>2</a:IdCredito>
   <a:NumeroCuota>1</a:NumeroCuota>
   <a:ValorCuota>72.58</a:ValorCuota>
   <a:Interes>10.67</a:Interes>
   <a:CapitalPagado>61.92</a:CapitalPagado>
   <a:Saldo>738.08</a:Saldo>
</a:tablaAmortizacion>
<!-- ... 11 cuotas más -->
```

---

### **PASO 6: Procesar venta a crédito desde Comercializadora** ⭐ (INTEGRACIÓN COMPLETA)

**Endpoint:** `http://localhost:58002/ec.edu.monster.ws/ComercializadoraWS.svc`

**Headers:**
- Content-Type: `text/xml; charset=utf-8`
- SOAPAction: `"http://tempuri.org/IComercializadoraWS/ProcesarVentaCredito"`

**Request:**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:ProcesarVentaCredito>
         <tem:cedula>6677889900</tem:cedula>
         <tem:idsElectrodomesticos>
            <tem:int>5</tem:int>
            <tem:int>6</tem:int>
         </tem:idsElectrodomesticos>
         <tem:cantidades>
            <tem:int>1</tem:int>
            <tem:int>1</tem:int>
         </tem:cantidades>
         <tem:numeroCuotas>6</tem:numeroCuotas>
      </tem:ProcesarVentaCredito>
   </soapenv:Body>
</soapenv:Envelope>
```

**Datos de la compra:**
- Electrodoméstico 5: Microondas Panasonic $180.00
- Electrodoméstico 6: Licuadora Oster $85.00
- **Total:** $265.00
- **Cuotas:** 6 meses

**✅ Resultado esperado:**
```xml
<a:Exitoso>true</a:Exitoso>
<a:Mensaje>Venta a crédito procesada exitosamente</a:Mensaje>
<a:IdFactura>1</a:IdFactura>
<a:Total>265</a:Total>
<a:FormaPago>CREDITO_DIRECTO</a:FormaPago>
<a:IdCreditoBanco>6</a:IdCreditoBanco>
<a:CuotaMensual>46.01</a:CuotaMensual>
<a:NumeroCuotas>6</a:NumeroCuotas>
```

**🔄 Lo que sucede internamente:**
1. Comercializadora llama a `BanQuitoClient.ValidarSujetoCredito("6677889900")`
2. Comercializadora llama a `BanQuitoClient.ObtenerMontoMaximoCredito("6677889900")`
3. Comercializadora llama a `BanQuitoClient.OtorgarCredito("6677889900", 265, 6)`
4. Banco crea crédito con IdCredito=6 y genera tabla de amortización
5. Comercializadora guarda factura con IdCreditoBanco=6

---

### **PASO 7: Consultar tabla desde Comercializadora**

**Endpoint:** `http://localhost:58002/ec.edu.monster.ws/ComercializadoraWS.svc`

**Headers:**
- Content-Type: `text/xml; charset=utf-8`
- SOAPAction: `"http://tempuri.org/IComercializadoraWS/ConsultarTablaAmortizacion"`

**Request:**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:ConsultarTablaAmortizacion>
         <tem:idCreditoBanco>6</tem:idCreditoBanco>
      </tem:ConsultarTablaAmortizacion>
   </soapenv:Body>
</soapenv:Envelope>
```

**✅ Resultado esperado:** 6 cuotas del plan de pagos

**🔄 Lo que sucede internamente:**
1. Comercializadora recibe la solicitud
2. Comercializadora llama a `BanQuitoClient.ObtenerTablaAmortizacion(6)`
3. Banco consulta y devuelve la tabla de amortización
4. Comercializadora retorna la tabla al cliente

---

### **PASO 8: Intentar segunda compra con mismo cliente (debe rechazar)**

**Endpoint:** `http://localhost:58002/ec.edu.monster.ws/ComercializadoraWS.svc`

**Headers:**
- Content-Type: `text/xml; charset=utf-8`
- SOAPAction: `"http://tempuri.org/IComercializadoraWS/ProcesarVentaCredito"`

**Request:**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:ProcesarVentaCredito>
         <tem:cedula>6677889900</tem:cedula>
         <tem:idsElectrodomesticos>
            <tem:int>3</tem:int>
         </tem:idsElectrodomesticos>
         <tem:cantidades>
            <tem:int>1</tem:int>
         </tem:cantidades>
         <tem:numeroCuotas>12</tem:numeroCuotas>
      </tem:ProcesarVentaCredito>
   </soapenv:Body>
</soapenv:Envelope>
```

**❌ Resultado esperado:**
```xml
<a:Exitoso>false</a:Exitoso>
<a:Mensaje>Cliente no es sujeto de crédito: Ya tiene un crédito activo</a:Mensaje>
<a:IdFactura>0</a:IdFactura>
<a:Total>0</a:Total>
<a:IdCreditoBanco>0</a:IdCreditoBanco>
```

---

### **PASO 9: Verificar datos en Bases de Datos**

#### En el Banco (banquito_core):

```sql
USE banquito_core;

-- Ver todos los créditos activos
SELECT 
    c.IdCredito,
    cl.Cedula,
    cl.Nombres + ' ' + cl.Apellidos AS Cliente,
    c.MontoCreditoOtorgado,
    c.NumeroCuotas,
    c.Estado,
    c.FechaOtorgamiento
FROM Creditos c
INNER JOIN Clientes cl ON c.IdCliente = cl.IdCliente
WHERE c.Estado = 'ACTIVO'
ORDER BY c.IdCredito;

-- Ver tabla de amortización del crédito 6
SELECT 
    NumeroCuota,
    ValorCuota,
    Interes,
    CapitalPagado,
    Saldo
FROM TablaAmortizacion 
WHERE IdCredito = 6 
ORDER BY NumeroCuota;
```

#### En la Comercializadora (comercializadora_db):

```sql
USE comercializadora_db;

-- Ver la factura generada
SELECT 
    f.IdFactura,
    f.Cedula,
    f.FormaPago,
    f.Total,
    f.Estado,
    f.IdCreditoBanco,
    f.FechaVenta
FROM Facturas f
WHERE f.IdFactura = 1;

-- Ver detalles de productos comprados
SELECT 
    df.IdDetalle,
    e.Nombre AS Electrodomestico,
    df.Cantidad,
    df.PrecioUnitario,
    df.Subtotal
FROM DetallesFactura df
INNER JOIN Electrodomesticos e ON df.IdElectrodomestico = e.IdElectrodomestico
WHERE df.IdFactura = 1;
```

**✅ Resultados esperados:**
- Banco: 1 crédito activo (IdCredito=6, Monto=$265, 6 cuotas)
- Banco: 6 registros en TablaAmortizacion para IdCredito=6
- Comercializadora: 1 factura con IdCreditoBanco=6
- Comercializadora: 2 detalles (Microondas y Licuadora)

---

## 📋 CHECKLIST DE PRUEBAS DE INTEGRACIÓN

| # | Prueba | Resultado | Estado |
|---|--------|-----------|--------|
| 1 | Cliente con crédito activo rechazado | ❌ Rechazado | ✅ |
| 2 | Cliente sin crédito aprobado | ✅ Aprobado | ✅ |
| 3 | Monto máximo calculado correctamente | $2,025 | ✅ |
| 4 | Crédito otorgado directamente | IdCredito=2 | ✅ |
| 5 | Tabla de amortización consultada | 12 cuotas | ✅ |
| 6 | Venta desde Comercializadora exitosa | IdFactura=1, IdCredito=6 | ✅ |
| 7 | Tabla consultada desde Comercializadora | 6 cuotas | ✅ |
| 8 | Segunda compra rechazada | ❌ Ya tiene crédito | ✅ |
| 9 | Datos verificados en BD | Consistentes | ✅ |

---

## 🎯 VALIDACIONES CLAVE DEL SISTEMA

### Reglas de Validación para Crédito:

1. ✅ **Cliente existe y está ACTIVO**
2. ✅ **Tiene al menos 1 cuenta ACTIVA**
3. ⭐ **NO tiene créditos ACTIVOS** (solo 1 crédito a la vez)
4. ✅ **Mínimo 10 movimientos** en últimos 3 meses
5. ✅ **Promedio depósitos > Promedio retiros**

### Fórmula Monto Máximo:
```
MontoMaximo = ((PromedioDepositos - PromedioRetiros) * 0.60) * NumeroCuotas * 2
```

### Fórmula Cuota Mensual (Sistema Francés):
```
TasaMensual = 0.18 / 12 = 0.015
Cuota = Monto × (TasaMensual × (1 + TasaMensual)^n) / ((1 + TasaMensual)^n - 1)
```

---


## 📝 DATOS DE PRUEBA

### Clientes (para insertar en banquito_core)
```sql
INSERT INTO Clientes VALUES 
(1, '1234567890', 'Juan', 'Pérez García', '1990-05-15', 'SOLTERO', 
 'Av. Principal 123', '0987654321', 'juan@email.com', 'ACTIVO'),

(2, '0987654321', 'María', 'López Torres', '1985-08-20', 'CASADO', 
 'Calle Secundaria 456', '0912345678', 'maria@email.com', 'ACTIVO');
```

### Electrodomésticos (para comercializadora_db)
```sql
INSERT INTO Electrodomesticos VALUES
(1, 'Refrigeradora LG 18 pies', 'Refrigeradora moderna con dispensador', 
 1200.00, 'ACTIVO', GETDATE()),

(2, 'Lavadora Samsung 16 Kg', 'Lavadora de carga frontal', 
 800.00, 'ACTIVO', GETDATE()),

(3, 'Televisor Sony 55"', 'Smart TV 4K', 
 950.00, 'ACTIVO', GETDATE());
```

---

## ✅ CHECKLIST DEL EXAMEN

### Documentación (Puntos 1-4)
- [x] Diagrama de Casos de Uso Módulo Crédito
- [ ] Descripción Caso de Uso "Monto Máximo"
- [ ] Script BD Core con 5 clientes, 5 cuentas, 50 movimientos
- [ ] Diagrama Entidad-Relación Comercializadora

### Servicios Banco (Puntos 5-7)
- [x] Servicio ValidarSujetoCredito
- [x] Servicio ObtenerMontoMaximoCredito
- [x] Servicio OtorgarCredito

### Comercializadora (Puntos 8-9)
- [x] CRUD Electrodomésticos
- [x] Facturación Efectivo (33% desc)
- [x] Facturación Crédito Directo

### Servicios Adicionales (Puntos 10-11)
- [x] Servicio ObtenerTablaAmortizacion
- [x] Consulta desde Comercializadora

### Final (Punto 12)
- [ ] Diagrama de Arquitectura completo

---

## 🔧 TROUBLESHOOTING

### Problema: Error de conexión entre servidores

**Síntoma:** `No se encontró el elemento de extremo predeterminado`

**Solución:**
1. Verificar que el Banco esté corriendo en puerto 58001
2. Actualizar Service Reference en Comercializadora
3. Verificar Web.config del Comercializadora:
```xml
<client>
  <endpoint 
    name="BasicHttpBinding_IBanQuitoWS"
    address="http://localhost:58001/ec.edu.espe.ws/BanQuitoWS.svc"
    binding="basicHttpBinding"
    contract="BanQuitoServiceReference.IBanQuitoWS" />
</client>
```

### Problema: Error de constraint en base de datos

**Síntoma:** `The INSERT statement conflicted with the CHECK constraint "CHK_EstadoFactura"`

**Solución:**
Verificar que el campo Estado en Facturas use valores válidos: `'PAGADO'`, `'PENDIENTE'`, `'ANULADO'`

### Problema: Total y CuotaMensual en 0

**Síntoma:** La venta se procesa pero Total=0

**Solución:**
Verificar que los electrodomésticos existan en la BD y que el cálculo del total se haga correctamente en `FacturacionService.cs`

---

## 📧 SOPORTE

Si tienes dudas sobre la implementación:
1. Revisa los comentarios en el código
2. Verifica las conexiones de BD en Web.config
3. Asegúrate de que ambos servidores estén corriendo
4. Verifica los puertos (58001 banco, 58002 comercializadora)
5. Consulta la sección de pruebas de integración completa

---

## 📊 RESUMEN DEL PROYECTO

**Estado actual:** AMBOS SERVIDORES COMPLETOS ✅
**Integración:** BANCO ↔ COMERCIALIZADORA FUNCIONANDO ✅

**Servicios implementados:**
- ✅ Banco: 4 servicios SOAP (Validar, MontoMaximo, Otorgar, TablaAmortizacion)
- ✅ Comercializadora: 3 grupos de servicios (CRUD, Facturación, Consulta)
- ✅ Comunicación SOAP entre servidores funcionando
- ✅ Pruebas de integración completas (9 pasos)

**Bases de datos:**
- ✅ banquito_core: Clientes, Cuentas, Movimientos, Creditos, TablaAmortizacion
- ✅ comercializadora_db: Electrodomesticos, Facturas, DetallesFactura

