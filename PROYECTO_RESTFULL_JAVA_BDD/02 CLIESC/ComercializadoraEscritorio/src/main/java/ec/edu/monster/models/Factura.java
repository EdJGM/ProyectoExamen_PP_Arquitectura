package ec.edu.monster.models;

import java.util.ArrayList;
import java.util.List;

/**
 * Modelo para representar una factura
 */
public class Factura {
    private int idFactura;
    private String numeroFactura;
    private String cedulaCliente;
    private String nombreCliente;
    private String fechaFactura;
    private double subtotal;
    private double descuento;
    private double total;
    private String formaPago;
    private String estado;
    private int numeroCuotas;
    private double cuotaMensual;
    private int idCreditoBanco;
    private List<ItemFactura> items;

    public Factura() {
        this.items = new ArrayList<>();
    }

    // Getters y Setters
    public int getIdFactura() { return idFactura; }
    public void setIdFactura(int idFactura) { this.idFactura = idFactura; }

    public String getNumeroFactura() { return numeroFactura; }
    public void setNumeroFactura(String numeroFactura) { this.numeroFactura = numeroFactura; }

    public String getCedulaCliente() { return cedulaCliente; }
    public void setCedulaCliente(String cedulaCliente) { this.cedulaCliente = cedulaCliente; }

    public String getNombreCliente() { return nombreCliente; }
    public void setNombreCliente(String nombreCliente) { this.nombreCliente = nombreCliente; }

    public String getFechaFactura() { return fechaFactura; }
    public void setFechaFactura(String fechaFactura) { this.fechaFactura = fechaFactura; }

    public double getSubtotal() { return subtotal; }
    public void setSubtotal(double subtotal) { this.subtotal = subtotal; }

    public double getDescuento() { return descuento; }
    public void setDescuento(double descuento) { this.descuento = descuento; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public String getFormaPago() { return formaPago; }
    public void setFormaPago(String formaPago) { this.formaPago = formaPago; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public int getNumeroCuotas() { return numeroCuotas; }
    public void setNumeroCuotas(int numeroCuotas) { this.numeroCuotas = numeroCuotas; }

    public double getCuotaMensual() { return cuotaMensual; }
    public void setCuotaMensual(double cuotaMensual) { this.cuotaMensual = cuotaMensual; }

    public int getIdCreditoBanco() { return idCreditoBanco; }
    public void setIdCreditoBanco(int idCreditoBanco) { this.idCreditoBanco = idCreditoBanco; }

    public List<ItemFactura> getItems() { return items; }
    public void setItems(List<ItemFactura> items) { this.items = items; }

    // Métodos de utilidad
    public String getFormaPagoTexto() {
        return "EFECTIVO".equals(formaPago) ? "Efectivo (33% desc.)" : "Crédito Directo";
    }

    public String getEstadoTexto() {
        return "PAGADA".equals(estado) ? "✅ Pagada" : "⏳ Pendiente";
    }

    public String getResumenCredito() {
        if ("CREDITO_DIRECTO".equals(formaPago)) {
            return String.format("%d cuotas de $%.2f", numeroCuotas, cuotaMensual);
        }
        return "N/A";
    }
}