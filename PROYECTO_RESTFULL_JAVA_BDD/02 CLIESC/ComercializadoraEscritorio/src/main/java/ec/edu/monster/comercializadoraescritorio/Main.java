/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.comercializadoraescritorio;

import com.formdev.flatlaf.FlatLightLaf;
import ec.edu.monster.utils.UIConstants;
import ec.edu.monster.vistas.LoginFrame;
import ec.edu.monster.vistas.MainFrame;

import javax.swing.*;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;
import java.awt.*;
/**
 *
 * @author josue
 */
public class Main {
    
    public static void main(String[] args) {
        // Configurar propiedades del sistema para mejor rendimiento
        System.setProperty("awt.useSystemAAFontSettings", "on");
        System.setProperty("swing.aatext", "true");
        System.setProperty("sun.java2d.dpiaware", "true");
        
        // Ejecutar en el Event Dispatch Thread
        SwingUtilities.invokeLater(() -> {
            try {
                // Configurar Look and Feel moderno
                setupLookAndFeel();
                
                // Mostrar splash screen mientras carga
                showSplashScreen();
                
                // Crear y mostrar la ventana principal
                LoginFrame loginFrame = new LoginFrame();
                loginFrame.setVisible(true);
//                MainFrame mainFrame = new MainFrame();
//                mainFrame.setVisible(true);
                
            } catch (Exception e) {
                e.printStackTrace();
                JOptionPane.showMessageDialog(null, 
                    "Error al iniciar la aplicación: " + e.getMessage(),
                    "Error de Inicio",
                    JOptionPane.ERROR_MESSAGE);
                System.exit(1);
            }
        });
    }
    
    private static void setupLookAndFeel() {
        try {
            // Usar FlatLaf para un look moderno
            FlatLightLaf.setup();
            
            // Personalizar colores globales
            UIManager.put("Button.arc", 8);
            UIManager.put("Component.arc", 8);
            UIManager.put("TextField.arc", 8);
            UIManager.put("ComboBox.arc", 8);
            
            // Colores principales
            UIManager.put("Button.default.background", UIConstants.PRIMARY_COLOR);
            UIManager.put("Button.default.foreground", UIConstants.WHITE);
            UIManager.put("Button.background", UIConstants.LIGHT_GRAY);
            UIManager.put("Button.foreground", UIConstants.DARK_GRAY);
            
            // Colores de selección
            UIManager.put("Table.selectionBackground", UIConstants.PRIMARY_LIGHT);
            UIManager.put("Table.selectionForeground", UIConstants.DARK_GRAY);
            UIManager.put("List.selectionBackground", UIConstants.PRIMARY_LIGHT);
            UIManager.put("List.selectionForeground", UIConstants.DARK_GRAY);
            
            // Bordes y focus
            UIManager.put("Component.focusColor", UIConstants.PRIMARY_COLOR);
            UIManager.put("Component.borderColor", UIConstants.MEDIUM_GRAY);
            
        } catch (Exception e) {
            // Fallback al Look & Feel del sistema
            try {
                for (UIManager.LookAndFeelInfo info : UIManager.getInstalledLookAndFeels()) {
                    if ("System".equals(info.getName()) || "Windows".equals(info.getName()) || "Metal".equals(info.getName())) {
                        UIManager.setLookAndFeel(info.getClassName());
                        break;
                    }
                }
            } catch (Exception ex) {
                // Si todo falla, usar el default
                ex.printStackTrace();
            }
        }
    }
    
    private static void showSplashScreen() {
        // Crear ventana de splash simple
        JWindow splash = new JWindow();
        JPanel splashPanel = new JPanel(new BorderLayout());
        splashPanel.setBackground(UIConstants.PRIMARY_COLOR);
        splashPanel.setBorder(BorderFactory.createEmptyBorder(40, 40, 40, 40));
        
        // Logo y texto
        JPanel contentPanel = new JPanel();
        contentPanel.setLayout(new BoxLayout(contentPanel, BoxLayout.Y_AXIS));
        contentPanel.setOpaque(false);
        
        // Logo ESPE
        JLabel logoLabel = new JLabel("🏛️", SwingConstants.CENTER);
        logoLabel.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 48));
        logoLabel.setForeground(UIConstants.WHITE);
        logoLabel.setAlignmentX(Component.CENTER_ALIGNMENT);
        
        // Título
        JLabel titleLabel = new JLabel(UIConstants.APP_TITLE, SwingConstants.CENTER);
        titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 18));
        titleLabel.setForeground(UIConstants.WHITE);
        titleLabel.setAlignmentX(Component.CENTER_ALIGNMENT);
        
        // Subtítulo
        JLabel subtitleLabel = new JLabel("Cliente de Escritorio " + UIConstants.APP_VERSION, SwingConstants.CENTER);
        subtitleLabel.setFont(new Font("Segoe UI", Font.PLAIN, 12));
        subtitleLabel.setForeground(UIConstants.PRIMARY_LIGHT);
        subtitleLabel.setAlignmentX(Component.CENTER_ALIGNMENT);
        
        // Empresa
        JLabel companyLabel = new JLabel(UIConstants.COMPANY_NAME, SwingConstants.CENTER);
        companyLabel.setFont(new Font("Segoe UI", Font.PLAIN, 10));
        companyLabel.setForeground(UIConstants.PRIMARY_LIGHT);
        companyLabel.setAlignmentX(Component.CENTER_ALIGNMENT);
        
        // Cargando
        JLabel loadingLabel = new JLabel("Cargando...", SwingConstants.CENTER);
        loadingLabel.setFont(new Font("Segoe UI", Font.PLAIN, 10));
        loadingLabel.setForeground(UIConstants.WHITE);
        loadingLabel.setAlignmentX(Component.CENTER_ALIGNMENT);
        
        // Agregar componentes
        contentPanel.add(logoLabel);
        contentPanel.add(Box.createVerticalStrut(15));
        contentPanel.add(titleLabel);
        contentPanel.add(Box.createVerticalStrut(5));
        contentPanel.add(subtitleLabel);
        contentPanel.add(Box.createVerticalStrut(20));
        contentPanel.add(companyLabel);
        contentPanel.add(Box.createVerticalStrut(30));
        contentPanel.add(loadingLabel);
        
        splashPanel.add(contentPanel, BorderLayout.CENTER);
        splash.setContentPane(splashPanel);
        
        // Configurar splash
        splash.setSize(400, 300);
        splash.setLocationRelativeTo(null);
        splash.setVisible(true);
        
        // Simular carga (en una aplicación real aquí cargarías recursos)
        Timer timer = new Timer(2000, e -> splash.dispose());
        timer.setRepeats(false);
        timer.start();
        
        // Esperar un poco para que se vea el splash
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}