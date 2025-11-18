-- =====================================================
-- SCRIPT SQL - BANCO BANQUITO (NOMENCLATURA JAVA)
-- Base de Datos: banquito_core

-- =====================================================

IF EXISTS (SELECT name FROM sys.databases WHERE name = 'banquito_core')
BEGIN
    ALTER DATABASE banquito_core SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE banquito_core;
END
GO

CREATE DATABASE banquito_core1;
GO

USE banquito_core1;
GO

-- =============================================
-- TABLA 1: cliente
-- =============================================
CREATE TABLE cliente (
    id_cliente INT PRIMARY KEY IDENTITY(1,1),
    cedula VARCHAR(10) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    estado_civil VARCHAR(20) NOT NULL,
    telefono VARCHAR(15),
    email VARCHAR(100),
    direccion VARCHAR(200),
    fecha_registro DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT CHK_estado_civil CHECK (estado_civil IN ('SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO', 'Soltero', 'Soltera', 'Casado', 'Casada'))
);
GO

-- =============================================
-- TABLA 2: cuenta
-- =============================================
CREATE TABLE cuenta (
    id_cuenta INT PRIMARY KEY IDENTITY(1,1),
    numero_cuenta VARCHAR(20) NOT NULL UNIQUE,
    id_cliente INT NOT NULL,
    tipo_cuenta VARCHAR(20) NOT NULL,
    saldo DECIMAL(12,2) NOT NULL DEFAULT 0,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVA',
    fecha_apertura DATE NOT NULL,
    CONSTRAINT FK_cuenta_cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    CONSTRAINT CHK_tipo_cuenta CHECK (tipo_cuenta IN ('AHORROS', 'CORRIENTE'))
);
GO

-- =============================================
-- TABLA 3: movimiento
-- =============================================
CREATE TABLE movimiento (
    id_movimiento INT PRIMARY KEY IDENTITY(1,1),
    id_cuenta INT NOT NULL,
    tipo_movimiento VARCHAR(20) NOT NULL,
    monto DECIMAL(12,2) NOT NULL,
    fecha_movimiento DATETIME NOT NULL DEFAULT GETDATE(),
    descripcion VARCHAR(200),
    CONSTRAINT FK_movimiento_cuenta FOREIGN KEY (id_cuenta) REFERENCES cuenta(id_cuenta),
    CONSTRAINT CHK_tipo_movimiento CHECK (tipo_movimiento IN ('DEPOSITO', 'RETIRO', 'TRANSFERENCIA'))
);
GO

-- =============================================
-- TABLA 4: credito
-- =============================================
CREATE TABLE credito (
    id_credito INT PRIMARY KEY IDENTITY(1,1),
    id_cliente INT NOT NULL,
    cedula VARCHAR(10) NOT NULL,
    monto_credito DECIMAL(12,2) NOT NULL,
    tasa_interes DECIMAL(5,2) NOT NULL,
    numero_cuotas INT NOT NULL,
    cuota_mensual DECIMAL(12,2) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    fecha_otorgamiento DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_credito_cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    CONSTRAINT CHK_estado_credito CHECK (estado IN ('ACTIVO', 'CANCELADO', 'VENCIDO')),
    CONSTRAINT CHK_numero_cuotas CHECK (numero_cuotas BETWEEN 3 AND 24)
);
GO

-- =============================================
-- TABLA 5: amortizacion
-- =============================================
CREATE TABLE amortizacion (
    id_amortizacion INT PRIMARY KEY IDENTITY(1,1),
    id_credito INT NOT NULL,
    numero_cuota INT NOT NULL,
    valor_cuota DECIMAL(12,2) NOT NULL,
    interes_pagado DECIMAL(12,2) NOT NULL,
    capital_pagado DECIMAL(12,2) NOT NULL,
    saldo DECIMAL(12,2) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    CONSTRAINT FK_amortizacion_credito FOREIGN KEY (id_credito) REFERENCES credito(id_credito)
);
GO

