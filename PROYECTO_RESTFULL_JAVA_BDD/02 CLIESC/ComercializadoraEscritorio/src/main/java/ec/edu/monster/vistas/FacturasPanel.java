package ec.edu.monster.vistas;

import ec.edu.monster.models.*;
import ec.edu.monster.services.ClienteUnificado;
import ec.edu.monster.utils.UIConstants;
import ec.edu.monster.utils.MessageHelper;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableRowSorter;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.List;

public class FacturasPanel extends JPanel {

    private ClienteUnificado clienteService;
    private StatusBar statusBar;
    private MainFrame parentFrame;

    // Componentes de filtros
    private JTextField txtBusqueda;
    private JComboBox<String> cmbFiltroFormaPago;
    private JComboBox<String> cmbFiltroEstado;
    private JButton btnBuscar, btnLimpiar, btnRefrescar;

    // Tabla de facturas
    private JTable tablaFacturas;
    private DefaultTableModel modeloTablaFacturas;
    private TableRowSorter<DefaultTableModel> sorter;

    // Panel de detalle
    private JPanel panelDetalle;
    private JLabel lblDetalleFactura;
    private JTable tablaItems;
    private DefaultTableModel modeloTablaItems;

    // Datos
    private List<Factura> facturas;
    private Factura facturaSeleccionada;

    public FacturasPanel(ClienteUnificado clienteService, StatusBar statusBar, MainFrame parentFrame) {
        this.clienteService = clienteService;
        this.statusBar = statusBar;
        this.parentFrame = parentFrame;

        initializeComponents();
        setupLayout();
        setupEventHandlers();
        cargarFacturas();
    }

    private void initializeComponents() {
        setBackground(UIConstants.BACKGROUND_MAIN);

        // Componentes de filtros
        txtBusqueda = new JTextField();
        txtBusqueda.setFont(UIConstants.FONT_LABEL);
        txtBusqueda.setBorder(BorderFactory.createCompoundBorder(
                UIConstants.INPUT_BORDER,
                BorderFactory.createEmptyBorder(8, 10, 8, 10)
        ));

        cmbFiltroFormaPago = new JComboBox<>(new String[]{
                "Todas las formas de pago", "EFECTIVO", "CREDITO_DIRECTO"
        });
        cmbFiltroFormaPago.setFont(UIConstants.FONT_LABEL);

        cmbFiltroEstado = new JComboBox<>(new String[]{
                "Todos los estados", "PAGADA", "PENDIENTE"
        });
        cmbFiltroEstado.setFont(UIConstants.FONT_LABEL);

        btnBuscar = createActionButton("🔍 Buscar", UIConstants.INFO_COLOR);
        btnLimpiar = createActionButton("🧹 Limpiar", UIConstants.WARNING_COLOR);
        btnRefrescar = createActionButton("🔄 Actualizar", UIConstants.PRIMARY_COLOR);

        // Tabla de facturas
        String[] columnasFacturas = {
                "ID", "Número", "Cliente", "Cédula", "Fecha", "Total", "Forma Pago", "Estado"
        };
        modeloTablaFacturas = new DefaultTableModel(columnasFacturas, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };

        tablaFacturas = new JTable(modeloTablaFacturas);
        tablaFacturas.setFont(UIConstants.FONT_TABLE_DATA);
        tablaFacturas.getTableHeader().setFont(UIConstants.FONT_TABLE_HEADER);
        tablaFacturas.getTableHeader().setBackground(UIConstants.PRIMARY_COLOR);
        tablaFacturas.getTableHeader().setForeground(UIConstants.WHITE);
        tablaFacturas.setRowHeight(30);
        tablaFacturas.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);

