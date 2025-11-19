using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Text.Json.Serialization;

namespace ClienteMovil.Models
{
    // ========== ENUMS ==========

    public enum TipoProtocolo
    {
        REST,
        SOAP
    }

    public enum TipoMensaje
    {
        Exito,
        Advertencia,
        Error,
        Informacion
    }

    // ========== ELECTRODOMÉSTICOS ==========

    public class Electrodomestico : INotifyPropertyChanged
    {
        [JsonPropertyName("idElectrodomestico")]
        public int IdElectrodomestico { get; set; }

        [JsonPropertyName("codigo")]
        public string Codigo { get; set; } = string.Empty;

        [JsonPropertyName("nombre")]
        public string Nombre { get; set; } = string.Empty;

        [JsonPropertyName("descripcion")]
        public string Descripcion { get; set; } = string.Empty;

        [JsonPropertyName("marca")]
        public string Marca { get; set; } = string.Empty;

        [JsonPropertyName("precioVenta")]
        public decimal PrecioVenta { get; set; }

        [JsonPropertyName("stock")]
        public int Stock { get; set; }

        [JsonPropertyName("activo")]
        public bool Activo { get; set; } = true;

        [JsonPropertyName("estado")]
        public string Estado { get; set; } = "DISPONIBLE";

        // Propiedades calculadas para UI
        public string NombreCompleto => $"{Nombre} ({Marca})";
        public string DescripcionCompleta => $"{Codigo} - {Nombre} ({Marca}) - ${PrecioVenta:F2}";
        public string DisplayText => $"{Nombre} - {Marca} (${PrecioVenta:F2})";
        public string PrecioFormateado => $"${PrecioVenta:F2}";
        public string StockInfo => Stock > 0 ? $"{Stock} disponibles" : "Sin stock";
        public string EstadoTexto => Activo ? "Activo" : "Inactivo";
        public Color EstadoColor => Activo ? Utils.UIConstants.SUCCESS_COLOR : Utils.UIConstants.DANGER_COLOR;

        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }

    // ========== FACTURACIÓN ==========

    public class SolicitudVenta
    {
        [JsonPropertyName("cedulaCliente")]
        public string CedulaCliente { get; set; } = string.Empty;

        [JsonPropertyName("nombreCliente")]
        public string NombreCliente { get; set; } = string.Empty;

        [JsonPropertyName("items")]
        public List<ItemVenta> Items { get; set; } = new List<ItemVenta>();

        [JsonPropertyName("numeroCuotas")]
        public int? NumeroCuotas { get; set; }

        // Propiedades calculadas
        public decimal Total => Items.Sum(item => item.Subtotal);
        public int TotalItems => Items.Sum(item => item.Cantidad);
    }

    public partial class ItemVenta : INotifyPropertyChanged
    {
        private int _idElectrodomestico;
        private int _cantidad;
        private decimal _precio;
        private Electrodomestico _producto;

        [JsonPropertyName("idElectrodomestico")]
        public int IdElectrodomestico
        {
            get => _idElectrodomestico;
            set => SetProperty(ref _idElectrodomestico, value);
        }

        [JsonPropertyName("cantidad")]
        public int Cantidad
        {
            get => _cantidad;
            set
            {
                if (SetProperty(ref _cantidad, value))
                {
                    OnPropertyChanged(nameof(Subtotal));
                    OnPropertyChanged(nameof(SubtotalFormateado));
                }
            }
        }

        [JsonPropertyName("precio")]
        public decimal Precio
        {
            get => _precio;
            set
            {
                if (SetProperty(ref _precio, value))
                {
                    OnPropertyChanged(nameof(Subtotal));
                    OnPropertyChanged(nameof(SubtotalFormateado));
                }
            }
        }

        // Propiedad para binding (no se serializa)
        [JsonIgnore]
        public Electrodomestico Producto
        {
            get => _producto;
            set => SetProperty(ref _producto, value);
        }

        // Propiedades calculadas
        public decimal Subtotal => Cantidad * Precio;
        public string SubtotalFormateado => $"${Subtotal:F2}";
        public string PrecioFormateado => $"${Precio:F2}";
        public string Descripcion => $"{Producto?.NombreCompleto ?? "Producto"} x {Cantidad}";

        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        protected bool SetProperty<T>(ref T backingStore, T value, [CallerMemberName] string propertyName = "")
        {
            if (EqualityComparer<T>.Default.Equals(backingStore, value))
                return false;

            backingStore = value;
            OnPropertyChanged(propertyName);
            return true;
        }
    }

