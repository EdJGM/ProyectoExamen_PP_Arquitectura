/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.dto;

import java.util.List;
class MontoMaximoResponse {
    private boolean aprobado;
    private double montoMaximo;
    private String mensaje;
    
    public MontoMaximoResponse() {}
    
    public MontoMaximoResponse(boolean aprobado, double montoMaximo, String mensaje) {
        this.aprobado = aprobado;
        this.montoMaximo = montoMaximo;
        this.mensaje = mensaje;
    }
    
    public boolean isAprobado() { return aprobado; }
    public void setAprobado(boolean aprobado) { this.aprobado = aprobado; }
    
    public double getMontoMaximo() { return montoMaximo; }
    public void setMontoMaximo(double montoMaximo) { this.montoMaximo = montoMaximo; }
    
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
}