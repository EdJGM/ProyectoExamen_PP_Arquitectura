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
public class ConectividadPanel extends JPanel {
    
    private ClienteUnificado clienteService;
    private StatusBar statusBar;
    
    // Componentes de estado
    private JLabel lblEstadoComercializadora, lblEstadoBanquito, lblProtocoloActual;
    private JButton btnProbarConexiones, btnCambiarREST, btnCambiarSOAP;
    private JTextArea txtLogConexiones;
    private JProgressBar progressBar;
    
    // Timer para actualizaciones automáticas
    private Timer timer;
    
    public ConectividadPanel(ClienteUnificado clienteService, StatusBar statusBar) {
        this.clienteService = clienteService;
        this.statusBar = statusBar;
        
        initializeComponents();
        setupLayout();
        setupEventHandlers();
        iniciarActualizacionAutomatica();
        actualizarEstado();
    }
    
    private void initializeComponents() {
        setBackground(UIConstants.BACKGROUND_MAIN);
        
        // Etiquetas de estado
        lblProtocoloActual = createStatusLabel("Protocolo: " + clienteService.getProtocoloActual().name());
        lblEstadoComercializadora = createStatusLabel("🔴 Comercializadora: Desconectado");
        lblEstadoBanquito = createStatusLabel("🔴 BanQuito: Desconectado");
        
        // Botones
        btnProbarConexiones = createActionButton("🔄 Probar Conexiones", UIConstants.PRIMARY_COLOR);
        btnCambiarREST = createActionButton("REST (Java)", UIConstants.PRIMARY_COLOR);
        btnCambiarSOAP = createActionButton("SOAP (.NET)", UIConstants.SECONDARY_COLOR);
        
        // Actualizar estado de botones según protocolo actual
        actualizarBotonesProtocolo();
        
        // Log de conexiones
        txtLogConexiones = new JTextArea(10, 40);
        txtLogConexiones.setFont(UIConstants.FONT_STATUS);
        txtLogConexiones.setEditable(false);
        txtLogConexiones.setBackground(UIConstants.DARK_GRAY);
        txtLogConexiones.setForeground(UIConstants.WHITE);
        txtLogConexiones.setBorder(BorderFactory.createCompoundBorder(
            UIConstants.INPUT_BORDER,
            BorderFactory.createEmptyBorder(10, 10, 10, 10)
        ));
        
        // Progress bar
        progressBar = new JProgressBar();
        progressBar.setStringPainted(true);
        progressBar.setString("Listo");
        progressBar.setVisible(false);
        
        // Agregar mensaje inicial al log
        agregarLogMensaje("Sistema iniciado - Protocolo: " + clienteService.getProtocoloActual().name());
    }
    
    private void setupLayout() {
        setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        gbc.fill = GridBagConstraints.BOTH;
        
        // Panel de estado
        JPanel estadoPanel = createEstadoPanel();
        gbc.gridx = 0; gbc.gridy = 0; gbc.weightx = 1.0; gbc.weighty = 0.3;
        add(estadoPanel, gbc);
        
        // Panel de protocolos
        JPanel protocolosPanel = createProtocolosPanel();
        gbc.gridy = 1; gbc.weighty = 0.2;
        add(protocolosPanel, gbc);
        
        // Panel de log
        JPanel logPanel = createLogPanel();
        gbc.gridy = 2; gbc.weighty = 0.5;
        add(logPanel, gbc);
    }
    
    private JPanel createEstadoPanel() {
        JPanel panel = new JPanel(new GridLayout(1, 3, 15, 15));
        panel.setBackground(UIConstants.BACKGROUND_MAIN);
        
        // Card de protocolo
        JPanel protocoloCard = createStatusCard("🔧 Protocolo Actual", lblProtocoloActual);
        
        // Card de comercializadora
        JPanel comercializadoraCard = createStatusCard("🏪 Comercializadora", lblEstadoComercializadora);
        
        // Card de BanQuito
        JPanel banquitoCard = createStatusCard("🏦 BanQuito Core", lblEstadoBanquito);
        
        panel.add(protocoloCard);
        panel.add(comercializadoraCard);
        panel.add(banquitoCard);
        
        return panel;
    }
    
    private JPanel createProtocolosPanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBackground(UIConstants.WHITE);
        panel.setBorder(UIConstants.CARD_BORDER);
        
