/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.util;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Logger;
import java.util.logging.Level;

@ApplicationScoped
public class DatabaseConnection {
    
    private static final Logger LOGGER = Logger.getLogger(DatabaseConnection.class.getName());

    // Configuración JDBC directa
    private static final String URL = "jdbc:mysql://localhost:3306/banquito_core?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
    private static final String USER = "root";
    private static final String PASSWORD = "root"; // Cambiar según tu configuración
    
    private DataSource dataSource;
    private boolean dataSourceAvailable = false;

    @PostConstruct
    public void init() {
        try {
            // Intentar obtener DataSource via JNDI lookup manual
            javax.naming.InitialContext ic = new javax.naming.InitialContext();
            dataSource = (DataSource) ic.lookup("jdbc/BanquitoDB");

            // Probar la conexión del DataSource
            try (Connection testConn = dataSource.getConnection()) {
                dataSourceAvailable = true;
                LOGGER.info("DataSource jdbc/BanquitoDB configurado correctamente via JNDI lookup");
            }
        } catch (Exception e) {
            LOGGER.log(Level.INFO, "DataSource no disponible via JNDI, usando JDBC directo: {0}", e.getMessage());
            dataSourceAvailable = false;
            dataSource = null;
        }
    }

    /**
     * Obtiene una conexión de base de datos.
     * Primero intenta usar el DataSource de Jakarta EE, si no está disponible usa JDBC directo.
     */
    public Connection getConnection() throws SQLException {
        if (dataSourceAvailable && dataSource != null) {
            try {
                return dataSource.getConnection();
            } catch (SQLException e) {
                LOGGER.log(Level.WARNING, "Error con DataSource, usando JDBC directo: {0}", e.getMessage());
                return getJdbcConnection();
            }
        } else {
            return getJdbcConnection();
        }
    }

    /**
     * Obtiene una conexión JDBC directa
     */
    private Connection getJdbcConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException e) {
            throw new SQLException("Driver MySQL no encontrado", e);
        }
    }
    
    /**
     * Método estático para compatibilidad con código existente
     */
    public static Connection getStaticConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException e) {
            throw new SQLException("Driver MySQL no encontrado", e);
        }
    }

    /**
     * Cierra la conexión de forma segura
     */
    public static void closeConnection(Connection conn) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                LOGGER.log(Level.WARNING, "Error cerrando conexión: {0}", e.getMessage());
            }
        }
    }

    /**
     * Método no estático para cerrar conexiones
     */
    public void close(Connection conn) {
        closeConnection(conn);
    }
}