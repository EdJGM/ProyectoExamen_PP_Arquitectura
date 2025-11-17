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

@Path("/electrodomesticos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ElectrodomesticoController {
    
    private ElectrodomesticoService service;
    
    public ElectrodomesticoController() {
        this.service = new ElectrodomesticoService();
    }
    
    /**
     * Listar todos los electrodomésticos
     * GET /api/electrodomesticos
     */
    @GET
    public Response listar() {
        try {
            List<Electrodomestico> lista = service.listarTodos();
            return Response.ok(lista).build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }
    
    /**
     * Obtener electrodoméstico por ID
     * GET /api/electrodomesticos/{id}
     */
    @GET
    @Path("/{id}")
    public Response obtenerPorId(@PathParam("id") int id) {
        try {
            Electrodomestico electro = service.obtenerPorId(id);
            if (electro != null) {
                return Response.ok(electro).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }
    
    /**
     * Crear nuevo electrodoméstico
     * POST /api/electrodomesticos
     */
    @POST
    public Response crear(Electrodomestico electro) {
        try {
            boolean creado = service.crear(electro);
            if (creado) {
                Map<String, Object> response = new HashMap<>();
                response.put("exito", true);
                response.put("mensaje", "Electrodoméstico creado exitosamente");
                return Response.status(Response.Status.CREATED).entity(response).build();
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("error", "No se pudo crear el electrodoméstico");
                return Response.status(Response.Status.BAD_REQUEST).entity(error).build();
            }
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(error).build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }
    
    /**
     * Actualizar electrodoméstico
     * PUT /api/electrodomesticos/{id}
     */
    @PUT
    @Path("/{id}")
    public Response actualizar(@PathParam("id") int id, Electrodomestico electro) {
        try {
            electro.setIdElectrodomestico(id);
            boolean actualizado = service.actualizar(electro);
            
            if (actualizado) {
                Map<String, Object> response = new HashMap<>();
                response.put("exito", true);
                response.put("mensaje", "Electrodoméstico actualizado exitosamente");
                return Response.ok(response).build();
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("error", "No se pudo actualizar el electrodoméstico");
                return Response.status(Response.Status.BAD_REQUEST).entity(error).build();
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }
    
    /**
     * Eliminar electrodoméstico
     * DELETE /api/electrodomesticos/{id}
     */
    @DELETE
    @Path("/{id}")
    public Response eliminar(@PathParam("id") int id) {
        try {
            boolean eliminado = service.eliminar(id);
            
            if (eliminado) {
                Map<String, Object> response = new HashMap<>();
                response.put("exito", true);
                response.put("mensaje", "Electrodoméstico eliminado exitosamente");
                return Response.ok(response).build();
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("error", "No se pudo eliminar el electrodoméstico");
                return Response.status(Response.Status.BAD_REQUEST).entity(error).build();
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }
}
