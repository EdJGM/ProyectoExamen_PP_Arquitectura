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
    
public List<java.util.Map<String, Object>> listarTodasFacturas() {
        List<java.util.Map<String, Object>> lista = new ArrayList<>();
        Connection conn = null;
        
        try {
            conn = DatabaseConnection.getConnection();
            String sql = "SELECT f.id_factura, f.numero_factura, f.cedula_cliente, " +
                        "f.nombre_cliente, f.fecha_factura, f.subtotal, f.descuento, " +
                        "f.total, f.forma_pago, f.estado, " +
                        "ca.cuota_mensual, ca.numero_cuotas " +
                        "FROM factura f " +
                        "LEFT JOIN credito_aprobado ca ON f.id_factura = ca.id_factura " +
                        "ORDER BY f.fecha_factura DESC";
            
            PreparedStatement pst = conn.prepareStatement(sql);
            ResultSet rs = pst.executeQuery();
            
            while (rs.next()) {
                java.util.Map<String, Object> factura = new java.util.HashMap<>();
                factura.put("idFactura", rs.getInt("id_factura"));
                factura.put("numeroFactura", rs.getString("numero_factura"));
                factura.put("cedulaCliente", rs.getString("cedula_cliente"));
                factura.put("nombreCliente", rs.getString("nombre_cliente"));
                factura.put("fechaFactura", rs.getTimestamp("fecha_factura").toString());
                factura.put("subtotal", rs.getDouble("subtotal"));
                factura.put("descuento", rs.getDouble("descuento"));
                factura.put("total", rs.getDouble("total"));
                factura.put("formaPago", rs.getString("forma_pago"));
                factura.put("estado", rs.getString("estado"));
                
                // Datos de crédito (si aplica)
                if (rs.getObject("cuota_mensual") != null) {
                    factura.put("cuotaMensual", rs.getDouble("cuota_mensual"));
                    factura.put("numeroCuotas", rs.getInt("numero_cuotas"));
                } else {
                    factura.put("cuotaMensual", null);
                    factura.put("numeroCuotas", null);
                }
                
                lista.add(factura);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(conn);
        }
        
        return lista;
    }
    
    // Obtener detalle completo de una factura con sus items
    public java.util.Map<String, Object> obtenerFacturaCompleta(int idFactura) {
        java.util.Map<String, Object> resultado = new java.util.HashMap<>();
        Connection conn = null;
        
        try {
            conn = DatabaseConnection.getConnection();
            
            // Obtener datos de la factura
            String sqlFactura = "SELECT f.*, ca.cuota_mensual, ca.numero_cuotas, ca.id_credito_banco " +
                              "FROM factura f " +
                              "LEFT JOIN credito_aprobado ca ON f.id_factura = ca.id_factura " +
                              "WHERE f.id_factura = ?";
            
            PreparedStatement pstFactura = conn.prepareStatement(sqlFactura);
            pstFactura.setInt(1, idFactura);
            ResultSet rsFactura = pstFactura.executeQuery();
            
            if (!rsFactura.next()) {
                resultado.put("encontrada", false);
                resultado.put("mensaje", "Factura no encontrada");
                return resultado;
            }
            
            resultado.put("encontrada", true);
            resultado.put("idFactura", rsFactura.getInt("id_factura"));
            resultado.put("numeroFactura", rsFactura.getString("numero_factura"));
            resultado.put("cedulaCliente", rsFactura.getString("cedula_cliente"));
            resultado.put("nombreCliente", rsFactura.getString("nombre_cliente"));
            resultado.put("fechaFactura", rsFactura.getTimestamp("fecha_factura").toString());
            resultado.put("subtotal", rsFactura.getDouble("subtotal"));
            resultado.put("descuento", rsFactura.getDouble("descuento"));
            resultado.put("total", rsFactura.getDouble("total"));
            resultado.put("formaPago", rsFactura.getString("forma_pago"));
            resultado.put("estado", rsFactura.getString("estado"));
            
            // Datos de crédito si aplica
            if (rsFactura.getObject("cuota_mensual") != null) {
                resultado.put("cuotaMensual", rsFactura.getDouble("cuota_mensual"));
                resultado.put("numeroCuotas", rsFactura.getInt("numero_cuotas"));
                resultado.put("idCreditoBanco", rsFactura.getInt("id_credito_banco"));
            }
            
            // Obtener detalle de productos
            String sqlDetalle = "SELECT df.*, e.nombre, e.marca " +
                              "FROM detalle_factura df " +
                              "INNER JOIN electrodomestico e ON df.id_electrodomestico = e.id_electrodomestico " +
                              "WHERE df.id_factura = ?";
            
            PreparedStatement pstDetalle = conn.prepareStatement(sqlDetalle);
            pstDetalle.setInt(1, idFactura);
            ResultSet rsDetalle = pstDetalle.executeQuery();
            
            List<java.util.Map<String, Object>> items = new ArrayList<>();
            while (rsDetalle.next()) {
                java.util.Map<String, Object> item = new java.util.HashMap<>();
                item.put("idElectrodomestico", rsDetalle.getInt("id_electrodomestico"));
                item.put("nombre", rsDetalle.getString("nombre"));
                item.put("marca", rsDetalle.getString("marca"));
                item.put("cantidad", rsDetalle.getInt("cantidad"));
                item.put("precioUnitario", rsDetalle.getDouble("precio_unitario"));
                item.put("subtotal", rsDetalle.getDouble("subtotal"));
                items.add(item);
            }
            
            resultado.put("items", items);
            resultado.put("mensaje", "Factura obtenida exitosamente");
            
        } catch (SQLException e) {
            resultado.put("encontrada", false);
            resultado.put("mensaje", "Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(conn);
        }
        
        return resultado;
    }    
}