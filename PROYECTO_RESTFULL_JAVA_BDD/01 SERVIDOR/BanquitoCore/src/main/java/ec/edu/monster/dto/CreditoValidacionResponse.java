/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.dto;

import java.util.List;
public class CreditoValidacionResponse {
    private boolean sujetoCredito;
    private String mensaje;
    
    public CreditoValidacionResponse() {}
    
    public CreditoValidacionResponse(boolean sujetoCredito, String mensaje) {
        this.sujetoCredito = sujetoCredito;
        this.mensaje = mensaje;
    }
    
    public boolean isSujetoCredito() { return sujetoCredito; }
    public void setSujetoCredito(boolean sujetoCredito) { this.sujetoCredito = sujetoCredito; }
    
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
}