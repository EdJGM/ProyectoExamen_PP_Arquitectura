/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.controller;


import ec.edu.monster.service.CreditoService;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Map;

@Path("/credito")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class CreditoController {
    
    @Inject
    private CreditoService creditoService;
    
    public CreditoController() {
        // Constructor sin parámetros requerido por CDI
    }
    
    /**
     * Servicio Web 1: Validar si una persona es sujeto de crédito
     * GET /api/credito/validar/{cedula}
     */
    @GET
    @Path("/validar/{cedula}")
    public Response validarSujetoCredito(@PathParam("cedula") String cedula) {
        try {
            Map<String, Object> resultado = creditoService.validarSujetoCredito(cedula);
            return Response.ok(resultado).build();
        } catch (IllegalArgumentException e) {
            Map<String, Object> error = new java.util.HashMap<>();
            error.put("error", e.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(error).build();
        } catch (Exception e) {
            Map<String, Object> error = new java.util.HashMap<>();
            error.put("error", "Error interno del servidor: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }
    
    /**
     * Servicio Web 2: Obtener monto máximo de crédito
     * GET /api/credito/monto-maximo/{cedula}
     */
    @GET
    @Path("/monto-maximo/{cedula}")
    public Response obtenerMontoMaximo(@PathParam("cedula") String cedula) {
        try {
            Map<String, Object> resultado = creditoService.calcularMontoMaximo(cedula);
            return Response.ok(resultado).build();
        } catch (IllegalArgumentException e) {
            Map<String, Object> error = new java.util.HashMap<>();
            error.put("error", e.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(error).build();
        } catch (Exception e) {
            Map<String, Object> error = new java.util.HashMap<>();
            error.put("error", "Error interno del servidor: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }
    
    /**
     * Servicio Web 3: Otorgar crédito y crear tabla de amortización
     * POST /api/credito/otorgar
     * Body: {"cedula": "1234567890", "precioElectrodomestico": 1200.0, "numeroCuotas": 12}
     */
    @POST
    @Path("/otorgar")
    public Response otorgarCredito(Map<String, Object> solicitud) {
        try {
            String cedula = (String) solicitud.get("cedula");
            Double precioElectrodomestico = solicitud.get("precioElectrodomestico") != null ? 
                                            ((Number) solicitud.get("precioElectrodomestico")).doubleValue() : 0;
            Integer numeroCuotas = solicitud.get("numeroCuotas") != null ? 
                                  ((Number) solicitud.get("numeroCuotas")).intValue() : 0;
            
            Map<String, Object> resultado = creditoService.otorgarCredito(cedula, 
                                                                          precioElectrodomestico, 
                                                                          numeroCuotas);
            
            if ((Boolean) resultado.get("aprobado")) {
                return Response.ok(resultado).build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).entity(resultado).build();
            }
            
        } catch (IllegalArgumentException e) {
            Map<String, Object> error = new java.util.HashMap<>();
            error.put("error", e.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(error).build();
        } catch (Exception e) {
            Map<String, Object> error = new java.util.HashMap<>();
            error.put("error", "Error interno del servidor: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }
    
    /**
     * Servicio Web 4: Obtener tabla de amortización
     * GET /api/credito/tabla-amortizacion/{idCredito}
     */
    @GET
    @Path("/tabla-amortizacion/{idCredito}")
    public Response obtenerTablaAmortizacion(@PathParam("idCredito") int idCredito) {
        try {
            Map<String, Object> resultado = creditoService.obtenerTablaAmortizacion(idCredito);
            
            if ((Boolean) resultado.get("encontrado")) {
                return Response.ok(resultado).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND).entity(resultado).build();
            }
            
        } catch (IllegalArgumentException e) {
            Map<String, Object> error = new java.util.HashMap<>();
            error.put("error", e.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(error).build();
        } catch (Exception e) {
            Map<String, Object> error = new java.util.HashMap<>();
            error.put("error", "Error interno del servidor: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }
    
    /**
     * Servicio de prueba
     * GET /api/credito/test
     */
    @GET
    @Path("/test")
    public Response test() {
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("status", "OK");
        response.put("mensaje", "API de Crédito BanQuito funcionando correctamente");
        response.put("timestamp", new java.util.Date().toString());
        return Response.ok(response).build();
    }
}


