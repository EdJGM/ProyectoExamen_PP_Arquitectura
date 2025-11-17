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

public class ElectrodomesticoService {
    
    private ElectrodomesticoDAO dao;
    
    public ElectrodomesticoService() {
        this.dao = new ElectrodomesticoDAO();
    }
    
    public List<Electrodomestico> listarTodos() {
        return dao.listarTodos();
    }
    
    public Electrodomestico obtenerPorId(int id) {
        return dao.obtenerPorId(id);
    }
    
    public boolean crear(Electrodomestico electro) {
        // Validaciones
        if (electro.getCodigo() == null || electro.getCodigo().trim().isEmpty()) {
            throw new IllegalArgumentException("El código es requerido");
        }
        if (electro.getNombre() == null || electro.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre es requerido");
        }
        if (electro.getPrecioVenta() <= 0) {
            throw new IllegalArgumentException("El precio debe ser mayor a 0");
        }
        
        return dao.crear(electro);
    }
    
    public boolean actualizar(Electrodomestico electro) {
        if (electro.getIdElectrodomestico() <= 0) {
            throw new IllegalArgumentException("ID inválido");
        }
        return dao.actualizar(electro);
    }
    
    public boolean eliminar(int id) {
        if (id <= 0) {
            throw new IllegalArgumentException("ID inválido");
        }
        return dao.eliminar(id);
    }
}

