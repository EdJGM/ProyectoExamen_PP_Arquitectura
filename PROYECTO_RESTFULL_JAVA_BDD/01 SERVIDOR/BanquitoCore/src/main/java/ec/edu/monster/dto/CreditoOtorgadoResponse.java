/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.dto;

import java.util.List;
class CreditoOtorgadoResponse {
    private boolean aprobado;
    private int idCredito;
    private double cuotaMensual;
    private String mensaje;
    
    public CreditoOtorgadoResponse() {}
    
    public CreditoOtorgadoResponse(boolean aprobado, String mensaje) {
        this.aprobado = aprobado;
        this.mensaje = mensaje;
    }
    
    public boolean isAprobado() { return aprobado; }
    public void setAprobado(boolean aprobado) { this.aprobado = aprobado; }
    
    public int getIdCredito() { return idCredito; }
    public void setIdCredito(int idCredito) { this.idCredito = idCredito; }
    
    public double getCuotaMensual() { return cuotaMensual; }
    public void setCuotaMensual(double cuotaMensual) { this.cuotaMensual = cuotaMensual; }
    
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
}