-- =============================================
-- ÍNDICES
-- =============================================
CREATE INDEX idx_cliente_cedula ON cliente(cedula);
CREATE INDEX idx_cuenta_cliente ON cuenta(id_cliente);
CREATE INDEX idx_movimiento_cuenta ON movimiento(id_cuenta);
CREATE INDEX idx_movimiento_fecha ON movimiento(fecha_movimiento);
CREATE INDEX idx_credito_cliente ON credito(id_cliente);
CREATE INDEX idx_credito_cedula ON credito(cedula);
CREATE INDEX idx_amortizacion_credito ON amortizacion(id_credito);
GO

-- =============================================
-- DATOS DE PRUEBA
-- =============================================
INSERT INTO cliente (cedula, nombre, apellido, fecha_nacimiento, estado_civil, telefono, email, direccion, fecha_registro) VALUES
('1234567890', 'Juan', 'Pérez', '1990-05-15', 'Casado', '0998765432', 'juan.perez@email.com', 'Av. Principal 123', GETDATE()),
('0987654321', 'María', 'González', '1985-08-20', 'Soltera', '0987654321', 'maria.gonzalez@email.com', 'Calle Secundaria 456', GETDATE()),
('1122334455', 'Carlos', 'Rodríguez', '1992-03-10', 'Casado', '0991234567', 'carlos.rodriguez@email.com', 'Urbanización Los Pinos 789', GETDATE()),
('2233445566', 'Ana', 'Martínez', '1988-11-25', 'Casada', '0998887766', 'ana.martinez@email.com', 'Barrio Central 321', GETDATE()),
('3344556677', 'Luis', 'Sánchez', '1995-07-08', 'Soltero', '0987776655', 'luis.sanchez@email.com', 'Conjunto Habitacional 654', GETDATE());

INSERT INTO cuenta (numero_cuenta, id_cliente, tipo_cuenta, saldo, fecha_apertura) VALUES
('1000000001', 1, 'AHORROS', 5000.00, '2024-01-15'),
('1000000002', 2, 'CORRIENTE', 8000.00, '2024-02-20'),
('1000000003', 3, 'AHORROS', 12000.00, '2024-03-10'),
('1000000004', 4, 'AHORROS', 6500.00, '2024-04-05'),
('1000000005', 5, 'CORRIENTE', 9500.00, '2024-05-12');

-- Movimientos (últimos 3 meses) - 50 registros
INSERT INTO movimiento (id_cuenta, tipo_movimiento, monto, fecha_movimiento, descripcion) VALUES
(1, 'DEPOSITO', 1000.00, DATEADD(day, -85, GETDATE()), 'Depósito en efectivo'),
(1, 'DEPOSITO', 1500.00, DATEADD(day, -80, GETDATE()), 'Transferencia recibida'),
(1, 'RETIRO', 500.00, DATEADD(day, -75, GETDATE()), 'Retiro cajero automático'),
(1, 'DEPOSITO', 2000.00, DATEADD(day, -70, GETDATE()), 'Depósito cheque'),
(1, 'RETIRO', 800.00, DATEADD(day, -65, GETDATE()), 'Pago tarjeta'),
(1, 'DEPOSITO', 1200.00, DATEADD(day, -60, GETDATE()), 'Depósito efectivo'),
(1, 'RETIRO', 600.00, DATEADD(day, -55, GETDATE()), 'Retiro ventanilla'),
(1, 'DEPOSITO', 1800.00, DATEADD(day, -50, GETDATE()), 'Transferencia'),
(1, 'RETIRO', 700.00, DATEADD(day, -45, GETDATE()), 'Compra establecimiento'),
(1, 'DEPOSITO', 1600.00, DATEADD(day, -40, GETDATE()), 'Depósito mensual'),

(2, 'DEPOSITO', 2500.00, DATEADD(day, -88, GETDATE()), 'Depósito inicial'),
(2, 'RETIRO', 1000.00, DATEADD(day, -82, GETDATE()), 'Retiro cajero'),
(2, 'DEPOSITO', 3000.00, DATEADD(day, -76, GETDATE()), 'Transferencia recibida'),
(2, 'RETIRO', 1500.00, DATEADD(day, -70, GETDATE()), 'Pago proveedor'),
(2, 'DEPOSITO', 2200.00, DATEADD(day, -64, GETDATE()), 'Depósito cheque'),
(2, 'RETIRO', 1200.00, DATEADD(day, -58, GETDATE()), 'Retiro ventanilla'),
(2, 'DEPOSITO', 2800.00, DATEADD(day, -52, GETDATE()), 'Transferencia'),
(2, 'RETIRO', 1800.00, DATEADD(day, -46, GETDATE()), 'Pago servicios'),
(2, 'DEPOSITO', 2600.00, DATEADD(day, -40, GETDATE()), 'Depósito efectivo'),
(2, 'RETIRO', 1400.00, DATEADD(day, -34, GETDATE()), 'Retiro cajero'),

