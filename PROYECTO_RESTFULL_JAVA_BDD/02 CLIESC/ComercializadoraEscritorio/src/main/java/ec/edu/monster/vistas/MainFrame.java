/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.vistas;

import ec.edu.monster.services.ClienteUnificado;
import ec.edu.monster.services.ClienteUnificado.TipoProtocolo;
import ec.edu.monster.utils.MessageHelper;
import ec.edu.monster.utils.UIConstants;
import javax.swing.*;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
/**
 *
 * @author josue
 */
public class MainFrame extends JFrame {
    private ClienteUnificado clienteService;
    private JPanel contentPanel;
    private JPanel sidebarPanel;
    private StatusBar statusBar;
    private JLabel protocolLabel;
    private FacturasPanel facturasPanel;

    // Paneles de contenido
    private ProductosPanel productosPanel;
    private FacturacionPanel facturacionPanel;
    private CreditoPanel creditoPanel;
    private ConectividadPanel conectividadPanel;
    
    // Botones del sidebar
    private JButton btnProductos;
    private JButton btnFacturacion;
    private JButton btnCredito;
    private JButton btnConectividad;
    private JToggleButton btnRest;
    private JToggleButton btnSoap;
    private JButton btnFacturas;


    public MainFrame() {
        initializeServices();
        initializeComponents();
        setupLayout();
        setupEventHandlers();
        setupLookAndFeel();
        
        // Mostrar panel de productos por defecto
        showProductosPanel();
    }
    
    private void initializeServices() {
        clienteService = new ClienteUnificado();
    }
    
    private void initializeComponents() {
        // Configuración de la ventana principal
        setTitle(UIConstants.APP_TITLE + " " + UIConstants.APP_VERSION);
        setSize(UIConstants.WINDOW_SIZE);
        setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
        setLocationRelativeTo(null);
        
        // Panel principal con BorderLayout
        setLayout(new BorderLayout());
        
        // Crear componentes
        createHeader();
        createSidebar();
        createContentArea();
        createStatusBar();
        createPanels();
    }
    
