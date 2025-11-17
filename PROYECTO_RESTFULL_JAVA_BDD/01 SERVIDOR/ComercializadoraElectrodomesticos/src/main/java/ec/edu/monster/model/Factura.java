/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.model;

import java.util.Date;
class Factura {
    private int idFactura;
    private String numeroFactura;
    private String cedulaCliente;
    private String nombreCliente;
    private Date fechaFactura;
    private double subtotal;
    private double descuento;
    private double total;
    private String formaPago;
    private String estado;
    
    public Factura() {}
    
    // Getters y Setters
    public int getIdFactura() { return idFactura; }
    public void setIdFactura(int idFactura) { this.idFactura = idFactura; }
    
    public String getNumeroFactura() { return numeroFactura; }
    public void setNumeroFactura(String numeroFactura) { this.numeroFactura = numeroFactura; }
    
    public String getCedulaCliente() { return cedulaCliente; }
    public void setCedulaCliente(String cedulaCliente) { this.cedulaCliente = cedulaCliente; }
    
    public String getNombreCliente() { return nombreCliente; }
    public void setNombreCliente(String nombreCliente) { this.nombreCliente = nombreCliente; }
    
    public Date getFechaFactura() { return fechaFactura; }
    public void setFechaFactura(Date fechaFactura) { this.fechaFactura = fechaFactura; }
    
    public double getSubtotal() { return subtotal; }
    public void setSubtotal(double subtotal) { this.subtotal = subtotal; }
    
    public double getDescuento() { return descuento; }
    public void setDescuento(double descuento) { this.descuento = descuento; }
    
    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }
    
    public String getFormaPago() { return formaPago; }
    public void setFormaPago(String formaPago) { this.formaPago = formaPago; }
    
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}