        // Configurar anchos de columnas
        tablaFacturas.getColumnModel().getColumn(0).setPreferredWidth(50);  // ID
        tablaFacturas.getColumnModel().getColumn(1).setPreferredWidth(100); // Número
        tablaFacturas.getColumnModel().getColumn(2).setPreferredWidth(150); // Cliente
        tablaFacturas.getColumnModel().getColumn(3).setPreferredWidth(100); // Cédula
        tablaFacturas.getColumnModel().getColumn(4).setPreferredWidth(120); // Fecha
        tablaFacturas.getColumnModel().getColumn(5).setPreferredWidth(80);  // Total
        tablaFacturas.getColumnModel().getColumn(6).setPreferredWidth(120); // Forma Pago
        tablaFacturas.getColumnModel().getColumn(7).setPreferredWidth(80);  // Estado

        // Configurar sorter
        sorter = new TableRowSorter<>(modeloTablaFacturas);
        tablaFacturas.setRowSorter(sorter);

        // Panel de detalle
        panelDetalle = new JPanel(new BorderLayout());
        panelDetalle.setBackground(UIConstants.WHITE);
        panelDetalle.setBorder(UIConstants.CARD_BORDER);

        lblDetalleFactura = new JLabel("Seleccione una factura para ver el detalle");
        lblDetalleFactura.setFont(UIConstants.EMOJI_FONT);
        lblDetalleFactura.setForeground(UIConstants.MEDIUM_GRAY);
        lblDetalleFactura.setHorizontalAlignment(SwingConstants.CENTER);
        lblDetalleFactura.setBorder(new EmptyBorder(20, 20, 20, 20));

        // Tabla de items
        String[] columnasItems = {"Producto", "Marca", "Cantidad", "Precio Unit.", "Subtotal"};
        modeloTablaItems = new DefaultTableModel(columnasItems, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };

        tablaItems = new JTable(modeloTablaItems);
        tablaItems.setFont(UIConstants.FONT_TABLE_DATA);
        tablaItems.getTableHeader().setFont(UIConstants.FONT_TABLE_HEADER);
        tablaItems.getTableHeader().setBackground(UIConstants.SUCCESS_COLOR);
        tablaItems.getTableHeader().setForeground(UIConstants.WHITE);
        tablaItems.setRowHeight(25);

