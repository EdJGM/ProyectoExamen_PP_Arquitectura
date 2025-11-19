/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.models;

import java.util.ArrayList;
import java.util.List;


/**
 *
 * @author josue
 */
public class SolicitudVenta {
    private String cedula;
    private String nombreCliente;
    private List<ItemVenta> items;
    private int numeroCuotas;
    
    public SolicitudVenta() {
        this.items = new ArrayList<>();
    }
    
    // Getters y Setters
    public String getCedula() { return cedula; }
    public void setCedula(String cedula) { this.cedula = cedula; }
    
    public String getNombreCliente() { return nombreCliente; }
    public void setNombreCliente(String nombreCliente) { this.nombreCliente = nombreCliente; }
    
    public List<ItemVenta> getItems() { return items; }
    public void setItems(List<ItemVenta> items) { this.items = items; }
    
    public int getNumeroCuotas() { return numeroCuotas; }
    public void setNumeroCuotas(int numeroCuotas) { this.numeroCuotas = numeroCuotas; }
    
    public double getTotal() {
        return items.stream().mapToDouble(item -> item.getPrecio() * item.getCantidad()).sum();
    }
}