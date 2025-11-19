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
/**
 *
 * @author josue
 */
public class CreditoPanel extends JPanel {
    
    private ClienteUnificado clienteService;
    private StatusBar statusBar;
    
    // Componentes de validación
    private JTextField txtCedulaValidacion;
    private JButton btnValidarCredito, btnMontoMaximo;
    private JTextArea txtResultadoValidacion;
    
    // Componentes de tabla de amortización
    private JTextField txtIdCredito;
    private JButton btnVerTabla;
    private JTable tablaAmortizacion;
    private DefaultTableModel modeloTabla;
    private JLabel lblInfoCredito;
    
    public CreditoPanel(ClienteUnificado clienteService, StatusBar statusBar) {
        this.clienteService = clienteService;
        this.statusBar = statusBar;
        
        initializeComponents();
        setupLayout();
        setupEventHandlers();
    }

    public void cargarTablaAmortizacion(int idCredito) {
        SwingUtilities.invokeLater(() -> {
            // Establecer el ID en el campo correspondiente
            txtIdCredito.setText(String.valueOf(idCredito));

            // Ejecutar la consulta automáticamente
            verTablaAmortizacion();

            // Mostrar mensaje informativo
            statusBar.setSuccess("Mostrando tabla de amortización del crédito #" + idCredito);
        });
    }


    private void initializeComponents() {
        setBackground(UIConstants.BACKGROUND_MAIN);
        
        // Validación de crédito
        txtCedulaValidacion = new JTextField();
        txtCedulaValidacion.setFont(UIConstants.FONT_LABEL);
        txtCedulaValidacion.setBorder(BorderFactory.createCompoundBorder(
            UIConstants.INPUT_BORDER,
            BorderFactory.createEmptyBorder(8, 10, 8, 10)
        ));
        
        btnValidarCredito = createActionButton("✅ Validar Sujeto Crédito", UIConstants.PRIMARY_COLOR);
        btnMontoMaximo = createActionButton("💰 Consultar Monto Máximo", UIConstants.INFO_COLOR);
        
        txtResultadoValidacion = new JTextArea(4, 30);
        txtResultadoValidacion.setFont(UIConstants.FONT_LABEL);
        txtResultadoValidacion.setEditable(false);
        txtResultadoValidacion.setBackground(UIConstants.LIGHT_GRAY);
        txtResultadoValidacion.setBorder(BorderFactory.createCompoundBorder(
            UIConstants.INPUT_BORDER,
            BorderFactory.createEmptyBorder(10, 10, 10, 10)
        ));
        
        // Tabla de amortización
        txtIdCredito = new JTextField();
        txtIdCredito.setFont(UIConstants.FONT_LABEL);
        txtIdCredito.setBorder(BorderFactory.createCompoundBorder(
            UIConstants.INPUT_BORDER,
            BorderFactory.createEmptyBorder(8, 10, 8, 10)
        ));
        
        btnVerTabla = createActionButton("📊 Ver Tabla Amortización", UIConstants.SUCCESS_COLOR);
        
        lblInfoCredito = new JLabel(" ");
        lblInfoCredito.setFont(UIConstants.FONT_LABEL);
        lblInfoCredito.setForeground(UIConstants.DARK_GRAY);
        
        // Tabla
        String[] columnas = {"#", "Valor Cuota", "Interés", "Capital", "Saldo", "Vencimiento"};
        modeloTabla = new DefaultTableModel(columnas, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        
        tablaAmortizacion = new JTable(modeloTabla);
        tablaAmortizacion.setFont(UIConstants.FONT_TABLE_DATA);
        tablaAmortizacion.getTableHeader().setFont(UIConstants.FONT_TABLE_HEADER);
        tablaAmortizacion.getTableHeader().setBackground(UIConstants.PRIMARY_COLOR);
        tablaAmortizacion.getTableHeader().setForeground(UIConstants.WHITE);
        tablaAmortizacion.setRowHeight(25);
        tablaAmortizacion.setGridColor(UIConstants.LIGHT_GRAY);
    }

    private void setupLayout() {
        setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        gbc.fill = GridBagConstraints.BOTH;
        
        // Panel de validación
        JPanel validacionPanel = createValidacionPanel();
        gbc.gridx = 0; gbc.gridy = 0; gbc.weightx = 1.0; gbc.weighty = 0.4;
        add(validacionPanel, gbc);
        
        // Panel de tabla de amortización
        JPanel tablaPanel = createTablaPanel();
        gbc.gridy = 1; gbc.weighty = 0.6;
        add(tablaPanel, gbc);
    }
    
    private JPanel createValidacionPanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBackground(UIConstants.WHITE);
        panel.setBorder(UIConstants.CARD_BORDER);
        
        JLabel titulo = new JLabel("🔍 Validación de Crédito");
        titulo.setFont(UIConstants.EMOJI_FONT);
        titulo.setForeground(UIConstants.DARK_GRAY);
        
        // Panel de entrada
        JPanel inputPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        inputPanel.setBackground(UIConstants.WHITE);
        
        inputPanel.add(new JLabel("Cédula:"));
        txtCedulaValidacion.setPreferredSize(new Dimension(150, 35));
        inputPanel.add(txtCedulaValidacion);
        inputPanel.add(btnValidarCredito);
        inputPanel.add(btnMontoMaximo);
        
        // Panel de resultado
        JScrollPane scrollResultado = new JScrollPane(txtResultadoValidacion);
        scrollResultado.setBorder(UIConstants.INPUT_BORDER);
        
        panel.add(titulo, BorderLayout.NORTH);
        panel.add(inputPanel, BorderLayout.CENTER);
        panel.add(scrollResultado, BorderLayout.SOUTH);
        
        return panel;
    }
    
