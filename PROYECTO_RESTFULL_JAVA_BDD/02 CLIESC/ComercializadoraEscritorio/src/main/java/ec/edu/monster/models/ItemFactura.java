package ec.edu.monster.models;

/**
 * Modelo para items de factura
 */
public class ItemFactura {
    private int idElectrodomestico;
    private String nombre;
    private String marca;
    private int cantidad;
    private double precioUnitario;
    private double subtotal;

    public ItemFactura() {}

    // Getters y Setters
    public int getIdElectrodomestico() { return idElectrodomestico; }
    public void setIdElectrodomestico(int idElectrodomestico) { this.idElectrodomestico = idElectrodomestico; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getMarca() { return marca; }
    public void setMarca(String marca) { this.marca = marca; }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }

    public double getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(double precioUnitario) { this.precioUnitario = precioUnitario; }

    public double getSubtotal() { return subtotal; }
    public void setSubtotal(double subtotal) { this.subtotal = subtotal; }

    public String getDescripcionCompleta() {
        return String.format("%s (%s) x %d", nombre, marca, cantidad);
    }
}
