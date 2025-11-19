/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.models;

/**
 *
 * @author josue
 */
public class RespuestaVenta {
    private boolean exito;
    private int idFactura;
    private int idCreditoBanco;
    private double cuotaMensual;
    private int numeroCuotas;
    private String mensaje;
    
    public RespuestaVenta() {}
    
    // Getters y Setters
    public boolean isExito() { return exito; }
    public void setExito(boolean exito) { this.exito = exito; }
    
    public int getIdFactura() { return idFactura; }
    public void setIdFactura(int idFactura) { this.idFactura = idFactura; }
    
    public int getIdCreditoBanco() { return idCreditoBanco; }
    public void setIdCreditoBanco(int idCreditoBanco) { this.idCreditoBanco = idCreditoBanco; }
    
    public double getCuotaMensual() { return cuotaMensual; }
    public void setCuotaMensual(double cuotaMensual) { this.cuotaMensual = cuotaMensual; }
    
    public int getNumeroCuotas() { return numeroCuotas; }
    public void setNumeroCuotas(int numeroCuotas) { this.numeroCuotas = numeroCuotas; }
    
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
}