(3, 'DEPOSITO', 3500.00, DATEADD(day, -87, GETDATE()), 'Depósito salario'),
(3, 'RETIRO', 2000.00, DATEADD(day, -81, GETDATE()), 'Retiro efectivo'),
(3, 'DEPOSITO', 4000.00, DATEADD(day, -75, GETDATE()), 'Depósito adicional'),
(3, 'RETIRO', 1500.00, DATEADD(day, -69, GETDATE()), 'Pago cuota'),
(3, 'DEPOSITO', 3800.00, DATEADD(day, -63, GETDATE()), 'Transferencia'),
(3, 'RETIRO', 2500.00, DATEADD(day, -57, GETDATE()), 'Retiro ventanilla'),
(3, 'DEPOSITO', 4200.00, DATEADD(day, -51, GETDATE()), 'Depósito mensual'),
(3, 'RETIRO', 1800.00, DATEADD(day, -45, GETDATE()), 'Compra online'),
(3, 'DEPOSITO', 3900.00, DATEADD(day, -39, GETDATE()), 'Depósito cheque'),
(3, 'RETIRO', 2200.00, DATEADD(day, -33, GETDATE()), 'Retiro cajero'),

(4, 'DEPOSITO', 1800.00, DATEADD(day, -86, GETDATE()), 'Depósito inicial'),
(4, 'RETIRO', 900.00, DATEADD(day, -80, GETDATE()), 'Retiro efectivo'),
(4, 'DEPOSITO', 2100.00, DATEADD(day, -74, GETDATE()), 'Transferencia'),
(4, 'RETIRO', 1100.00, DATEADD(day, -68, GETDATE()), 'Pago tarjeta'),
(4, 'DEPOSITO', 1900.00, DATEADD(day, -62, GETDATE()), 'Depósito cheque'),
(4, 'RETIRO', 1000.00, DATEADD(day, -56, GETDATE()), 'Retiro ventanilla'),
(4, 'DEPOSITO', 2300.00, DATEADD(day, -50, GETDATE()), 'Depósito salario'),
(4, 'RETIRO', 1200.00, DATEADD(day, -44, GETDATE()), 'Compra'),
(4, 'DEPOSITO', 2000.00, DATEADD(day, -38, GETDATE()), 'Transferencia'),
(4, 'RETIRO', 950.00, DATEADD(day, -32, GETDATE()), 'Retiro cajero'),

(5, 'DEPOSITO', 2800.00, DATEADD(day, -89, GETDATE()), 'Depósito mensual'),
(5, 'RETIRO', 1600.00, DATEADD(day, -83, GETDATE()), 'Retiro efectivo'),
(5, 'DEPOSITO', 3200.00, DATEADD(day, -77, GETDATE()), 'Transferencia'),
(5, 'RETIRO', 1400.00, DATEADD(day, -71, GETDATE()), 'Pago servicios'),
(5, 'DEPOSITO', 2900.00, DATEADD(day, -65, GETDATE()), 'Depósito cheque'),
(5, 'RETIRO', 1700.00, DATEADD(day, -59, GETDATE()), 'Retiro ventanilla'),
(5, 'DEPOSITO', 3100.00, DATEADD(day, -53, GETDATE()), 'Depósito salario'),
(5, 'RETIRO', 1900.00, DATEADD(day, -47, GETDATE()), 'Compra establecimiento'),
(5, 'DEPOSITO', 3000.00, DATEADD(day, -41, GETDATE()), 'Transferencia'),
(5, 'RETIRO', 1550.00, DATEADD(day, -35, GETDATE()), 'Retiro cajero');

GO
-- =============================================
-- CONSULTAS DE VERIFICACIÓN
-- =============================================

