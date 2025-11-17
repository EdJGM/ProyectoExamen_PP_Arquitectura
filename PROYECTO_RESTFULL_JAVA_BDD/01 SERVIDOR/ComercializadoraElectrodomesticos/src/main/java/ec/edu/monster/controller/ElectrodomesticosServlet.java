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

@WebServlet("/electrodomesticos-manager")
class ElectrodomesticosServlet extends HttpServlet {

    private ElectrodomesticoService service;
    
    @Override
    public void init() {
        service = new ElectrodomesticoService();
    }
    
    @Override
    protected void doGet(HttpServletRequest request,
                        HttpServletResponse response)
            throws ServletException, java.io.IOException {

        String action = request.getParameter("action");
        
        if ("edit".equals(action)) {
            int id = Integer.parseInt(request.getParameter("id"));
            Electrodomestico electro = service.obtenerPorId(id);
            request.setAttribute("electrodomestico", electro);
            request.getRequestDispatcher("/WEB-INF/views/electrodomestico-form.jsp").forward(request, response);
        } else {
            List<Electrodomestico> lista = service.listarTodos();
            request.setAttribute("electrodomesticos", lista);
            request.getRequestDispatcher("/WEB-INF/views/electrodomesticos-list.jsp").forward(request, response);
        }
    }
}
