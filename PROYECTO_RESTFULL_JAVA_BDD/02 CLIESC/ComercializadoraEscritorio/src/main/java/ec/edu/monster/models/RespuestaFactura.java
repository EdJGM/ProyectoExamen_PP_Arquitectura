package ec.edu.monster.models;

/**
 * Respuesta para consulta de factura individual
 */
public class RespuestaFactura {
    private boolean encontrada;
    private String mensaje;
    private Factura factura;

    public RespuestaFactura() {}

    // Getters y Setters
    public boolean isEncontrada() { return encontrada; }
    public void setEncontrada(boolean encontrada) { this.encontrada = encontrada; }

    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }

    public Factura getFactura() { return factura; }
    public void setFactura(Factura factura) { this.factura = factura; }
}