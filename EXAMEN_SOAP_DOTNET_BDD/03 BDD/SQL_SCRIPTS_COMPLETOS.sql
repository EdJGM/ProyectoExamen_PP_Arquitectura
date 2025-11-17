-- =============================================
-- SCRIPTS SQL COMPLETOS
-- Examen Complexivo BanQuito + Comercializadora
-- =============================================

-- =============================================
-- PARTE 1: BASE DE DATOS BANCO BANQUITO
-- =============================================

CREATE DATABASE banquito_core;
GO

USE banquito_core;
GO

-- Tabla Clientes
CREATE TABLE Clientes (
    IdCliente INT PRIMARY KEY IDENTITY(1,1),
    Cedula VARCHAR(10) NOT NULL UNIQUE,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    EstadoCivil VARCHAR(20) NOT NULL,
    Direccion VARCHAR(200),
    Telefono VARCHAR(15),
    Email VARCHAR(100),
    Estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    CONSTRAINT CHK_EstadoCivil CHECK (EstadoCivil IN ('SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO')),
    CONSTRAINT CHK_EstadoCliente CHECK (Estado IN ('ACTIVO', 'INACTIVO'))
);

-- Tabla Cuentas
CREATE TABLE Cuentas (
    IdCuenta INT PRIMARY KEY IDENTITY(1,1),
    IdCliente INT NOT NULL,
    NumeroCuenta VARCHAR(20) NOT NULL UNIQUE,
    TipoCuenta VARCHAR(20) NOT NULL,
    Saldo DECIMAL(12,2) NOT NULL DEFAULT 0,
    FechaApertura DATE NOT NULL DEFAULT GETDATE(),
    Estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    CONSTRAINT FK_Cuentas_Clientes FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente),
    CONSTRAINT CHK_TipoCuenta CHECK (TipoCuenta IN ('AHORROS', 'CORRIENTE')),
    CONSTRAINT CHK_EstadoCuenta CHECK (Estado IN ('ACTIVO', 'INACTIVO', 'BLOQUEADA'))
);

-- Tabla Movimientos
CREATE TABLE Movimientos (
    IdMovimiento INT PRIMARY KEY IDENTITY(1,1),
    IdCuenta INT NOT NULL,
    TipoMovimiento VARCHAR(20) NOT NULL,
    Monto DECIMAL(12,2) NOT NULL,
    Fecha DATETIME NOT NULL DEFAULT GETDATE(),
    Descripcion VARCHAR(200),
    CONSTRAINT FK_Movimientos_Cuentas FOREIGN KEY (IdCuenta) REFERENCES Cuentas(IdCuenta),
    CONSTRAINT CHK_TipoMovimiento CHECK (TipoMovimiento IN ('DEPOSITO', 'RETIRO', 'TRANSFERENCIA'))
);

-- Tabla Creditos (NUEVA)
CREATE TABLE Creditos (
    IdCredito INT PRIMARY KEY IDENTITY(1,1),
    IdCliente INT NOT NULL,
    MontoCreditoOtorgado DECIMAL(12,2) NOT NULL,
    TasaInteres DECIMAL(5,2) NOT NULL,
    NumeroCuotas INT NOT NULL,
    FechaOtorgamiento DATETIME NOT NULL DEFAULT GETDATE(),
    Estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    CONSTRAINT FK_Creditos_Clientes FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente),
    CONSTRAINT CHK_EstadoCredito CHECK (Estado IN ('ACTIVO', 'CANCELADO', 'VENCIDO')),
    CONSTRAINT CHK_NumeroCuotas CHECK (NumeroCuotas BETWEEN 3 AND 24)
);

-- Tabla TablaAmortizacion (NUEVA)
CREATE TABLE TablaAmortizacion (
    IdAmortizacion INT PRIMARY KEY IDENTITY(1,1),
    IdCredito INT NOT NULL,
    NumeroCuota INT NOT NULL,
    ValorCuota DECIMAL(12,2) NOT NULL,
    Interes DECIMAL(12,2) NOT NULL,
    CapitalPagado DECIMAL(12,2) NOT NULL,
    Saldo DECIMAL(12,2) NOT NULL,
    CONSTRAINT FK_TablaAmortizacion_Creditos FOREIGN KEY (IdCredito) REFERENCES Creditos(IdCredito)
);

