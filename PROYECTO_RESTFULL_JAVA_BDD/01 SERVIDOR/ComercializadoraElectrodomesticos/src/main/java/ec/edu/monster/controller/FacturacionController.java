/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.controller;

import ec.edu.monster.model.Electrodomestico;
import ec.edu.monster.service.ElectrodomesticoService;
import ec.edu.monster.service.FacturacionService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Path("/facturacion")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FacturacionController {
    
    private FacturacionService service;
    
    public FacturacionController() {
        this.service = new FacturacionService();
    }
    
    /**
     * Procesar venta en efectivo
     * POST /api/facturacion/venta-efectivo
     */
    @POST
    @Path("/venta-efectivo")
    public Response ventaEfectivo(Map<String, Object> solicitud) {
        try {
            String cedula = (String) solicitud.get("cedula");
            String nombreCliente = (String) solicitud.get("nombreCliente");
            List<Map<String, Object>> items = (List<Map<String, Object>>) solicitud.get("items");
            
            Map<String, Object> resultado = service.procesarVentaEfectivo(cedula, nombreCliente, items);
            
            if ((Boolean) resultado.get("exito")) {
                return Response.ok(resultado).build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).entity(resultado).build();
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }
    
    /**
     * Procesar venta a crédito
     * POST /api/facturacion/venta-credito
     */
    @POST
    @Path("/venta-credito")
    public Response ventaCredito(Map<String, Object> solicitud) {
        try {
            String cedula = (String) solicitud.get("cedula");
            String nombreCliente = (String) solicitud.get("nombreCliente");
            List<Map<String, Object>> items = (List<Map<String, Object>>) solicitud.get("items");
            int numeroCuotas = ((Number) solicitud.get("numeroCuotas")).intValue();
            
            Map<String, Object> resultado = service.procesarVentaCredito(cedula, nombreCliente, 
                                                                         items, numeroCuotas);
            
            if ((Boolean) resultado.get("exito")) {
                return Response.ok(resultado).build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).entity(resultado).build();
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }
    
    /**
     * Obtener tabla de amortización
     * GET /api/facturacion/tabla-amortizacion/{idFactura}
     */
    @GET
    @Path("/tabla-amortizacion/{idFactura}")
    public Response obtenerTablaAmortizacion(@PathParam("idFactura") int idFactura) {
        try {
            Map<String, Object> resultado = service.obtenerTablaAmortizacion(idFactura);
            
            if ((Boolean) resultado.get("encontrado")) {
                return Response.ok(resultado).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND).entity(resultado).build();
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }
    
@GET
    @Path("/facturas")
    public Response listarFacturas() {
        try {
            List<Map<String, Object>> facturas = service.listarTodasFacturas();
            return Response.ok(facturas).build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }
    
    /**
     * Obtener detalle completo de una factura
     * GET /api/facturacion/facturas/{idFactura}
     */
    @GET
    @Path("/facturas/{idFactura}")
    public Response obtenerFacturaCompleta(@PathParam("idFactura") int idFactura) {
        try {
            Map<String, Object> factura = service.obtenerFacturaCompleta(idFactura);
            
            if ((Boolean) factura.get("encontrada")) {
                return Response.ok(factura).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND).entity(factura).build();
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }    
}
