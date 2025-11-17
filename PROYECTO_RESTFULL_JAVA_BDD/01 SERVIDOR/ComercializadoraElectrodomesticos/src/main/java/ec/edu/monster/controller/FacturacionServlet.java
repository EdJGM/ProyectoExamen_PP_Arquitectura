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
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.ServletException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@WebServlet("/facturacion")
class FacturacionServlet extends HttpServlet {

    private ElectrodomesticoService electroService;
    
    @Override
    public void init() {
        electroService = new ElectrodomesticoService();
    }
    
    @Override
    protected void doGet(HttpServletRequest request,
                        HttpServletResponse response)
            throws ServletException, java.io.IOException {

        List<Electrodomestico> productos = electroService.listarTodos();
        request.setAttribute("productos", productos);
        request.getRequestDispatcher("/WEB-INF/views/facturacion.jsp").forward(request, response);
    }
}