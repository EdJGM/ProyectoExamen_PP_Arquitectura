/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ec.edu.monster.utils;

import java.awt.Color;
import java.awt.Font;
import java.awt.Dimension;
import javax.swing.BorderFactory;
import javax.swing.border.Border;
/**
 *
 * @author josue
 */
public class UIConstants {
    public static final Font EMOJI_FONT = new Font("Segoe UI Emoji", Font.PLAIN, 12);

    // ========== COLORES ESPE ==========
    public static final Color PRIMARY_COLOR = new Color(41, 128, 185);        // Azul ESPE
    public static final Color PRIMARY_DARK = new Color(31, 97, 141);          // Azul oscuro
    public static final Color PRIMARY_LIGHT = new Color(174, 214, 241);       // Azul claro
    
    public static final Color SECONDARY_COLOR = new Color(231, 76, 60);       // Rojo ESPE
    public static final Color SECONDARY_DARK = new Color(192, 57, 43);        // Rojo oscuro
    public static final Color SECONDARY_LIGHT = new Color(245, 183, 177);     // Rojo claro
    
    public static final Color SUCCESS_COLOR = new Color(39, 174, 96);         // Verde éxito
    public static final Color WARNING_COLOR = new Color(241, 196, 15);        // Amarillo advertencia
    public static final Color DANGER_COLOR = new Color(231, 76, 60);          // Rojo peligro
    public static final Color INFO_COLOR = new Color(52, 152, 219);           // Azul información
    
    // ========== COLORES NEUTRALES ==========
    public static final Color WHITE = Color.WHITE;
    public static final Color LIGHT_GRAY = new Color(248, 249, 250);
    public static final Color MEDIUM_GRAY = new Color(108, 117, 125);
    public static final Color DARK_GRAY = new Color(52, 58, 64);
    public static final Color BLACK = new Color(33, 37, 41);
    
    // ========== COLORES DE FONDO ==========
    public static final Color BACKGROUND_MAIN = LIGHT_GRAY;
    public static final Color BACKGROUND_PANEL = WHITE;
    public static final Color BACKGROUND_HEADER = PRIMARY_COLOR;
    public static final Color BACKGROUND_SIDEBAR = new Color(73, 80, 87);
    
    // ========== FUENTES ==========
    public static final Font FONT_TITLE = new Font("Segoe UI", Font.BOLD, 24);
    public static final Font FONT_SUBTITLE = new Font("Segoe UI", Font.BOLD, 16);
    public static final Font FONT_LABEL = new Font("Segoe UI", Font.PLAIN, 12);
    public static final Font FONT_BUTTON = new Font("Segoe UI", Font.BOLD, 12);
    public static final Font FONT_TABLE_HEADER = new Font("Segoe UI", Font.BOLD, 11);
    public static final Font FONT_TABLE_DATA = new Font("Segoe UI", Font.PLAIN, 11);
    public static final Font FONT_STATUS = new Font("Segoe UI", Font.PLAIN, 10);
    
    // ========== DIMENSIONES ==========
    public static final Dimension WINDOW_SIZE = new Dimension(1200, 800);
    public static final Dimension DIALOG_SIZE = new Dimension(600, 400);
    public static final Dimension BUTTON_SIZE = new Dimension(120, 35);
    public static final Dimension LARGE_BUTTON_SIZE = new Dimension(150, 40);
    public static final Dimension PANEL_PADDING = new Dimension(20, 20);
    
    // ========== BORDES ==========
    public static final Border PANEL_BORDER = BorderFactory.createEmptyBorder(15, 15, 15, 15);
    public static final Border CARD_BORDER = BorderFactory.createCompoundBorder(
        BorderFactory.createLineBorder(MEDIUM_GRAY, 1),
        BorderFactory.createEmptyBorder(10, 10, 10, 10)
    );
    public static final Border INPUT_BORDER = BorderFactory.createLineBorder(MEDIUM_GRAY, 1);
    public static final Border FOCUSED_BORDER = BorderFactory.createLineBorder(PRIMARY_COLOR, 2);
    
    // ========== ESPACIADOS ==========
    public static final int PADDING_SMALL = 5;
    public static final int PADDING_MEDIUM = 10;
    public static final int PADDING_LARGE = 20;
    public static final int MARGIN_SMALL = 5;
    public static final int MARGIN_MEDIUM = 10;
    public static final int MARGIN_LARGE = 20;
    
    // ========== ÍCONOS (usando Material Icons) ==========
    public static final String ICON_HOME = "home";
    public static final String ICON_PRODUCTS = "inventory_2";
    public static final String ICON_INVOICE = "receipt";
    public static final String ICON_CREDIT = "credit_card";
    public static final String ICON_SETTINGS = "settings";
    public static final String ICON_ADD = "add";
    public static final String ICON_EDIT = "edit";
    public static final String ICON_DELETE = "delete";
    public static final String ICON_SAVE = "save";
    public static final String ICON_CANCEL = "cancel";
    public static final String ICON_SEARCH = "search";
    public static final String ICON_REFRESH = "refresh";
    public static final String ICON_CHECK = "check_circle";
    public static final String ICON_ERROR = "error";
    public static final String ICON_WARNING = "warning";
    public static final String ICON_INFO = "info";
    
    // ========== TÍTULOS Y TEXTOS ==========
    public static final String APP_TITLE = "ESPE - Comercializadora Electrodomésticos";
    public static final String APP_VERSION = "v1.0.0";
    public static final String COMPANY_NAME = "Escuela Politécnica Nacional del Ejército";
    
    // ========== MENSAJES ==========
    public static final String MSG_LOADING = "Cargando...";
    public static final String MSG_CONNECTING = "Conectando con el servidor...";
    public static final String MSG_SUCCESS = "Operación completada exitosamente";
    public static final String MSG_ERROR = "Ha ocurrido un error";
    public static final String MSG_CONFIRM = "¿Está seguro de realizar esta operación?";
    public static final String MSG_NO_DATA = "No hay datos disponibles";
    
    // ========== CONFIGURACIÓN DE PROTOCOLO ==========
    public enum ProtocolType {
        REST("REST (Java)", PRIMARY_COLOR),
        SOAP("SOAP (.NET)", SECONDARY_COLOR);
        
        private final String displayName;
        private final Color color;
        
        ProtocolType(String displayName, Color color) {
            this.displayName = displayName;
            this.color = color;
        }
        
        public String getDisplayName() { return displayName; }
        public Color getColor() { return color; }
    }
    
    // ========== HELPER METHODS ==========
    
    /**
     * Crea un color más oscuro basado en el color dado
     */
    public static Color darkerColor(Color color, float factor) {
        return new Color(
            Math.max((int)(color.getRed() * factor), 0),
            Math.max((int)(color.getGreen() * factor), 0),
            Math.max((int)(color.getBlue() * factor), 0),
            color.getAlpha()
        );
    }
    
    /**
     * Crea un color más claro basado en el color dado
     */
    public static Color lighterColor(Color color, float factor) {
        return new Color(
            Math.min((int)(color.getRed() + (255 - color.getRed()) * factor), 255),
            Math.min((int)(color.getGreen() + (255 - color.getGreen()) * factor), 255),
            Math.min((int)(color.getBlue() + (255 - color.getBlue()) * factor), 255),
            color.getAlpha()
        );
    }
    
    /**
     * Crea un color con transparencia
     */
    public static Color withAlpha(Color color, int alpha) {
        return new Color(color.getRed(), color.getGreen(), color.getBlue(), alpha);
    }
}
