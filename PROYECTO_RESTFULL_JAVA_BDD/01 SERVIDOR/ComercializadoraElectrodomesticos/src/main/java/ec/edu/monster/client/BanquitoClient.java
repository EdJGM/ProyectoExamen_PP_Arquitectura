/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.client;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.client.WebTarget;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

/**
 * Cliente para consumir los servicios REST del Banco BanQuito
 */
public class BanquitoClient {
    
    private static final String BASE_URL = "http://localhost:8080/BanquitoCore/api/credito";
    private Client client;
    private Gson gson;
    
    public BanquitoClient() {
        this.client = ClientBuilder.newClient();
        this.gson = new Gson();
    }
    
    /**
     * Valida si una persona es sujeto de crédito
     * Consume: GET /api/credito/validar/{cedula}
     */
    public Map<String, Object> validarSujetoCredito(String cedula) {
        try {
            WebTarget target = client.target(BASE_URL)
                                    .path("validar")
                                    .path(cedula);
            
            Response response = target.request(MediaType.APPLICATION_JSON).get();
            
            if (response.getStatus() == 200) {
                String json = response.readEntity(String.class);
                Map<String, Object> resultado = gson.fromJson(json, 
                    new TypeToken<Map<String, Object>>(){}.getType());
                return resultado;
            } else {
                Map<String, Object> error = new HashMap<>();
                error.put("sujetoCredito", false);
                error.put("mensaje", "Error al consultar servicio de BanQuito");
                return error;
            }
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("sujetoCredito", false);
            error.put("mensaje", "Error de conexión con BanQuito: " + e.getMessage());
            return error;
        }
    }
    
    /**
     * Obtiene el monto máximo de crédito
     * Consume: GET /api/credito/monto-maximo/{cedula}
     */
    public Map<String, Object> obtenerMontoMaximo(String cedula) {
        try {
            WebTarget target = client.target(BASE_URL)
                                    .path("monto-maximo")
                                    .path(cedula);
            
            Response response = target.request(MediaType.APPLICATION_JSON).get();
            
            if (response.getStatus() == 200) {
                String json = response.readEntity(String.class);
                Map<String, Object> resultado = gson.fromJson(json, 
                    new TypeToken<Map<String, Object>>(){}.getType());
                return resultado;
            } else {
                Map<String, Object> error = new HashMap<>();
                error.put("aprobado", false);
                error.put("montoMaximo", 0.0);
                error.put("mensaje", "Error al consultar monto máximo");
                return error;
            }
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("aprobado", false);
            error.put("montoMaximo", 0.0);
            error.put("mensaje", "Error de conexión: " + e.getMessage());
            return error;
        }
    }
    
    /**
     * Solicita el otorgamiento de un crédito
     * Consume: POST /api/credito/otorgar
     */
    public Map<String, Object> otorgarCredito(String cedula, double precioElectrodomestico, 
                                             int numeroCuotas) {
        try {
            WebTarget target = client.target(BASE_URL).path("otorgar");
            
            Map<String, Object> solicitud = new HashMap<>();
            solicitud.put("cedula", cedula);
            solicitud.put("precioElectrodomestico", precioElectrodomestico);
            solicitud.put("numeroCuotas", numeroCuotas);
            
            String jsonRequest = gson.toJson(solicitud);
            
            Response response = target.request(MediaType.APPLICATION_JSON)
                                     .post(Entity.entity(jsonRequest, MediaType.APPLICATION_JSON));
            
            String jsonResponse = response.readEntity(String.class);
            Map<String, Object> resultado = gson.fromJson(jsonResponse, 
                new TypeToken<Map<String, Object>>(){}.getType());
            
            return resultado;
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("aprobado", false);
            error.put("mensaje", "Error al otorgar crédito: " + e.getMessage());
            return error;
        }
    }
    
    /**
     * Obtiene la tabla de amortización de un crédito
     * Consume: GET /api/credito/tabla-amortizacion/{idCredito}
     */
    public Map<String, Object> obtenerTablaAmortizacion(int idCredito) {
        try {
            WebTarget target = client.target(BASE_URL)
                                    .path("tabla-amortizacion")
                                    .path(String.valueOf(idCredito));
            
            Response response = target.request(MediaType.APPLICATION_JSON).get();
            
            String json = response.readEntity(String.class);
            Map<String, Object> resultado = gson.fromJson(json, 
                new TypeToken<Map<String, Object>>(){}.getType());
            
            return resultado;
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("encontrado", false);
            error.put("mensaje", "Error al obtener tabla de amortización: " + e.getMessage());
            return error;
        }
    }
    
    /**
     * Prueba de conectividad con BanQuito
     */
    public boolean probarConexion() {
        try {
            WebTarget target = client.target(BASE_URL).path("test");
            Response response = target.request(MediaType.APPLICATION_JSON).get();
            return response.getStatus() == 200;
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Cierra el cliente HTTP
     */
    public void close() {
        if (client != null) {
            client.close();
        }
    }
}
