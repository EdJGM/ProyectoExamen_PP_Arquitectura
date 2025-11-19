package ec.edu.monster.vistas;

import ec.edu.monster.services.ClienteUnificado;
import ec.edu.monster.services.ClienteUnificado.TipoProtocolo;
import ec.edu.monster.utils.UIConstants;
import ec.edu.monster.utils.MessageHelper;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;

public class LoginFrame extends JFrame {
    private JTextField txtUsuario;
    private JPasswordField txtContrasena;
    private JComboBox<String> cmbProtocolo;
    private JButton btnLogin;
    private ClienteUnificado clienteService;

    public LoginFrame() {
        setTitle("Login - " + UIConstants.APP_TITLE);
        setSize(UIConstants.WINDOW_SIZE);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setResizable(false);

        clienteService = new ClienteUnificado();

        // Panel principal con BorderLayout
        JPanel mainPanel = new JPanel(new BorderLayout());
        mainPanel.setBackground(UIConstants.BACKGROUND_MAIN);

        // Panel lateral (sidebar)
        JPanel sidebarPanel = new JPanel();
        sidebarPanel.setLayout(new BoxLayout(sidebarPanel, BoxLayout.Y_AXIS));
        sidebarPanel.setBackground(UIConstants.BACKGROUND_SIDEBAR);
        sidebarPanel.setPreferredSize(new Dimension(350, 0));
        sidebarPanel.setBorder(new EmptyBorder(60, 30, 60, 30));

        JLabel lblLogo = new JLabel("🏛️", SwingConstants.CENTER);
        lblLogo.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 64));
        lblLogo.setForeground(UIConstants.PRIMARY_COLOR);
        lblLogo.setAlignmentX(Component.CENTER_ALIGNMENT);

        JLabel lblTitulo = new JLabel(UIConstants.APP_TITLE, SwingConstants.CENTER);
        lblTitulo.setFont(new Font("Segoe UI", Font.BOLD, 22));
        lblTitulo.setForeground(UIConstants.WHITE);
        lblTitulo.setAlignmentX(Component.CENTER_ALIGNMENT);

        JLabel lblEmpresa = new JLabel("<html><center>" + UIConstants.COMPANY_NAME + "</center></html>", SwingConstants.CENTER);
        lblEmpresa.setFont(new Font("Segoe UI", Font.PLAIN, 14)); // Más grande
        lblEmpresa.setForeground(UIConstants.LIGHT_GRAY);
        lblEmpresa.setAlignmentX(Component.CENTER_ALIGNMENT);

        sidebarPanel.add(lblLogo);
        sidebarPanel.add(Box.createVerticalStrut(20));
        sidebarPanel.add(lblTitulo);
        sidebarPanel.add(Box.createVerticalStrut(10));
        sidebarPanel.add(lblEmpresa);

        // Panel de formulario
        JPanel formPanel = new JPanel(new GridBagLayout());
        formPanel.setOpaque(false);
        formPanel.setBorder(new EmptyBorder(100, 60, 100, 60));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(15, 10, 15, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        // Título del formulario
        gbc.gridx = 0; gbc.gridy = 0; gbc.gridwidth = 2;
        JLabel lblFormTitle = new JLabel("Iniciar sesión", SwingConstants.CENTER);
        lblFormTitle.setFont(new Font("Segoe UI", Font.BOLD, 28));
        lblFormTitle.setForeground(UIConstants.PRIMARY_COLOR);
        formPanel.add(lblFormTitle, gbc);

        gbc.gridwidth = 1;

        // Usuario
        gbc.gridx = 0; gbc.gridy = 1;
        JLabel iconUser = new JLabel("👤");
        iconUser.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 28));
        formPanel.add(iconUser, gbc);
        gbc.gridx = 1;
        txtUsuario = new JTextField();
        iconUser.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 28));
        txtUsuario.setPreferredSize(new Dimension(250, 40));
        txtUsuario.setBorder(UIConstants.INPUT_BORDER);
        formPanel.add(txtUsuario, gbc);

        // Contraseña
        gbc.gridx = 0; gbc.gridy = 2;
        JLabel iconPass = new JLabel("🔒");
        iconPass.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 28)); // Icono más grande
        formPanel.add(iconPass, gbc);
        gbc.gridx = 1;
        txtContrasena = new JPasswordField();
        txtContrasena.setFont(new Font("Segoe UI", Font.PLAIN, 18)); // Más grande
        txtContrasena.setPreferredSize(new Dimension(250, 40));
        txtContrasena.setBorder(UIConstants.INPUT_BORDER);
        formPanel.add(txtContrasena, gbc);

        // Protocolo
        gbc.gridx = 0; gbc.gridy = 3;
        JLabel iconProto = new JLabel("🌐");
        iconProto.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 28)); // Icono más grande
        formPanel.add(iconProto, gbc);
        gbc.gridx = 1;
        cmbProtocolo = new JComboBox<>(new String[]{"Java RESTful", "SOAP .NET"});
        cmbProtocolo.setFont(new Font("Segoe UI", Font.PLAIN, 18)); // Más grande
        cmbProtocolo.setPreferredSize(new Dimension(250, 40));
        formPanel.add(cmbProtocolo, gbc);

        // Botón login
        gbc.gridx = 0; gbc.gridy = 4; gbc.gridwidth = 2;
        gbc.anchor = GridBagConstraints.CENTER;
        btnLogin = MessageHelper.createStyledButton("🔐 Iniciar Sesión", UIConstants.PRIMARY_COLOR);
        btnLogin.setFont(new Font("Segoe UI Emoji", Font.BOLD, 18)); // Más grande
        formPanel.add(btnLogin, gbc);

        mainPanel.add(sidebarPanel, BorderLayout.WEST);
        mainPanel.add(formPanel, BorderLayout.CENTER);

        add(mainPanel);

        btnLogin.addActionListener(e -> realizarLogin());
        txtContrasena.addActionListener(e -> realizarLogin());
    }

    private void realizarLogin() {
        String usuario = txtUsuario.getText().trim();
        String contrasena = new String(txtContrasena.getPassword()).trim();
        String protocolo = (String) cmbProtocolo.getSelectedItem();

        if (!usuario.equals("MONSTER") || !contrasena.equals("MONSTER9")) {
            MessageHelper.showError(this, "Usuario o contraseña incorrectos.");
            return;
        }

        // Selección de protocolo
        TipoProtocolo tipo = protocolo.equals("Java RESTful") ? TipoProtocolo.REST : TipoProtocolo.SOAP;
        clienteService.cambiarProtocolo(tipo);

        // Abrir ventana principal y cerrar login
        MainFrame mainFrame = new MainFrame();
        mainFrame.getClienteService().cambiarProtocolo(tipo);
        mainFrame.setVisible(true);
        dispose();
    }
}
