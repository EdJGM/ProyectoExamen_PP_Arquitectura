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


class Amortizacion {
    private int idAmortizacion;
    private int idCredito;
    private int numeroCuota;
    private double valorCuota;
    private double interesPagado;
    private double capitalPagado;
    private double saldo;
    private Date fechaVencimiento;
    
    // Constructor vacío
    public Amortizacion() {}
    
    // Getters y Setters
    public int getIdAmortizacion() { return idAmortizacion; }
    public void setIdAmortizacion(int idAmortizacion) { this.idAmortizacion = idAmortizacion; }
    
    public int getIdCredito() { return idCredito; }
    public void setIdCredito(int idCredito) { this.idCredito = idCredito; }
    
    public int getNumeroCuota() { return numeroCuota; }
    public void setNumeroCuota(int numeroCuota) { this.numeroCuota = numeroCuota; }
    
    public double getValorCuota() { return valorCuota; }
    public void setValorCuota(double valorCuota) { this.valorCuota = valorCuota; }
    
    public double getInteresPagado() { return interesPagado; }
    public void setInteresPagado(double interesPagado) { this.interesPagado = interesPagado; }
    
    public double getCapitalPagado() { return capitalPagado; }
    public void setCapitalPagado(double capitalPagado) { this.capitalPagado = capitalPagado; }
    
    public double getSaldo() { return saldo; }
    public void setSaldo(double saldo) { this.saldo = saldo; }
    
    public Date getFechaVencimiento() { return fechaVencimiento; }
    public void setFechaVencimiento(Date fechaVencimiento) { this.fechaVencimiento = fechaVencimiento; }
}