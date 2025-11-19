/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.vistas;

import ec.edu.monster.models.*;
import ec.edu.monster.services.ClienteUnificado;
import ec.edu.monster.utils.UIConstants;
import ec.edu.monster.utils.MessageHelper;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author josue
 */
public class FacturacionPanel extends JPanel {
    
    private ClienteUnificado clienteService;
    private StatusBar statusBar;
    private MainFrame parentFrame;

    // Componentes de cliente
    private JTextField txtCedula, txtNombreCliente;
    private JButton btnValidarCliente;
    
    // Componentes de productos
    private JComboBox<Electrodomestico> cmbProductos;
    private JSpinner spnCantidad;
    private JButton btnAgregarItem, btnRemoverItem, btnCargarProductos;
    
    // Tabla de items
    private JTable tablaItems;
    private DefaultTableModel modeloTablaItems;
    
    // Información de totales
    private JLabel lblSubtotal, lblDescuento, lblTotal;
    
    // Botones de facturación
    private JButton btnVentaEfectivo, btnVentaCredito;
    private JSpinner spnCuotas;
    
    // Datos
    private List<Electrodomestico> productosDisponibles;
    private List<ItemVenta> itemsVenta;
    
    public FacturacionPanel(ClienteUnificado clienteService, StatusBar statusBar, MainFrame parentFrame) {
        this.clienteService = clienteService;
        this.statusBar = statusBar;
        this.itemsVenta = new ArrayList<>();
        this.parentFrame = parentFrame;
        
        initializeComponents();
        setupLayout();
        setupEventHandlers();
        cargarProductos();
    }
    