        panelDetalle.add(lblDetalleFactura, BorderLayout.CENTER);
    }

    private void setupLayout() {
        setLayout(new BorderLayout(15, 15));
        setBorder(new EmptyBorder(0, 0, 0, 0));

        // Panel principal con scroll
        JPanel mainPanel = new JPanel(new BorderLayout(15, 15));
        mainPanel.setBackground(UIConstants.BACKGROUND_MAIN);

        // Panel superior - Filtros y búsqueda
        JPanel filtrosPanel = createFiltrosPanel();

        // Panel central - Tabla de facturas
        JPanel facturasPanel = createFacturasPanel();

        // Panel inferior - Detalle de factura
        JPanel detallePanel = createDetallePanel();

        // Usar JSplitPane para dividir facturas y detalle
        JSplitPane splitPane = new JSplitPane(JSplitPane.VERTICAL_SPLIT, facturasPanel, detallePanel);
        splitPane.setResizeWeight(0.6); // 60% para facturas, 40% para detalle
        splitPane.setDividerLocation(400);
        splitPane.setBorder(null);

        mainPanel.add(filtrosPanel, BorderLayout.NORTH);
        mainPanel.add(splitPane, BorderLayout.CENTER);

        JScrollPane scrollPane = new JScrollPane(mainPanel);
        scrollPane.setBorder(null);
        scrollPane.getViewport().setBackground(UIConstants.BACKGROUND_MAIN);

        add(scrollPane, BorderLayout.CENTER);
    }

    private JPanel createFiltrosPanel() {
        JPanel panel = new JPanel(new BorderLayout());
        panel.setBackground(UIConstants.WHITE);
        panel.setBorder(UIConstants.CARD_BORDER);

        JLabel titulo = new JLabel("🔍 Filtros de Búsqueda");
        titulo.setFont(UIConstants.EMOJI_FONT);
        titulo.setForeground(UIConstants.DARK_GRAY);
        titulo.setBorder(new EmptyBorder(0, 0, 10, 0));

        JPanel formPanel = new JPanel(new GridBagLayout());
        formPanel.setBackground(UIConstants.WHITE);

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.anchor = GridBagConstraints.WEST;

        // Búsqueda por texto
        gbc.gridx = 0; gbc.gridy = 0;
        formPanel.add(new JLabel("Buscar:"), gbc);
        gbc.gridx = 1; gbc.fill = GridBagConstraints.HORIZONTAL; gbc.weightx = 0.4;
        txtBusqueda.setPreferredSize(new Dimension(200, 35));
        formPanel.add(txtBusqueda, gbc);

        // Filtro forma de pago
        gbc.gridx = 2; gbc.weightx = 0;
        formPanel.add(new JLabel("Forma de Pago:"), gbc);
        gbc.gridx = 3; gbc.weightx = 0.2;
        cmbFiltroFormaPago.setPreferredSize(new Dimension(150, 35));
        formPanel.add(cmbFiltroFormaPago, gbc);

        // Filtro estado
        gbc.gridx = 4; gbc.weightx = 0;
        formPanel.add(new JLabel("Estado:"), gbc);
        gbc.gridx = 5; gbc.weightx = 0.2;
        cmbFiltroEstado.setPreferredSize(new Dimension(120, 35));
        formPanel.add(cmbFiltroEstado, gbc);

        // Botones
        JPanel botonesPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT, 5, 5));
        botonesPanel.setBackground(UIConstants.WHITE);
        botonesPanel.add(btnBuscar);
        botonesPanel.add(btnLimpiar);
        botonesPanel.add(btnRefrescar);

        gbc.gridx = 6; gbc.weightx = 0; gbc.fill = GridBagConstraints.NONE;
        formPanel.add(botonesPanel, gbc);

        panel.add(titulo, BorderLayout.NORTH);
        panel.add(formPanel, BorderLayout.CENTER);

        return panel;
    }

    private JPanel createFacturasPanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBackground(UIConstants.WHITE);
        panel.setBorder(UIConstants.CARD_BORDER);

        JLabel titulo = new JLabel("📋 Lista de Facturas");
        titulo.setFont(UIConstants.EMOJI_FONT);
        titulo.setForeground(UIConstants.DARK_GRAY);

        // Scroll para la tabla
        JScrollPane scrollFacturas = new JScrollPane(tablaFacturas);
        scrollFacturas.setPreferredSize(new Dimension(0, 300));
        scrollFacturas.setBorder(UIConstants.INPUT_BORDER);

        panel.add(titulo, BorderLayout.NORTH);
        panel.add(scrollFacturas, BorderLayout.CENTER);

        return panel;
    }

    private JPanel createDetallePanel() {
        JPanel panel = new JPanel(new BorderLayout());
        panel.setBackground(UIConstants.WHITE);
        panel.setBorder(UIConstants.CARD_BORDER);

        JLabel titulo = new JLabel("📄 Detalle de Factura");
        titulo.setFont(UIConstants.EMOJI_FONT);
        titulo.setForeground(UIConstants.DARK_GRAY);
        titulo.setBorder(new EmptyBorder(0, 0, 10, 0));

        panel.add(titulo, BorderLayout.NORTH);
        panel.add(panelDetalle, BorderLayout.CENTER);

        return panel;
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
        btnRefrescar.addActionListener(e -> cargarFacturas());
        btnBuscar.addActionListener(e -> aplicarFiltros());
        btnLimpiar.addActionListener(e -> limpiarFiltros());

        // Selección en tabla de facturas
        tablaFacturas.getSelectionModel().addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting()) {
                int selectedRow = tablaFacturas.getSelectedRow();
                if (selectedRow != -1) {
                    int modelRow = tablaFacturas.convertRowIndexToModel(selectedRow);
                    int idFactura = (Integer) modeloTablaFacturas.getValueAt(modelRow, 0);
                    cargarDetalleFactura(idFactura);
                }
            }
        });

        // Doble clic para ver detalle completo
        tablaFacturas.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                if (e.getClickCount() == 2) {
                    int selectedRow = tablaFacturas.getSelectedRow();
                    if (selectedRow != -1) {
                        int modelRow = tablaFacturas.convertRowIndexToModel(selectedRow);
                        int idFactura = (Integer) modeloTablaFacturas.getValueAt(modelRow, 0);
                        mostrarDetalleCompleto(idFactura);
                    }
                }
            }
        });
    }

    // ========== MÉTODOS PRINCIPALES ==========

    private void cargarFacturas() {
        statusBar.setMessage("Cargando facturas...", StatusBar.MessageType.LOADING);

        clienteService.listarFacturasAsync()
                .thenAccept(result -> {
                    SwingUtilities.invokeLater(() -> {
                        if (result != null) {
                            facturas = result;
                            actualizarTablaFacturas();
                            statusBar.setMessage("Facturas cargadas: " + result.size(), StatusBar.MessageType.SUCCESS);
                        } else {
                            statusBar.setMessage("No se pudieron cargar las facturas", StatusBar.MessageType.ERROR);
                        }
                    });
                })
                .exceptionally(throwable -> {
                    SwingUtilities.invokeLater(() -> {
                        statusBar.setMessage("Error: " + throwable.getMessage(), StatusBar.MessageType.ERROR);
                    });
                    return null;
                });
    }

    private void cargarDetalleFactura(int idFactura) {
        statusBar.setMessage("Cargando detalle de factura...", StatusBar.MessageType.LOADING);

        clienteService.obtenerFacturaAsync(idFactura)
                .thenAccept(result -> {
                    SwingUtilities.invokeLater(() -> {
                        if (result != null && result.isEncontrada()) {
                            facturaSeleccionada = result.getFactura();
                            mostrarDetalle(facturaSeleccionada);
                            statusBar.setMessage("Detalle cargado", StatusBar.MessageType.SUCCESS);
                        } else {
                            statusBar.setMessage("Factura no encontrada", StatusBar.MessageType.ERROR);
                        }
                    });
                })
                .exceptionally(throwable -> {
                    SwingUtilities.invokeLater(() -> {
                        statusBar.setMessage("Error: " + throwable.getMessage(), StatusBar.MessageType.ERROR);
                    });
                    return null;
                });
    }

    private void aplicarFiltros() {
        String texto = txtBusqueda.getText().trim().toLowerCase();
        String formaPago = (String) cmbFiltroFormaPago.getSelectedItem();
        String estado = (String) cmbFiltroEstado.getSelectedItem();

        if (texto.isEmpty() && formaPago.contains("Todas") && estado.contains("Todos")) {
            sorter.setRowFilter(null);
            statusBar.setMessage("Filtros removidos", StatusBar.MessageType.SUCCESS);
            return;
        }

        RowFilter<DefaultTableModel, Object> filter = new RowFilter<DefaultTableModel, Object>() {
            @Override
            public boolean include(Entry<? extends DefaultTableModel, ? extends Object> entry) {
                boolean coincideTexto = true;
                boolean coincideFormaPago = true;
                boolean coincideEstado = true;

                if (!texto.isEmpty()) {
                    String numero = entry.getStringValue(1).toLowerCase();
                    String cliente = entry.getStringValue(2).toLowerCase();
                    String cedula = entry.getStringValue(3).toLowerCase();

                    coincideTexto = numero.contains(texto) ||
                            cliente.contains(texto) ||
                            cedula.contains(texto);
                }

                if (!formaPago.contains("Todas")) {
                    String formaPagoFactura = entry.getStringValue(6);
                    coincideFormaPago = formaPagoFactura.equals(formaPago);
                }

                if (!estado.contains("Todos")) {
                    String estadoFactura = entry.getStringValue(7);
                    coincideEstado = estadoFactura.contains(estado);
                }

                return coincideTexto && coincideFormaPago && coincideEstado;
            }
        };

        sorter.setRowFilter(filter);
        statusBar.setMessage("Filtros aplicados", StatusBar.MessageType.SUCCESS);
    }

    private void limpiarFiltros() {
        txtBusqueda.setText("");
        cmbFiltroFormaPago.setSelectedIndex(0);
        cmbFiltroEstado.setSelectedIndex(0);
        sorter.setRowFilter(null);
        statusBar.setMessage("Filtros limpiados", StatusBar.MessageType.SUCCESS);
    }

    private void mostrarDetalleCompleto(int idFactura) {
        // Crear ventana modal con detalle completo
        JDialog dialog = new JDialog(parentFrame, "Detalle de Factura #" + idFactura, true);
        dialog.setSize(600, 500);
        dialog.setLocationRelativeTo(parentFrame);

        JPanel content = new JPanel(new BorderLayout(10, 10));
        content.setBorder(new EmptyBorder(20, 20, 20, 20));
        content.setBackground(UIConstants.BACKGROUND_MAIN);

        if (facturaSeleccionada != null) {
            // Información de la factura
            JPanel infoPanel = createInfoFacturaPanel(facturaSeleccionada);

            // Tabla de items
            JScrollPane scrollItems = new JScrollPane(tablaItems);
            scrollItems.setPreferredSize(new Dimension(0, 200));

            content.add(infoPanel, BorderLayout.NORTH);
            content.add(scrollItems, BorderLayout.CENTER);

            JButton btnCerrar = createActionButton("Cerrar", UIConstants.PRIMARY_COLOR);
            btnCerrar.addActionListener(e -> dialog.dispose());

            JPanel buttonPanel = new JPanel(new FlowLayout());
            buttonPanel.setBackground(UIConstants.BACKGROUND_MAIN);
            buttonPanel.add(btnCerrar);
            content.add(buttonPanel, BorderLayout.SOUTH);
        }

        dialog.setContentPane(content);
        dialog.setVisible(true);
    }

    private JPanel createInfoFacturaPanel(Factura factura) {
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBackground(UIConstants.WHITE);
        panel.setBorder(UIConstants.CARD_BORDER);

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 10, 5, 10);
        gbc.anchor = GridBagConstraints.WEST;

        int row = 0;

        // Título
        gbc.gridx = 0; gbc.gridy = row++; gbc.gridwidth = 4;
        JLabel titulo = new JLabel("📄 " + factura.getNumeroFactura());
        titulo.setFont(UIConstants.FONT_SUBTITLE);
        titulo.setForeground(UIConstants.PRIMARY_COLOR);
        panel.add(titulo, gbc);

        gbc.gridwidth = 1;

        // Información del cliente
        gbc.gridx = 0; gbc.gridy = row;
        panel.add(new JLabel("Cliente:"), gbc);
        gbc.gridx = 1;
        panel.add(new JLabel(factura.getNombreCliente()), gbc);

        gbc.gridx = 2;
        panel.add(new JLabel("Cédula:"), gbc);
        gbc.gridx = 3;
        panel.add(new JLabel(factura.getCedulaCliente()), gbc);
        row++;

        // Fecha y estado
        gbc.gridx = 0; gbc.gridy = row;
        panel.add(new JLabel("Fecha:"), gbc);
        gbc.gridx = 1;
        panel.add(new JLabel(factura.getFechaFactura()), gbc);

        gbc.gridx = 2;
        panel.add(new JLabel("Estado:"), gbc);
        gbc.gridx = 3;
        JLabel lblEstado = new JLabel(factura.getEstadoTexto());
        lblEstado.setForeground("PAGADA".equals(factura.getEstado()) ?
                UIConstants.SUCCESS_COLOR : UIConstants.WARNING_COLOR);
        panel.add(lblEstado, gbc);
        row++;

        // Totales
        gbc.gridx = 0; gbc.gridy = row;
        panel.add(new JLabel("Subtotal:"), gbc);
        gbc.gridx = 1;
        panel.add(new JLabel(String.format("$%.2f", factura.getSubtotal())), gbc);

        gbc.gridx = 2;
        panel.add(new JLabel("Descuento:"), gbc);
        gbc.gridx = 3;
        panel.add(new JLabel(String.format("$%.2f", factura.getDescuento())), gbc);
        row++;

        gbc.gridx = 0; gbc.gridy = row;
        panel.add(new JLabel("Total:"), gbc);
        gbc.gridx = 1;
        JLabel lblTotal = new JLabel(String.format("$%.2f", factura.getTotal()));
        lblTotal.setFont(UIConstants.FONT_SUBTITLE);
        lblTotal.setForeground(UIConstants.PRIMARY_COLOR);
        panel.add(lblTotal, gbc);

        gbc.gridx = 2;
        panel.add(new JLabel("Forma de Pago:"), gbc);
        gbc.gridx = 3;
        panel.add(new JLabel(factura.getFormaPagoTexto()), gbc);
        row++;

        // Información de crédito si aplica
        if ("CREDITO_DIRECTO".equals(factura.getFormaPago())) {
            gbc.gridx = 0; gbc.gridy = row;
            panel.add(new JLabel("Crédito:"), gbc);
            gbc.gridx = 1; gbc.gridwidth = 3;
            panel.add(new JLabel(factura.getResumenCredito()), gbc);
        }

        return panel;
    }

    // ========== HELPERS ==========

    private void actualizarTablaFacturas() {
        modeloTablaFacturas.setRowCount(0);

        if (facturas != null) {
            for (Factura factura : facturas) {
                Object[] fila = {
                        factura.getIdFactura(),
                        factura.getNumeroFactura(),
                        factura.getNombreCliente(),
                        factura.getCedulaCliente(),
                        factura.getFechaFactura(),
                        String.format("$%.2f", factura.getTotal()),
                        factura.getFormaPagoTexto(),
                        factura.getEstadoTexto()
                };
                modeloTablaFacturas.addRow(fila);
            }
        }
    }

    private void mostrarDetalle(Factura factura) {
        panelDetalle.removeAll();

        // Panel con información de la factura
        JPanel infoPanel = createInfoFacturaPanel(factura);

        // Tabla de items
        actualizarTablaItems(factura.getItems());
        JScrollPane scrollItems = new JScrollPane(tablaItems);
        scrollItems.setPreferredSize(new Dimension(0, 150));
        scrollItems.setBorder(UIConstants.INPUT_BORDER);

        // Layout del panel de detalle
        JPanel contenido = new JPanel(new BorderLayout(10, 10));
        contenido.setBackground(UIConstants.WHITE);
        contenido.add(infoPanel, BorderLayout.NORTH);

//        if (!factura.getItems().isEmpty()) {
//            JLabel tituloItems = new JLabel("🛒 Items de la Factura");
//            tituloItems.setFont(UIConstants.EMOJI_FONT);
//            tituloItems.setForeground(UIConstants.DARK_GRAY);
//            tituloItems.setBorder(new EmptyBorder(10, 0, 5, 0));
//
//            JPanel itemsPanel = new JPanel(new BorderLayout());
//            itemsPanel.setBackground(UIConstants.WHITE);
//            itemsPanel.add(tituloItems, BorderLayout.NORTH);
//            itemsPanel.add(scrollItems, BorderLayout.CENTER);
//
//            contenido.add(itemsPanel, BorderLayout.CENTER);
//        }

        panelDetalle.add(contenido, BorderLayout.CENTER);
        panelDetalle.revalidate();
        panelDetalle.repaint();
    }

    private void actualizarTablaItems(List<ItemFactura> items) {
        modeloTablaItems.setRowCount(0);

        for (ItemFactura item : items) {
            Object[] fila = {
                    item.getNombre(),
                    item.getMarca(),
                    item.getCantidad(),
                    String.format("$%.2f", item.getPrecioUnitario()),
                    String.format("$%.2f", item.getSubtotal())
            };
            modeloTablaItems.addRow(fila);
        }
    }
}