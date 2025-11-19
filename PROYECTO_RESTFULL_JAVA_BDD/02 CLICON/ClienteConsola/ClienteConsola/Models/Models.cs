using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ClienteConsola.Models
{
    // ========== ENUMS ==========

    public enum TipoProtocolo
    {
        REST,
        SOAP
    }

    // ========== ELECTRODOMÉSTICOS ==========

    public class Electrodomestico
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
        public double PrecioVenta { get; set; }

        [JsonPropertyName("stock")]
        public int Stock { get; set; }

        [JsonPropertyName("estado")]
        public string Estado { get; set; } = "DISPONIBLE";
    }

    // ========== FACTURACIÓN ==========

    public class SolicitudVenta
    {
        [JsonPropertyName("cedula")]
        public string Cedula { get; set; } = string.Empty;

        [JsonPropertyName("nombreCliente")]
        public string NombreCliente { get; set; } = string.Empty;

        [JsonPropertyName("items")]
        public List<ItemVenta> Items { get; set; } = new List<ItemVenta>();

        [JsonPropertyName("numeroCuotas")]
        public int NumeroCuotas { get; set; }
    }

    public class ItemVenta
    {
        [JsonPropertyName("idElectrodomestico")]
        public int IdElectrodomestico { get; set; }

        [JsonPropertyName("cantidad")]
        public int Cantidad { get; set; }

        [JsonPropertyName("precio")]
        public double Precio { get; set; }
    }

    public class RespuestaVenta
    {
        [JsonPropertyName("exito")]
        public bool Exito { get; set; }

        [JsonPropertyName("idFactura")]
        public int IdFactura { get; set; }

        [JsonPropertyName("idCreditoBanco")]
        public int IdCreditoBanco { get; set; }

        [JsonPropertyName("cuotaMensual")]
        public double CuotaMensual { get; set; }

        [JsonPropertyName("numeroCuotas")]
        public int NumeroCuotas { get; set; }

        [JsonPropertyName("mensaje")]
        public string Mensaje { get; set; } = string.Empty;
    }

    // ========== CRÉDITO BANQUITO ==========

    public class ValidacionCreditoResponse
    {
        [JsonPropertyName("sujetoCredito")]
        public bool SujetoCredito { get; set; }

        [JsonPropertyName("mensaje")]
        public string Mensaje { get; set; } = string.Empty;

        [JsonPropertyName("idCliente")]
        public int IdCliente { get; set; }
    }

    public class MontoMaximoResponse
    {
        [JsonPropertyName("aprobado")]
        public bool Aprobado { get; set; }

        [JsonPropertyName("montoMaximo")]
        public double MontoMaximo { get; set; }

        [JsonPropertyName("mensaje")]
        public string Mensaje { get; set; } = string.Empty;
    }

    public class TablaAmortizacionResponse
    {
        [JsonPropertyName("encontrado")]
        public bool Encontrado { get; set; }

        [JsonPropertyName("idCredito")]
        public int IdCredito { get; set; }

        [JsonPropertyName("montoCredito")]
        public double MontoCredito { get; set; }

        [JsonPropertyName("tasaInteres")]
        public double TasaInteres { get; set; }

        [JsonPropertyName("numeroCuotas")]
        public int NumeroCuotas { get; set; }

        [JsonPropertyName("cuotas")]
        public List<CuotaAmortizacion> Cuotas { get; set; } = new List<CuotaAmortizacion>();

        [JsonPropertyName("mensaje")]
        public string Mensaje { get; set; } = string.Empty;
    }

    public class CuotaAmortizacion
    {
        [JsonPropertyName("numeroCuota")]
        public int NumeroCuota { get; set; }

        [JsonPropertyName("valorCuota")]
        public double ValorCuota { get; set; }

        [JsonPropertyName("interesPagado")]
        public double InteresPagado { get; set; }

        [JsonPropertyName("capitalPagado")]
        public double CapitalPagado { get; set; }

        [JsonPropertyName("saldo")]
        public double Saldo { get; set; }

        [JsonPropertyName("fechaVencimiento")]
        public string FechaVencimiento { get; set; } = string.Empty;
    }

    // ========== RESPUESTAS GENÉRICAS ==========

    public class RespuestaOperacion
    {
        [JsonPropertyName("exito")]
        public bool Exito { get; set; }

        [JsonPropertyName("mensaje")]
        public string Mensaje { get; set; } = string.Empty;
    }

    public class TestConectividadResponse
    {
        [JsonPropertyName("status")]
        public string Status { get; set; } = string.Empty;

        [JsonPropertyName("mensaje")]
        public string Mensaje { get; set; } = string.Empty;

        [JsonPropertyName("timestamp")]
        public string Timestamp { get; set; } = string.Empty;
    }

    // ========== ESTADOS DE CONECTIVIDAD ==========

    public class EstadoConectividad
    {
        public bool ComercializadoraActiva { get; set; }
        public bool BanquitoActivo { get; set; }
        public TipoProtocolo ProtocoloActual { get; set; }
        public string UltimaActualizacion { get; set; } = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
    }

    // ========== CONFIGURACIÓN DE ENDPOINTS ==========

    public class ConfiguracionEndpoints
    {
        // REST Endpoints (Java)
        public static class REST
        {
            public const string BASE_COMERCIALIZADORA = "http://localhost:8080/ComercializadoraElectrodomesticos/api";
            public const string BASE_BANQUITO = "http://localhost:8080/BanquitoCore/api/credito";

            // Electrodomésticos
            public const string ELECTRODOMESTICOS = BASE_COMERCIALIZADORA + "/electrodomesticos";
            public const string ELECTRODOMESTICO_POR_ID = BASE_COMERCIALIZADORA + "/electrodomesticos/{0}";

            // Facturación
            public const string VENTA_EFECTIVO = BASE_COMERCIALIZADORA + "/facturacion/venta-efectivo";
            public const string VENTA_CREDITO = BASE_COMERCIALIZADORA + "/facturacion/venta-credito";
            public const string TABLA_AMORTIZACION_FACTURA = BASE_COMERCIALIZADORA + "/facturacion/tabla-amortizacion/{0}";

            // BanQuito
            public const string VALIDAR_CREDITO = BASE_BANQUITO + "/validar/{0}";
            public const string MONTO_MAXIMO = BASE_BANQUITO + "/monto-maximo/{0}";
            public const string TABLA_AMORTIZACION = BASE_BANQUITO + "/tabla-amortizacion/{0}";
            public const string TEST_BANQUITO = BASE_BANQUITO + "/test";
        }

        // SOAP Endpoints (.NET) - ¡AHORA IMPLEMENTADOS!
        public static class SOAP
        {
            public const string BASE_COMERCIALIZADORA = "http://localhost:58002/ec.edu.monster.ws/ComercializadoraWS.svc";
            public const string BASE_BANQUITO = "http://localhost:58001/ec.edu.monster.ws/BanQuitoWS.svc";

            // WSDLs de documentación
            public const string WSDL_COMERCIALIZADORA = BASE_COMERCIALIZADORA + "?wsdl";
            public const string WSDL_BANQUITO = BASE_BANQUITO + "?wsdl";
        }
    }

    // ========== CONFIGURACIÓN DE TIMEOUTS ==========

    public static class ConfiguracionTimeouts
    {
        public static readonly TimeSpan TIMEOUT_DEFAULT = TimeSpan.FromSeconds(30);
        public static readonly TimeSpan TIMEOUT_LARGO = TimeSpan.FromMinutes(2);
        public static readonly TimeSpan TIMEOUT_SOAP = TimeSpan.FromSeconds(45); // SOAP puede ser más lento
    }

    // ========== MENSAJES PREDEFINIDOS ==========

    public static class Mensajes
    {
        public const string ERROR_CONEXION = "Error de conexión con el servidor. Verifique que el servicio esté activo.";
        public const string ERROR_PROTOCOLO_NO_SOPORTADO = "Protocolo no soportado en esta versión.";
        public const string ERROR_TIMEOUT = "La operación tardó demasiado en completarse. Intente nuevamente.";
        public const string ERROR_DATOS_INVALIDOS = "Los datos proporcionados no son válidos.";
        public const string SERVICIO_NO_DISPONIBLE = "Servicio temporalmente no disponible. Intente más tarde.";
        public const string SOAP_PARSEO_ERROR = "Error al procesar la respuesta SOAP.";
        public const string SOAP_CONEXION_ERROR = "Error de conexión con el servicio SOAP.";
    }
}