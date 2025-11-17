/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.model;

/**
 *
 * @author victo
 */
import java.util.Date;


class Credito {
    private int idCredito;
    private int idCliente;
    private String cedula;
    private double montoCredito;
    private double tasaInteres;
    private int numeroCuotas;
    private double cuotaMensual;
    private String estado;
    private Date fechaOtorgamiento;
    
    // Constructor vacío
    public Credito() {}
    
    // Getters y Setters
    public int getIdCredito() { return idCredito; }
    public void setIdCredito(int idCredito) { this.idCredito = idCredito; }
    
    public int getIdCliente() { return idCliente; }
    public void setIdCliente(int idCliente) { this.idCliente = idCliente; }
    
    public String getCedula() { return cedula; }
    public void setCedula(String cedula) { this.cedula = cedula; }
    
    public double getMontoCredito() { return montoCredito; }
    public void setMontoCredito(double montoCredito) { this.montoCredito = montoCredito; }
    
    public double getTasaInteres() { return tasaInteres; }
    public void setTasaInteres(double tasaInteres) { this.tasaInteres = tasaInteres; }
    
    public int getNumeroCuotas() { return numeroCuotas; }
    public void setNumeroCuotas(int numeroCuotas) { this.numeroCuotas = numeroCuotas; }
    
    public double getCuotaMensual() { return cuotaMensual; }
    public void setCuotaMensual(double cuotaMensual) { this.cuotaMensual = cuotaMensual; }
    
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    
    public Date getFechaOtorgamiento() { return fechaOtorgamiento; }
    public void setFechaOtorgamiento(Date fechaOtorgamiento) { this.fechaOtorgamiento = fechaOtorgamiento; }
}