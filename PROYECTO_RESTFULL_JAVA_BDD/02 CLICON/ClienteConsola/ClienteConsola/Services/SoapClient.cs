using ClienteConsola.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace ClienteConsola.Services
{
    /// <summary>
    /// Cliente SOAP corregido para los servicios .NET
    /// Parsing XML mejorado basado en los WSDLs reales
    /// </summary>
    public class SoapClient
    {
        private readonly HttpClient _httpClient;
        private readonly JsonSerializerOptions _jsonOptions;

        // Endpoints SOAP
        private const string BANQUITO_SOAP_URL = "http://localhost:58001/ec.edu.monster.ws/BanQuitoWS.svc";
        private const string COMERCIALIZADORA_SOAP_URL = "http://localhost:58002/ec.edu.monster.ws/ComercializadoraWS.svc";

        // Namespaces del WSDL
        private const string TEMPURI_NS = "http://tempuri.org/";
        private const string COMERCIALIZADORA_MODELS_NS = "http://schemas.datacontract.org/2004/07/Comercializadora_Soap_Dotnet.ec.edu.monster.modelo";
        private const string BANQUITO_MODELS_NS = "http://schemas.datacontract.org/2004/07/BanQuito_Soap_Dotnet.ec.edu.monster.modelo";

        public SoapClient()
        {
            _httpClient = new HttpClient
            {
                Timeout = ConfiguracionTimeouts.TIMEOUT_SOAP
            };

            _jsonOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                WriteIndented = true
            };
        }

        // ========== MÉTODOS SOAP PARA ELECTRODOMÉSTICOS ==========

        public async Task<List<Electrodomestico>?> ListarElectrodomesticosSOAP()
        {
            try
            {
                var soapEnvelope = $@"<?xml version=""1.0"" encoding=""utf-8""?>
<soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"" 
               xmlns:tem=""{TEMPURI_NS}"">
    <soap:Header />
    <soap:Body>
        <tem:ListarElectrodomesticos />
    </soap:Body>
</soap:Envelope>";

                var response = await SendSoapRequestAsync(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                    "http://tempuri.org/IComercializadoraWS/ListarElectrodomesticos");

                return ParseElectrodomesticosList(response);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error SOAP ListarElectrodomesticos: {ex.Message}");
                return null;
            }
        }

        public async Task<Electrodomestico?> ObtenerElectrodomesticoSOAP(int id)
        {
            try
            {
                var soapEnvelope = $@"<?xml version=""1.0"" encoding=""utf-8""?>
<soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"" 
               xmlns:tem=""{TEMPURI_NS}"">
    <soap:Header />
    <soap:Body>
        <tem:ObtenerElectrodomestico>
            <tem:id>{id}</tem:id>
        </tem:ObtenerElectrodomestico>
    </soap:Body>
</soap:Envelope>";

                var response = await SendSoapRequestAsync(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                    "http://tempuri.org/IComercializadoraWS/ObtenerElectrodomestico");

                return ParseSingleElectrodomestico(response);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error SOAP ObtenerElectrodomestico: {ex.Message}");
                return null;
            }
        }

        public async Task<RespuestaOperacion?> CrearElectrodomesticoSOAP(Electrodomestico electrodomestico)
        {
            try
            {
                var soapEnvelope = $@"<?xml version=""1.0"" encoding=""utf-8""?>
<soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"" 
               xmlns:tem=""{TEMPURI_NS}"">
    <soap:Header />
    <soap:Body>
        <tem:CrearElectrodomestico>
            <tem:nombre>{System.Security.SecurityElement.Escape(electrodomestico.Nombre)}</tem:nombre>
            <tem:descripcion>{System.Security.SecurityElement.Escape(electrodomestico.Descripcion)}</tem:descripcion>
            <tem:precio>{electrodomestico.PrecioVenta}</tem:precio>
        </tem:CrearElectrodomestico>
    </soap:Body>
</soap:Envelope>";

                var response = await SendSoapRequestAsync(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                    "http://tempuri.org/IComercializadoraWS/CrearElectrodomestico");

                return ParseStringToRespuestaOperacion(response, "CrearElectrodomestico");
            }
            catch (Exception ex)
            {
                return new RespuestaOperacion
                {
                    Exito = false,
                    Mensaje = $"Error SOAP CrearElectrodomestico: {ex.Message}"
                };
            }
        }

        public async Task<RespuestaOperacion?> ActualizarElectrodomesticoSOAP(int id, Electrodomestico electrodomestico)
        {
            try
            {
                var soapEnvelope = $@"<?xml version=""1.0"" encoding=""utf-8""?>
<soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"" 
               xmlns:tem=""{TEMPURI_NS}"">
    <soap:Header />
    <soap:Body>
        <tem:ActualizarElectrodomestico>
            <tem:id>{id}</tem:id>
            <tem:nombre>{System.Security.SecurityElement.Escape(electrodomestico.Nombre)}</tem:nombre>
            <tem:descripcion>{System.Security.SecurityElement.Escape(electrodomestico.Descripcion)}</tem:descripcion>
            <tem:precio>{electrodomestico.PrecioVenta}</tem:precio>
        </tem:ActualizarElectrodomestico>
    </soap:Body>
</soap:Envelope>";

                var response = await SendSoapRequestAsync(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                    "http://tempuri.org/IComercializadoraWS/ActualizarElectrodomestico");

                return ParseStringToRespuestaOperacion(response, "ActualizarElectrodomestico");
            }
            catch (Exception ex)
            {
                return new RespuestaOperacion
                {
                    Exito = false,
                    Mensaje = $"Error SOAP ActualizarElectrodomestico: {ex.Message}"
                };
            }
        }

        public async Task<RespuestaOperacion?> EliminarElectrodomesticoSOAP(int id)
        {
            try
            {
                var soapEnvelope = $@"<?xml version=""1.0"" encoding=""utf-8""?>
<soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"" 
               xmlns:tem=""{TEMPURI_NS}"">
    <soap:Header />
    <soap:Body>
        <tem:EliminarElectrodomestico>
            <tem:id>{id}</tem:id>
        </tem:EliminarElectrodomestico>
    </soap:Body>
</soap:Envelope>";

                var response = await SendSoapRequestAsync(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                    "http://tempuri.org/IComercializadoraWS/EliminarElectrodomestico");

                return ParseStringToRespuestaOperacion(response, "EliminarElectrodomestico");
            }
            catch (Exception ex)
            {
                return new RespuestaOperacion
                {
                    Exito = false,
                    Mensaje = $"Error SOAP EliminarElectrodomestico: {ex.Message}"
                };
            }
        }

        // ========== MÉTODOS SOAP PARA FACTURACIÓN ==========

        public async Task<RespuestaVenta?> ProcesarVentaEfectivoSOAP(SolicitudVenta solicitud)
        {
            try
            {
                // Formato correcto para WCF .NET con DataContract serialization
                var soapEnvelope = $@"<?xml version=""1.0"" encoding=""utf-8""?>
<soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"" 
               xmlns:tem=""{TEMPURI_NS}""
               xmlns:arr=""http://schemas.microsoft.com/2003/10/Serialization/Arrays"">
    <soap:Header />
    <soap:Body>
        <tem:ProcesarVentaEfectivo>
            <tem:cedula>{solicitud.Cedula}</tem:cedula>
            <tem:idsElectrodomesticos>
                {BuildWCFIntArray(solicitud.Items.ConvertAll(i => i.IdElectrodomestico))}
            </tem:idsElectrodomesticos>
            <tem:cantidades>
                {BuildWCFIntArray(solicitud.Items.ConvertAll(i => i.Cantidad))}
            </tem:cantidades>
        </tem:ProcesarVentaEfectivo>
    </soap:Body>
</soap:Envelope>";

                var response = await SendSoapRequestAsync(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                    "http://tempuri.org/IComercializadoraWS/ProcesarVentaEfectivo");

                return ParseRespuestaVenta(response);
            }
            catch (Exception ex)
            {
                return new RespuestaVenta
                {
                    Exito = false,
                    Mensaje = $"Error SOAP ProcesarVentaEfectivo: {ex.Message}"
                };
            }
        }

        public async Task<RespuestaVenta?> ProcesarVentaCreditoSOAP(SolicitudVenta solicitud)
        {
            try
            {
                // Formato correcto para WCF .NET con DataContract serialization
                var soapEnvelope = $@"<?xml version=""1.0"" encoding=""utf-8""?>
<soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"" 
               xmlns:tem=""{TEMPURI_NS}""
               xmlns:arr=""http://schemas.microsoft.com/2003/10/Serialization/Arrays"">
    <soap:Header />
    <soap:Body>
        <tem:ProcesarVentaCredito>
            <tem:cedula>{solicitud.Cedula}</tem:cedula>
            <tem:idsElectrodomesticos>
                {BuildWCFIntArray(solicitud.Items.ConvertAll(i => i.IdElectrodomestico))}
            </tem:idsElectrodomesticos>
            <tem:cantidades>
                {BuildWCFIntArray(solicitud.Items.ConvertAll(i => i.Cantidad))}
            </tem:cantidades>
            <tem:numeroCuotas>{solicitud.NumeroCuotas}</tem:numeroCuotas>
        </tem:ProcesarVentaCredito>
    </soap:Body>
</soap:Envelope>";

                var response = await SendSoapRequestAsync(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                    "http://tempuri.org/IComercializadoraWS/ProcesarVentaCredito");

                return ParseRespuestaVenta(response);
            }
            catch (Exception ex)
            {
                return new RespuestaVenta
                {
                    Exito = false,
                    Mensaje = $"Error SOAP ProcesarVentaCredito: {ex.Message}"
                };
            }
        }

        // ========== MÉTODOS SOAP PARA BANQUITO ==========

        public async Task<ValidacionCreditoResponse?> ValidarSujetoCreditoSOAP(string cedula)
        {
            try
            {
                var soapEnvelope = $@"<?xml version=""1.0"" encoding=""utf-8""?>
<soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"" 
               xmlns:tem=""{TEMPURI_NS}"">
    <soap:Header />
    <soap:Body>
        <tem:ValidarSujetoCredito>
            <tem:cedula>{cedula}</tem:cedula>
        </tem:ValidarSujetoCredito>
    </soap:Body>
</soap:Envelope>";

                var response = await SendSoapRequestAsync(BANQUITO_SOAP_URL, soapEnvelope,
                    "http://tempuri.org/IBanQuitoWS/ValidarSujetoCredito");

                return ParseValidacionCreditoResponse(response);
            }
            catch (Exception ex)
            {
                return new ValidacionCreditoResponse
                {
                    SujetoCredito = false,
                    Mensaje = $"Error SOAP ValidarSujetoCredito: {ex.Message}"
                };
            }
        }

        public async Task<MontoMaximoResponse?> ObtenerMontoMaximoSOAP(string cedula)
        {
            try
            {
                var soapEnvelope = $@"<?xml version=""1.0"" encoding=""utf-8""?>
<soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"" 
               xmlns:tem=""{TEMPURI_NS}"">
    <soap:Header />
    <soap:Body>
        <tem:ObtenerMontoMaximoCredito>
            <tem:cedula>{cedula}</tem:cedula>
        </tem:ObtenerMontoMaximoCredito>
    </soap:Body>
</soap:Envelope>";

                var response = await SendSoapRequestAsync(BANQUITO_SOAP_URL, soapEnvelope,
                    "http://tempuri.org/IBanQuitoWS/ObtenerMontoMaximoCredito");

                return ParseMontoMaximoResponse(response);
            }
            catch (Exception ex)
            {
                return new MontoMaximoResponse
                {
                    Aprobado = false,
                    Mensaje = $"Error SOAP ObtenerMontoMaximo: {ex.Message}"
                };
            }
        }

        public async Task<TablaAmortizacionResponse?> ObtenerTablaAmortizacionSOAP(int idCredito)
        {
            try
            {
                var soapEnvelope = $@"<?xml version=""1.0"" encoding=""utf-8""?>
<soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"" 
               xmlns:tem=""{TEMPURI_NS}"">
    <soap:Header />
    <soap:Body>
        <tem:ObtenerTablaAmortizacion>
            <tem:idCredito>{idCredito}</tem:idCredito>
        </tem:ObtenerTablaAmortizacion>
    </soap:Body>
</soap:Envelope>";

                var response = await SendSoapRequestAsync(BANQUITO_SOAP_URL, soapEnvelope,
                    "http://tempuri.org/IBanQuitoWS/ObtenerTablaAmortizacion");

                return ParseTablaAmortizacionResponse(response);
            }
            catch (Exception ex)
            {
                return new TablaAmortizacionResponse
                {
                    Encontrado = false,
                    Mensaje = $"Error SOAP ObtenerTablaAmortizacion: {ex.Message}"
                };
            }
        }

        public async Task<TablaAmortizacionResponse?> ConsultarTablaAmortizacionSOAP(int idFactura)
        {
            try
            {
                var soapEnvelope = $@"<?xml version=""1.0"" encoding=""utf-8""?>
<soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"" 
               xmlns:tem=""{TEMPURI_NS}"">
    <soap:Header />
    <soap:Body>
        <tem:ConsultarTablaAmortizacion>
            <tem:idFactura>{idFactura}</tem:idFactura>
        </tem:ConsultarTablaAmortizacion>
    </soap:Body>
</soap:Envelope>";

                var response = await SendSoapRequestAsync(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                    "http://tempuri.org/IComercializadoraWS/ConsultarTablaAmortizacion");

                return ParseTablaAmortizacionResponse(response);
            }
            catch (Exception ex)
            {
                return new TablaAmortizacionResponse
                {
                    Encontrado = false,
                    Mensaje = $"Error SOAP ConsultarTablaAmortizacion: {ex.Message}"
                };
            }
        }

        // ========== MÉTODOS AUXILIARES ==========

        private async Task<string> SendSoapRequestAsync(string url, string soapEnvelope, string soapAction)
        {
            try
            {
                var request = new HttpRequestMessage(HttpMethod.Post, url);
                request.Content = new StringContent(soapEnvelope, Encoding.UTF8, "text/xml");
                request.Headers.Add("SOAPAction", $"\"{soapAction}\"");

                var response = await _httpClient.SendAsync(request);
                var responseContent = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    throw new HttpRequestException($"SOAP Error: {response.StatusCode} - {responseContent}");
                }

                return responseContent;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error en SendSoapRequestAsync: {ex.Message}");
                throw;
            }
        }

        private string BuildIntArrayXml(List<int> values)
        {
            var sb = new StringBuilder();
            foreach (int value in values)
            {
                sb.Append($"<arr:int>{value}</arr:int>");
            }
            return sb.ToString();
        }

        private string BuildIntArrayXmlForMicrosoft(List<int> values)
        {
            var sb = new StringBuilder();
            foreach (int value in values)
            {
                sb.Append($"<tem:int>{value}</tem:int>");
            }
            return sb.ToString();
        }

        private string BuildWCFIntArray(List<int> values)
        {
            var sb = new StringBuilder();
            foreach (int value in values)
            {
                sb.Append($"<arr:int>{value}</arr:int>");
            }
            return sb.ToString();
        }

        // ========== MÉTODOS DE PARSING XML CORREGIDOS ==========

        private List<Electrodomestico>? ParseElectrodomesticosList(string xmlResponse)
        {
            try
            {
                var doc = XDocument.Parse(xmlResponse);
                var productos = new List<Electrodomestico>();

                // Buscar elementos de electrodoméstico con namespace "a:" 
                var electrodomesticos = doc.Descendants()
                    .Where(e => e.Name.LocalName == "electrodomestico") // ← minúscula como en el XML real
                    .ToList();

                foreach (var element in electrodomesticos)
                {
                    try
                    {
                        var electrodomestico = new Electrodomestico();

                        // Parsear elementos con namespace "a:" como en el XML real
                        electrodomestico.IdElectrodomestico = ParseIntElement(element, "IdElectrodomestico");
                        electrodomestico.Codigo = ParseStringElement(element, "Codigo");
                        electrodomestico.Nombre = ParseStringElement(element, "Nombre");
                        electrodomestico.Descripcion = ParseStringElement(element, "Descripcion");
                        electrodomestico.Marca = ParseStringElement(element, "Marca");

                        // Buscar "Precio" como en tu BD
                        electrodomestico.PrecioVenta = ParseDoubleElement(element, "Precio");
                        electrodomestico.Stock = ParseIntElement(element, "Stock");
                        electrodomestico.Estado = ParseStringElement(element, "Estado") ?? "ACTIVO"; // ← como en BD

                        productos.Add(electrodomestico);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"⚠️ Error parseando electrodoméstico individual: {ex.Message}");
                    }
                }

                // Si no hay "electrodomestico", buscar estructura directa en Result
                if (productos.Count == 0)
                {

                    var resultElement = doc.Descendants()
                        .FirstOrDefault(e => e.Name.LocalName.Contains("Result"));

                    if (resultElement != null)
                    {
                        var electrodomestico = new Electrodomestico
                        {
                            IdElectrodomestico = ParseIntElement(resultElement, "IdElectrodomestico"),
                            Codigo = ParseStringElement(resultElement, "Codigo"),
                            Nombre = ParseStringElement(resultElement, "Nombre"),
                            Descripcion = ParseStringElement(resultElement, "Descripcion"),
                            Marca = ParseStringElement(resultElement, "Marca"),
                            PrecioVenta = ParseDoubleElement(resultElement, "Precio"),
                            Stock = ParseIntElement(resultElement, "Stock"),
                            Estado = ParseStringElement(resultElement, "Estado") ?? "ACTIVO"
                        };

                        if (electrodomestico.IdElectrodomestico > 0)
                        {
                            productos.Add(electrodomestico);
                        }
                    }
                }

                return productos;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error parsing electrodomésticos list: {ex.Message}");
                return new List<Electrodomestico>();
            }
        }

        private Electrodomestico? ParseSingleElectrodomestico(string xmlResponse)
        {
            try
            {
                var list = ParseElectrodomesticosList(xmlResponse);
                return list?.FirstOrDefault();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error parsing single electrodoméstico: {ex.Message}");
                return null;
            }
        }

        private RespuestaOperacion? ParseStringToRespuestaOperacion(string xmlResponse, string operationName)
        {
            try
            {
                var doc = XDocument.Parse(xmlResponse);

                // Buscar el resultado de string de la operación
                var resultElement = doc.Descendants()
                    .FirstOrDefault(e => e.Name.LocalName.Contains("Result") ||
                                        e.Name.LocalName.Contains("Response") ||
                                        e.Name.LocalName == operationName + "Response");

                string mensaje = resultElement?.Value ?? "Operación completada";

                // Si el mensaje contiene palabras de éxito, considerar exitoso
                bool exito = mensaje.ToLower().Contains("exitosamente") ||
                            mensaje.ToLower().Contains("éxito") ||
                            mensaje.ToLower().Contains("creado") ||
                            mensaje.ToLower().Contains("actualizado") ||
                            mensaje.ToLower().Contains("eliminado");

                return new RespuestaOperacion
                {
                    Exito = exito,
                    Mensaje = mensaje
                };
            }
            catch (Exception ex)
            {
                return new RespuestaOperacion
                {
                    Exito = false,
                    Mensaje = $"Error parsing operación: {ex.Message}"
                };
            }
        }

        private RespuestaVenta? ParseRespuestaVenta(string xmlResponse)
        {
            try
            {

                var doc = XDocument.Parse(xmlResponse);

                // Buscar el elemento Result que contiene la RespuestaVenta
                var resultElement = doc.Descendants()
                    .FirstOrDefault(e => e.Name.LocalName.Contains("Result"));

                if (resultElement != null)
                {

                    var response = new RespuestaVenta
                    {
                        Exito = ParseBoolElement(resultElement, "Exitoso"),
                        Mensaje = ParseStringElement(resultElement, "Mensaje") ?? "",
                        IdFactura = ParseIntElement(resultElement, "IdFactura"),
                        IdCreditoBanco = ParseIntElement(resultElement, "IdCreditoBanco"),
                        CuotaMensual = ParseDoubleElement(resultElement, "CuotaMensual"),
                        NumeroCuotas = ParseIntElement(resultElement, "NumeroCuotas")
                    };

                    return response;
                }

                // Si no se encuentra Result, buscar directamente los elementos
                var bodyElements = doc.Descendants().ToList();

                // Buscar elementos específicos de RespuestaVenta
                var exitosoElements = bodyElements.Where(e => e.Name.LocalName.Contains("Exitoso")).ToList();
                var mensajeElements = bodyElements.Where(e => e.Name.LocalName.Contains("Mensaje")).ToList();
                var idFacturaElements = bodyElements.Where(e => e.Name.LocalName.Contains("IdFactura")).ToList();

                if (exitosoElements.Any() || mensajeElements.Any() || idFacturaElements.Any())
                {

                    return new RespuestaVenta
                    {
                        Exito = exitosoElements.Any() ? bool.Parse(exitosoElements.First().Value) : false,
                        Mensaje = mensajeElements.Any() ? mensajeElements.First().Value : "Sin información",
                        IdFactura = idFacturaElements.Any() ? int.Parse(idFacturaElements.First().Value) : 0,
                        IdCreditoBanco = 0,
                        CuotaMensual = 0,
                        NumeroCuotas = 0
                    };
                }

                throw new Exception("No se encontraron elementos de RespuestaVenta en la respuesta");
            }
            catch (Exception ex)
            {
                return new RespuestaVenta
                {
                    Exito = false,
                    Mensaje = $"Error parsing respuesta venta: {ex.Message}"
                };
            }
        }

        private ValidacionCreditoResponse? ParseValidacionCreditoResponse(string xmlResponse)
        {
            try
            {

                var doc = XDocument.Parse(xmlResponse);

                // Buscar el elemento Result que contiene la RespuestaValidacion
                var resultElement = doc.Descendants()
                    .FirstOrDefault(e => e.Name.LocalName.Contains("Result"));

                if (resultElement != null)
                {

                    var response = new ValidacionCreditoResponse
                    {
                        SujetoCredito = ParseBoolElement(resultElement, "EsSujetoCredito"),
                        Mensaje = ParseStringElement(resultElement, "Mensaje") ?? "Sin información",
                        IdCliente = 0 // No disponible en el WSDL
                    };

                    return response;
                }

                // Buscar directamente en el Body por si está estructurado diferente
                var bodyElements = doc.Descendants()
                    .Where(e => e.Name.LocalName.Contains("EsSujetoCredito") ||
                               e.Name.LocalName.Contains("Mensaje"))
                    .ToList();

                if (bodyElements.Any())
                {

                    var esSujeto = bodyElements.FirstOrDefault(e => e.Name.LocalName.Contains("EsSujetoCredito"));
                    var mensaje = bodyElements.FirstOrDefault(e => e.Name.LocalName.Contains("Mensaje"));

                    return new ValidacionCreditoResponse
                    {
                        SujetoCredito = esSujeto != null && bool.Parse(esSujeto.Value),
                        Mensaje = mensaje?.Value ?? "Información no disponible",
                        IdCliente = 0
                    };
                }

                throw new Exception("No se encontraron elementos de validación en la respuesta");
            }
            catch (Exception ex)
            {
                return new ValidacionCreditoResponse
                {
                    SujetoCredito = false,
                    Mensaje = $"Error parsing validación crédito: {ex.Message}"
                };
            }
        }

        private MontoMaximoResponse? ParseMontoMaximoResponse(string xmlResponse)
        {
            try
            {

                var doc = XDocument.Parse(xmlResponse);

                // Buscar el valor directo (double) retornado en el elemento Result
                var resultElement = doc.Descendants()
                    .FirstOrDefault(e => e.Name.LocalName.Contains("Result"));

                if (resultElement != null)
                {

                    if (double.TryParse(resultElement.Value, out double monto))
                    {
                        var response = new MontoMaximoResponse
                        {
                            Aprobado = monto > 0,
                            MontoMaximo = monto,
                            Mensaje = monto > 0 ? $"Monto máximo aprobado: ${monto:F2}" : "No se pudo calcular el monto máximo"
                        };

                        return response;
                    }
                }

                throw new Exception("No se pudo obtener el monto máximo de la respuesta");
            }
            catch (Exception ex)
            {
                return new MontoMaximoResponse
                {
                    Aprobado = false,
                    MontoMaximo = 0,
                    Mensaje = $"Error parsing monto máximo: {ex.Message}"
                };
            }
        }

        private TablaAmortizacionResponse? ParseTablaAmortizacionResponse(string xmlResponse)
        {
            try
            {
                var doc = XDocument.Parse(xmlResponse);

                // Buscar tanto elementos TablaAmortizacion como elementos individuales de cuotas
                var tablaElements = doc.Descendants()
                    .Where(e => e.Name.LocalName == "TablaAmortizacion" ||
                               e.Name.LocalName == "tablaAmortizacion")
                    .ToList();

                var response = new TablaAmortizacionResponse
                {
                    Encontrado = false,
                    Cuotas = new List<CuotaAmortizacion>()
                };

                // Si encontramos elementos TablaAmortizacion directamente
                if (tablaElements.Any())
                {
                    foreach (var tablaElement in tablaElements)
                    {
                        var cuota = new CuotaAmortizacion
                        {
                            NumeroCuota = ParseIntElement(tablaElement, "NumeroCuota"),
                            ValorCuota = ParseDoubleElement(tablaElement, "ValorCuota"),
                            InteresPagado = ParseDoubleElement(tablaElement, "Interes"),
                            CapitalPagado = ParseDoubleElement(tablaElement, "CapitalPagado"),
                            Saldo = ParseDoubleElement(tablaElement, "Saldo"),
                            FechaVencimiento = DateTime.Now.AddMonths(ParseIntElement(tablaElement, "NumeroCuota")).ToString("yyyy-MM-dd")
                        };

                        if (cuota.NumeroCuota > 0)
                        {
                            response.Cuotas.Add(cuota);
                        }
                    }
                }
                else
                {
                    // Buscar en un elemento Result que contenga un array
                    var resultElement = doc.Descendants()
                        .FirstOrDefault(e => e.Name.LocalName.Contains("Result"));

                    if (resultElement != null)
                    {
                        // Buscar elementos de cuotas dentro del Result
                        var cuotaElements = resultElement.Descendants()
                            .Where(e => e.Name.LocalName == "TablaAmortizacion" ||
                                       e.Name.LocalName == "tablaAmortizacion")
                            .ToList();

                        foreach (var cuotaElement in cuotaElements)
                        {
                            var cuota = new CuotaAmortizacion
                            {
                                NumeroCuota = ParseIntElement(cuotaElement, "NumeroCuota"),
                                ValorCuota = ParseDoubleElement(cuotaElement, "ValorCuota"),
                                InteresPagado = ParseDoubleElement(cuotaElement, "Interes", "InteresPagado"),
                                CapitalPagado = ParseDoubleElement(cuotaElement, "CapitalPagado"),
                                Saldo = ParseDoubleElement(cuotaElement, "Saldo"),
                                FechaVencimiento = DateTime.Now.AddMonths(ParseIntElement(cuotaElement, "NumeroCuota")).ToString("yyyy-MM-dd")
                            };

                            if (cuota.NumeroCuota > 0)
                            {
                                response.Cuotas.Add(cuota);
                            }
                        }
                    }
                }

                // Configurar respuesta final
                if (response.Cuotas.Any())
                {
                    response.Encontrado = true;
                    response.IdCredito = 1; // No disponible en WSDL, valor por defecto
                    response.MontoCredito = response.Cuotas.Sum(c => c.CapitalPagado);
                    response.TasaInteres = 0.16; // 16% fija
                    response.NumeroCuotas = response.Cuotas.Count;
                    response.Mensaje = "Tabla de amortización obtenida exitosamente";
                }
                else
                {
                    response.Encontrado = false;
                    response.Mensaje = "No se encontraron cuotas en la respuesta";
                }

                return response;
            }
            catch (Exception ex)
            {
                return new TablaAmortizacionResponse
                {
                    Encontrado = false,
                    Mensaje = $"Error parsing tabla amortización: {ex.Message}"
                };
            }
        }

        // ========== UTILIDADES DE PARSING ==========

        private string? ParseStringElement(XElement parent, string elementName)
        {
            var element = parent.Descendants().FirstOrDefault(e => e.Name.LocalName == elementName);
            return element?.Value;
        }

        private int ParseIntElement(XElement parent, string elementName)
        {
            var value = ParseStringElement(parent, elementName);
            return int.TryParse(value, out int result) ? result : 0;
        }

        private double ParseDoubleElement(XElement parent, params string[] elementNames)
        {
            foreach (var elementName in elementNames)
            {
                var value = ParseStringElement(parent, elementName);
                if (double.TryParse(value, out double result))
                    return result;
            }
            return 0.0;
        }

        private bool ParseBoolElement(XElement parent, string elementName)
        {
            var value = ParseStringElement(parent, elementName);
            return bool.TryParse(value, out bool result) && result;
        }

        public void Dispose()
        {
            _httpClient?.Dispose();
        }
    }
}