    private void createHeader() {
        JPanel headerPanel = new JPanel(new BorderLayout());
        headerPanel.setBackground(UIConstants.BACKGROUND_HEADER);
        headerPanel.setBorder(new EmptyBorder(15, 20, 15, 20));
        
        // Logo y título
        JPanel titlePanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        titlePanel.setOpaque(false);
        
        JLabel logoLabel = new JLabel("🏛️");
        logoLabel.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 24));
        logoLabel.setForeground(UIConstants.WHITE);
        
        JLabel titleLabel = new JLabel(UIConstants.APP_TITLE);
        titleLabel.setFont(UIConstants.FONT_TITLE);
        titleLabel.setForeground(UIConstants.WHITE);
        titleLabel.setBorder(new EmptyBorder(0, 10, 0, 0));
        
        titlePanel.add(logoLabel);
        titlePanel.add(titleLabel);
        
        // Panel de usuario y cerre sesión
        JPanel userPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        userPanel.setOpaque(false);

        JLabel userLabel = new JLabel("👤 MONSTER");
        userLabel.setFont(UIConstants.EMOJI_FONT);
        userLabel.setForeground(UIConstants.WHITE);

        JButton btnLogout = MessageHelper.createStyledButton("🔓 Cerrar sesión", UIConstants.DANGER_COLOR);
        btnLogout.setFont(UIConstants.EMOJI_FONT);
        btnLogout.addActionListener(e -> cerrarSesion());

        userPanel.add(userLabel);
        userPanel.add(Box.createHorizontalStrut(10));
        userPanel.add(btnLogout);
        
        headerPanel.add(titlePanel, BorderLayout.WEST);
        headerPanel.add(userPanel, BorderLayout.EAST);
        
        add(headerPanel, BorderLayout.NORTH);
    }

    private void cerrarSesion() {
        dispose();
        SwingUtilities.invokeLater(() -> {
            LoginFrame loginFrame = new LoginFrame();
            loginFrame.setVisible(true);
        });
    }

    private void createSidebar() {
        sidebarPanel = new JPanel();
        sidebarPanel.setLayout(new BoxLayout(sidebarPanel, BoxLayout.Y_AXIS));
        sidebarPanel.setBackground(UIConstants.BACKGROUND_SIDEBAR);
        sidebarPanel.setPreferredSize(new Dimension(200, 0));
        sidebarPanel.setBorder(new EmptyBorder(20, 10, 20, 10));
        
        // Crear botones del menú
        btnProductos = createSidebarButton("📦 Productos", UIConstants.ICON_PRODUCTS);
        btnFacturacion = createSidebarButton("🧾 Facturación", UIConstants.ICON_INVOICE);
        btnCredito = createSidebarButton("💳 Crédito", UIConstants.ICON_CREDIT);
        btnConectividad = createSidebarButton("🔧 Conectividad", UIConstants.ICON_SETTINGS);
        btnFacturas = createSidebarButton("📋 Facturas", UIConstants.ICON_INVOICE);


        // Agregar botones al sidebar
        sidebarPanel.add(btnProductos);
        sidebarPanel.add(Box.createVerticalStrut(10));
        sidebarPanel.add(btnFacturacion);
        sidebarPanel.add(Box.createVerticalStrut(10));
        sidebarPanel.add(btnFacturas);
        sidebarPanel.add(Box.createVerticalStrut(10));
        sidebarPanel.add(btnCredito);
        sidebarPanel.add(Box.createVerticalStrut(10));
        sidebarPanel.add(btnConectividad);
        sidebarPanel.add(Box.createVerticalGlue());
        
        // Información de la empresa
        JPanel companyPanel = new JPanel();
        companyPanel.setLayout(new BoxLayout(companyPanel, BoxLayout.Y_AXIS));
        companyPanel.setOpaque(false);
        companyPanel.setBorder(new EmptyBorder(20, 5, 0, 5));
        
        JLabel companyLabel = new JLabel("<html><center>" + UIConstants.COMPANY_NAME + "</center></html>");
        companyLabel.setFont(new Font("Segoe UI", Font.PLAIN, 10));
        companyLabel.setForeground(UIConstants.LIGHT_GRAY);
        companyLabel.setAlignmentX(Component.CENTER_ALIGNMENT);
        
        JLabel versionLabel = new JLabel(UIConstants.APP_VERSION);
        versionLabel.setFont(new Font("Segoe UI", Font.PLAIN, 9));
        versionLabel.setForeground(UIConstants.MEDIUM_GRAY);
        versionLabel.setAlignmentX(Component.CENTER_ALIGNMENT);
        
        companyPanel.add(companyLabel);
        companyPanel.add(Box.createVerticalStrut(5));
        companyPanel.add(versionLabel);
        
        sidebarPanel.add(companyPanel);
        
        add(sidebarPanel, BorderLayout.WEST);
    }
    
    private JButton createSidebarButton(String text, String icon) {
        JButton button = new JButton(text);
        button.setFont(UIConstants.EMOJI_FONT);
        button.setForeground(UIConstants.WHITE);
        button.setBackground(UIConstants.BACKGROUND_SIDEBAR);
        button.setBorder(new EmptyBorder(12, 15, 12, 15));
        button.setAlignmentX(Component.LEFT_ALIGNMENT);
        button.setMaximumSize(new Dimension(Integer.MAX_VALUE, 45));
        button.setHorizontalAlignment(SwingConstants.LEFT);
        button.setFocusPainted(false);
        
        // Efectos hover
        button.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                button.setBackground(UIConstants.darkerColor(UIConstants.BACKGROUND_SIDEBAR, 0.8f));
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                if (!button.isSelected()) {
                    button.setBackground(UIConstants.BACKGROUND_SIDEBAR);
                }
            }
        });
        
        return button;
    }
    
    private void createContentArea() {
        contentPanel = new JPanel(new BorderLayout());
        contentPanel.setBackground(UIConstants.BACKGROUND_MAIN);
        contentPanel.setBorder(new EmptyBorder(20, 20, 20, 20));
        
        add(contentPanel, BorderLayout.CENTER);
    }
    
    private void createStatusBar() {
        statusBar = new StatusBar();
        add(statusBar, BorderLayout.SOUTH);
    }
    
    private void createPanels() {
        productosPanel = new ProductosPanel(clienteService, statusBar);
        facturacionPanel = new FacturacionPanel(clienteService, statusBar, this);
        facturasPanel = new FacturasPanel(clienteService, statusBar, this);
        creditoPanel = new CreditoPanel(clienteService, statusBar);
        conectividadPanel = new ConectividadPanel(clienteService, statusBar);
    }
    
    private void setupLayout() {
        // Ya configurado en createComponents
    }
    
    private void setupEventHandlers() {
        // Eventos de botones del sidebar
        btnProductos.addActionListener(e -> showProductosPanel());
        btnFacturacion.addActionListener(e -> showFacturacionPanel());
        btnFacturas.addActionListener(e -> showFacturasPanel());
        btnCredito.addActionListener(e -> showCreditoPanel());
        btnConectividad.addActionListener(e -> showConectividadPanel());
        
        // Eventos de cambio de protocolo
//        btnRest.addActionListener(e -> cambiarProtocolo(TipoProtocolo.REST));
//        btnSoap.addActionListener(e -> cambiarProtocolo(TipoProtocolo.SOAP));
//
        // Evento de cierre de ventana
        addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                confirmarSalida();
            }
        });
    }

    private void showFacturasPanel() {
        showPanel(facturasPanel, "Consulta de Facturas");
        setActiveButton(btnFacturas);
    }

    private void setupLookAndFeel() {
        try {
            // Usar look and feel del sistema
            for (UIManager.LookAndFeelInfo info : UIManager.getInstalledLookAndFeels()) {
                if ("System".equals(info.getName()) || "Windows".equals(info.getName()) || "Metal".equals(info.getName())) {
                    UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (Exception e) {
            // Si falla, usar el L&F por defecto
        }
    }
    
    // ========== NAVEGACIÓN ==========
    
    private void showProductosPanel() {
        showPanel(productosPanel, "Gestión de Productos");
        setActiveButton(btnProductos);
    }
    
    private void showFacturacionPanel() {
        showPanel(facturacionPanel, "Sistema de Facturación");
        setActiveButton(btnFacturacion);
    }
    
    public void showCreditoPanel() {
        showPanel(creditoPanel, "Consultas de Crédito BanQuito");
        setActiveButton(btnCredito);
    }

    public CreditoPanel getCreditoPanel() {
        return creditoPanel;
    }


    private void showConectividadPanel() {
        showPanel(conectividadPanel, "Estado de Conectividad");
        setActiveButton(btnConectividad);
    }
    
    private void showPanel(JPanel panel, String title) {
        contentPanel.removeAll();
        
        // Panel con título
        JPanel containerPanel = new JPanel(new BorderLayout());
        containerPanel.setBackground(UIConstants.BACKGROUND_MAIN);
        
        // Título del panel
        JLabel titleLabel = new JLabel(title);
        titleLabel.setFont(UIConstants.FONT_SUBTITLE);
        titleLabel.setForeground(UIConstants.DARK_GRAY);
        titleLabel.setBorder(new EmptyBorder(0, 0, 15, 0));
        
        containerPanel.add(titleLabel, BorderLayout.NORTH);
        containerPanel.add(panel, BorderLayout.CENTER);
        
        contentPanel.add(containerPanel, BorderLayout.CENTER);
        contentPanel.revalidate();
        contentPanel.repaint();
    }
    
    private void setActiveButton(JButton activeButton) {
        // Resetear todos los botones
        btnProductos.setBackground(UIConstants.BACKGROUND_SIDEBAR);
        btnFacturacion.setBackground(UIConstants.BACKGROUND_SIDEBAR);
        btnFacturas.setBackground(UIConstants.BACKGROUND_SIDEBAR);  // NUEVA LÍNEA
        btnCredito.setBackground(UIConstants.BACKGROUND_SIDEBAR);
        btnConectividad.setBackground(UIConstants.BACKGROUND_SIDEBAR);
        
        // Activar el botón seleccionado
        activeButton.setBackground(UIConstants.PRIMARY_COLOR);
    }
    
    // ========== CAMBIO DE PROTOCOLO ==========
    
    private void cambiarProtocolo(TipoProtocolo nuevoProtocolo) {
        try {
            clienteService.cambiarProtocolo(nuevoProtocolo);
            protocolLabel.setText("Protocolo: " + nuevoProtocolo.name());
            statusBar.setMessage("Protocolo cambiado a: " + nuevoProtocolo.name(), StatusBar.MessageType.SUCCESS);
            
            // Actualizar paneles que dependan del protocolo
            if (conectividadPanel != null) {
                conectividadPanel.actualizarEstado();
            }
            
        } catch (Exception e) {
            MessageHelper.showError(this, "Error al cambiar protocolo: " + e.getMessage());
            statusBar.setMessage("Error al cambiar protocolo", StatusBar.MessageType.ERROR);
        }
    }
    
    private void confirmarSalida() {
        int option = MessageHelper.showConfirm(this, 
            "¿Está seguro de que desea salir de la aplicación?", 
            "Confirmar Salida");
            
        if (option == JOptionPane.YES_OPTION) {
            // Cleanup si es necesario
            dispose();
            System.exit(0);
        }
    }
    
    // ========== GETTERS PARA ACCESO DE PANELES ==========
    
    public ClienteUnificado getClienteService() {
        return clienteService;
    }
    
    public StatusBar getStatusBar() {
        return statusBar;
    }
}