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
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.List;
/**
 *
 * @author josue
 */
public class ProductosPanel extends JPanel {
    
    private ClienteUnificado clienteService;
    private StatusBar statusBar;
    
    private JTable tablaProductos;
    private DefaultTableModel modeloTabla;
    private JTextField txtBuscar;
    private JButton btnAgregar, btnEditar, btnEliminar, btnActualizar;
    private List<Electrodomestico> productos;
    
    public ProductosPanel(ClienteUnificado clienteService, StatusBar statusBar) {
        this.clienteService = clienteService;
        this.statusBar = statusBar;
        
        initializeComponents();
        setupLayout();
        setupEventHandlers();
        cargarProductos();
    }
    
    private void initializeComponents() {
        setBackground(UIConstants.BACKGROUND_MAIN);
        
        // Campo de búsqueda
        txtBuscar = new JTextField();
        txtBuscar.setFont(UIConstants.FONT_LABEL);
        txtBuscar.setBorder(BorderFactory.createCompoundBorder(
            UIConstants.INPUT_BORDER,
            BorderFactory.createEmptyBorder(8, 10, 8, 10)
        ));
        
        // Botones de acción
        btnAgregar = createActionButton("➕ Agregar", UIConstants.SUCCESS_COLOR);
        btnEditar = createActionButton("✏️ Editar", UIConstants.PRIMARY_COLOR);
        btnEliminar = createActionButton("🗑️ Eliminar", UIConstants.DANGER_COLOR);
        btnActualizar = createActionButton("🔄 Actualizar", UIConstants.INFO_COLOR);
        
        // Configuración inicial de botones
        btnEditar.setEnabled(false);
        btnEliminar.setEnabled(false);
        
        // Tabla de productos
        String[] columnas = {"ID", "Código", "Nombre", "Marca", "Precio", "Stock", "Estado"};
        modeloTabla = new DefaultTableModel(columnas, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        
        tablaProductos = new JTable(modeloTabla);
        tablaProductos.setFont(UIConstants.FONT_TABLE_DATA);
        tablaProductos.getTableHeader().setFont(UIConstants.FONT_TABLE_HEADER);
        tablaProductos.getTableHeader().setBackground(UIConstants.PRIMARY_COLOR);
        tablaProductos.getTableHeader().setForeground(UIConstants.WHITE);
        tablaProductos.setRowHeight(25);
        tablaProductos.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        tablaProductos.setGridColor(UIConstants.LIGHT_GRAY);
        tablaProductos.setSelectionBackground(UIConstants.PRIMARY_LIGHT);
        
        // Ajustar anchos de columnas
        tablaProductos.getColumnModel().getColumn(0).setPreferredWidth(50);  // ID
        tablaProductos.getColumnModel().getColumn(1).setPreferredWidth(80);  // Código
        tablaProductos.getColumnModel().getColumn(2).setPreferredWidth(200); // Nombre
        tablaProductos.getColumnModel().getColumn(3).setPreferredWidth(100); // Marca
        tablaProductos.getColumnModel().getColumn(4).setPreferredWidth(80);  // Precio
        tablaProductos.getColumnModel().getColumn(5).setPreferredWidth(60);  // Stock
        tablaProductos.getColumnModel().getColumn(6).setPreferredWidth(80);  // Estado
    }
    
    private void setupLayout() {
        setLayout(new BorderLayout(10, 10));
        setBorder(new EmptyBorder(0, 0, 0, 0));
        
        // Panel superior con búsqueda y botones
        JPanel topPanel = new JPanel(new BorderLayout(10, 10));
        topPanel.setBackground(UIConstants.BACKGROUND_MAIN);
        
        // Panel de búsqueda
        JPanel searchPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        searchPanel.setBackground(UIConstants.BACKGROUND_MAIN);
        
        JLabel lblBuscar = new JLabel("🔍 Buscar:");
        lblBuscar.setFont(UIConstants.FONT_LABEL);
        lblBuscar.setForeground(UIConstants.DARK_GRAY);
        lblBuscar.setFont(UIConstants.EMOJI_FONT);
        
        txtBuscar.setPreferredSize(new Dimension(250, 35));
        
        searchPanel.add(lblBuscar);
        searchPanel.add(Box.createHorizontalStrut(5));
        searchPanel.add(txtBuscar);
        
        // Panel de botones
        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        buttonPanel.setBackground(UIConstants.BACKGROUND_MAIN);
        
        buttonPanel.add(btnActualizar);
        buttonPanel.add(Box.createHorizontalStrut(5));
        buttonPanel.add(btnAgregar);
        buttonPanel.add(Box.createHorizontalStrut(5));
        buttonPanel.add(btnEditar);
        buttonPanel.add(Box.createHorizontalStrut(5));
        buttonPanel.add(btnEliminar);
        
        topPanel.add(searchPanel, BorderLayout.WEST);
        topPanel.add(buttonPanel, BorderLayout.EAST);
        
        // Panel central con tabla
        JScrollPane scrollPane = new JScrollPane(tablaProductos);
        scrollPane.setBorder(UIConstants.CARD_BORDER);
        scrollPane.getViewport().setBackground(UIConstants.WHITE);
        
        add(topPanel, BorderLayout.NORTH);
        add(scrollPane, BorderLayout.CENTER);
        
        // Panel inferior con información
        JPanel infoPanel = createInfoPanel();
        add(infoPanel, BorderLayout.SOUTH);
    }
    
    private JPanel createInfoPanel() {
        JPanel panel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        panel.setBackground(UIConstants.BACKGROUND_MAIN);
        panel.setBorder(new EmptyBorder(5, 0, 0, 0));
        
        JLabel infoLabel = new JLabel("💡 Haga doble clic en una fila para ver detalles");
        infoLabel.setFont(UIConstants.EMOJI_FONT);
        infoLabel.setForeground(UIConstants.MEDIUM_GRAY);
        
        panel.add(infoLabel);
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
        
        // Efectos hover
        button.addMouseListener(new MouseAdapter() {
            public void mouseEntered(MouseEvent evt) {
                button.setBackground(UIConstants.darkerColor(backgroundColor, 0.8f));
            }
            public void mouseExited(MouseEvent evt) {
                button.setBackground(backgroundColor);
            }
        });
        
        return button;
    }
    
    private void setupEventHandlers() {
        // Selección en tabla
        tablaProductos.getSelectionModel().addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting()) {
                boolean hasSelection = tablaProductos.getSelectedRow() != -1;
                btnEditar.setEnabled(hasSelection);
                btnEliminar.setEnabled(hasSelection);
            }
        });
        
        // Doble clic para ver detalles
        tablaProductos.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                if (e.getClickCount() == 2 && tablaProductos.getSelectedRow() != -1) {
                    verDetalles();
                }
            }
        });
        
        // Búsqueda en tiempo real
        txtBuscar.addKeyListener(new java.awt.event.KeyAdapter() {
            public void keyReleased(java.awt.event.KeyEvent evt) {
                filtrarProductos(txtBuscar.getText());
            }
        });
        
        // Eventos de botones
        btnActualizar.addActionListener(e -> cargarProductos());
        btnAgregar.addActionListener(e -> agregarProducto());
        btnEditar.addActionListener(e -> editarProducto());
        btnEliminar.addActionListener(e -> eliminarProducto());
    }
    
    // ========== ACCIONES ==========
    
    private void cargarProductos() {
        statusBar.setLoading("Cargando productos...");
        btnActualizar.setEnabled(false);
        
        clienteService.listarElectrodomesticosAsync()
            .thenAccept(result -> {
                SwingUtilities.invokeLater(() -> {
                    if (result != null) {
                        this.productos = result;
                        actualizarTabla(result);
                        statusBar.setSuccess("Productos cargados: " + result.size());
                    } else {
                        statusBar.setError("No se pudieron cargar los productos");
                    }
                    btnActualizar.setEnabled(true);
                });
            })
            .exceptionally(throwable -> {
                SwingUtilities.invokeLater(() -> {
                    statusBar.setError("Error: " + throwable.getMessage());
                    btnActualizar.setEnabled(true);
                });
                return null;
            });
    }
    
    private void agregarProducto() {
        ProductoDialog dialog = new ProductoDialog(
            (Frame) SwingUtilities.getWindowAncestor(this),
            "Agregar Producto",
            null,
            clienteService
        );
        
        dialog.setVisible(true);
        
        if (dialog.isConfirmado()) {
            cargarProductos(); // Recargar lista
        }
    }
    
    private void editarProducto() {
        int selectedRow = tablaProductos.getSelectedRow();
        if (selectedRow == -1) return;
        
        Electrodomestico producto = obtenerProductoSeleccionado();
        if (producto == null) return;
        
        ProductoDialog dialog = new ProductoDialog(
            (Frame) SwingUtilities.getWindowAncestor(this),
            "Editar Producto",
            producto,
            clienteService
        );
        
        dialog.setVisible(true);
        
        if (dialog.isConfirmado()) {
            cargarProductos(); // Recargar lista
        }
    }
    
    private void eliminarProducto() {
        int selectedRow = tablaProductos.getSelectedRow();
        if (selectedRow == -1) return;
        
        Electrodomestico producto = obtenerProductoSeleccionado();
        if (producto == null) return;
        
        String mensaje = String.format(
            "¿Está seguro de eliminar el producto?\n\n" +
            "Código: %s\n" +
            "Nombre: %s\n" +
            "Marca: %s\n\n" +
            "Esta acción no se puede deshacer.",
            producto.getCodigo(),
            producto.getNombre(),
            producto.getMarca()
        );
        
        int option = MessageHelper.showConfirm(this, mensaje, "Confirmar Eliminación");
        
        if (option == JOptionPane.YES_OPTION) {
            statusBar.setLoading("Eliminando producto...");
            
            clienteService.eliminarElectrodomesticoAsync(producto.getIdElectrodomestico())
                .thenAccept(result -> {
                    SwingUtilities.invokeLater(() -> {
                        if (result != null && result.isExito()) {
                            statusBar.setSuccess("Producto eliminado correctamente");
                            cargarProductos();
                        } else {
                            String error = result != null ? result.getMensaje() : "Error desconocido";
                            statusBar.setError("Error al eliminar: " + error);
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
    }
    
    private void verDetalles() {
        Electrodomestico producto = obtenerProductoSeleccionado();
        if (producto == null) return;
        
        String detalles = String.format(
            "<html><body style='width: 300px; font-family: Segoe UI;'>" +
            "<h3 style='color: #2980B9; margin-bottom: 10px;'>%s</h3>" +
            "<p><b>Código:</b> %s</p>" +
            "<p><b>Marca:</b> %s</p>" +
            "<p><b>Precio:</b> $%.2f</p>" +
            "<p><b>Stock:</b> %d unidades</p>" +
            "<p><b>Estado:</b> %s</p>" +
            "<p><b>Descripción:</b><br>%s</p>" +
            "</body></html>",
            producto.getNombre(),
            producto.getCodigo(),
            producto.getMarca(),
            producto.getPrecioVenta(),
            producto.getStock(),
            producto.getEstado(),
            producto.getDescripcion() != null ? producto.getDescripcion() : "Sin descripción"
        );
        
        MessageHelper.showInfo(this, detalles);
    }
    
    // ========== HELPERS ==========
    
    private void actualizarTabla(List<Electrodomestico> productos) {
        modeloTabla.setRowCount(0);
        
        for (Electrodomestico producto : productos) {
            Object[] fila = {
                producto.getIdElectrodomestico(),
                producto.getCodigo(),
                producto.getNombre(),
                producto.getMarca(),
                String.format("$%.2f", producto.getPrecioVenta()),
                producto.getStock(),
                producto.getEstado()
            };
            modeloTabla.addRow(fila);
        }
    }
    
    private void filtrarProductos(String filtro) {
        if (productos == null) return;
        
        if (filtro == null || filtro.trim().isEmpty()) {
            actualizarTabla(productos);
            return;
        }
        
        String filtroLower = filtro.toLowerCase();
        List<Electrodomestico> filtrados = productos.stream()
            .filter(p -> 
                p.getNombre().toLowerCase().contains(filtroLower) ||
                p.getCodigo().toLowerCase().contains(filtroLower) ||
                p.getMarca().toLowerCase().contains(filtroLower)
            )
            .toList();
            
        actualizarTabla(filtrados);
    }
    
    private Electrodomestico obtenerProductoSeleccionado() {
        int selectedRow = tablaProductos.getSelectedRow();
        if (selectedRow == -1 || productos == null) return null;
        
        // Obtener ID de la tabla
        int id = (Integer) modeloTabla.getValueAt(selectedRow, 0);
        
        // Buscar el producto por ID
        return productos.stream()
            .filter(p -> p.getIdElectrodomestico() == id)
            .findFirst()
            .orElse(null);
    }
}

/**
 * Diálogo para agregar/editar productos
 */
class ProductoDialog extends JDialog {
    private Electrodomestico producto;
    private ClienteUnificado clienteService;
    private boolean confirmado = false;
    
    // Componentes del formulario
    private JTextField txtCodigo, txtNombre, txtDescripcion, txtMarca, txtPrecio, txtStock;
    private JComboBox<String> cmbEstado;
    private JButton btnGuardar, btnCancelar;
    
    public ProductoDialog(Frame parent, String title, Electrodomestico producto, ClienteUnificado clienteService) {
        super(parent, title, true);
        this.producto = producto;
        this.clienteService = clienteService;
        
        initializeComponents();
        setupLayout();
        setupEventHandlers();
        
        if (producto != null) {
            cargarDatos();
        }
        
        setSize(500, 400);
        setLocationRelativeTo(parent);
    }
    
    private void initializeComponents() {
        txtCodigo = new JTextField();
        txtNombre = new JTextField();
        txtDescripcion = new JTextField();
        txtMarca = new JTextField();
        txtPrecio = new JTextField();
        txtStock = new JTextField();
        
        cmbEstado = new JComboBox<>(new String[]{"DISPONIBLE", "INACTIVO"});
        
        btnGuardar = MessageHelper.createStyledButton("💾 Guardar", UIConstants.SUCCESS_COLOR);
        btnCancelar = MessageHelper.createStyledButton("❌ Cancelar", UIConstants.MEDIUM_GRAY);
    }
    
    private void setupLayout() {
        setLayout(new BorderLayout());
        
        JPanel formPanel = new JPanel(new GridBagLayout());
        formPanel.setBorder(new EmptyBorder(20, 20, 20, 20));
        formPanel.setBackground(UIConstants.WHITE);
        
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.fill = GridBagConstraints.HORIZONTAL;
        
        // Formulario
        addFormField(formPanel, gbc, 0, "Código:", txtCodigo);
        addFormField(formPanel, gbc, 1, "Nombre:", txtNombre);
        addFormField(formPanel, gbc, 2, "Descripción:", txtDescripcion);
        addFormField(formPanel, gbc, 3, "Marca:", txtMarca);
        addFormField(formPanel, gbc, 4, "Precio:", txtPrecio);
        addFormField(formPanel, gbc, 5, "Stock:", txtStock);
        addFormField(formPanel, gbc, 6, "Estado:", cmbEstado);
        
        // Panel de botones
        JPanel buttonPanel = new JPanel(new FlowLayout());
        buttonPanel.setBackground(UIConstants.LIGHT_GRAY);
        buttonPanel.add(btnCancelar);
        buttonPanel.add(btnGuardar);
        
        add(formPanel, BorderLayout.CENTER);
        add(buttonPanel, BorderLayout.SOUTH);
    }
    
    private void addFormField(JPanel parent, GridBagConstraints gbc, int row, String label, JComponent field) {
        gbc.gridx = 0;
        gbc.gridy = row;
        gbc.weightx = 0;
        
        JLabel lbl = new JLabel(label);
        lbl.setFont(UIConstants.FONT_LABEL);
        parent.add(lbl, gbc);
        
        gbc.gridx = 1;
        gbc.weightx = 1;
        field.setFont(UIConstants.FONT_LABEL);
        parent.add(field, gbc);
    }
    
    private void setupEventHandlers() {
        btnGuardar.addActionListener(e -> guardar());
        btnCancelar.addActionListener(e -> dispose());
    }
    
    private void cargarDatos() {
        txtCodigo.setText(producto.getCodigo());
        txtNombre.setText(producto.getNombre());
        txtDescripcion.setText(producto.getDescripcion());
        txtMarca.setText(producto.getMarca());
        txtPrecio.setText(String.valueOf(producto.getPrecioVenta()));
        txtStock.setText(String.valueOf(producto.getStock()));
        cmbEstado.setSelectedItem(producto.getEstado());
    }
    
    private void guardar() {
        if (!validarCampos()) return;
        
        Electrodomestico prod = producto != null ? producto : new Electrodomestico();
        prod.setCodigo(txtCodigo.getText().trim());
        prod.setNombre(txtNombre.getText().trim());
        prod.setDescripcion(txtDescripcion.getText().trim());
        prod.setMarca(txtMarca.getText().trim());
        prod.setPrecioVenta(Double.parseDouble(txtPrecio.getText().trim()));
        prod.setStock(Integer.parseInt(txtStock.getText().trim()));
        prod.setEstado((String) cmbEstado.getSelectedItem());
        
        if (producto == null) {
            // Crear nuevo
            clienteService.crearElectrodomesticoAsync(prod)
                .thenAccept(result -> {
                    SwingUtilities.invokeLater(() -> {
                        if (result != null && result.isExito()) {
                            confirmado = true;
                            dispose();
                        } else {
                            String error = result != null ? result.getMensaje() : "Error desconocido";
                            MessageHelper.showError(this, "Error al crear: " + error);
                        }
                    });
                })
                .exceptionally(throwable -> {
                    SwingUtilities.invokeLater(() -> {
                        MessageHelper.showError(this, "Error: " + throwable.getMessage());
                    });
                    return null;
                });
        } else {
            // Actualizar existente
            clienteService.actualizarElectrodomesticoAsync(producto.getIdElectrodomestico(), prod)
                .thenAccept(result -> {
                    SwingUtilities.invokeLater(() -> {
                        if (result != null && result.isExito()) {
                            confirmado = true;
                            dispose();
                        } else {
                            String error = result != null ? result.getMensaje() : "Error desconocido";
                            MessageHelper.showError(this, "Error al actualizar: " + error);
                        }
                    });
                })
                .exceptionally(throwable -> {
                    SwingUtilities.invokeLater(() -> {
                        MessageHelper.showError(this, "Error: " + throwable.getMessage());
                    });
                    return null;
                });
        }
    }
    
    private boolean validarCampos() {
        if (txtCodigo.getText().trim().isEmpty()) {
            MessageHelper.showWarning(this, "El código es requerido");
            return false;
        }
        if (txtNombre.getText().trim().isEmpty()) {
            MessageHelper.showWarning(this, "El nombre es requerido");
            return false;
        }
        try {
            double precio = Double.parseDouble(txtPrecio.getText().trim());
            if (precio <= 0) {
                MessageHelper.showWarning(this, "El precio debe ser mayor a 0");
                return false;
            }
        } catch (NumberFormatException e) {
            MessageHelper.showWarning(this, "El precio debe ser un número válido");
            return false;
        }
        try {
            int stock = Integer.parseInt(txtStock.getText().trim());
            if (stock < 0) {
                MessageHelper.showWarning(this, "El stock no puede ser negativo");
                return false;
            }
        } catch (NumberFormatException e) {
            MessageHelper.showWarning(this, "El stock debe ser un número entero válido");
            return false;
        }
        return true;
    }
    
    public boolean isConfirmado() {
        return confirmado;
    }
}