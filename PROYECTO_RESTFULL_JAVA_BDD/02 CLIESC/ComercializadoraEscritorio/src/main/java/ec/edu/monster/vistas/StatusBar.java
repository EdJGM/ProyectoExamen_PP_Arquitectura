/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.vistas;

import ec.edu.monster.utils.UIConstants;
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 *
 * @author josue
 */
public class StatusBar extends JPanel {
    
    public enum MessageType {
        INFO(UIConstants.INFO_COLOR, "ℹ️"),
        SUCCESS(UIConstants.SUCCESS_COLOR, "✅"),
        WARNING(UIConstants.WARNING_COLOR, "⚠️"),
        ERROR(UIConstants.DANGER_COLOR, "❌"),
        LOADING(UIConstants.PRIMARY_COLOR, "⏳");
        
        private final Color color;
        private final String icon;
        
        MessageType(Color color, String icon) {
            this.color = color;
            this.icon = icon;
        }
        
        public Color getColor() { return color; }
        public String getIcon() { return icon; }
    }
    
    private JLabel messageLabel;
    private JLabel timestampLabel;
    private JLabel protocolLabel;
    private JLabel connectionLabel;
    private JPanel indicatorPanel;
    private Timer messageTimer;
    
    public StatusBar() {
        initializeComponents();
        setupLayout();
        setDefaultMessage();
    }
    
