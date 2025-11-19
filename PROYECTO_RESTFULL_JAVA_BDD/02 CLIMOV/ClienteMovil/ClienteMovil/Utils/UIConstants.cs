namespace ClienteMovil.Utils
{
    /// <summary>
    /// Constantes de UI basadas en los colores institucionales de ESPE
    /// </summary>
    public static class UIConstants
    {
        // ========== COLORES ESPE (idénticos al cliente de escritorio) ==========
        public static readonly Color PRIMARY_COLOR = Color.FromRgb(41, 128, 185);        // Azul ESPE
        public static readonly Color PRIMARY_DARK = Color.FromRgb(31, 97, 141);          // Azul oscuro
        public static readonly Color PRIMARY_LIGHT = Color.FromRgb(174, 214, 241);       // Azul claro

        public static readonly Color SECONDARY_COLOR = Color.FromRgb(231, 76, 60);       // Rojo ESPE
        public static readonly Color SECONDARY_DARK = Color.FromRgb(192, 57, 43);        // Rojo oscuro
        public static readonly Color SECONDARY_LIGHT = Color.FromRgb(245, 183, 177);     // Rojo claro

        public static readonly Color SUCCESS_COLOR = Color.FromRgb(39, 174, 96);         // Verde éxito
        public static readonly Color WARNING_COLOR = Color.FromRgb(241, 196, 15);        // Amarillo advertencia
        public static readonly Color DANGER_COLOR = Color.FromRgb(231, 76, 60);          // Rojo peligro
        public static readonly Color INFO_COLOR = Color.FromRgb(52, 152, 219);           // Azul información

        // ========== COLORES NEUTRALES ==========
        public static readonly Color WHITE = Colors.White;
        public static readonly Color LIGHT_GRAY = Color.FromRgb(248, 249, 250);
        public static readonly Color MEDIUM_GRAY = Color.FromRgb(108, 117, 125);
        public static readonly Color DARK_GRAY = Color.FromRgb(52, 58, 64);
        public static readonly Color BLACK = Color.FromRgb(33, 37, 41);
        public static readonly Color TEXT_PRIMARY = BLACK;
        public static readonly Color TEXT_SECONDARY = MEDIUM_GRAY;

        // ========== COLORES DE FONDO ==========
        public static readonly Color BACKGROUND_MAIN = LIGHT_GRAY;
        public static readonly Color BACKGROUND_PANEL = WHITE;
        public static readonly Color BACKGROUND_HEADER = PRIMARY_COLOR;
        public static readonly Color BACKGROUND_SIDEBAR = Color.FromRgb(73, 80, 87);

        // ========== TAMAÑOS DE FUENTE (adaptados para móvil) ==========
        public const double FONT_SIZE_TITLE = 20;
        public const double FONT_SIZE_SUBTITLE = 16;
        public const double FONT_SIZE_LABEL = 14;
        public const double FONT_SIZE_BUTTON = 14;
        public const double FONT_SIZE_BODY = 13;
        public const double FONT_SIZE_CAPTION = 12;

        // ========== DIMENSIONES MÓVIL ==========
        public const double BUTTON_HEIGHT = 50;
        public const double INPUT_HEIGHT = 45;
        public const double CARD_CORNER_RADIUS = 12;
        public const double PADDING_SMALL = 8;
        public const double PADDING_MEDIUM = 16;
        public const double PADDING_LARGE = 24;
        public const double MARGIN_SMALL = 4;
        public const double MARGIN_MEDIUM = 8;
        public const double MARGIN_LARGE = 16;

        // ========== ÍCONOS ==========
        public const string ICON_HOME = "🏠";
        public const string ICON_PRODUCTS = "📦";
        public const string ICON_INVOICE = "🧾";
        public const string ICON_CREDIT = "💳";
        public const string ICON_SETTINGS = "⚙️";
        public const string ICON_ADD = "➕";
        public const string ICON_EDIT = "✏️";
        public const string ICON_DELETE = "🗑️";
        public const string ICON_SAVE = "💾";
        public const string ICON_CANCEL = "❌";
        public const string ICON_SEARCH = "🔍";
        public const string ICON_REFRESH = "🔄";
        public const string ICON_CHECK = "✅";
        public const string ICON_ERROR = "❌";
        public const string ICON_WARNING = "⚠️";
        public const string ICON_INFO = "ℹ️";
        public const string ICON_LOADING = "⏳";

        // ========== TÍTULOS Y TEXTOS ==========
        public const string APP_TITLE = "ESPE - Comercializadora";
        public const string APP_SUBTITLE = "Electrodomésticos";
        public const string APP_VERSION = "v1.0.0";
        public const string COMPANY_NAME = "Escuela Politécnica Nacional del Ejército";

        // ========== MENSAJES ==========
        public const string MSG_LOADING = "Cargando...";
        public const string MSG_CONNECTING = "Conectando con el servidor...";
        public const string MSG_SUCCESS = "Operación completada exitosamente";
        public const string MSG_ERROR = "Ha ocurrido un error";
        public const string MSG_CONFIRM = "¿Está seguro de realizar esta operación?";
        public const string MSG_NO_DATA = "No hay datos disponibles";
        public const string MSG_NO_CONNECTION = "Sin conexión a internet";

        // ========== MÉTODOS PARA PROTOCOLO ==========

        /// <summary>
        /// Obtiene el color asociado al protocolo
        /// </summary>
        public static Color GetProtocolColor(Models.TipoProtocolo protocol)
        {
            return protocol switch
            {
                Models.TipoProtocolo.REST => PRIMARY_COLOR,
                Models.TipoProtocolo.SOAP => SECONDARY_COLOR,
                _ => MEDIUM_GRAY
            };
        }

        /// <summary>
        /// Obtiene el nombre para mostrar del protocolo
        /// </summary>
        public static string GetProtocolDisplayName(Models.TipoProtocolo protocol)
        {
            return protocol switch
            {
                Models.TipoProtocolo.REST => "REST (Java)",
                Models.TipoProtocolo.SOAP => "SOAP (.NET)",
                _ => "Desconocido"
            };
        }

        /// <summary>
        /// Obtiene el icono del protocolo
        /// </summary>
        public static string GetProtocolIcon(Models.TipoProtocolo protocol)
        {
            return protocol switch
            {
                Models.TipoProtocolo.REST => "🔄",
                Models.TipoProtocolo.SOAP => "🔗",
                _ => "❓"
            };
        }

        // ========== HELPER METHODS ==========

        /// <summary>
        /// Crea un color con transparencia
        /// </summary>
        public static Color WithAlpha(Color color, float alpha)
        {
            return Color.FromRgba(color.Red, color.Green, color.Blue, alpha);
        }

        /// <summary>
        /// Crea un color más oscuro
        /// </summary>
        public static Color DarkerColor(Color color, float factor = 0.8f)
        {
            return Color.FromRgb(
                Math.Max(0, (int)(color.Red * 255 * factor)),
                Math.Max(0, (int)(color.Green * 255 * factor)),
                Math.Max(0, (int)(color.Blue * 255 * factor))
            );
        }

        /// <summary>
        /// Crea un color más claro
        /// </summary>
        public static Color LighterColor(Color color, float factor = 0.2f)
        {
            return Color.FromRgb(
                Math.Min(255, (int)(color.Red * 255 + (255 - color.Red * 255) * factor)),
                Math.Min(255, (int)(color.Green * 255 + (255 - color.Green * 255) * factor)),
                Math.Min(255, (int)(color.Blue * 255 + (255 - color.Blue * 255) * factor))
            );
        }

        /// <summary>
        /// Obtiene un color para estado (éxito/error)
        /// </summary>
        public static Color GetStatusColor(bool success)
        {
            return success ? SUCCESS_COLOR : DANGER_COLOR;
        }

        /// <summary>
        /// Obtiene un icono para estado (éxito/error)
        /// </summary>
        public static string GetStatusIcon(bool success)
        {
            return success ? ICON_CHECK : ICON_ERROR;
        }

        /// <summary>
        /// Convierte bool a texto de estado
        /// </summary>
        public static string BoolToStatusText(bool value, string textTrue = "Activo", string textFalse = "Inactivo")
        {
            return value ? $"✅ {textTrue}" : $"❌ {textFalse}";
        }

        /// <summary>
        /// Formatea un precio a moneda
        /// </summary>
        public static string FormatPrice(decimal price)
        {
            return $"${price:F2}";
        }

        /// <summary>
        /// Formatea una fecha
        /// </summary>
        public static string FormatDate(DateTime date)
        {
            return date.ToString("dd/MM/yyyy HH:mm");
        }

        /// <summary>
        /// Formatea una fecha corta
        /// </summary>
        public static string FormatShortDate(DateTime date)
        {
            return date.ToString("dd/MM/yyyy");
        }
    }
}