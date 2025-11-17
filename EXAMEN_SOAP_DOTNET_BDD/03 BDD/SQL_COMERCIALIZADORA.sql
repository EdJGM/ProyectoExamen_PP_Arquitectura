-- =============================================
-- SCRIPT SQL - COMERCIALIZADORA
-- Base de Datos: comercializadora_db
-- =============================================

CREATE DATABASE comercializadora_db;
GO

USE comercializadora_db;
GO

-- =============================================
-- TABLAS
-- =============================================

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

-- =============================================
-- ÍNDICES
-- =============================================

CREATE INDEX IX_Facturas_Cedula ON Facturas(Cedula);
CREATE INDEX IX_Facturas_Fecha ON Facturas(FechaVenta);
CREATE INDEX IX_DetallesFactura_Factura ON DetallesFactura(IdFactura);

GO

-- =============================================
-- DATOS DE PRUEBA
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

-- Verificar electrodomésticos
SELECT * FROM Electrodomesticos;

-- Verificar facturas (al inicio estará vacío)
SELECT * FROM Facturas;

-- Verificar detalles de factura (al inicio estará vacío)
SELECT * FROM DetallesFactura;

GO

-- =============================================
-- FIN DEL SCRIPT
-- =============================================

PRINT 'Script ejecutado exitosamente';
PRINT 'Base de datos comercializadora_db creada con:';
PRINT '- 10 electrodomésticos';
PRINT '- Tablas de Facturas y DetallesFactura creadas';
GO