    public class RespuestaVenta
    {
        [JsonPropertyName("exito")]
        public bool Exito { get; set; }

        [JsonPropertyName("mensaje")]
        public string Mensaje { get; set; } = string.Empty;

        [JsonPropertyName("idFactura")]
        public int? IdFactura { get; set; }

        [JsonPropertyName("idCredito")]
        public int? IdCredito { get; set; }

        [JsonPropertyName("total")]
        public decimal Total { get; set; }

        [JsonPropertyName("cuotaMensual")]
        public decimal? CuotaMensual { get; set; }

        [JsonPropertyName("numeroCuotas")]
        public int? NumeroCuotas { get; set; }

        // Propiedades para UI
        public string CuotaFormateada => CuotaMensual.HasValue ? $"${CuotaMensual:F2}" : "N/A";
        public string EstadoTexto => Exito ? "Exitosa" : "Fallida";
        public Color EstadoColor => Exito ? Utils.UIConstants.SUCCESS_COLOR : Utils.UIConstants.DANGER_COLOR;
        public string TotalFormateado => $"${Total:F2}";
    }

    // ========== CRÉDITO BANQUITO ==========

    public class ValidacionCredito
    {
        [JsonPropertyName("sujetoCredito")]
        public bool SujetoCredito { get; set; }

        [JsonPropertyName("mensaje")]
        public string Mensaje { get; set; } = string.Empty;

        [JsonPropertyName("idCliente")]
        public int? IdCliente { get; set; }

        [JsonPropertyName("nombreCliente")]
        public string NombreCliente { get; set; } = string.Empty;

        // Para UI
        public string EstadoTexto => SujetoCredito ? "APROBADO" : "RECHAZADO";
        public Color EstadoColor => SujetoCredito ? Utils.UIConstants.SUCCESS_COLOR : Utils.UIConstants.DANGER_COLOR;
        public string IconoEstado => SujetoCredito ? "✅" : "❌";
    }

    public class MontoMaximo
    {
        [JsonPropertyName("aprobado")]
        public bool Aprobado { get; set; }

        [JsonPropertyName("montoMaximoCalculado")]
        public decimal MontoMaximoCalculado { get; set; }

        [JsonPropertyName("promedioDepositos")]
        public decimal PromedioDepositos { get; set; }

        [JsonPropertyName("promedioRetiros")]
        public decimal PromedioRetiros { get; set; }

        [JsonPropertyName("capacidadPago")]
        public decimal CapacidadPago { get; set; }

        [JsonPropertyName("mensaje")]
        public string Mensaje { get; set; } = string.Empty;

        // Para UI
        public string MontoFormateado => $"${MontoMaximoCalculado:F2}";
        public string EstadoTexto => Aprobado ? "APROBADO" : "RECHAZADO";
        public Color EstadoColor => Aprobado ? Utils.UIConstants.SUCCESS_COLOR : Utils.UIConstants.DANGER_COLOR;
    }

    public class TablaAmortizacion
    {
        [JsonPropertyName("encontrado")]
        public bool Encontrado { get; set; }

        [JsonPropertyName("idCredito")]
        public int IdCredito { get; set; }

        [JsonPropertyName("cedulaCliente")]
        public string CedulaCliente { get; set; } = string.Empty;

        [JsonPropertyName("montoCredito")]
        public decimal MontoCredito { get; set; }

        [JsonPropertyName("tasaInteres")]
        public decimal TasaInteres { get; set; }

        [JsonPropertyName("numeroCuotas")]
        public int NumeroCuotas { get; set; }

        [JsonPropertyName("fechaCredito")]
        public DateTime FechaCredito { get; set; }

        [JsonPropertyName("cuotas")]
        public List<CuotaAmortizacion> Cuotas { get; set; } = new List<CuotaAmortizacion>();

        [JsonPropertyName("mensaje")]
        public string Mensaje { get; set; } = string.Empty;

        // Para UI
        public string MontoCreditoFormateado => $"${MontoCredito:F2}";
        public string TasaFormateada => $"{TasaInteres * 100:F1}%";
        public string ResumenCredito => $"Crédito #{IdCredito} - {MontoCreditoFormateado} - {TasaFormateada} - {NumeroCuotas} cuotas";
    }