    private JPanel createTablaPanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBackground(UIConstants.WHITE);
        panel.setBorder(UIConstants.CARD_BORDER);
        
        JLabel titulo = new JLabel("📊 Tabla de Amortización");
        titulo.setFont(UIConstants.EMOJI_FONT);
        titulo.setForeground(UIConstants.DARK_GRAY);
        
        // Panel de entrada
        JPanel inputPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        inputPanel.setBackground(UIConstants.WHITE);
        
        inputPanel.add(new JLabel("ID Crédito:"));
        txtIdCredito.setPreferredSize(new Dimension(100, 35));
        inputPanel.add(txtIdCredito);
        inputPanel.add(btnVerTabla);
        
        // Panel superior
        JPanel topPanel = new JPanel(new BorderLayout());
        topPanel.setBackground(UIConstants.WHITE);
        topPanel.add(titulo, BorderLayout.NORTH);
        topPanel.add(inputPanel, BorderLayout.CENTER);
        topPanel.add(lblInfoCredito, BorderLayout.SOUTH);
        
        // Tabla
        JScrollPane scrollTabla = new JScrollPane(tablaAmortizacion);
        scrollTabla.setBorder(UIConstants.INPUT_BORDER);
        
        panel.add(topPanel, BorderLayout.NORTH);
        panel.add(scrollTabla, BorderLayout.CENTER);
        
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
        btnValidarCredito.addActionListener(e -> validarSujetoCredito());
        btnMontoMaximo.addActionListener(e -> consultarMontoMaximo());
        btnVerTabla.addActionListener(e -> verTablaAmortizacion());
        
