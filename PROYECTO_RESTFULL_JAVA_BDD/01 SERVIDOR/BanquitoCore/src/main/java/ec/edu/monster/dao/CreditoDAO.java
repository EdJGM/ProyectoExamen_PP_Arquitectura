/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.dao;

import ec.edu.monster.model.Cliente;
import ec.edu.monster.util.DatabaseConnection;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.sql.*;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class CreditoDAO {
    
    @Inject
    private DatabaseConnection dbConnection;

    // Validar si una persona es sujeto de crédito
    public Map<String, Object> validarSujetoCredito(String cedula) {
        Map<String, Object> resultado = new HashMap<>();
        resultado.put("sujetoCredito", false);
        resultado.put("mensaje", "");
        resultado.put("idCliente", 0);
        
        Connection conn = null;
        try {
            conn = (dbConnection != null) ? dbConnection.getConnection() : DatabaseConnection.getStaticConnection();

            // 1. Verificar si es cliente del banco
            Cliente cliente = obtenerClientePorCedula(conn, cedula);
            if (cliente == null) {
                resultado.put("mensaje", "La persona no es cliente del banco");
                return resultado;
            }
            
            int idCliente = cliente.getIdCliente();
            resultado.put("idCliente", idCliente);
            
            // 2. Verificar que tenga al menos un depósito en el último mes
            if (!tieneDepositoUltimoMes(conn, idCliente)) {
                resultado.put("mensaje", "El cliente no tiene depósitos en el último mes");
                return resultado;
            }
            
            // 3. Verificar edad si es casado (debe ser >= 25 años)
            if (cliente.getEstadoCivil().equalsIgnoreCase("Casado")) {
                int edad = calcularEdad(cliente.getFechaNacimiento());
                if (edad < 25) {
                    resultado.put("mensaje", "El cliente casado debe ser mayor de 25 años");
                    return resultado;
                }
            }
            
            // 4. Verificar que no tenga crédito activo
            if (tieneCreditoActivo(conn, idCliente)) {
                resultado.put("mensaje", "El cliente ya tiene un crédito activo");
                return resultado;
            }
            
            // Si pasa todas las validaciones
            resultado.put("sujetoCredito", true);
            resultado.put("mensaje", "El cliente es sujeto de crédito");
            
        } catch (SQLException e) {
            resultado.put("mensaje", "Error al validar crédito: " + e.getMessage());
        } finally {
            DatabaseConnection.closeConnection(conn);
        }
        
        return resultado;
    }
    
    // Calcular monto máximo de crédito
    public double calcularMontoMaximo(String cedula) {
        Connection conn = null;
        try {
            conn = (dbConnection != null) ? dbConnection.getConnection() : DatabaseConnection.getStaticConnection();
            Cliente cliente = obtenerClientePorCedula(conn, cedula);
            if (cliente == null) return 0;
            
            int idCliente = cliente.getIdCliente();
            
            // Obtener promedio de depósitos de últimos 3 meses
            double promedioDepositos = calcularPromedioMovimientos(conn, idCliente, "DEPOSITO", 3);
            
            // Obtener promedio de retiros de últimos 3 meses
            double promedioRetiros = calcularPromedioMovimientos(conn, idCliente, "RETIRO", 3);
            
            // Calcular monto máximo: ((Promedio Depósitos - Promedio Retiros) * 60%) * 9
            double diferencia = promedioDepositos - promedioRetiros;
            double montoMaximo = (diferencia * 0.60) * 9;
            
            return montoMaximo > 0 ? montoMaximo : 0;
            
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        } finally {
            DatabaseConnection.closeConnection(conn);
        }
    }
    
    // Otorgar crédito y crear tabla de amortización
    public Map<String, Object> otorgarCredito(String cedula, double precioElectrodomestico, int numeroCuotas) {
        Map<String, Object> resultado = new HashMap<>();
        resultado.put("aprobado", false);
        resultado.put("mensaje", "");
        resultado.put("idCredito", 0);
        resultado.put("cuotaMensual", 0.0);
        
        Connection conn = null;
        try {
            conn = (dbConnection != null) ? dbConnection.getConnection() : DatabaseConnection.getStaticConnection();
            conn.setAutoCommit(false);
            
            // Validar número de cuotas
            if (numeroCuotas < 3 || numeroCuotas > 24) {
                resultado.put("mensaje", "El número de cuotas debe estar entre 3 y 24");
                return resultado;
            }
            
            // Validar que sea sujeto de crédito
            Map<String, Object> validacion = validarSujetoCredito(cedula);
            if (!(Boolean) validacion.get("sujetoCredito")) {
                resultado.put("mensaje", validacion.get("mensaje"));
                return resultado;
            }
            
            int idCliente = (Integer) validacion.get("idCliente");
            
            // Validar monto máximo
            double montoMaximo = calcularMontoMaximo(cedula);
            if (precioElectrodomestico > montoMaximo) {
                resultado.put("mensaje", "El monto solicitado excede el monto máximo aprobado: $" + 
                            String.format("%.2f", montoMaximo));
                return resultado;
            }
            
            // Calcular cuota fija
            double tasaAnual = 0.16; // 16%
            double tasaMensual = tasaAnual / 12;
            double cuotaFija = calcularCuotaFija(precioElectrodomestico, tasaMensual, numeroCuotas);
            
            // Insertar crédito
            String sqlCredito = "INSERT INTO credito (id_cliente, cedula, monto_credito, tasa_interes, " +
                              "numero_cuotas, cuota_mensual, estado) VALUES (?, ?, ?, ?, ?, ?, 'ACTIVO')";
            
            PreparedStatement pstCredito = conn.prepareStatement(sqlCredito, Statement.RETURN_GENERATED_KEYS);
            pstCredito.setInt(1, idCliente);
            pstCredito.setString(2, cedula);
            pstCredito.setDouble(3, precioElectrodomestico);
            pstCredito.setDouble(4, tasaAnual);
            pstCredito.setInt(5, numeroCuotas);
            pstCredito.setDouble(6, cuotaFija);
            pstCredito.executeUpdate();
            
            ResultSet rs = pstCredito.getGeneratedKeys();
            int idCredito = 0;
            if (rs.next()) {
                idCredito = rs.getInt(1);
            }
            
            // Generar tabla de amortización
            generarTablaAmortizacion(conn, idCredito, precioElectrodomestico, tasaMensual, 
                                    numeroCuotas, cuotaFija);
            
            conn.commit();
            
            resultado.put("aprobado", true);
            resultado.put("idCredito", idCredito);
            resultado.put("cuotaMensual", cuotaFija);
            resultado.put("mensaje", "Crédito otorgado exitosamente");
            
        } catch (SQLException e) {
            if (conn != null) {
                try { conn.rollback(); } catch (SQLException ex) {}
            }
            resultado.put("mensaje", "Error al otorgar crédito: " + e.getMessage());
        } finally {
            if (conn != null) {
                try { conn.setAutoCommit(true); } catch (SQLException e) {}
                DatabaseConnection.closeConnection(conn);
            }
        }
        
        return resultado;
    }
    
    // Obtener tabla de amortización
    public Map<String, Object> obtenerTablaAmortizacion(int idCredito) {
        Map<String, Object> resultado = new HashMap<>();
        List<Map<String, Object>> cuotas = new ArrayList<>();
        
        Connection conn = null;
        try {
            conn = (dbConnection != null) ? dbConnection.getConnection() : DatabaseConnection.getStaticConnection();

            // Obtener datos del crédito
            String sqlCredito = "SELECT monto_credito, tasa_interes, numero_cuotas FROM credito WHERE id_credito = ?";
            PreparedStatement pstCredito = conn.prepareStatement(sqlCredito);
            pstCredito.setInt(1, idCredito);
            ResultSet rsCredito = pstCredito.executeQuery();
            
            if (!rsCredito.next()) {
                resultado.put("encontrado", false);
                resultado.put("mensaje", "Crédito no encontrado");
                return resultado;
            }
            
            resultado.put("encontrado", true);
            resultado.put("idCredito", idCredito);
            resultado.put("montoCredito", rsCredito.getDouble("monto_credito"));
            resultado.put("tasaInteres", rsCredito.getDouble("tasa_interes"));
            resultado.put("numeroCuotas", rsCredito.getInt("numero_cuotas"));
            
            // Obtener cuotas
            String sqlAmortizacion = "SELECT numero_cuota, valor_cuota, interes_pagado, " +
                                   "capital_pagado, saldo, fecha_vencimiento " +
                                   "FROM amortizacion WHERE id_credito = ? ORDER BY numero_cuota";
            
            PreparedStatement pstAmort = conn.prepareStatement(sqlAmortizacion);
            pstAmort.setInt(1, idCredito);
            ResultSet rsAmort = pstAmort.executeQuery();
            
            while (rsAmort.next()) {
                Map<String, Object> cuota = new HashMap<>();
                cuota.put("numeroCuota", rsAmort.getInt("numero_cuota"));
                cuota.put("valorCuota", rsAmort.getDouble("valor_cuota"));
                cuota.put("interesPagado", rsAmort.getDouble("interes_pagado"));
                cuota.put("capitalPagado", rsAmort.getDouble("capital_pagado"));
                cuota.put("saldo", rsAmort.getDouble("saldo"));
                cuota.put("fechaVencimiento", rsAmort.getDate("fecha_vencimiento").toString());
                cuotas.add(cuota);
            }
            
            resultado.put("cuotas", cuotas);
            resultado.put("mensaje", "Tabla de amortización obtenida exitosamente");
            
        } catch (SQLException e) {
            resultado.put("encontrado", false);
            resultado.put("mensaje", "Error: " + e.getMessage());
        } finally {
            DatabaseConnection.closeConnection(conn);
        }
        
        return resultado;
    }
    
    // ========== MÉTODOS AUXILIARES ==========
    
    private Cliente obtenerClientePorCedula(Connection conn, String cedula) throws SQLException {
        String sql = "SELECT * FROM cliente WHERE cedula = ?";
        PreparedStatement pst = conn.prepareStatement(sql);
        pst.setString(1, cedula);
        ResultSet rs = pst.executeQuery();
        
        if (rs.next()) {
            Cliente cliente = new Cliente();
            cliente.setIdCliente(rs.getInt("id_cliente"));
            cliente.setCedula(rs.getString("cedula"));
            cliente.setNombre(rs.getString("nombre"));
            cliente.setApellido(rs.getString("apellido"));
            cliente.setFechaNacimiento(rs.getDate("fecha_nacimiento"));
            cliente.setEstadoCivil(rs.getString("estado_civil"));
            return cliente;
        }
        return null;
    }
    
    private boolean tieneDepositoUltimoMes(Connection conn, int idCliente) throws SQLException {
        String sql = "SELECT COUNT(*) as total FROM movimiento m " +
                    "INNER JOIN cuenta c ON m.id_cuenta = c.id_cuenta " +
                    "WHERE c.id_cliente = ? AND m.tipo_movimiento = 'DEPOSITO' " +
                    "AND m.fecha_movimiento >= DATE_SUB(NOW(), INTERVAL 1 MONTH)";
        
        PreparedStatement pst = conn.prepareStatement(sql);
        pst.setInt(1, idCliente);
        ResultSet rs = pst.executeQuery();
        
        if (rs.next()) {
            return rs.getInt("total") > 0;
        }
        return false;
    }
    
    private int calcularEdad(java.util.Date fechaNacimiento) {
        LocalDate nacimiento = new java.sql.Date(fechaNacimiento.getTime()).toLocalDate();
        LocalDate ahora = LocalDate.now();
        return Period.between(nacimiento, ahora).getYears();
    }
    
    private boolean tieneCreditoActivo(Connection conn, int idCliente) throws SQLException {
        String sql = "SELECT COUNT(*) as total FROM credito " +
                    "WHERE id_cliente = ? AND estado = 'ACTIVO'";
        
        PreparedStatement pst = conn.prepareStatement(sql);
        pst.setInt(1, idCliente);
        ResultSet rs = pst.executeQuery();
        
        if (rs.next()) {
            return rs.getInt("total") > 0;
        }
        return false;
    }
    
    private double calcularPromedioMovimientos(Connection conn, int idCliente, String tipoMovimiento, 
                                              int meses) throws SQLException {
        String sql = "SELECT AVG(m.monto) as promedio FROM movimiento m " +
                    "INNER JOIN cuenta c ON m.id_cuenta = c.id_cuenta " +
                    "WHERE c.id_cliente = ? AND m.tipo_movimiento = ? " +
                    "AND m.fecha_movimiento >= DATE_SUB(NOW(), INTERVAL ? MONTH)";
        
        PreparedStatement pst = conn.prepareStatement(sql);
        pst.setInt(1, idCliente);
        pst.setString(2, tipoMovimiento);
        pst.setInt(3, meses);
        ResultSet rs = pst.executeQuery();
        
        if (rs.next()) {
            return rs.getDouble("promedio");
        }
        return 0;
    }
    
    private double calcularCuotaFija(double monto, double tasaMensual, int numeroCuotas) {
        // Cuota = Monto / (1 - (1 + TasaPeriodo)^-NúmeroCuotas) / TasaPeriodo
        double denominador = (1 - Math.pow(1 + tasaMensual, -numeroCuotas)) / tasaMensual;
        return monto / denominador;
    }
    
    private void generarTablaAmortizacion(Connection conn, int idCredito, double montoInicial, 
                                         double tasaMensual, int numeroCuotas, 
                                         double cuotaFija) throws SQLException {
        String sql = "INSERT INTO amortizacion (id_credito, numero_cuota, valor_cuota, " +
                    "interes_pagado, capital_pagado, saldo, fecha_vencimiento) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        PreparedStatement pst = conn.prepareStatement(sql);
        double saldo = montoInicial;
        
        for (int i = 1; i <= numeroCuotas; i++) {
            double interesPagado = saldo * tasaMensual;
            double capitalPagado = cuotaFija - interesPagado;
            saldo = saldo - capitalPagado;
            
            // Ajuste para última cuota (evitar saldo negativo por redondeo)
            if (i == numeroCuotas && saldo < 1) {
                capitalPagado += saldo;
                saldo = 0;
            }
            
            // Fecha de vencimiento (mes siguiente)
            LocalDate fechaVencimiento = LocalDate.now().plusMonths(i);
            
            pst.setInt(1, idCredito);
            pst.setInt(2, i);
            pst.setDouble(3, cuotaFija);
            pst.setDouble(4, interesPagado);
            pst.setDouble(5, capitalPagado);
            pst.setDouble(6, saldo);
            pst.setDate(7, java.sql.Date.valueOf(fechaVencimiento));
            pst.executeUpdate();
        }
    }
}