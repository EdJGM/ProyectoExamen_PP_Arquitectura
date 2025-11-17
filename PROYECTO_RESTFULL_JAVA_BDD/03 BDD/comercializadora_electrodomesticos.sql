-- ===========================================================
-- BASE DE DATOS: COMERCIALIZADORA DE ELECTRODOMÉSTICOS
-- ===========================================================

CREATE DATABASE IF NOT EXISTS comercializadora_electrodomesticos;
USE comercializadora_electrodomesticos;

-- Tabla: Electrodoméstico (Catálogo de productos)
CREATE TABLE electrodomestico (
    id_electrodomestico INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(300),
    marca VARCHAR(50),
    precio_venta DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    estado VARCHAR(20) DEFAULT 'DISPONIBLE',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Factura
CREATE TABLE factura (
    id_factura INT AUTO_INCREMENT PRIMARY KEY,
    numero_factura VARCHAR(20) NOT NULL UNIQUE,
    cedula_cliente VARCHAR(10) NOT NULL,
    nombre_cliente VARCHAR(200) NOT NULL,
    fecha_factura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10,2) NOT NULL,
    descuento DECIMAL(10,2) DEFAULT 0.00,
    total DECIMAL(10,2) NOT NULL,
    forma_pago VARCHAR(20) NOT NULL, -- EFECTIVO, CREDITO_DIRECTO
    estado VARCHAR(20) DEFAULT 'PAGADA'
);

-- Tabla: Detalle de Factura
CREATE TABLE detalle_factura (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_factura INT NOT NULL,
    id_electrodomestico INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_factura) REFERENCES factura(id_factura),
    FOREIGN KEY (id_electrodomestico) REFERENCES electrodomestico(id_electrodomestico)
);

-- Tabla: Crédito Aprobado (registro de créditos procesados)
CREATE TABLE credito_aprobado (
    id_credito_local INT AUTO_INCREMENT PRIMARY KEY,
    id_factura INT NOT NULL,
    cedula_cliente VARCHAR(10) NOT NULL,
    id_credito_banco INT,
    monto_credito DECIMAL(10,2) NOT NULL,
    numero_cuotas INT NOT NULL,
    cuota_mensual DECIMAL(10,2),
    estado VARCHAR(20) DEFAULT 'APROBADO',
    fecha_aprobacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_factura) REFERENCES factura(id_factura)
);

-- =====================================================
-- DATOS DE PRUEBA - Catálogo de Electrodomésticos
-- =====================================================

INSERT INTO electrodomestico (codigo, nombre, descripcion, marca, precio_venta, stock) VALUES
('REF001', 'Refrigeradora 18 pies', 'Refrigeradora de dos puertas, tecnología No Frost', 'Samsung', 1200.00, 15),
('LAV001', 'Lavadora 20 libras', 'Lavadora automática con 12 programas de lavado', 'LG', 850.00, 20),
('MICRO001', 'Microondas 1.2 pies', 'Microondas digital con grill', 'Panasonic', 180.00, 30),
('TV001', 'Televisor Smart 55 pulgadas', 'Smart TV 4K UHD con Android', 'Sony', 950.00, 12),
('COC001', 'Cocina 4 quemadores', 'Cocina a gas con horno', 'Indurama', 450.00, 18),
('PLAN001', 'Plancha de Vapor', 'Plancha con vapor vertical', 'Oster', 45.00, 40),
('LIC001', 'Licuadora 3 velocidades', 'Licuadora de 1.5 litros', 'Hamilton Beach', 65.00, 35),
('ASPI001', 'Aspiradora 1800W', 'Aspiradora con filtro HEPA', 'Electrolux', 220.00, 25),
('VENT001', 'Ventilador de Pedestal', 'Ventilador 3 velocidades oscilante', 'Samurai', 55.00, 50),
('CAF001', 'Cafetera Programable', 'Cafetera 12 tazas con temporizador', 'Black & Decker', 75.00, 28);

-- =====================================================
-- Índices para mejorar rendimiento
-- =====================================================
CREATE INDEX idx_electrodomestico_codigo ON electrodomestico(codigo);
CREATE INDEX idx_factura_cedula ON factura(cedula_cliente);
CREATE INDEX idx_factura_numero ON factura(numero_factura);
CREATE INDEX idx_detalle_factura ON detalle_factura(id_factura);
CREATE INDEX idx_credito_factura ON credito_aprobado(id_factura);
CREATE INDEX idx_credito_cedula ON credito_aprobado(cedula_cliente);