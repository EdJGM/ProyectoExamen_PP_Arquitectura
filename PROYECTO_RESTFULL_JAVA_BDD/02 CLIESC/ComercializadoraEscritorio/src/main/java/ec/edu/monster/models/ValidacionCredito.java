/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.models;

/**
 *
 * @author josue
 */
public class ValidacionCredito {
    private boolean sujetoCredito;
    private String mensaje;
    private int idCliente;
    
    public ValidacionCredito() {}
    
    // Getters y Setters
    public boolean isSujetoCredito() { return sujetoCredito; }
    public void setSujetoCredito(boolean sujetoCredito) { this.sujetoCredito = sujetoCredito; }
    
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
    
    public int getIdCliente() { return idCliente; }
    public void setIdCliente(int idCliente) { this.idCliente = idCliente; }
}