-- Índices para optimización
CREATE INDEX IX_Clientes_Cedula ON Clientes(Cedula);
CREATE INDEX IX_Cuentas_Cliente ON Cuentas(IdCliente);
CREATE INDEX IX_Movimientos_Cuenta ON Movimientos(IdCuenta);
CREATE INDEX IX_Movimientos_Fecha ON Movimientos(Fecha);
CREATE INDEX IX_Creditos_Cliente ON Creditos(IdCliente);
CREATE INDEX IX_TablaAmortizacion_Credito ON TablaAmortizacion(IdCredito);

GO

-- =============================================
-- DATOS DE PRUEBA - BANCO BANQUITO
-- =============================================

-- Insertar 5 clientes
INSERT INTO Clientes (Cedula, Nombres, Apellidos, FechaNacimiento, EstadoCivil, Direccion, Telefono, Email, Estado) VALUES
('1234567890', 'Juan Carlos', 'Pérez García', '1990-05-15', 'SOLTERO', 'Av. Principal 123, Quito', '0987654321', 'juan.perez@email.com', 'ACTIVO'),
('0987654321', 'María Fernanda', 'López Torres', '1985-08-20', 'CASADO', 'Calle Secundaria 456, Guayaquil', '0912345678', 'maria.lopez@email.com', 'ACTIVO'),
('1122334455', 'Pedro Antonio', 'Ramírez Silva', '1992-11-10', 'SOLTERO', 'Av. Los Pinos 789, Cuenca', '0998877665', 'pedro.ramirez@email.com', 'ACTIVO'),
('5544332211', 'Ana Patricia', 'González Vega', '1988-03-25', 'CASADO', 'Calle Las Flores 321, Ambato', '0976543210', 'ana.gonzalez@email.com', 'ACTIVO'),
('6677889900', 'Luis Miguel', 'Martínez Cruz', '1995-07-30', 'SOLTERO', 'Av. Central 654, Otavalo', '0965432109', 'luis.martinez@email.com', 'ACTIVO');

-- Insertar 5 cuentas
INSERT INTO Cuentas (IdCliente, NumeroCuenta, TipoCuenta, Saldo, FechaApertura, Estado) VALUES
(1, '001-0000001', 'AHORROS', 5000.00, '2023-01-15', 'ACTIVO'),
(2, '001-0000002', 'AHORROS', 3500.00, '2023-02-20', 'ACTIVO'),
(3, '001-0000003', 'CORRIENTE', 8000.00, '2023-03-10', 'ACTIVO'),
(4, '001-0000004', 'AHORROS', 2500.00, '2023-04-05', 'ACTIVO'),
(5, '001-0000005', 'AHORROS', 6000.00, '2023-05-12', 'ACTIVO');

-- Insertar 50+ movimientos (últimos 3 meses)
-- Cliente 1 (Juan Pérez) - Buen historial
INSERT INTO Movimientos (IdCuenta, TipoMovimiento, Monto, Fecha, Descripcion) VALUES
-- Hace 3 meses
(1, 'DEPOSITO', 500.00, DATEADD(month, -3, GETDATE()), 'Depósito mensual'),
(1, 'RETIRO', 200.00, DATEADD(day, -85, GETDATE()), 'Retiro cajero'),
(1, 'DEPOSITO', 500.00, DATEADD(day, -80, GETDATE()), 'Depósito nómina'),
(1, 'RETIRO', 150.00, DATEADD(day, -75, GETDATE()), 'Pago servicios'),
-- Hace 2 meses
(1, 'DEPOSITO', 500.00, DATEADD(month, -2, GETDATE()), 'Depósito mensual'),
(1, 'RETIRO', 180.00, DATEADD(day, -55, GETDATE()), 'Compra supermercado'),
(1, 'DEPOSITO', 500.00, DATEADD(day, -50, GETDATE()), 'Depósito nómina'),
(1, 'RETIRO', 170.00, DATEADD(day, -45, GETDATE()), 'Pago tarjeta'),
-- Hace 1 mes
(1, 'DEPOSITO', 500.00, DATEADD(month, -1, GETDATE()), 'Depósito mensual'),
(1, 'RETIRO', 175.00, DATEADD(day, -25, GETDATE()), 'Retiro cajero'),
(1, 'DEPOSITO', 500.00, DATEADD(day, -20, GETDATE()), 'Depósito nómina'),
(1, 'RETIRO', 160.00, DATEADD(day, -15, GETDATE()), 'Compras varias');