    public class CuotaAmortizacion
    {
        [JsonPropertyName("numeroCuota")]
        public int NumeroCuota { get; set; }

        [JsonPropertyName("valorCuota")]
        public decimal ValorCuota { get; set; }

        [JsonPropertyName("interesPagado")]
        public decimal InteresPagado { get; set; }

        [JsonPropertyName("capitalPagado")]
        public decimal CapitalPagado { get; set; }

        [JsonPropertyName("saldo")]
        public decimal Saldo { get; set; }

        [JsonPropertyName("fechaVencimiento")]
        public string FechaVencimiento { get; set; } = string.Empty;

        // Para UI
        public string ValorCuotaFormateado => $"${ValorCuota:F2}";
        public string InteresFormateado => $"${InteresPagado:F2}";
        public string CapitalFormateado => $"${CapitalPagado:F2}";
        public string SaldoFormateado => $"${Saldo:F2}";
        public string CuotaInfo => $"Cuota #{NumeroCuota}";
    }

    // ========== RESPUESTAS GENÉRICAS ==========

    public class RespuestaOperacion
    {
        [JsonPropertyName("exito")]
        public bool Exito { get; set; }

        [JsonPropertyName("mensaje")]
        public string Mensaje { get; set; } = string.Empty;

        // Para UI
        public Color EstadoColor => Exito ? Utils.UIConstants.SUCCESS_COLOR : Utils.UIConstants.DANGER_COLOR;
        public string IconoEstado => Exito ? "✅" : "❌";
    }

    public class TestConectividad
    {
        [JsonPropertyName("status")]
        public string Status { get; set; } = string.Empty;

        [JsonPropertyName("mensaje")]
        public string Mensaje { get; set; } = string.Empty;

        [JsonPropertyName("timestamp")]
        public string Timestamp { get; set; } = string.Empty;

        // Para UI
        public bool EsActivo => Status?.Equals("OK", StringComparison.OrdinalIgnoreCase) == true;
        public Color EstadoColor => EsActivo ? Utils.UIConstants.SUCCESS_COLOR : Utils.UIConstants.DANGER_COLOR;
        public string IconoEstado => EsActivo ? "🟢" : "🔴";
    }

    // ========== ESTADOS DE CONECTIVIDAD ==========

    public class EstadoConectividad
    {
        public bool ComercializadoraActiva { get; set; }
        public bool BanquitoActivo { get; set; }
        public TipoProtocolo ProtocoloActual { get; set; }
        public DateTime UltimaActualizacion { get; set; } = DateTime.Now;

        // Para UI
        public Color ColorComercializadora => ComercializadoraActiva ? Utils.UIConstants.SUCCESS_COLOR : Utils.UIConstants.DANGER_COLOR;
        public Color ColorBanquito => BanquitoActivo ? Utils.UIConstants.SUCCESS_COLOR : Utils.UIConstants.DANGER_COLOR;
        public string EstadoGeneral => (ComercializadoraActiva && BanquitoActivo) ? "Todos los servicios activos" : "Algunos servicios no disponibles";
        public Color ColorGeneral => (ComercializadoraActiva && BanquitoActivo) ? Utils.UIConstants.SUCCESS_COLOR : Utils.UIConstants.WARNING_COLOR;
    }

    // ========== CONFIGURACIÓN DE ENDPOINTS ==========

    public static class ConfiguracionEndpoints
    {
        // REST Endpoints (Java) - idénticos al cliente de escritorio
        public static class REST
        {
            public const string BASE_COMERCIALIZADORA = "http://localhost:8080/ComercializadoraElectrodomesticos/api";
            public const string BASE_BANQUITO = "http://localhost:8080/BanquitoCore/api/credito";

            // Electrodomésticos
            public const string ELECTRODOMESTICOS = BASE_COMERCIALIZADORA + "/electrodomesticos";
            public static string ElectrodomesticoPorId(int id) => $"{BASE_COMERCIALIZADORA}/electrodomesticos/{id}";

            // Facturación
            public const string VENTA_EFECTIVO = BASE_COMERCIALIZADORA + "/facturacion/venta-efectivo";
            public const string VENTA_CREDITO = BASE_COMERCIALIZADORA + "/facturacion/venta-credito";
            public static string TablaAmortizacionFactura(int idFactura) => $"{BASE_COMERCIALIZADORA}/facturacion/tabla-amortizacion/{idFactura}";

