/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.model;
import java.util.Date;
class CreditoAprobado {
    private int idCreditoLocal;
    private int idFactura;
    private String cedulaCliente;
    private int idCreditoBanco;
    private double montoCredito;
    private int numeroCuotas;
    private double cuotaMensual;
    private String estado;
    private Date fechaAprobacion;
    
    public CreditoAprobado() {}
    
    // Getters y Setters
    public int getIdCreditoLocal() { return idCreditoLocal; }
    public void setIdCreditoLocal(int idCreditoLocal) { this.idCreditoLocal = idCreditoLocal; }
    
    public int getIdFactura() { return idFactura; }
    public void setIdFactura(int idFactura) { this.idFactura = idFactura; }
    
    public String getCedulaCliente() { return cedulaCliente; }
    public void setCedulaCliente(String cedulaCliente) { this.cedulaCliente = cedulaCliente; }
    
    public int getIdCreditoBanco() { return idCreditoBanco; }
    public void setIdCreditoBanco(int idCreditoBanco) { this.idCreditoBanco = idCreditoBanco; }
    
    public double getMontoCredito() { return montoCredito; }
    public void setMontoCredito(double montoCredito) { this.montoCredito = montoCredito; }
    
    public int getNumeroCuotas() { return numeroCuotas; }
    public void setNumeroCuotas(int numeroCuotas) { this.numeroCuotas = numeroCuotas; }
    
    public double getCuotaMensual() { return cuotaMensual; }
    public void setCuotaMensual(double cuotaMensual) { this.cuotaMensual = cuotaMensual; }
    
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    
    public Date getFechaAprobacion() { return fechaAprobacion; }
    public void setFechaAprobacion(Date fechaAprobacion) { this.fechaAprobacion = fechaAprobacion; }
}