-- Cliente 2 (María López) - Buen historial
INSERT INTO Movimientos (IdCuenta, TipoMovimiento, Monto, Fecha, Descripcion) VALUES
(2, 'DEPOSITO', 600.00, DATEADD(day, -90, GETDATE()), 'Depósito mensual'),
(2, 'RETIRO', 250.00, DATEADD(day, -85, GETDATE()), 'Retiro cajero'),
(2, 'DEPOSITO', 600.00, DATEADD(day, -60, GETDATE()), 'Depósito mensual'),
(2, 'RETIRO', 220.00, DATEADD(day, -55, GETDATE()), 'Pago servicios'),
(2, 'DEPOSITO', 600.00, DATEADD(day, -30, GETDATE()), 'Depósito mensual'),
(2, 'RETIRO', 200.00, DATEADD(day, -25, GETDATE()), 'Compras'),
(2, 'DEPOSITO', 600.00, DATEADD(day, -10, GETDATE()), 'Depósito nómina'),
(2, 'RETIRO', 230.00, DATEADD(day, -5, GETDATE()), 'Retiro cajero');

-- Cliente 3 (Pedro Ramírez)
INSERT INTO Movimientos (IdCuenta, TipoMovimiento, Monto, Fecha, Descripcion) VALUES
(3, 'DEPOSITO', 800.00, DATEADD(day, -90, GETDATE()), 'Depósito negocio'),
(3, 'RETIRO', 300.00, DATEADD(day, -85, GETDATE()), 'Retiro'),
(3, 'DEPOSITO', 750.00, DATEADD(day, -60, GETDATE()), 'Depósito negocio'),
(3, 'RETIRO', 280.00, DATEADD(day, -55, GETDATE()), 'Pago proveedores'),
(3, 'DEPOSITO', 820.00, DATEADD(day, -30, GETDATE()), 'Depósito negocio'),
(3, 'RETIRO', 320.00, DATEADD(day, -25, GETDATE()), 'Compras'),
(3, 'DEPOSITO', 780.00, DATEADD(day, -10, GETDATE()), 'Depósito negocio'),
(3, 'RETIRO', 290.00, DATEADD(day, -5, GETDATE()), 'Retiro');

-- Cliente 4 (Ana González)
INSERT INTO Movimientos (IdCuenta, TipoMovimiento, Monto, Fecha, Descripcion) VALUES
(4, 'DEPOSITO', 400.00, DATEADD(day, -90, GETDATE()), 'Depósito mensual'),
(4, 'RETIRO', 150.00, DATEADD(day, -85, GETDATE()), 'Retiro'),
(4, 'DEPOSITO', 420.00, DATEADD(day, -60, GETDATE()), 'Depósito mensual'),
(4, 'RETIRO', 140.00, DATEADD(day, -55, GETDATE()), 'Compras'),
(4, 'DEPOSITO', 410.00, DATEADD(day, -30, GETDATE()), 'Depósito mensual'),
(4, 'RETIRO', 160.00, DATEADD(day, -25, GETDATE()), 'Pago servicios'),
(4, 'DEPOSITO', 430.00, DATEADD(day, -10, GETDATE()), 'Depósito mensual'),
(4, 'RETIRO', 155.00, DATEADD(day, -5, GETDATE()), 'Retiro');