        // Enter en campos de texto
        txtCedulaValidacion.addActionListener(e -> validarSujetoCredito());
        txtIdCredito.addActionListener(e -> verTablaAmortizacion());
    }
    
    // ========== ACCIONES ==========
    
    private void validarSujetoCredito() {
        String cedula = txtCedulaValidacion.getText().trim();
        if (cedula.isEmpty()) {
            MessageHelper.showWarning(this, "Ingrese la cédula a consultar");
            return;
        }
        
        statusBar.setLoading("Validando sujeto de crédito...");
        txtResultadoValidacion.setText("Consultando en BanQuito...");
        
        clienteService.validarSujetoCreditoAsync(cedula)
            .thenAccept(result -> {
                SwingUtilities.invokeLater(() -> {
                    if (result != null) {
                        StringBuilder texto = new StringBuilder();
                        texto.append("RESULTADO DE VALIDACIÓN\n");
                        texto.append("Cédula: ").append(cedula).append("\n");
                        texto.append("Estado: ").append(result.isSujetoCredito() ? "✅ APROBADO" : "❌ RECHAZADO").append("\n");
                        texto.append("Mensaje: ").append(result.getMensaje()).append("\n");
                        if (result.getIdCliente() > 0) {
                            texto.append("ID Cliente: ").append(result.getIdCliente());
                        }
                        txtResultadoValidacion.setText(texto.toString());
                        
                        if (result.isSujetoCredito()) {
                            statusBar.setSuccess("Cliente aprobado para crédito");
                        } else {
                            statusBar.setWarning("Cliente no aprobado para crédito");
                        }
                    } else {
                        txtResultadoValidacion.setText("Error al consultar el servicio");
                        statusBar.setError("Error al validar cliente");
                    }
                });
            })
            .exceptionally(throwable -> {
                SwingUtilities.invokeLater(() -> {
                    txtResultadoValidacion.setText("Error de conexión: " + throwable.getMessage());
                    statusBar.setError("Error de conexión");
                });
                return null;
            });
    }
    
    private void consultarMontoMaximo() {
        String cedula = txtCedulaValidacion.getText().trim();
        if (cedula.isEmpty()) {
            MessageHelper.showWarning(this, "Ingrese la cédula a consultar");
            return;
        }
        
        statusBar.setLoading("Consultando monto máximo...");
        txtResultadoValidacion.setText("Calculando monto máximo de crédito...");
        
        clienteService.obtenerMontoMaximoAsync(cedula)
            .thenAccept(result -> {
                SwingUtilities.invokeLater(() -> {
                    if (result != null) {
                        StringBuilder texto = new StringBuilder();
                        texto.append("CONSULTA DE MONTO MÁXIMO\n");
                        texto.append("Cédula: ").append(cedula).append("\n");
                        texto.append("Estado: ").append(result.isAprobado() ? "✅ APROBADO" : "❌ RECHAZADO").append("\n");
                        
                        if (result.isAprobado()) {
                            texto.append("Monto máximo: $").append(String.format("%.2f", result.getMontoMaximo())).append("\n");
                        }
                        
                        texto.append("Mensaje: ").append(result.getMensaje());
                        
                        txtResultadoValidacion.setText(texto.toString());
                        statusBar.setSuccess("Consulta de monto máximo completada");
                    } else {
                        txtResultadoValidacion.setText("Error al consultar el servicio");
                        statusBar.setError("Error al consultar monto máximo");
                    }
                });
            })
            .exceptionally(throwable -> {
                SwingUtilities.invokeLater(() -> {
                    txtResultadoValidacion.setText("Error de conexión: " + throwable.getMessage());
                    statusBar.setError("Error de conexión");
                });
                return null;
            });
    }
    
    public void verTablaAmortizacion() {
        String idTexto = txtIdCredito.getText().trim();
        if (idTexto.isEmpty()) {
            MessageHelper.showWarning(this, "Ingrese el ID del crédito");
            return;
        }
        
        int idCredito;
        try {
            idCredito = Integer.parseInt(idTexto);
        } catch (NumberFormatException e) {
            MessageHelper.showWarning(this, "El ID del crédito debe ser un número válido");
            return;
        }
        
        statusBar.setLoading("Obteniendo tabla de amortización...");
        modeloTabla.setRowCount(0);
        lblInfoCredito.setText("Consultando...");
        
        clienteService.obtenerTablaAmortizacionAsync(idCredito)
            .thenAccept(result -> {
                SwingUtilities.invokeLater(() -> {
                    if (result != null && result.isEncontrado()) {
                        // Actualizar información del crédito
                        String info = String.format(
                            "Crédito #%d - Monto: $%.2f - Tasa: %.1f%% - Cuotas: %d",
                            result.getIdCredito(),
                            result.getMontoCredito(),
                            result.getTasaInteres() * 100,
                            result.getNumeroCuotas()
                        );
                        lblInfoCredito.setText(info);
                        
                        // Actualizar tabla
                        modeloTabla.setRowCount(0);
                        for (CuotaAmortizacion cuota : result.getCuotas()) {
                            Object[] fila = {
                                cuota.getNumeroCuota(),
                                String.format("$%.2f", cuota.getValorCuota()),
                                String.format("$%.2f", cuota.getInteresPagado()),
                                String.format("$%.2f", cuota.getCapitalPagado()),
                                String.format("$%.2f", cuota.getSaldo()),
                                cuota.getFechaVencimiento()
                            };
                            modeloTabla.addRow(fila);
                        }
                        
                        statusBar.setSuccess("Tabla de amortización cargada");
                    } else {
                        lblInfoCredito.setText("No se encontró información del crédito");
                        modeloTabla.setRowCount(0);
                        String mensaje = result != null ? result.getMensaje() : "Crédito no encontrado";
                        statusBar.setWarning(mensaje);
                        MessageHelper.showWarning(this, mensaje);
                    }
                });
            })
            .exceptionally(throwable -> {
                SwingUtilities.invokeLater(() -> {
                    lblInfoCredito.setText("Error al obtener información");
                    modeloTabla.setRowCount(0);
                    statusBar.setError("Error de conexión");
                    MessageHelper.showError(this, "Error: " + throwable.getMessage());
                });
                return null;
            });
    }
}