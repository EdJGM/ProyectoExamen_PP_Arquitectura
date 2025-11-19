/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.models;

/**
 *
 * @author josue
 */
public class MontoMaximo {
    private boolean aprobado;
    private double montoMaximo;
    private String mensaje;
    
    public MontoMaximo() {}
    
    // Getters y Setters
    public boolean isAprobado() { return aprobado; }
    public void setAprobado(boolean aprobado) { this.aprobado = aprobado; }
    
    public double getMontoMaximo() { return montoMaximo; }
    public void setMontoMaximo(double montoMaximo) { this.montoMaximo = montoMaximo; }
    
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
}