-- Verificar clientes
SELECT * FROM cliente;

-- Verificar cuentas
SELECT * FROM cuenta;

-- Verificar movimientos (últimos 3 meses)
SELECT 
    c.nombre + ' ' + c.apellido AS Cliente,
    cu.numero_cuenta AS NumeroCuenta,
    m.tipo_movimiento AS TipoMovimiento,
    m.monto AS Monto,
    m.fecha_movimiento AS Fecha
FROM movimiento m
INNER JOIN cuenta cu ON m.id_cuenta = cu.id_cuenta
INNER JOIN cliente c ON cu.id_cliente = c.id_cliente
WHERE m.fecha_movimiento >= DATEADD(month, -3, GETDATE())
ORDER BY c.apellido, m.fecha_movimiento DESC;

-- Calcular monto máximo para cliente 1 (ejemplo)
SELECT 
    c.nombre + ' ' + c.apellido AS Cliente,
    AVG(CASE WHEN m.tipo_movimiento = 'DEPOSITO' THEN m.monto ELSE 0 END) AS PromedioDepositos,
    AVG(CASE WHEN m.tipo_movimiento = 'RETIRO' THEN m.monto ELSE 0 END) AS PromedioRetiros,
    ((AVG(CASE WHEN m.tipo_movimiento = 'DEPOSITO' THEN m.monto ELSE 0 END) - 
      AVG(CASE WHEN m.tipo_movimiento = 'RETIRO' THEN m.monto ELSE 0 END)) * 0.60) * 9 AS MontoMaximoCredito
FROM movimiento m
INNER JOIN cuenta cu ON m.id_cuenta = cu.id_cuenta
INNER JOIN cliente c ON cu.id_cliente = c.id_cliente
WHERE c.id_cliente = 1 
AND m.fecha_movimiento >= DATEADD(month, -3, GETDATE())
GROUP BY c.nombre, c.apellido;

-- Estadísticas por cliente (todos los clientes)
SELECT 
    c.cedula AS Cedula,
    c.nombre + ' ' + c.apellido AS Cliente,
    COUNT(m.id_movimiento) AS TotalMovimientos,
    AVG(CASE WHEN m.tipo_movimiento = 'DEPOSITO' THEN m.monto ELSE 0 END) AS PromedioDepositos,
    AVG(CASE WHEN m.tipo_movimiento = 'RETIRO' THEN m.monto ELSE 0 END) AS PromedioRetiros,
    CAST(((AVG(CASE WHEN m.tipo_movimiento = 'DEPOSITO' THEN m.monto ELSE 0 END) - 
          AVG(CASE WHEN m.tipo_movimiento = 'RETIRO' THEN m.monto ELSE 0 END)) * 0.60) * 9 * 2 AS DECIMAL(12,2)) AS MontoMaximoCredito
FROM cliente c
INNER JOIN cuenta cu ON c.id_cliente = cu.id_cliente
INNER JOIN movimiento m ON cu.id_cuenta = m.id_cuenta
WHERE m.fecha_movimiento >= DATEADD(month, -3, GETDATE())
GROUP BY c.cedula, c.nombre, c.apellido
ORDER BY c.cedula;

-- Verificar créditos activos
SELECT 
    cr.id_credito AS IdCredito,
    c.cedula AS Cedula,
    c.nombre + ' ' + c.apellido AS Cliente,
    cr.monto_credito AS MontoCredito,
    cr.numero_cuotas AS NumeroCuotas,
    cr.cuota_mensual AS CuotaMensual,
    cr.estado AS Estado,
    cr.fecha_otorgamiento AS FechaOtorgamiento
FROM credito cr
INNER JOIN cliente c ON cr.id_cliente = c.id_cliente
WHERE cr.estado = 'ACTIVO'
ORDER BY cr.id_credito;

-- Ver tabla de amortización de un crédito (ejemplo: crédito 1)
SELECT 
    numero_cuota AS NumeroCuota,
    valor_cuota AS ValorCuota,
    interes_pagado AS Interes,
    capital_pagado AS Capital,
    saldo AS Saldo,
    fecha_vencimiento AS FechaVencimiento
FROM amortizacion
WHERE id_credito = 1
ORDER BY numero_cuota;

GO