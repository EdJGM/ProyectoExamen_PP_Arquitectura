/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.dto;

import java.util.List;
class CreditoSolicitud {
    private String cedula;
    private double precioElectrodomestico;
    private int numeroCuotas;
    
    public CreditoSolicitud() {}
    
    public String getCedula() { return cedula; }
    public void setCedula(String cedula) { this.cedula = cedula; }
    
    public double getPrecioElectrodomestico() { return precioElectrodomestico; }
    public void setPrecioElectrodomestico(double precioElectrodomestico) { 
        this.precioElectrodomestico = precioElectrodomestico; 
    }
    
    public int getNumeroCuotas() { return numeroCuotas; }
    public void setNumeroCuotas(int numeroCuotas) { this.numeroCuotas = numeroCuotas; }
}