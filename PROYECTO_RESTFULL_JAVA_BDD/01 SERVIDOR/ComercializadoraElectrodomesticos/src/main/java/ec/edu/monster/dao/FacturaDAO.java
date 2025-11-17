/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.dao;

import ec.edu.monster.model.Electrodomestico;
import ec.edu.monster.util.DatabaseConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class FacturaDAO {
    
    // Crear factura con detalles y crédito (transaccional)
    public int crearFacturaCompleta(String cedula, String nombreCliente, String formaPago,
                                   List<java.util.Map<String, Object>> items, 
                                   Integer idCreditoBanco, Double cuotaMensual, 
                                   Integer numeroCuotas) {
        Connection conn = null;
        int idFactura = 0;
        
        try {
            conn = DatabaseConnection.getConnection();
            conn.setAutoCommit(false);
            
            // Calcular totales
            double subtotal = 0;
            for (java.util.Map<String, Object> item : items) {
                double precio = ((Number) item.get("precio")).doubleValue();
                int cantidad = ((Number) item.get("cantidad")).intValue();
                subtotal += (precio * cantidad);
            }
            
            // Calcular descuento (33% si es efectivo)
            double descuento = 0;
            if (formaPago.equals("EFECTIVO")) {
                descuento = subtotal * 0.33;
            }
            
            double total = subtotal - descuento;
            
            // Generar número de factura
            String numeroFactura = generarNumeroFactura(conn);
            
            // Insertar factura
            String sqlFactura = "INSERT INTO factura (numero_factura, cedula_cliente, nombre_cliente, " +
                              "subtotal, descuento, total, forma_pago, estado) " +
                              "VALUES (?, ?, ?, ?, ?, ?, ?, 'PAGADA')";
            
            PreparedStatement pstFactura = conn.prepareStatement(sqlFactura, Statement.RETURN_GENERATED_KEYS);
            pstFactura.setString(1, numeroFactura);
            pstFactura.setString(2, cedula);
            pstFactura.setString(3, nombreCliente);
            pstFactura.setDouble(4, subtotal);
            pstFactura.setDouble(5, descuento);
            pstFactura.setDouble(6, total);
            pstFactura.setString(7, formaPago);
            pstFactura.executeUpdate();
            
            ResultSet rs = pstFactura.getGeneratedKeys();
            if (rs.next()) {
                idFactura = rs.getInt(1);
            }
            
            // Insertar detalles
            String sqlDetalle = "INSERT INTO detalle_factura (id_factura, id_electrodomestico, " +
                              "cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement pstDetalle = conn.prepareStatement(sqlDetalle);
            
            for (java.util.Map<String, Object> item : items) {
                int idElectro = ((Number) item.get("idElectrodomestico")).intValue();
                int cantidad = ((Number) item.get("cantidad")).intValue();
                double precio = ((Number) item.get("precio")).doubleValue();
                double subItem = precio * cantidad;
                
                pstDetalle.setInt(1, idFactura);
                pstDetalle.setInt(2, idElectro);
                pstDetalle.setInt(3, cantidad);
                pstDetalle.setDouble(4, precio);
                pstDetalle.setDouble(5, subItem);
                pstDetalle.executeUpdate();
            }
            
            // Si es crédito directo, registrar el crédito aprobado
            if (formaPago.equals("CREDITO_DIRECTO") && idCreditoBanco != null) {
                String sqlCredito = "INSERT INTO credito_aprobado (id_factura, cedula_cliente, " +
                                  "id_credito_banco, monto_credito, numero_cuotas, cuota_mensual, estado) " +
                                  "VALUES (?, ?, ?, ?, ?, ?, 'APROBADO')";
                
                PreparedStatement pstCredito = conn.prepareStatement(sqlCredito);
                pstCredito.setInt(1, idFactura);
                pstCredito.setString(2, cedula);
                pstCredito.setInt(3, idCreditoBanco);
                pstCredito.setDouble(4, total);
                pstCredito.setInt(5, numeroCuotas);
                pstCredito.setDouble(6, cuotaMensual);
                pstCredito.executeUpdate();
            }
            
            conn.commit();
            
        } catch (SQLException e) {
            if (conn != null) {
                try { conn.rollback(); } catch (SQLException ex) {}
            }
            e.printStackTrace();
            return 0;
        } finally {
            if (conn != null) {
                try { conn.setAutoCommit(true); } catch (SQLException e) {}
                DatabaseConnection.closeConnection(conn);
            }
        }
        
        return idFactura;
    }
    
    // Generar número de factura único
    private String generarNumeroFactura(Connection conn) throws SQLException {
        String sql = "SELECT COUNT(*) + 1 as siguiente FROM factura";
        PreparedStatement pst = conn.prepareStatement(sql);
        ResultSet rs = pst.executeQuery();
        
        int siguiente = 1;
        if (rs.next()) {
            siguiente = rs.getInt("siguiente");
        }
        
        return String.format("FAC-%06d", siguiente);
    }
    
    // Obtener ID de crédito banco por ID de factura
    public Integer obtenerIdCreditoBancoPorFactura(int idFactura) {
        Connection conn = null;
        try {
            conn = DatabaseConnection.getConnection();
            String sql = "SELECT id_credito_banco FROM credito_aprobado WHERE id_factura = ?";
            PreparedStatement pst = conn.prepareStatement(sql);
            pst.setInt(1, idFactura);
            ResultSet rs = pst.executeQuery();
            
            if (rs.next()) {
                return rs.getInt("id_credito_banco");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(conn);
        }
        return null;
    }
}