            // BanQuito
            public static string ValidarCredito(string cedula) => $"{BASE_BANQUITO}/validar/{cedula}";
            public static string MontoMaximo(string cedula) => $"{BASE_BANQUITO}/monto-maximo/{cedula}";
            public static string TablaAmortizacion(int idCredito) => $"{BASE_BANQUITO}/tabla-amortizacion/{idCredito}";
            public const string TEST_BANQUITO = BASE_BANQUITO + "/test";
        }

        // SOAP Endpoints (.NET) - para implementación futura
        public static class SOAP
        {
            public const string BASE_COMERCIALIZADORA = "http://localhost:5000/ElectrodomesticosService.asmx";
            public const string BASE_BANQUITO = "http://localhost:5001/CreditoService.asmx";
        }
    }

    // ========== CONFIGURACIÓN DE TIMEOUTS ==========

    public static class ConfiguracionTimeouts
    {
        public static readonly TimeSpan TIMEOUT_DEFAULT = TimeSpan.FromSeconds(30);
        public static readonly TimeSpan TIMEOUT_LARGO = TimeSpan.FromMinutes(2);
    }

    // ========== MENSAJES PREDEFINIDOS ==========

    public static class Mensajes
    {
        public const string ERROR_CONEXION = "Error de conexión con el servidor. Verifique que el servicio esté activo.";
        public const string ERROR_PROTOCOLO_NO_SOPORTADO = "Protocolo no soportado en esta versión.";
        public const string ERROR_TIMEOUT = "La operación tardó demasiado en completarse. Intente nuevamente.";
        public const string ERROR_DATOS_INVALIDOS = "Los datos proporcionados no son válidos.";
        public const string SERVICIO_NO_DISPONIBLE = "Servicio temporalmente no disponible. Intente más tarde.";
        public const string VENTA_EXITOSA = "Venta procesada exitosamente";
        public const string CREDITO_APROBADO = "Crédito aprobado correctamente";
        public const string CREDITO_RECHAZADO = "Crédito rechazado";
        public const string PRODUCTO_GUARDADO = "Producto guardado correctamente";
        public const string PRODUCTO_ELIMINADO = "Producto eliminado correctamente";
        public const string VALIDACION_CAMPOS = "Por favor complete todos los campos requeridos";
    }

    // ========== MODELOS ESPECÍFICOS PARA MOBILE ==========

    /// <summary>
    /// Modelo para elementos de menú de navegación
    /// </summary>
    public class MenuItem
    {
        public string Title { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public string Route { get; set; } = string.Empty;
        public Type TargetType { get; set; }
        public bool IsEnabled { get; set; } = true;
        public Color IconColor { get; set; } = Utils.UIConstants.TEXT_PRIMARY;
    }

    /// <summary>
    /// Modelo para notificaciones y mensajes de estado
    /// </summary>
    public class StatusMessage
    {
        public string Mensaje { get; set; } = string.Empty;
        public TipoMensaje Tipo { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
        public TimeSpan Duracion { get; set; } = TimeSpan.FromSeconds(3);

        public Color ColorFondo => Tipo switch
        {
            TipoMensaje.Exito => Utils.UIConstants.SUCCESS_COLOR,
            TipoMensaje.Advertencia => Utils.UIConstants.WARNING_COLOR,
            TipoMensaje.Error => Utils.UIConstants.DANGER_COLOR,
            TipoMensaje.Informacion => Utils.UIConstants.INFO_COLOR,
            _ => Utils.UIConstants.TEXT_PRIMARY
        };

        public string Icono => Tipo switch
        {
            TipoMensaje.Exito => "✅",
            TipoMensaje.Advertencia => "⚠️",
            TipoMensaje.Error => "❌",
            TipoMensaje.Informacion => "ℹ️",
            _ => "📝"
        };
    }

    /// <summary>
    /// Configuración de la aplicación móvil
    /// </summary>
    public class ConfiguracionApp
    {
        public bool ActualizacionAutomatica { get; set; } = true;
        public TimeSpan IntervaloPruebas { get; set; } = TimeSpan.FromSeconds(30);
        public TipoProtocolo ProtocoloPreferido { get; set; } = TipoProtocolo.REST;
        public bool MostrarNotificaciones { get; set; } = true;
        public bool GuardarLogLocal { get; set; } = true;
        public int MaximoEntradasLog { get; set; } = 100;
    }

