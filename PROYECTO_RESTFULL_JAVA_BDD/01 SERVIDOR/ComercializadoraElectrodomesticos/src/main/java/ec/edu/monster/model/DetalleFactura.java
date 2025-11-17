/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.model;

import java.util.Date;
class DetalleFactura {
    private int idDetalle;
    private int idFactura;
    private int idElectrodomestico;
    private int cantidad;
    private double precioUnitario;
    private double subtotal;
    
    public DetalleFactura() {}
    
    // Getters y Setters
    public int getIdDetalle() { return idDetalle; }
    public void setIdDetalle(int idDetalle) { this.idDetalle = idDetalle; }
    
    public int getIdFactura() { return idFactura; }
    public void setIdFactura(int idFactura) { this.idFactura = idFactura; }
    
    public int getIdElectrodomestico() { return idElectrodomestico; }
    public void setIdElectrodomestico(int idElectrodomestico) { this.idElectrodomestico = idElectrodomestico; }
    
    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }
    
    public double getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(double precioUnitario) { this.precioUnitario = precioUnitario; }
    
    public double getSubtotal() { return subtotal; }
    public void setSubtotal(double subtotal) { this.subtotal = subtotal; }
}

