/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.service;
import ec.edu.monster.client.BanquitoClient;
import ec.edu.monster.dao.ElectrodomesticoDAO;
import ec.edu.monster.dao.FacturaDAO;
import ec.edu.monster.model.Electrodomestico;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FacturacionService {
    
    private FacturaDAO facturaDAO;
    private ElectrodomesticoDAO electroDAO;
    private BanquitoClient banquitoClient;
    
    public FacturacionService() {
        this.facturaDAO = new FacturaDAO();
        this.electroDAO = new ElectrodomesticoDAO();
        this.banquitoClient = new BanquitoClient();
    }
    
    /**
     * Procesa una factura con pago en efectivo (33% descuento)
     */
    public Map<String, Object> procesarVentaEfectivo(String cedula, String nombreCliente,
                                                    List<Map<String, Object>> items) {
        Map<String, Object> resultado = new HashMap<>();
        
        try {
            // Validar items
            if (items == null || items.isEmpty()) {
                resultado.put("exito", false);
                resultado.put("mensaje", "Debe seleccionar al menos un producto");
                return resultado;
            }
            
            // Crear factura
            int idFactura = facturaDAO.crearFacturaCompleta(cedula, nombreCliente, "EFECTIVO",
                                                           items, null, null, null);
            
            if (idFactura > 0) {
                resultado.put("exito", true);
                resultado.put("idFactura", idFactura);
                resultado.put("mensaje", "Venta procesada exitosamente");
            } else {
                resultado.put("exito", false);
                resultado.put("mensaje", "Error al procesar la venta");
            }
            
        } catch (Exception e) {
            resultado.put("exito", false);
            resultado.put("mensaje", "Error: " + e.getMessage());
        }
        
        return resultado;
    }
    
    /**
     * Procesa una factura con crédito directo (sin descuento)
     */
    public Map<String, Object> procesarVentaCredito(String cedula, String nombreCliente,
                                                   List<Map<String, Object>> items, 
                                                   int numeroCuotas) {
        Map<String, Object> resultado = new HashMap<>();
        
        try {
            // Validar items
            if (items == null || items.isEmpty()) {
                resultado.put("exito", false);
                resultado.put("mensaje", "Debe seleccionar al menos un producto");
                return resultado;
            }
            
            // Calcular total
            double total = 0;
            for (Map<String, Object> item : items) {
                double precio = ((Number) item.get("precio")).doubleValue();
                int cantidad = ((Number) item.get("cantidad")).intValue();
                total += (precio * cantidad);
            }
            
            // 1. Validar si es sujeto de crédito
            Map<String, Object> validacion = banquitoClient.validarSujetoCredito(cedula);
            
            if (validacion == null || !(Boolean) validacion.get("sujetoCredito")) {
                resultado.put("exito", false);
                resultado.put("mensaje", validacion != null ? 
                            validacion.get("mensaje") : "Error al validar crédito");
                return resultado;
            }
            
            // 2. Verificar monto máximo
            Map<String, Object> montoMaximo = banquitoClient.obtenerMontoMaximo(cedula);
            
            if (montoMaximo == null || !(Boolean) montoMaximo.get("aprobado")) {
                resultado.put("exito", false);
                resultado.put("mensaje", "No se pudo obtener el monto máximo de crédito");
                return resultado;
            }
            
            double montoMax = ((Number) montoMaximo.get("montoMaximo")).doubleValue();
            
            if (total > montoMax) {
                resultado.put("exito", false);
                resultado.put("mensaje", "El monto de la compra ($" + String.format("%.2f", total) + 
                            ") excede el monto máximo aprobado ($" + String.format("%.2f", montoMax) + ")");
                return resultado;
            }
            
            // 3. Otorgar crédito en BanQuito
            Map<String, Object> creditoOtorgado = banquitoClient.otorgarCredito(cedula, total, numeroCuotas);
            
            if (creditoOtorgado == null || !(Boolean) creditoOtorgado.get("aprobado")) {
                resultado.put("exito", false);
                resultado.put("mensaje", creditoOtorgado != null ? 
                            creditoOtorgado.get("mensaje") : "Error al otorgar crédito");
                return resultado;
            }
            
            // Obtener datos del crédito aprobado
            int idCreditoBanco = ((Number) creditoOtorgado.get("idCredito")).intValue();
            double cuotaMensual = ((Number) creditoOtorgado.get("cuotaMensual")).doubleValue();
            
            // 4. Crear factura con el crédito aprobado
            int idFactura = facturaDAO.crearFacturaCompleta(cedula, nombreCliente, "CREDITO_DIRECTO",
                                                           items, idCreditoBanco, cuotaMensual, numeroCuotas);
            
            if (idFactura > 0) {
                resultado.put("exito", true);
                resultado.put("idFactura", idFactura);
                resultado.put("idCreditoBanco", idCreditoBanco);
                resultado.put("cuotaMensual", cuotaMensual);
                resultado.put("numeroCuotas", numeroCuotas);
                resultado.put("mensaje", "Venta a crédito procesada exitosamente");
            } else {
                resultado.put("exito", false);
                resultado.put("mensaje", "Error al procesar la factura");
            }
            
        } catch (Exception e) {
            resultado.put("exito", false);
            resultado.put("mensaje", "Error: " + e.getMessage());
            e.printStackTrace();
        }
        
        return resultado;
    }
    
    /**
     * Obtiene la tabla de amortización de una factura a crédito
     */
    public Map<String, Object> obtenerTablaAmortizacion(int idFactura) {
        Map<String, Object> resultado = new HashMap<>();
        
        try {
            // Obtener ID del crédito en el banco
            Integer idCreditoBanco = facturaDAO.obtenerIdCreditoBancoPorFactura(idFactura);
            
            if (idCreditoBanco == null) {
                resultado.put("encontrado", false);
                resultado.put("mensaje", "No se encontró crédito asociado a esta factura");
                return resultado;
            }
            
            // Consultar tabla de amortización en BanQuito
            Map<String, Object> tablaAmortizacion = banquitoClient.obtenerTablaAmortizacion(idCreditoBanco);
            
            return tablaAmortizacion;
            
        } catch (Exception e) {
            resultado.put("encontrado", false);
            resultado.put("mensaje", "Error: " + e.getMessage());
            return resultado;
        }
    }
    
    public List<Map<String, Object>> listarTodasFacturas() {
       return facturaDAO.listarTodasFacturas();
    }

    /**
     * Obtiene el detalle completo de una factura con sus items
     */
    public Map<String, Object> obtenerFacturaCompleta(int idFactura) {
        return facturaDAO.obtenerFacturaCompleta(idFactura);
    }    
    
    public void cerrarCliente() {
        if (banquitoClient != null) {
            banquitoClient.close();
        }
    }
}
