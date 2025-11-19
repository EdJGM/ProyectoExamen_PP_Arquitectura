/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.models;

/**
 *
 * @author josue
 */
public class ItemVenta {
    private int idElectrodomestico;
    private int cantidad;
    private double precio;
    
    public ItemVenta() {}
    
    public ItemVenta(int idElectrodomestico, int cantidad, double precio) {
        this.idElectrodomestico = idElectrodomestico;
        this.cantidad = cantidad;
        this.precio = precio;
    }
    
    // Getters y Setters
    public int getIdElectrodomestico() { return idElectrodomestico; }
    public void setIdElectrodomestico(int idElectrodomestico) { this.idElectrodomestico = idElectrodomestico; }
    
    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }
    
    public double getPrecio() { return precio; }
    public void setPrecio(double precio) { this.precio = precio; }
    
    public double getSubtotal() {
        return precio * cantidad;
    }
}