    private void initializeComponents() {
        setBackground(UIConstants.BACKGROUND_MAIN);
        
        // Datos del cliente
        txtCedula = new JTextField();
        txtCedula.setFont(UIConstants.FONT_LABEL);
        txtCedula.setBorder(BorderFactory.createCompoundBorder(
            UIConstants.INPUT_BORDER,
            BorderFactory.createEmptyBorder(8, 10, 8, 10)
        ));
        
        txtNombreCliente = new JTextField();
        txtNombreCliente.setFont(UIConstants.FONT_LABEL);
        txtNombreCliente.setBorder(BorderFactory.createCompoundBorder(
            UIConstants.INPUT_BORDER,
            BorderFactory.createEmptyBorder(8, 10, 8, 10)
        ));
        
        btnValidarCliente = createActionButton("✅ Validar", UIConstants.PRIMARY_COLOR);
        
        // Productos y cantidades
        cmbProductos = new JComboBox<>();
        cmbProductos.setFont(UIConstants.FONT_LABEL);
        
        spnCantidad = new JSpinner(new SpinnerNumberModel(1, 1, 999, 1));
        spnCantidad.setFont(UIConstants.FONT_LABEL);
        
        btnCargarProductos = createActionButton("🔄", UIConstants.INFO_COLOR);
        btnAgregarItem = createActionButton("➕ Agregar", UIConstants.SUCCESS_COLOR);
        btnRemoverItem = createActionButton("➖ Quitar", UIConstants.DANGER_COLOR);
        btnRemoverItem.setEnabled(false);
        
        // Tabla de items
        String[] columnasItems = {"Producto", "Cantidad", "Precio Unit.", "Subtotal"};
        modeloTablaItems = new DefaultTableModel(columnasItems, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        
        tablaItems = new JTable(modeloTablaItems);
        tablaItems.setFont(UIConstants.FONT_TABLE_DATA);
        tablaItems.getTableHeader().setFont(UIConstants.FONT_TABLE_HEADER);
        tablaItems.getTableHeader().setBackground(UIConstants.PRIMARY_COLOR);
        tablaItems.getTableHeader().setForeground(UIConstants.WHITE);
        tablaItems.setRowHeight(25);
        tablaItems.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        
        // Labels de totales
        lblSubtotal = createTotalLabel("Subtotal: $0.00");
        lblDescuento = createTotalLabel("Descuento: $0.00");
        lblTotal = createTotalLabel("TOTAL: $0.00");
        lblTotal.setFont(UIConstants.FONT_SUBTITLE);
        lblTotal.setForeground(UIConstants.PRIMARY_COLOR);
        
        // Facturación
        spnCuotas = new JSpinner(new SpinnerNumberModel(12, 3, 24, 1));
        spnCuotas.setFont(UIConstants.FONT_LABEL);
        
        btnVentaEfectivo = createActionButton("💵 Venta Efectivo (33% DESC)", UIConstants.SUCCESS_COLOR);
        btnVentaCredito = createActionButton("💳 Venta a Crédito", UIConstants.WARNING_COLOR);
        
        // Inicialmente deshabilitar botones de venta
        btnVentaEfectivo.setEnabled(false);
        btnVentaCredito.setEnabled(false);
    }
    
    private void setupLayout() {
        setLayout(new BorderLayout(10, 10));
        setBorder(new EmptyBorder(0, 0, 0, 0));
        
        // Panel principal con scroll
        JPanel mainPanel = new JPanel(new BorderLayout(15, 15));
        mainPanel.setBackground(UIConstants.BACKGROUND_MAIN);
        
        // Panel superior - Datos del cliente
        JPanel clientePanel = createClientePanel();
        
        // Panel central - Productos y tabla
        JPanel productosPanel = createProductosPanel();
        
        // Panel inferior - Totales y facturación
        JPanel facturacionPanel = createFacturacionPanel();
        
        mainPanel.add(clientePanel, BorderLayout.NORTH);
        mainPanel.add(productosPanel, BorderLayout.CENTER);
        mainPanel.add(facturacionPanel, BorderLayout.SOUTH);
        
        JScrollPane scrollPane = new JScrollPane(mainPanel);
        scrollPane.setBorder(null);
        scrollPane.getViewport().setBackground(UIConstants.BACKGROUND_MAIN);
        
        add(scrollPane, BorderLayout.CENTER);
    }
    
    private JPanel createClientePanel() {
        JPanel panel = new JPanel(new BorderLayout());
        panel.setBackground(UIConstants.WHITE);
        panel.setBorder(UIConstants.CARD_BORDER);
        
        JLabel titulo = new JLabel("👤 Datos del Cliente");
        titulo.setFont(UIConstants.EMOJI_FONT);
        titulo.setForeground(UIConstants.DARK_GRAY);
        titulo.setBorder(new EmptyBorder(0, 0, 10, 0));
        
        JPanel formPanel = new JPanel(new GridBagLayout());
        formPanel.setBackground(UIConstants.WHITE);
        
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.anchor = GridBagConstraints.WEST;
        
        // Cédula
        gbc.gridx = 0; gbc.gridy = 0;
        formPanel.add(new JLabel("Cédula:"), gbc);
        gbc.gridx = 1; gbc.fill = GridBagConstraints.HORIZONTAL; gbc.weightx = 0.3;
        txtCedula.setPreferredSize(new Dimension(150, 35));
        formPanel.add(txtCedula, gbc);
        
        // Nombre
        gbc.gridx = 2; gbc.weightx = 0;
        formPanel.add(new JLabel("Nombre:"), gbc);
        gbc.gridx = 3; gbc.weightx = 0.5;
        txtNombreCliente.setPreferredSize(new Dimension(250, 35));
        formPanel.add(txtNombreCliente, gbc);
        
        // Botón validar
        gbc.gridx = 4; gbc.weightx = 0; gbc.fill = GridBagConstraints.NONE;
        formPanel.add(btnValidarCliente, gbc);
        
        panel.add(titulo, BorderLayout.NORTH);
        panel.add(formPanel, BorderLayout.CENTER);
        
        return panel;
    }
    
    private JPanel createProductosPanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBackground(UIConstants.WHITE);
        panel.setBorder(UIConstants.CARD_BORDER);
        
        JLabel titulo = new JLabel("🛒 Selección de Productos");
        titulo.setFont(UIConstants.EMOJI_FONT);
        titulo.setForeground(UIConstants.DARK_GRAY);
        
        // Panel de selección
        JPanel seleccionPanel = new JPanel(new GridBagLayout());
        seleccionPanel.setBackground(UIConstants.WHITE);
        
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.anchor = GridBagConstraints.WEST;
        
        gbc.gridx = 0; gbc.gridy = 0;
        seleccionPanel.add(new JLabel("Producto:"), gbc);
        gbc.gridx = 1; gbc.fill = GridBagConstraints.HORIZONTAL; gbc.weightx = 1.0;
        cmbProductos.setPreferredSize(new Dimension(300, 35));
        seleccionPanel.add(cmbProductos, gbc);
        
        gbc.gridx = 2; gbc.weightx = 0; gbc.fill = GridBagConstraints.NONE;
        seleccionPanel.add(btnCargarProductos, gbc);
        
        gbc.gridx = 3;
        seleccionPanel.add(new JLabel("Cantidad:"), gbc);
        gbc.gridx = 4;
        spnCantidad.setPreferredSize(new Dimension(80, 35));
        seleccionPanel.add(spnCantidad, gbc);
        
        gbc.gridx = 5;
        seleccionPanel.add(btnAgregarItem, gbc);
        gbc.gridx = 6;
        seleccionPanel.add(btnRemoverItem, gbc);
        
        // Tabla de items
        JScrollPane scrollItems = new JScrollPane(tablaItems);
        scrollItems.setPreferredSize(new Dimension(0, 200));
        scrollItems.setBorder(UIConstants.INPUT_BORDER);
        
        JPanel topPanel = new JPanel(new BorderLayout(5, 5));
        topPanel.setBackground(UIConstants.WHITE);
        topPanel.add(titulo, BorderLayout.NORTH);
        topPanel.add(seleccionPanel, BorderLayout.CENTER);
        
        panel.add(topPanel, BorderLayout.NORTH);
        panel.add(scrollItems, BorderLayout.CENTER);
        
        return panel;
    }
    