    private void initializeComponents() {
        setBackground(UIConstants.LIGHT_GRAY);
        setBorder(new EmptyBorder(8, 15, 8, 15));
        setPreferredSize(new Dimension(0, 35));
        
        // Etiqueta de mensaje principal
        messageLabel = new JLabel("Listo");
        messageLabel.setFont(UIConstants.FONT_STATUS);
        messageLabel.setForeground(UIConstants.DARK_GRAY);
        
        // Etiqueta de timestamp
        timestampLabel = new JLabel();
        timestampLabel.setFont(UIConstants.FONT_STATUS);
        timestampLabel.setForeground(UIConstants.MEDIUM_GRAY);
        updateTimestamp();
        
        // Etiqueta de protocolo
        protocolLabel = new JLabel("REST");
        protocolLabel.setFont(UIConstants.FONT_STATUS);
        protocolLabel.setForeground(UIConstants.WHITE);
        protocolLabel.setOpaque(true);
        protocolLabel.setBackground(UIConstants.PRIMARY_COLOR);
        protocolLabel.setBorder(new EmptyBorder(2, 8, 2, 8));
        
        // Etiqueta de conexión
        connectionLabel = new JLabel("🔴 Desconectado");
        connectionLabel.setFont(UIConstants.EMOJI_FONT);
        connectionLabel.setForeground(UIConstants.MEDIUM_GRAY);
        
        // Panel indicador para separadores visuales
        indicatorPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT, 10, 0));
        indicatorPanel.setOpaque(false);
        
        indicatorPanel.add(connectionLabel);
        indicatorPanel.add(createSeparator());
        indicatorPanel.add(protocolLabel);
        indicatorPanel.add(createSeparator());
        indicatorPanel.add(timestampLabel);
        
        // Timer para limpiar mensajes automáticamente
        messageTimer = new Timer(5000, e -> setDefaultMessage());
        messageTimer.setRepeats(false);
    }
    
    private void setupLayout() {
        setLayout(new BorderLayout());
        
        // Panel izquierdo con mensaje
        JPanel leftPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 0, 0));
        leftPanel.setOpaque(false);
        leftPanel.add(messageLabel);
        
        add(leftPanel, BorderLayout.WEST);
        add(indicatorPanel, BorderLayout.EAST);
    }
    
    private JLabel createSeparator() {
        JLabel separator = new JLabel("│");
        separator.setFont(UIConstants.FONT_STATUS);
        separator.setForeground(UIConstants.MEDIUM_GRAY);
        return separator;
    }
    
    // ========== MÉTODOS PÚBLICOS ==========
    
    /**
     * Establece un mensaje con tipo específico
     */
    public void setMessage(String message, MessageType type) {
        SwingUtilities.invokeLater(() -> {
            messageLabel.setText(type.getIcon() + " " + message);
            messageLabel.setForeground(type.getColor());
            updateTimestamp();
            
            // Reiniciar el timer para limpiar el mensaje
            messageTimer.restart();
        });
    }
    
    /**
     * Establece un mensaje de información
     */
    public void setInfo(String message) {
        setMessage(message, MessageType.INFO);
    }
    
    /**
     * Establece un mensaje de éxito
     */
    public void setSuccess(String message) {
        setMessage(message, MessageType.SUCCESS);
    }
    
    /**
     * Establece un mensaje de advertencia
     */
    public void setWarning(String message) {
        setMessage(message, MessageType.WARNING);
    }
    
    /**
     * Establece un mensaje de error
     */
    public void setError(String message) {
        setMessage(message, MessageType.ERROR);
    }
    
    /**
     * Establece un mensaje de carga
     */
    public void setLoading(String message) {
        setMessage(message, MessageType.LOADING);
        messageTimer.stop(); // No limpiar automáticamente los mensajes de carga
    }
    
    /**
     * Actualiza el protocolo actual
     */
    public void setProtocol(String protocol) {
        SwingUtilities.invokeLater(() -> {
            protocolLabel.setText(protocol.toUpperCase());
            
            // Cambiar color según el protocolo
            if ("REST".equalsIgnoreCase(protocol)) {
                protocolLabel.setFont(UIConstants.EMOJI_FONT);
                protocolLabel.setBackground(UIConstants.PRIMARY_COLOR);
            } else if ("SOAP".equalsIgnoreCase(protocol)) {
                protocolLabel.setFont(UIConstants.EMOJI_FONT);
                protocolLabel.setBackground(UIConstants.SECONDARY_COLOR);
            } else {
                protocolLabel.setBackground(UIConstants.MEDIUM_GRAY);
            }
        });
    }
    
    /**
     * Actualiza el estado de conexión
     */
    public void setConnectionStatus(boolean connected, String details) {
        SwingUtilities.invokeLater(() -> {
            if (connected) {
                connectionLabel.setText("🟢 Conectado");
                connectionLabel.setFont(UIConstants.EMOJI_FONT);
                connectionLabel.setForeground(UIConstants.SUCCESS_COLOR);
                if (details != null && !details.isEmpty()) {
                    connectionLabel.setToolTipText("Conectado: " + details);
                }
            } else {
                connectionLabel.setText("🔴 Desconectado");
                connectionLabel.setFont(UIConstants.EMOJI_FONT);
                connectionLabel.setForeground(UIConstants.DANGER_COLOR);
                if (details != null && !details.isEmpty()) {
                    connectionLabel.setToolTipText("Error: " + details);
                }
            }
        });
    }
    
    /**
     * Limpia el mensaje actual y establece el mensaje por defecto
     */
    public void clearMessage() {
        setDefaultMessage();
    }
    
    /**
     * Actualiza el timestamp
     */
    public void updateTimestamp() {
        SwingUtilities.invokeLater(() -> {
            String timestamp = LocalDateTime.now().format(
                DateTimeFormatter.ofPattern("HH:mm:ss")
            );
            timestampLabel.setText(timestamp);
        });
    }
    
    // ========== MÉTODOS PRIVADOS ==========
    
    private void setDefaultMessage() {
        SwingUtilities.invokeLater(() -> {
            messageLabel.setText("Listo");
            messageLabel.setForeground(UIConstants.DARK_GRAY);
            updateTimestamp();
        });
    }
    
    // ========== CLEANUP ==========
    
    public void dispose() {
        if (messageTimer != null) {
            messageTimer.stop();
        }
    }
}