-- Cliente 5 (Luis Martínez)
INSERT INTO Movimientos (IdCuenta, TipoMovimiento, Monto, Fecha, Descripcion) VALUES
(5, 'DEPOSITO', 550.00, DATEADD(day, -90, GETDATE()), 'Depósito mensual'),
(5, 'RETIRO', 180.00, DATEADD(day, -85, GETDATE()), 'Retiro'),
(5, 'DEPOSITO', 560.00, DATEADD(day, -60, GETDATE()), 'Depósito mensual'),
(5, 'RETIRO', 190.00, DATEADD(day, -55, GETDATE()), 'Compras'),
(5, 'DEPOSITO', 540.00, DATEADD(day, -30, GETDATE()), 'Depósito mensual'),
(5, 'RETIRO', 175.00, DATEADD(day, -25, GETDATE()), 'Pago servicios'),
(5, 'DEPOSITO', 570.00, DATEADD(day, -10, GETDATE()), 'Depósito mensual'),
(5, 'RETIRO', 185.00, DATEADD(day, -5, GETDATE()), 'Retiro');

GO

-- =============================================
-- PARTE 2: BASE DE DATOS COMERCIALIZADORA
-- =============================================

CREATE DATABASE comercializadora_db;
GO

USE comercializadora_db;
GO

-- Tabla Electrodomesticos
CREATE TABLE Electrodomesticos (
    IdElectrodomestico INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(500),
    Precio DECIMAL(10,2) NOT NULL,
    Estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    FechaRegistro DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT CHK_EstadoElectro CHECK (Estado IN ('ACTIVO', 'INACTIVO')),
    CONSTRAINT CHK_PrecioElectro CHECK (Precio > 0)
);

-- Tabla Facturas
CREATE TABLE Facturas (
    IdFactura INT PRIMARY KEY IDENTITY(1,1),
    Cedula VARCHAR(10) NOT NULL,
    FormaPago VARCHAR(20) NOT NULL,
    FechaVenta DATETIME NOT NULL DEFAULT GETDATE(),
    Descuento DECIMAL(10,2) NOT NULL DEFAULT 0,
    Subtotal DECIMAL(10,2) NOT NULL,
    Total DECIMAL(10,2) NOT NULL,
    IdCreditoBanco INT NULL,
    Estado VARCHAR(20) NOT NULL DEFAULT 'PAGADO',
    CONSTRAINT CHK_FormaPago CHECK (FormaPago IN ('EFECTIVO', 'CREDITO_DIRECTO')),
    CONSTRAINT CHK_EstadoFactura CHECK (Estado IN ('PAGADO', 'PENDIENTE', 'ANULADO'))
);

-- Tabla DetallesFactura
CREATE TABLE DetallesFactura (
    IdDetalle INT PRIMARY KEY IDENTITY(1,1),
    IdFactura INT NOT NULL,
    IdElectrodomestico INT NOT NULL,
    Cantidad INT NOT NULL,
    PrecioUnitario DECIMAL(10,2) NOT NULL,
    Subtotal DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_DetallesFactura_Facturas FOREIGN KEY (IdFactura) REFERENCES Facturas(IdFactura),
    CONSTRAINT FK_DetallesFactura_Electrodomesticos FOREIGN KEY (IdElectrodomestico) REFERENCES Electrodomesticos(IdElectrodomestico),
    CONSTRAINT CHK_Cantidad CHECK (Cantidad > 0)
);

-- Índices
CREATE INDEX IX_Facturas_Cedula ON Facturas(Cedula);
CREATE INDEX IX_Facturas_Fecha ON Facturas(FechaVenta);
CREATE INDEX IX_DetallesFactura_Factura ON DetallesFactura(IdFactura);

GO

-- =============================================
-- DATOS DE PRUEBA - COMERCIALIZADORA
-- =============================================