    private JPanel createFacturacionPanel() {
        JPanel panel = new JPanel(new BorderLayout());
        panel.setBackground(UIConstants.WHITE);
        panel.setBorder(UIConstants.CARD_BORDER);
        
        JLabel titulo = new JLabel("💳 Facturación");
        titulo.setFont(UIConstants.EMOJI_FONT);
        titulo.setForeground(UIConstants.DARK_GRAY);
        titulo.setBorder(new EmptyBorder(0, 0, 10, 0));
        
        // Panel de totales
        JPanel totalesPanel = new JPanel(new GridBagLayout());
        totalesPanel.setBackground(UIConstants.WHITE);
        
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 15, 5, 15);
        gbc.anchor = GridBagConstraints.EAST;
        
        gbc.gridx = 0; gbc.gridy = 0;
        totalesPanel.add(lblSubtotal, gbc);
        gbc.gridy = 1;
        totalesPanel.add(lblDescuento, gbc);
        gbc.gridy = 2;
        totalesPanel.add(lblTotal, gbc);
        
        // Panel de botones
        JPanel botonesPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 15, 10));
        botonesPanel.setBackground(UIConstants.WHITE);
        
        JPanel creditoPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 5, 0));
        creditoPanel.setBackground(UIConstants.WHITE);
        creditoPanel.add(new JLabel("Cuotas:"));
        creditoPanel.add(spnCuotas);
        creditoPanel.add(btnVentaCredito);
        
        botonesPanel.add(btnVentaEfectivo);
        botonesPanel.add(new JLabel("  |  "));
        botonesPanel.add(creditoPanel);
        
        JPanel bottomPanel = new JPanel(new BorderLayout());
        bottomPanel.setBackground(UIConstants.WHITE);
        bottomPanel.add(totalesPanel, BorderLayout.EAST);
        bottomPanel.add(botonesPanel, BorderLayout.CENTER);
        
        panel.add(titulo, BorderLayout.NORTH);
        panel.add(bottomPanel, BorderLayout.CENTER);
        
        return panel;
    }
    
    private JLabel createTotalLabel(String texto) {
        JLabel label = new JLabel(texto);
        label.setFont(UIConstants.FONT_LABEL);
        label.setForeground(UIConstants.DARK_GRAY);
        return label;
    }
    
    private JButton createActionButton(String text, Color backgroundColor) {
        JButton button = new JButton(text);
        button.setFont(UIConstants.EMOJI_FONT);
        button.setForeground(UIConstants.WHITE);
        button.setBackground(backgroundColor);
        button.setBorder(BorderFactory.createEmptyBorder(8, 15, 8, 15));
        button.setFocusPainted(false);
        button.setCursor(new Cursor(Cursor.HAND_CURSOR));
        
        return button;
    }
    
    private void setupEventHandlers() {
        btnCargarProductos.addActionListener(e -> cargarProductos());
        btnValidarCliente.addActionListener(e -> validarCliente());
        btnAgregarItem.addActionListener(e -> agregarItem());
        btnRemoverItem.addActionListener(e -> removerItem());
        btnVentaEfectivo.addActionListener(e -> procesarVentaEfectivo());
        btnVentaCredito.addActionListener(e -> procesarVentaCredito());
        
        // Selección en tabla
        tablaItems.getSelectionModel().addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting()) {
                btnRemoverItem.setEnabled(tablaItems.getSelectedRow() != -1);
            }
        });
    }
    
    // ========== ACCIONES ==========
    
    private void cargarProductos() {
        statusBar.setLoading("Cargando productos...");
        
        clienteService.listarElectrodomesticosAsync()
            .thenAccept(result -> {
                SwingUtilities.invokeLater(() -> {
                    if (result != null) {
                        productosDisponibles = result;
                        actualizarComboProductos();
                        statusBar.setSuccess("Productos cargados: " + result.size());
                    } else {
                        statusBar.setError("No se pudieron cargar los productos");
                    }
                });
            })
            .exceptionally(throwable -> {
                SwingUtilities.invokeLater(() -> {
                    statusBar.setError("Error: " + throwable.getMessage());
                });
                return null;
            });
    }
    
    private void validarCliente() {
        String cedula = txtCedula.getText().trim();
        if (cedula.isEmpty()) {
            MessageHelper.showWarning(this, "Ingrese la cédula del cliente");
            return;
        }
        
        statusBar.setLoading("Validando cliente...");
        
        clienteService.validarSujetoCreditoAsync(cedula)
            .thenAccept(result -> {
                SwingUtilities.invokeLater(() -> {
                    if (result != null) {
                        if (result.isSujetoCredito()) {
                            statusBar.setSuccess("Cliente validado correctamente");
                            MessageHelper.showSuccess(this, "Cliente apto para crédito: " + result.getMensaje());
                        } else {
                            statusBar.setWarning("Cliente no apto para crédito");
                            MessageHelper.showWarning(this, "Cliente no apto para crédito: " + result.getMensaje());
                        }
                    } else {
                        statusBar.setError("Error al validar cliente");
                    }
                });
            })
            .exceptionally(throwable -> {
                SwingUtilities.invokeLater(() -> {
                    statusBar.setError("Error de conexión al validar cliente");
                });
                return null;
            });
    }
    
    private void agregarItem() {
        Electrodomestico producto = (Electrodomestico) cmbProductos.getSelectedItem();
        if (producto == null) {
            MessageHelper.showWarning(this, "Seleccione un producto");
            return;
        }
        
        int cantidad = (Integer) spnCantidad.getValue();
        
        // Verificar si el producto ya está en la lista
        boolean encontrado = false;
        for (int i = 0; i < itemsVenta.size(); i++) {
            ItemVenta item = itemsVenta.get(i);
            if (item.getIdElectrodomestico() == producto.getIdElectrodomestico()) {
                // Actualizar cantidad
                item.setCantidad(item.getCantidad() + cantidad);
                encontrado = true;
                break;
            }
        }
        
        if (!encontrado) {
            // Agregar nuevo item
            ItemVenta nuevoItem = new ItemVenta();
            nuevoItem.setIdElectrodomestico(producto.getIdElectrodomestico());
            nuevoItem.setCantidad(cantidad);
            nuevoItem.setPrecio(producto.getPrecioVenta());
            itemsVenta.add(nuevoItem);
        }
        
        actualizarTablaItems();
        calcularTotales();
        
        // Reset spinner
        spnCantidad.setValue(1);
    }
    
    private void removerItem() {
        int selectedRow = tablaItems.getSelectedRow();
        if (selectedRow == -1) return;
        
        itemsVenta.remove(selectedRow);
        actualizarTablaItems();
        calcularTotales();
    }
    
    private void procesarVentaEfectivo() {
        if (!validarVenta()) return;
        
        SolicitudVenta solicitud = crearSolicitudVenta();
        
        statusBar.setLoading("Procesando venta en efectivo...");
        
        clienteService.procesarVentaEfectivoAsync(solicitud)
            .thenAccept(result -> {
                SwingUtilities.invokeLater(() -> {
                    if (result != null && result.isExito()) {
                        statusBar.setSuccess("Venta procesada exitosamente");
                        mostrarResultadoVenta(result, "EFECTIVO");
                        limpiarFormulario();
                    } else {
                        String error = result != null ? result.getMensaje() : "Error desconocido";
                        statusBar.setError("Error en la venta: " + error);
                        MessageHelper.showError(this, "Error al procesar venta: " + error);
                    }
                });
            })
            .exceptionally(throwable -> {
                SwingUtilities.invokeLater(() -> {
                    statusBar.setError("Error de conexión");
                    MessageHelper.showError(this, "Error: " + throwable.getMessage());
                });
                return null;
            });
    }
    
    private void procesarVentaCredito() {
        if (!validarVenta()) return;
        
        SolicitudVenta solicitud = crearSolicitudVenta();
        solicitud.setNumeroCuotas((Integer) spnCuotas.getValue());
        
        statusBar.setLoading("Procesando venta a crédito...");
        
        clienteService.procesarVentaCreditoAsync(solicitud)
            .thenAccept(result -> {
                SwingUtilities.invokeLater(() -> {
                    if (result != null && result.isExito()) {
                        statusBar.setSuccess("Venta a crédito procesada exitosamente");
                        mostrarResultadoVenta(result, "CREDITO");
                        limpiarFormulario();
                    } else {
                        String error = result != null ? result.getMensaje() : "Error desconocido";
                        statusBar.setError("Error en la venta: " + error);
                        MessageHelper.showError(this, "Error al procesar venta a crédito: " + error);
                    }
                });
            })
            .exceptionally(throwable -> {
                SwingUtilities.invokeLater(() -> {
                    statusBar.setError("Error de conexión");
                    MessageHelper.showError(this, "Error: " + throwable.getMessage());
                });
                return null;
            });
    }
    
    // ========== HELPERS ==========
    
    private void actualizarComboProductos() {
        cmbProductos.removeAllItems();
        if (productosDisponibles != null) {
            for (Electrodomestico producto : productosDisponibles) {
                cmbProductos.addItem(producto);
            }
        }
    }
    
    private void actualizarTablaItems() {
        modeloTablaItems.setRowCount(0);
        
        for (ItemVenta item : itemsVenta) {
            Electrodomestico producto = buscarProductoPorId(item.getIdElectrodomestico());
            if (producto != null) {
                Object[] fila = {
                    producto.getNombre() + " (" + producto.getMarca() + ")",
                    item.getCantidad(),
                    String.format("$%.2f", item.getPrecio()),
                    String.format("$%.2f", item.getSubtotal())
                };
                modeloTablaItems.addRow(fila);
            }
        }
        
        // Habilitar/deshabilitar botones de venta
        boolean hayItems = !itemsVenta.isEmpty();
        btnVentaEfectivo.setEnabled(hayItems);
        btnVentaCredito.setEnabled(hayItems);
    }
    
    private void calcularTotales() {
        double subtotal = itemsVenta.stream()
            .mapToDouble(ItemVenta::getSubtotal)
            .sum();
        
        double descuentoEfectivo = subtotal * 0.33; // 33% descuento efectivo
        double totalEfectivo = subtotal - descuentoEfectivo;
        
        lblSubtotal.setText(String.format("Subtotal: $%.2f", subtotal));
        lblDescuento.setText(String.format("Descuento (efectivo): $%.2f", descuentoEfectivo));
        lblTotal.setText(String.format("TOTAL: $%.2f (efectivo) / $%.2f (crédito)", totalEfectivo, subtotal));
    }
    
    private Electrodomestico buscarProductoPorId(int id) {
        if (productosDisponibles == null) return null;
        return productosDisponibles.stream()
            .filter(p -> p.getIdElectrodomestico() == id)
            .findFirst()
            .orElse(null);
    }
    
    private boolean validarVenta() {
        if (txtCedula.getText().trim().isEmpty()) {
            MessageHelper.showWarning(this, "Ingrese la cédula del cliente");
            return false;
        }
        if (txtNombreCliente.getText().trim().isEmpty()) {
            MessageHelper.showWarning(this, "Ingrese el nombre del cliente");
            return false;
        }
        if (itemsVenta.isEmpty()) {
            MessageHelper.showWarning(this, "Agregue al menos un producto a la venta");
            return false;
        }
        return true;
    }
    
    private SolicitudVenta crearSolicitudVenta() {
        SolicitudVenta solicitud = new SolicitudVenta();
        solicitud.setCedula(txtCedula.getText().trim());
        solicitud.setNombreCliente(txtNombreCliente.getText().trim());
        solicitud.setItems(new ArrayList<>(itemsVenta));
        return solicitud;
    }
    
    private void mostrarResultadoVenta(RespuestaVenta resultado, String tipoVenta) {
        StringBuilder mensaje = new StringBuilder();
        mensaje.append("<html><body style='width: 350px; font-family: Segoe UI;'>");
        mensaje.append("<h3 style='color: #27AE60; margin-bottom: 10px;'>✅ Venta Procesada Exitosamente</h3>");
        mensaje.append("<p><b>Tipo de venta:</b> ").append(tipoVenta).append("</p>");
        mensaje.append("<p><b>Factura N°:</b> ").append(resultado.getIdFactura()).append("</p>");
        mensaje.append("<p><b>Cliente:</b> ").append(txtNombreCliente.getText()).append("</p>");
        mensaje.append("<p><b>Cédula:</b> ").append(txtCedula.getText()).append("</p>");
        
        if ("CREDITO".equals(tipoVenta) && resultado.getIdCreditoBanco() > 0) {
            mensaje.append("<hr>");
            mensaje.append("<h4 style='color: #2980B9;'>Información del Crédito</h4>");
            mensaje.append("<p><b>ID Crédito BanQuito:</b> ").append(resultado.getIdCreditoBanco()).append("</p>");
            mensaje.append("<p><b>Cuota mensual:</b> $").append(String.format("%.2f", resultado.getCuotaMensual())).append("</p>");
            mensaje.append("<p><b>Número de cuotas:</b> ").append(resultado.getNumeroCuotas()).append("</p>");
        }
        
        if ("EFECTIVO".equals(tipoVenta)) {
            mensaje.append("<hr>");
            mensaje.append("<p style='color: #27AE60;'><b>¡Descuento del 33% aplicado!</b></p>");
        }
        
        mensaje.append("</body></html>");

        if ("CREDITO".equals(tipoVenta) && resultado.getIdCreditoBanco() > 0) {
            int opcion = JOptionPane.showOptionDialog(
                    this,
                    mensaje.toString(),
                    "Venta a Crédito Procesada",
                    JOptionPane.YES_NO_OPTION,
                    JOptionPane.INFORMATION_MESSAGE,
                    null,
                    new String[]{"Ver Tabla de Amortización", "Cerrar"},
                    "Ver Tabla de Amortización"
            );

            if (opcion == 0) {
                mostrarTablaAmortizacion(resultado.getIdCreditoBanco());
            }
        } else {
            MessageHelper.showSuccess(this, mensaje.toString());
        }
    }

    private void mostrarTablaAmortizacion(int idCredito) {
        SwingUtilities.invokeLater(() -> {
            try {
                // Cambiar al panel de crédito
                parentFrame.showCreditoPanel();

                // Cargar automáticamente la tabla
                parentFrame.getCreditoPanel().cargarTablaAmortizacion(idCredito);

            } catch (Exception e) {
                MessageHelper.showError(this, "Error al mostrar tabla de amortización: " + e.getMessage());
            }
        });
    }

    
    private void limpiarFormulario() {
        txtCedula.setText("");
        txtNombreCliente.setText("");
        itemsVenta.clear();
        actualizarTablaItems();
        calcularTotales();
        spnCantidad.setValue(1);
        spnCuotas.setValue(12);
    }
}