/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.service;

import ec.edu.monster.dao.CreditoDAO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.Map;

@ApplicationScoped
public class CreditoService {
    
    @Inject
    private CreditoDAO creditoDAO;
    
    public CreditoService() {
        // Constructor sin parámetros requerido por CDI
    }
    
    /**
     * Valida si una persona es sujeto de crédito
     */
    public Map<String, Object> validarSujetoCredito(String cedula) {
        // Validar que la cédula no esté vacía
        if (cedula == null || cedula.trim().isEmpty()) {
            throw new IllegalArgumentException("La cédula es requerida");
        }
        
        return creditoDAO.validarSujetoCredito(cedula);
    }
    
    /**
     * Calcula el monto máximo de crédito para un cliente
     */
    public Map<String, Object> calcularMontoMaximo(String cedula) {
        // Validar que la cédula no esté vacía
        if (cedula == null || cedula.trim().isEmpty()) {
            throw new IllegalArgumentException("La cédula es requerida");
        }
        
        // Primero validar si es sujeto de crédito
        Map<String, Object> validacion = creditoDAO.validarSujetoCredito(cedula);
        
        Map<String, Object> resultado = new java.util.HashMap<>();
        
        if (!(Boolean) validacion.get("sujetoCredito")) {
            resultado.put("aprobado", false);
            resultado.put("montoMaximo", 0.0);
            resultado.put("mensaje", validacion.get("mensaje"));
            return resultado;
        }
        
        // Calcular monto máximo
        double montoMaximo = creditoDAO.calcularMontoMaximo(cedula);
        
        resultado.put("aprobado", true);
        resultado.put("montoMaximo", montoMaximo);
        resultado.put("mensaje", "Monto máximo calculado: $" + String.format("%.2f", montoMaximo));
        
        return resultado;
    }
    
    /**
     * Otorga un crédito y genera la tabla de amortización
     */
    public Map<String, Object> otorgarCredito(String cedula, double precioElectrodomestico, 
                                             int numeroCuotas) {
        // Validaciones
        if (cedula == null || cedula.trim().isEmpty()) {
            throw new IllegalArgumentException("La cédula es requerida");
        }
        
        if (precioElectrodomestico <= 0) {
            throw new IllegalArgumentException("El precio debe ser mayor a 0");
        }
        
        if (numeroCuotas < 3 || numeroCuotas > 24) {
            throw new IllegalArgumentException("El número de cuotas debe estar entre 3 y 24");
        }
        
        return creditoDAO.otorgarCredito(cedula, precioElectrodomestico, numeroCuotas);
    }
    
    /**
     * Obtiene la tabla de amortización de un crédito
     */
    public Map<String, Object> obtenerTablaAmortizacion(int idCredito) {
        if (idCredito <= 0) {
            throw new IllegalArgumentException("El ID del crédito debe ser mayor a 0");
        }
        
        return creditoDAO.obtenerTablaAmortizacion(idCredito);
    }
}