        JLabel titulo = new JLabel("⚙️ Configuración de Protocolos");
        titulo.setFont(UIConstants.EMOJI_FONT);
        titulo.setForeground(UIConstants.DARK_GRAY);
        
        JPanel botonesPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 15, 10));
        botonesPanel.setBackground(UIConstants.WHITE);
        
        botonesPanel.add(btnCambiarREST);
        botonesPanel.add(btnCambiarSOAP);
        botonesPanel.add(new JLabel(" | "));
        botonesPanel.add(btnProbarConexiones);
        
        JPanel progressPanel = new JPanel(new BorderLayout());
        progressPanel.setBackground(UIConstants.WHITE);
        progressPanel.add(progressBar, BorderLayout.CENTER);
        
        panel.add(titulo, BorderLayout.NORTH);
        panel.add(botonesPanel, BorderLayout.CENTER);
        panel.add(progressPanel, BorderLayout.SOUTH);
        
        return panel;
    }
    
    private JPanel createLogPanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBackground(UIConstants.WHITE);
        panel.setBorder(UIConstants.CARD_BORDER);
        
        JLabel titulo = new JLabel("📝 Log de Conexiones");
        titulo.setFont(UIConstants.EMOJI_FONT);
        titulo.setForeground(UIConstants.DARK_GRAY);
        
        JScrollPane scrollLog = new JScrollPane(txtLogConexiones);
        scrollLog.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);
        
        panel.add(titulo, BorderLayout.NORTH);
        panel.add(scrollLog, BorderLayout.CENTER);
        
        return panel;
    }
    
    private JPanel createStatusCard(String titulo, JLabel statusLabel) {
        JPanel card = new JPanel(new BorderLayout(10, 10));
        card.setBackground(UIConstants.WHITE);
        card.setBorder(UIConstants.CARD_BORDER);
        
        JLabel lblTitulo = new JLabel(titulo);
        lblTitulo.setFont(UIConstants.EMOJI_FONT);
        lblTitulo.setForeground(UIConstants.MEDIUM_GRAY);
        lblTitulo.setHorizontalAlignment(SwingConstants.CENTER);
        
        statusLabel.setHorizontalAlignment(SwingConstants.CENTER);
        
        card.add(lblTitulo, BorderLayout.NORTH);
        card.add(statusLabel, BorderLayout.CENTER);
        
        return card;
    }
    
    private JLabel createStatusLabel(String texto) {
        JLabel label = new JLabel(texto);
        label.setFont(UIConstants.EMOJI_FONT);
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
        btnProbarConexiones.addActionListener(e -> probarConexiones());
        btnCambiarREST.addActionListener(e -> cambiarProtocolo(ClienteUnificado.TipoProtocolo.REST));
        btnCambiarSOAP.addActionListener(e -> cambiarProtocolo(ClienteUnificado.TipoProtocolo.SOAP));
    }
    
    private void iniciarActualizacionAutomatica() {
        // Actualizar cada 30 segundos
        timer = new Timer(30000, e -> actualizarEstado());
        timer.start();
    }
    
    // ========== ACCIONES ==========
    
    public void actualizarEstado() {
        SwingUtilities.invokeLater(() -> {
            lblProtocoloActual.setText("Protocolo: " + clienteService.getProtocoloActual().name());
            actualizarBotonesProtocolo();
        });
        
        probarConexionesAutomatico();
    }
    
    private void probarConexiones() {
        btnProbarConexiones.setEnabled(false);
        progressBar.setVisible(true);
        progressBar.setIndeterminate(true);
        progressBar.setString("Probando conexiones...");
        
        agregarLogMensaje("Iniciando prueba de conexiones...");
        statusBar.setLoading("Probando conectividad de servicios...");
        
        clienteService.probarConectividadAsync()
            .thenAccept(resultado -> {
                SwingUtilities.invokeLater(() -> {
                    actualizarEstadoConexiones(resultado);
                    btnProbarConexiones.setEnabled(true);
                    progressBar.setVisible(false);
                    
                    if (resultado) {
                        statusBar.setSuccess("Todas las conexiones están activas");
                        agregarLogMensaje("✅ Todas las conexiones están funcionando correctamente");
                    } else {
                        statusBar.setWarning("Algunos servicios no están disponibles");
                        agregarLogMensaje("⚠️ Algunos servicios no están disponibles");
                    }
                });
            })
            .exceptionally(throwable -> {
                SwingUtilities.invokeLater(() -> {
                    actualizarEstadoConexiones(false);
                    btnProbarConexiones.setEnabled(true);
                    progressBar.setVisible(false);
                    statusBar.setError("Error al probar conexiones");
                    agregarLogMensaje("❌ Error al probar conexiones: " + throwable.getMessage());
                });
                return null;
            });
    }
    
    private void probarConexionesAutomatico() {
        clienteService.probarConectividadAsync()
            .thenAccept(this::actualizarEstadoConexiones)
            .exceptionally(throwable -> {
                SwingUtilities.invokeLater(() -> actualizarEstadoConexiones(false));
                return null;
            });
    }
    
    private void cambiarProtocolo(ClienteUnificado.TipoProtocolo nuevoProtocolo) {
        try {
            clienteService.cambiarProtocolo(nuevoProtocolo);
            lblProtocoloActual.setText("Protocolo: " + nuevoProtocolo.name());
            actualizarBotonesProtocolo();
            
            agregarLogMensaje("Protocolo cambiado a: " + nuevoProtocolo.name());
            statusBar.setSuccess("Protocolo cambiado a: " + nuevoProtocolo.name());
            
            // Probar conexiones con el nuevo protocolo
            probarConexiones();
            
        } catch (Exception e) {
            MessageHelper.showError(this, "Error al cambiar protocolo: " + e.getMessage());
            agregarLogMensaje("❌ Error al cambiar protocolo: " + e.getMessage());
        }
    }
    
    private void actualizarEstadoConexiones(boolean conectado) {
        SwingUtilities.invokeLater(() -> {
            if (conectado) {
                lblEstadoComercializadora.setText("🟢 Comercializadora: Conectado");
                lblEstadoComercializadora.setForeground(UIConstants.SUCCESS_COLOR);
                
                lblEstadoBanquito.setText("🟢 BanQuito: Conectado");
                lblEstadoBanquito.setForeground(UIConstants.SUCCESS_COLOR);
            } else {
                lblEstadoComercializadora.setText("🔴 Comercializadora: Desconectado");
                lblEstadoComercializadora.setForeground(UIConstants.DANGER_COLOR);
                
                lblEstadoBanquito.setText("🔴 BanQuito: Desconectado");
                lblEstadoBanquito.setForeground(UIConstants.DANGER_COLOR);
            }
            
            // Actualizar StatusBar si está disponible
            if (statusBar != null) {
                statusBar.setConnectionStatus(conectado, conectado ? "Todos los servicios activos" : "Servicios no disponibles");
                statusBar.setProtocol(clienteService.getProtocoloActual().name());
            }
        });
    }
    
    private void actualizarBotonesProtocolo() {
        ClienteUnificado.TipoProtocolo actual = clienteService.getProtocoloActual();
        
        if (actual == ClienteUnificado.TipoProtocolo.REST) {
            btnCambiarREST.setBackground(UIConstants.SUCCESS_COLOR);
            btnCambiarREST.setText("✅ REST Activo");
            btnCambiarSOAP.setBackground(UIConstants.MEDIUM_GRAY);
            btnCambiarSOAP.setText("SOAP (.NET)");
        } else {
            btnCambiarREST.setBackground(UIConstants.MEDIUM_GRAY);
            btnCambiarREST.setText("REST (Java)");
            btnCambiarSOAP.setBackground(UIConstants.SUCCESS_COLOR);
            btnCambiarSOAP.setText("✅ SOAP Activo");
        }
    }
    
    private void agregarLogMensaje(String mensaje) {
        SwingUtilities.invokeLater(() -> {
            String timestamp = java.time.LocalTime.now().format(
                java.time.format.DateTimeFormatter.ofPattern("HH:mm:ss")
            );
            txtLogConexiones.append("[" + timestamp + "] " + mensaje + "\n");
            txtLogConexiones.setCaretPosition(txtLogConexiones.getDocument().getLength());
        });
    }
    
    // Cleanup
    public void dispose() {
        if (timer != null) {
            timer.stop();
        }
    }
}
