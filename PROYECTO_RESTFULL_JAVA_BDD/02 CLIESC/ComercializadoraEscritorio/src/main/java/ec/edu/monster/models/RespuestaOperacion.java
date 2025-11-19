/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.models;

/**
 *
 * @author josue
 */
public class RespuestaOperacion {
    private boolean exito;
    private String mensaje;
    
    public RespuestaOperacion() {}
    
    public RespuestaOperacion(boolean exito, String mensaje) {
        this.exito = exito;
        this.mensaje = mensaje;
    }
    
    // Getters y Setters
    public boolean isExito() { return exito; }
    public void setExito(boolean exito) { this.exito = exito; }
    
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
}