    // ========== HELPERS PARA BINDING ==========

    /// <summary>
    /// Convertidores estáticos para usar en XAML
    /// </summary>
    public static class ValueConverters
    {
        public static readonly Func<bool, string> BoolToStringConverter =
            (valor) => valor ? "✅ Activo" : "❌ Inactivo";

        public static readonly Func<bool, Color> BoolToColorConverter =
            (valor) => valor ? Utils.UIConstants.SUCCESS_COLOR : Utils.UIConstants.DANGER_COLOR;

        public static readonly Func<decimal, string> PrecioConverter =
            (precio) => $"${precio:F2}";

        public static readonly Func<int, string> StockConverter =
            (stock) => $"{stock} unidades";

        public static readonly Func<TipoProtocolo, string> ProtocoloConverter =
            (protocolo) => Utils.UIConstants.GetProtocolDisplayName(protocolo);

        public static readonly Func<TipoProtocolo, Color> ProtocoloColorConverter =
            (protocolo) => Utils.UIConstants.GetProtocolColor(protocolo);

        public static readonly Func<string, Color> LogColorConverter = (logEntry) =>
        {
            if (logEntry.Contains("✅") || logEntry.Contains("exitosamente"))
                return Utils.UIConstants.SUCCESS_COLOR;

            if (logEntry.Contains("❌") || logEntry.Contains("Error"))
                return Utils.UIConstants.DANGER_COLOR;

            if (logEntry.Contains("⚠️") || logEntry.Contains("⏸️"))
                return Utils.UIConstants.WARNING_COLOR;

            if (logEntry.Contains("🔍") || logEntry.Contains("🔄"))
                return Utils.UIConstants.INFO_COLOR;

            return Utils.UIConstants.TEXT_PRIMARY;
        };

        public static readonly Func<int, Color> CuotaColorConverter =
            (numeroCuota) => numeroCuota % 2 == 0 ? Utils.UIConstants.LIGHT_GRAY : Colors.White;
    }

    // ========== EXTENSIONES DE MODELOS ==========

    public static class ModelExtensions
    {
        public static string FormatearPrecio(this decimal precio) => $"${precio:F2}";
        public static string FormatearFecha(this DateTime fecha) => fecha.ToString("dd/MM/yyyy HH:mm");
        public static string FormatearFechaCorta(this DateTime fecha) => fecha.ToString("dd/MM/yyyy");
        public static Color ObtenerColorEstado(this bool activo) => activo ? Utils.UIConstants.SUCCESS_COLOR : Utils.UIConstants.DANGER_COLOR;
        public static string ObtenerTextoEstado(this bool activo) => activo ? "✅ Activo" : "❌ Inactivo";
    }

    // ========== COMANDOS PARA MVVM ==========

    public class RelayCommand : System.Windows.Input.ICommand
    {
        private readonly Action _execute;
        private readonly Func<bool> _canExecute;

        public RelayCommand(Action execute, Func<bool> canExecute = null)
        {
            _execute = execute ?? throw new ArgumentNullException(nameof(execute));
            _canExecute = canExecute;
        }

        public event EventHandler CanExecuteChanged;

        public bool CanExecute(object parameter) => _canExecute?.Invoke() ?? true;
        public void Execute(object parameter) => _execute();
        public void RaiseCanExecuteChanged() => CanExecuteChanged?.Invoke(this, EventArgs.Empty);
    }

    public class RelayCommand<T> : System.Windows.Input.ICommand
    {
        private readonly Action<T> _execute;
        private readonly Func<T, bool> _canExecute;

        public RelayCommand(Action<T> execute, Func<T, bool> canExecute = null)
        {
            _execute = execute ?? throw new ArgumentNullException(nameof(execute));
            _canExecute = canExecute;
        }

        public event EventHandler CanExecuteChanged;

        public bool CanExecute(object parameter) => parameter is T item && (_canExecute?.Invoke(item) ?? true);
        public void Execute(object parameter) { if (parameter is T item) _execute(item); }
        public void RaiseCanExecuteChanged() => CanExecuteChanged?.Invoke(this, EventArgs.Empty);
    }
}