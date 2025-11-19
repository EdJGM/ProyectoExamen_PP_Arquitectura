/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.models;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author josue
 */
public class TablaAmortizacion {
    private boolean encontrado;
    private int idCredito;
    private double montoCredito;
    private double tasaInteres;
    private int numeroCuotas;
    private List<CuotaAmortizacion> cuotas;
    private String mensaje;
    
    public TablaAmortizacion() {
        this.cuotas = new ArrayList<>();
    }
    
    // Getters y Setters
    public boolean isEncontrado() { return encontrado; }
    public void setEncontrado(boolean encontrado) { this.encontrado = encontrado; }
    
    public int getIdCredito() { return idCredito; }
    public void setIdCredito(int idCredito) { this.idCredito = idCredito; }
    
    public double getMontoCredito() { return montoCredito; }
    public void setMontoCredito(double montoCredito) { this.montoCredito = montoCredito; }
    
    public double getTasaInteres() { return tasaInteres; }
    public void setTasaInteres(double tasaInteres) { this.tasaInteres = tasaInteres; }
    
    public int getNumeroCuotas() { return numeroCuotas; }
    public void setNumeroCuotas(int numeroCuotas) { this.numeroCuotas = numeroCuotas; }
    
    public List<CuotaAmortizacion> getCuotas() { return cuotas; }
    public void setCuotas(List<CuotaAmortizacion> cuotas) { this.cuotas = cuotas; }
    
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
}
