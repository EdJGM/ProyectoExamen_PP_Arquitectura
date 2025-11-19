/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.utils;

import ec.edu.monster.utils.UIConstants;
import javax.swing.*;
import java.awt.*;

/**
 *
 * @author josue
 */
public class MessageHelper {
    
    /**
     * Muestra un mensaje de información
     */
    public static void showInfo(Component parent, String message) {
        showCustomDialog(parent, message, "Información", UIConstants.INFO_COLOR, "ℹ️");
    }
    
    /**
     * Muestra un mensaje de éxito
     */
    public static void showSuccess(Component parent, String message) {
        showCustomDialog(parent, message, "Éxito", UIConstants.SUCCESS_COLOR, "✅");
    }
    
    /**
     * Muestra un mensaje de advertencia
     */
    public static void showWarning(Component parent, String message) {
        showCustomDialog(parent, message, "Advertencia", UIConstants.WARNING_COLOR, "⚠️");
    }
    
    /**
     * Muestra un mensaje de error
     */
    public static void showError(Component parent, String message) {
        showCustomDialog(parent, message, "Error", UIConstants.DANGER_COLOR, "❌");
    }
    
    /**
     * Muestra un diálogo de confirmación
     */
    public static int showConfirm(Component parent, String message, String title) {
        return JOptionPane.showConfirmDialog(
            parent,
            wrapMessage(message),
            title,
            JOptionPane.YES_NO_OPTION,
            JOptionPane.QUESTION_MESSAGE
        );
    }
    
    /**
     * Muestra un diálogo de confirmación con opciones personalizadas
     */
    public static int showConfirm(Component parent, String message, String title, 
                                 String[] options, String defaultOption) {
        return JOptionPane.showOptionDialog(
            parent,
            wrapMessage(message),
            title,
            JOptionPane.YES_NO_CANCEL_OPTION,
            JOptionPane.QUESTION_MESSAGE,
            null,
            options,
            defaultOption
        );
    }
    
    /**
     * Solicita entrada de texto al usuario
     */
    public static String showInput(Component parent, String message, String title) {
        return showInput(parent, message, title, "");
    }
    
    /**
     * Solicita entrada de texto con valor inicial
     */
    public static String showInput(Component parent, String message, String title, String initialValue) {
        return (String) JOptionPane.showInputDialog(
            parent,
            wrapMessage(message),
            title,
            JOptionPane.PLAIN_MESSAGE,
            null,
            null,
            initialValue
        );
    }
    
    /**
     * Muestra un diálogo de carga mientras se ejecuta una tarea
     */
    public static void showLoadingDialog(Component parent, String message, Runnable task) {
        JDialog loadingDialog = createLoadingDialog(parent, message);
        
        SwingWorker<Void, Void> worker = new SwingWorker<Void, Void>() {
            @Override
            protected Void doInBackground() throws Exception {
                task.run();
                return null;
            }
            
            @Override
            protected void done() {
                loadingDialog.dispose();
            }
        };
        
        worker.execute();
        loadingDialog.setVisible(true);
    }
    
    /**
     * Crea un diálogo personalizado con colores e íconos
     */
    private static void showCustomDialog(Component parent, String message, String title, Color color, String icon) {
        // Crear panel personalizado
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));
        panel.setBackground(UIConstants.WHITE);
        
        // Icono
        JLabel iconLabel = new JLabel(icon, SwingConstants.CENTER);
        iconLabel.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 32));
        iconLabel.setForeground(color);
        iconLabel.setPreferredSize(new Dimension(50, 50));
        
        // Mensaje
        JLabel messageLabel = new JLabel(wrapMessage(message));
        messageLabel.setFont(UIConstants.FONT_LABEL);
        messageLabel.setForeground(UIConstants.DARK_GRAY);
        
        panel.add(iconLabel, BorderLayout.WEST);
        panel.add(messageLabel, BorderLayout.CENTER);
        
        // Mostrar diálogo
        JOptionPane.showOptionDialog(
            parent,
            panel,
            title,
            JOptionPane.DEFAULT_OPTION,
            JOptionPane.PLAIN_MESSAGE,
            null,
            new Object[]{"Aceptar"},
            "Aceptar"
        );
    }
    
    /**
     * Crea un diálogo de carga
     */
    private static JDialog createLoadingDialog(Component parent, String message) {
        JDialog dialog = new JDialog((Frame) SwingUtilities.getWindowAncestor(parent), true);
        dialog.setTitle("Procesando...");
        dialog.setDefaultCloseOperation(JDialog.DO_NOTHING_ON_CLOSE);
        dialog.setResizable(false);
        
        JPanel panel = new JPanel(new BorderLayout(15, 15));
        panel.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        panel.setBackground(UIConstants.WHITE);
        
        // Spinner de carga
        JLabel spinnerLabel = new JLabel("⏳", SwingConstants.CENTER);
        spinnerLabel.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 24));
        spinnerLabel.setPreferredSize(new Dimension(40, 40));
        
        // Mensaje
        JLabel messageLabel = new JLabel(message, SwingConstants.CENTER);
        messageLabel.setFont(UIConstants.FONT_LABEL);
        messageLabel.setForeground(UIConstants.DARK_GRAY);
        
        panel.add(spinnerLabel, BorderLayout.WEST);
        panel.add(messageLabel, BorderLayout.CENTER);
        
        dialog.setContentPane(panel);
        dialog.pack();
        dialog.setLocationRelativeTo(parent);
        
        return dialog;
    }
    
    /**
     * Envuelve el mensaje en HTML para mejor formateo
     */
    private static String wrapMessage(String message) {
        if (message == null) return "";
        
        // Si el mensaje ya tiene HTML, no modificarlo
        if (message.toLowerCase().contains("<html>")) {
            return message;
        }
        
        // Envolver en HTML para permitir saltos de línea y formateo
        StringBuilder html = new StringBuilder("<html><body style='width: 300px; font-family: Segoe UI;'>");
        
        // Reemplazar saltos de línea con <br>
        String formattedMessage = message.replace("\n", "<br>");
        
        html.append(formattedMessage);
        html.append("</body></html>");
        
        return html.toString();
    }
    
    /**
     * Crea un botón estilizado para diálogos
     */
    public static JButton createStyledButton(String text, Color backgroundColor) {
        JButton button = new JButton(text);
        button.setFont(UIConstants.EMOJI_FONT);
        button.setForeground(UIConstants.WHITE);
        button.setBackground(backgroundColor);
        button.setBorder(BorderFactory.createEmptyBorder(8, 16, 8, 16));
        button.setFocusPainted(false);
        button.setCursor(new Cursor(Cursor.HAND_CURSOR));
        
        // Efectos hover
        button.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                button.setBackground(UIConstants.darkerColor(backgroundColor, 0.8f));
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                button.setBackground(backgroundColor);
            }
        });
        
        return button;
    }
}