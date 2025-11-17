-- =====================================================
-- BASE DE DATOS: BANCO BANQUITO CORE + MÓDULO CRÉDITO
-- =====================================================

CREATE DATABASE IF NOT EXISTS banquito_core;
USE banquito_core;

-- Tabla: Cliente
CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(10) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    estado_civil VARCHAR(20) NOT NULL,
    telefono VARCHAR(15),
    email VARCHAR(100),
    direccion VARCHAR(200),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Cuenta
CREATE TABLE cuenta (
    id_cuenta INT AUTO_INCREMENT PRIMARY KEY,
    numero_cuenta VARCHAR(20) NOT NULL UNIQUE,
    id_cliente INT NOT NULL,
    tipo_cuenta VARCHAR(20) NOT NULL,
    saldo DECIMAL(12,2) DEFAULT 0.00,
    estado VARCHAR(20) DEFAULT 'ACTIVA',
    fecha_apertura DATE NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

-- Tabla: Movimiento
CREATE TABLE movimiento (
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_cuenta INT NOT NULL,
    tipo_movimiento VARCHAR(20) NOT NULL, -- DEPOSITO, RETIRO
    monto DECIMAL(12,2) NOT NULL,
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descripcion VARCHAR(200),
    FOREIGN KEY (id_cuenta) REFERENCES cuenta(id_cuenta)
);

-- Tabla: Credito
CREATE TABLE credito (
    id_credito INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    cedula VARCHAR(10) NOT NULL,
    monto_credito DECIMAL(12,2) NOT NULL,
    tasa_interes DECIMAL(5,2) NOT NULL,
    numero_cuotas INT NOT NULL,
    cuota_mensual DECIMAL(12,2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'ACTIVO',
    fecha_otorgamiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

-- Tabla: Tabla de Amortización
CREATE TABLE amortizacion (
    id_amortizacion INT AUTO_INCREMENT PRIMARY KEY,
    id_credito INT NOT NULL,
    numero_cuota INT NOT NULL,
    valor_cuota DECIMAL(12,2) NOT NULL,
    interes_pagado DECIMAL(12,2) NOT NULL,
    capital_pagado DECIMAL(12,2) NOT NULL,
    saldo DECIMAL(12,2) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    FOREIGN KEY (id_credito) REFERENCES credito(id_credito)
);

-- =====================================================
-- DATOS DE PRUEBA
-- =====================================================

-- Insertar 5 Clientes
INSERT INTO cliente (cedula, nombre, apellido, fecha_nacimiento, estado_civil, telefono, email, direccion) VALUES
('1234567890', 'Juan', 'Pérez', '1990-05-15', 'Casado', '0998765432', 'juan.perez@email.com', 'Av. Principal 123'),
('0987654321', 'María', 'González', '1985-08-20', 'Soltera', '0987654321', 'maria.gonzalez@email.com', 'Calle Secundaria 456'),
('1122334455', 'Carlos', 'Rodríguez', '1992-03-10', 'Casado', '0991234567', 'carlos.rodriguez@email.com', 'Urbanización Los Pinos 789'),
('2233445566', 'Ana', 'Martínez', '1988-11-25', 'Casada', '0998887766', 'ana.martinez@email.com', 'Barrio Central 321'),
('3344556677', 'Luis', 'Sánchez', '1995-07-08', 'Soltero', '0987776655', 'luis.sanchez@email.com', 'Conjunto Habitacional 654');

-- Insertar 5 Cuentas
INSERT INTO cuenta (numero_cuenta, id_cliente, tipo_cuenta, saldo, fecha_apertura) VALUES
('1000000001', 1, 'AHORROS', 5000.00, '2024-01-15'),
('1000000002', 2, 'CORRIENTE', 8000.00, '2024-02-20'),
('1000000003', 3, 'AHORROS', 12000.00, '2024-03-10'),
('1000000004', 4, 'AHORROS', 6500.00, '2024-04-05'),
('1000000005', 5, 'CORRIENTE', 9500.00, '2024-05-12');

-- Insertar 50 Movimientos (10 por cuenta - mix de depósitos y retiros de últimos 3 meses)
-- Cuenta 1
INSERT INTO movimiento (id_cuenta, tipo_movimiento, monto, fecha_movimiento, descripcion) VALUES
(1, 'DEPOSITO', 1000.00, '2024-08-15 10:30:00', 'Depósito en efectivo'),
(1, 'DEPOSITO', 1500.00, '2024-08-20 14:15:00', 'Transferencia recibida'),
(1, 'RETIRO', 500.00, '2024-08-25 09:45:00', 'Retiro cajero automático'),
(1, 'DEPOSITO', 2000.00, '2024-09-05 11:20:00', 'Depósito cheque'),
(1, 'RETIRO', 800.00, '2024-09-10 16:30:00', 'Pago tarjeta'),
(1, 'DEPOSITO', 1200.00, '2024-09-18 10:00:00', 'Depósito efectivo'),
(1, 'RETIRO', 600.00, '2024-10-02 13:45:00', 'Retiro ventanilla'),
(1, 'DEPOSITO', 1800.00, '2024-10-15 09:30:00', 'Transferencia'),
(1, 'RETIRO', 700.00, '2024-10-28 15:20:00', 'Compra establecimiento'),
(1, 'DEPOSITO', 1600.00, '2024-11-10 11:10:00', 'Depósito mensual'),

-- Cuenta 2
(2, 'DEPOSITO', 2500.00, '2024-08-12 08:30:00', 'Depósito inicial'),
(2, 'RETIRO', 1000.00, '2024-08-18 14:20:00', 'Retiro cajero'),
(2, 'DEPOSITO', 3000.00, '2024-08-25 10:45:00', 'Transferencia recibida'),
(2, 'RETIRO', 1500.00, '2024-09-03 12:30:00', 'Pago proveedor'),
(2, 'DEPOSITO', 2200.00, '2024-09-12 09:15:00', 'Depósito cheque'),
(2, 'RETIRO', 1200.00, '2024-09-22 16:40:00', 'Retiro ventanilla'),
(2, 'DEPOSITO', 2800.00, '2024-10-05 11:25:00', 'Transferencia'),
(2, 'RETIRO', 1800.00, '2024-10-18 13:50:00', 'Pago servicios'),
(2, 'DEPOSITO', 2600.00, '2024-11-01 10:30:00', 'Depósito efectivo'),
(2, 'RETIRO', 1400.00, '2024-11-12 15:10:00', 'Retiro cajero'),

-- Cuenta 3
(3, 'DEPOSITO', 3500.00, '2024-08-10 09:00:00', 'Depósito salario'),
(3, 'RETIRO', 2000.00, '2024-08-15 13:30:00', 'Retiro efectivo'),
(3, 'DEPOSITO', 4000.00, '2024-08-22 10:20:00', 'Depósito adicional'),
(3, 'RETIRO', 1500.00, '2024-09-01 14:45:00', 'Pago cuota'),
(3, 'DEPOSITO', 3800.00, '2024-09-10 08:50:00', 'Transferencia'),
(3, 'RETIRO', 2500.00, '2024-09-20 12:15:00', 'Retiro ventanilla'),
(3, 'DEPOSITO', 4200.00, '2024-10-03 09:30:00', 'Depósito mensual'),
(3, 'RETIRO', 1800.00, '2024-10-15 16:20:00', 'Compra online'),
(3, 'DEPOSITO', 3900.00, '2024-10-28 11:40:00', 'Depósito cheque'),
(3, 'RETIRO', 2200.00, '2024-11-08 14:30:00', 'Retiro cajero'),

-- Cuenta 4
(4, 'DEPOSITO', 1800.00, '2024-08-14 10:15:00', 'Depósito inicial'),
(4, 'RETIRO', 900.00, '2024-08-19 13:45:00', 'Retiro efectivo'),
(4, 'DEPOSITO', 2100.00, '2024-08-28 09:30:00', 'Transferencia'),
(4, 'RETIRO', 1100.00, '2024-09-06 15:20:00', 'Pago tarjeta'),
(4, 'DEPOSITO', 1900.00, '2024-09-15 11:10:00', 'Depósito cheque'),
(4, 'RETIRO', 1000.00, '2024-09-25 14:50:00', 'Retiro ventanilla'),
(4, 'DEPOSITO', 2300.00, '2024-10-08 10:40:00', 'Depósito salario'),
(4, 'RETIRO', 1200.00, '2024-10-20 13:25:00', 'Compra'),
(4, 'DEPOSITO', 2000.00, '2024-11-02 09:50:00', 'Transferencia'),
(4, 'RETIRO', 950.00, '2024-11-13 16:05:00', 'Retiro cajero'),

-- Cuenta 5
(5, 'DEPOSITO', 2800.00, '2024-08-11 08:45:00', 'Depósito mensual'),
(5, 'RETIRO', 1600.00, '2024-08-17 12:30:00', 'Retiro efectivo'),
(5, 'DEPOSITO', 3200.00, '2024-08-26 10:10:00', 'Transferencia'),
(5, 'RETIRO', 1400.00, '2024-09-04 15:40:00', 'Pago servicios'),
(5, 'DEPOSITO', 2900.00, '2024-09-13 09:25:00', 'Depósito cheque'),
(5, 'RETIRO', 1700.00, '2024-09-23 13:55:00', 'Retiro ventanilla'),
(5, 'DEPOSITO', 3100.00, '2024-10-06 11:15:00', 'Depósito salario'),
(5, 'RETIRO', 1900.00, '2024-10-19 14:35:00', 'Compra establecimiento'),
(5, 'DEPOSITO', 3000.00, '2024-11-03 10:20:00', 'Transferencia'),
(5, 'RETIRO', 1550.00, '2024-11-14 15:45:00', 'Retiro cajero');

-- =====================================================
-- Índices para mejorar rendimiento
-- =====================================================
CREATE INDEX idx_cliente_cedula ON cliente(cedula);
CREATE INDEX idx_cuenta_cliente ON cuenta(id_cliente);
CREATE INDEX idx_movimiento_cuenta ON movimiento(id_cuenta);
CREATE INDEX idx_movimiento_fecha ON movimiento(fecha_movimiento);
CREATE INDEX idx_credito_cliente ON credito(id_cliente);
CREATE INDEX idx_credito_cedula ON credito(cedula);
CREATE INDEX idx_amortizacion_credito ON amortizacion(id_credito);