-- Insertar electrodomésticos
INSERT INTO Electrodomesticos (Nombre, Descripcion, Precio, Estado) VALUES
('Refrigeradora LG 18 pies', 'Refrigeradora moderna con dispensador de agua y hielo, tecnología Inverter, eficiencia energética A+', 1200.00, 'ACTIVO'),
('Lavadora Samsung 16 Kg', 'Lavadora de carga frontal con 14 programas de lavado, función vapor y secado rápido', 800.00, 'ACTIVO'),
('Televisor Sony 55"', 'Smart TV 4K con Android TV, procesador X1, HDR y sonido Dolby Atmos', 950.00, 'ACTIVO'),
('Cocina Indurama 6 hornillas', 'Cocina a gas con horno eléctrico, parrilla, encendido eléctrico y luz interior', 450.00, 'ACTIVO'),
('Microondas Panasonic 1.2 CF', 'Microondas digital con grill, 10 niveles de potencia y función descongelar', 180.00, 'ACTIVO'),
('Licuadora Oster 3 velocidades', 'Licuadora de alta potencia con vaso de vidrio 1.5L y cuchillas de acero', 85.00, 'ACTIVO'),
('Aspiradora Electrolux', 'Aspiradora vertical con filtro HEPA, 2000W de potencia y accesorios incluidos', 220.00, 'ACTIVO'),
('Plancha Philips a vapor', 'Plancha a vapor con suela cerámica, sistema anti-goteo y autolimpieza', 45.00, 'ACTIVO'),
('Batidora KitchenAid', 'Batidora de pedestal con 3 accesorios, tazón de 4.5L y 10 velocidades', 350.00, 'ACTIVO'),
('Cafetera Nespresso', 'Cafetera de cápsulas con sistema de presión 19 bares y bandeja ajustable', 195.00, 'ACTIVO');

GO

-- =============================================
-- CONSULTAS DE VERIFICACIÓN
-- =============================================

-- Verificar clientes del banco
SELECT * FROM banquito_core.dbo.Clientes;

-- Verificar cuentas
SELECT * FROM banquito_core.dbo.Cuentas;

-- Verificar movimientos (últimos 3 meses)
SELECT 
    c.Nombres + ' ' + c.Apellidos AS Cliente,
    cu.NumeroCuenta,
    m.TipoMovimiento,
    m.Monto,
    m.Fecha
FROM banquito_core.dbo.Movimientos m
INNER JOIN banquito_core.dbo.Cuentas cu ON m.IdCuenta = cu.IdCuenta
INNER JOIN banquito_core.dbo.Clientes c ON cu.IdCliente = c.IdCliente
WHERE m.Fecha >= DATEADD(month, -3, GETDATE())
ORDER BY c.Apellidos, m.Fecha DESC;

-- Calcular monto máximo para cliente 1 (ejemplo)
SELECT 
    c.Nombres + ' ' + c.Apellidos AS Cliente,
    AVG(CASE WHEN m.TipoMovimiento = 'DEPOSITO' THEN m.Monto ELSE 0 END) AS PromedioDepositos,
    AVG(CASE WHEN m.TipoMovimiento = 'RETIRO' THEN m.Monto ELSE 0 END) AS PromedioRetiros,
    ((AVG(CASE WHEN m.TipoMovimiento = 'DEPOSITO' THEN m.Monto ELSE 0 END) - 
      AVG(CASE WHEN m.TipoMovimiento = 'RETIRO' THEN m.Monto ELSE 0 END)) * 0.60) * 9 AS MontoMaximoCredito
FROM banquito_core.dbo.Movimientos m
INNER JOIN banquito_core.dbo.Cuentas cu ON m.IdCuenta = cu.IdCuenta
INNER JOIN banquito_core.dbo.Clientes c ON cu.IdCliente = c.IdCliente
WHERE c.IdCliente = 1 
AND m.Fecha >= DATEADD(month, -3, GETDATE())
GROUP BY c.Nombres, c.Apellidos;

-- Verificar electrodomésticos
SELECT * FROM comercializadora_db.dbo.Electrodomesticos;

-- =============================================
-- FIN DE LOS SCRIPTS
-- =============================================

PRINT 'Scripts ejecutados exitosamente';
PRINT 'Base de datos banquito_core creada con 5 clientes, 5 cuentas y 50+ movimientos';
PRINT 'Base de datos comercializadora_db creada con 10 electrodomésticos';
GO
