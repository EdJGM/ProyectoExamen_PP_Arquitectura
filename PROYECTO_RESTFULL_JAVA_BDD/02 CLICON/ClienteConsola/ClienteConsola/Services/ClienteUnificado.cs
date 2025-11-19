using ClienteConsola.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ClienteConsola.Services
{
    public class ClienteUnificado
    {
        private readonly HttpClient _httpClient;
        private readonly JsonSerializerOptions _jsonOptions;
        private readonly SoapClient _soapClient;

        public TipoProtocolo ProtocoloActual { get; private set; }

        public ClienteUnificado()
        {
            _httpClient = new HttpClient
            {
                Timeout = ConfiguracionTimeouts.TIMEOUT_DEFAULT
            };

            _jsonOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                WriteIndented = true,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                NumberHandling = JsonNumberHandling.AllowReadingFromString
            };

            _soapClient = new SoapClient();

            // Por defecto usar REST
            ProtocoloActual = TipoProtocolo.REST;
        }

        public void CambiarProtocolo(TipoProtocolo nuevoProtocolo)
        {
            ProtocoloActual = nuevoProtocolo;
        }

        // ========== GESTIÓN DE ELECTRODOMÉSTICOS ==========

        public async Task<List<Electrodomestico>?> ListarElectrodomesticos()
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ListarElectrodomesticosREST();
                }
                else
                {
                    return await _soapClient.ListarElectrodomesticosSOAP();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error en ListarElectrodomesticos: {ex.Message}");
                return null;
            }
        }

        public async Task<Electrodomestico?> ObtenerElectrodomestico(int id)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ObtenerElectrodomesticoREST(id);
                }
                else
                {
                    return await _soapClient.ObtenerElectrodomesticoSOAP(id);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error en ObtenerElectrodomestico: {ex.Message}");
                return null;
            }
        }

        public async Task<RespuestaOperacion?> CrearElectrodomestico(Electrodomestico electrodomestico)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await CrearElectrodomesticoREST(electrodomestico);
                }
                else
                {
                    return await _soapClient.CrearElectrodomesticoSOAP(electrodomestico);
                }
            }
            catch (Exception ex)
            {
                return new RespuestaOperacion
                {
                    Exito = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }

        public async Task<RespuestaOperacion?> ActualizarElectrodomestico(int id, Electrodomestico electrodomestico)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ActualizarElectrodomesticoREST(id, electrodomestico);
                }
                else
                {
                    return await _soapClient.ActualizarElectrodomesticoSOAP(id, electrodomestico);
                }
            }
            catch (Exception ex)
            {
                return new RespuestaOperacion
                {
                    Exito = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }

        public async Task<RespuestaOperacion?> EliminarElectrodomestico(int id)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await EliminarElectrodomesticoREST(id);
                }
                else
                {
                    return await _soapClient.EliminarElectrodomesticoSOAP(id);
                }
            }
            catch (Exception ex)
            {
                return new RespuestaOperacion
                {
                    Exito = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }

        // ========== FACTURACIÓN ==========
        public async Task<List<Factura>?> ListarFacturasAsync()
        {
            try
            {
                return await ListarFacturasREST();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error en ListarFacturas: {ex.Message}");
                return null;
            }
        }

        public async Task<RespuestaFactura?> ObtenerFacturaAsync(int idFactura)
        {
            try
            {
                return await ObtenerFacturaREST(idFactura);
            }
            catch (Exception ex)
            {
                return new RespuestaFactura
                {
                    Encontrada = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }

        // ========== IMPLEMENTACIONES REST ==========

        private async Task<List<Factura>?> ListarFacturasREST()
        {
            try
            {
                var response = await _httpClient.GetAsync(ConfiguracionEndpoints.REST.FACTURAS);

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<List<Factura>>(json, _jsonOptions);
                }

                return new List<Factura>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error en ListarFacturasREST: {ex.Message}");
                return null;
            }
        }

        private async Task<RespuestaFactura?> ObtenerFacturaREST(int idFactura)
        {
            try
            {
                var url = string.Format(ConfiguracionEndpoints.REST.FACTURA_POR_ID, idFactura);
                var response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var respuesta = JsonSerializer.Deserialize<RespuestaFactura>(json, _jsonOptions);

                    // La API devuelve los datos directamente en la respuesta
                    if (respuesta != null)
                    {
                        respuesta.Encontrada = true;
                        if (string.IsNullOrEmpty(respuesta.Mensaje))
                        {
                            respuesta.Mensaje = "Factura obtenida exitosamente";
                        }
                    }

                    return respuesta;
                }
                else
                {
                    return new RespuestaFactura
                    {
                        Encontrada = false,
                        Mensaje = "Factura no encontrada"
                    };
                }
            }
            catch (Exception ex)
            {
                return new RespuestaFactura
                {
                    Encontrada = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }


        public async Task<RespuestaVenta?> ProcesarVentaEfectivo(SolicitudVenta solicitud)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ProcesarVentaEfectivoREST(solicitud);
                }
                else
                {
                    return await _soapClient.ProcesarVentaEfectivoSOAP(solicitud);
                }
            }
            catch (Exception ex)
            {
                return new RespuestaVenta
                {
                    Exito = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }

        public async Task<RespuestaVenta?> ProcesarVentaCredito(SolicitudVenta solicitud, int numeroCuotas)
        {
            try
            {
                solicitud.NumeroCuotas = numeroCuotas;

                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ProcesarVentaCreditoREST(solicitud);
                }
                else
                {
                    return await _soapClient.ProcesarVentaCreditoSOAP(solicitud);
                }
            }
            catch (Exception ex)
            {
                return new RespuestaVenta
                {
                    Exito = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }

        // ========== CONSULTAS BANQUITO ==========

        public async Task<ValidacionCreditoResponse?> ValidarSujetoCredito(string cedula)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ValidarSujetoCreditoREST(cedula);
                }
                else
                {
                    return await _soapClient.ValidarSujetoCreditoSOAP(cedula);
                }
            }
            catch (Exception ex)
            {
                return new ValidacionCreditoResponse
                {
                    SujetoCredito = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }

        public async Task<MontoMaximoResponse?> ObtenerMontoMaximo(string cedula)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ObtenerMontoMaximoREST(cedula);
                }
                else
                {
                    return await _soapClient.ObtenerMontoMaximoSOAP(cedula);
                }
            }
            catch (Exception ex)
            {
                return new MontoMaximoResponse
                {
                    Aprobado = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }

        public async Task<TablaAmortizacionResponse?> ObtenerTablaAmortizacion(int idCredito)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ObtenerTablaAmortizacionREST(idCredito);
                }
                else
                {
                    return await _soapClient.ObtenerTablaAmortizacionSOAP(idCredito);
                }
            }
            catch (Exception ex)
            {
                return new TablaAmortizacionResponse
                {
                    Encontrado = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }

        // ========== CONECTIVIDAD ==========

        public async Task<EstadoConectividad> ProbarConectividad()
        {
            var estado = new EstadoConectividad
            {
                ProtocoloActual = ProtocoloActual
            };

            try
            {
                // Probar Comercializadora
                var productos = await ListarElectrodomesticos();
                estado.ComercializadoraActiva = productos != null;

                // Probar BanQuito
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    var test = await ProbarConectividadBanQuito();
                    estado.BanquitoActivo = test?.Status == "OK";
                }
                else
                {
                    // Para SOAP, probar validación de crédito con una cédula de test
                    try
                    {
                        await ValidarSujetoCredito("1234567890");
                        estado.BanquitoActivo = true;
                    }
                    catch
                    {
                        estado.BanquitoActivo = false;
                    }
                }
            }
            catch
            {
                estado.ComercializadoraActiva = false;
                estado.BanquitoActivo = false;
            }

            return estado;
        }

        // ========== IMPLEMENTACIONES REST (EXISTENTES) ==========

        private async Task<List<Electrodomestico>?> ListarElectrodomesticosREST()
        {
            var response = await _httpClient.GetAsync(ConfiguracionEndpoints.REST.ELECTRODOMESTICOS);

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<List<Electrodomestico>>(json, _jsonOptions);
            }

            return null;
        }

        private async Task<Electrodomestico?> ObtenerElectrodomesticoREST(int id)
        {
            var url = string.Format(ConfiguracionEndpoints.REST.ELECTRODOMESTICO_POR_ID, id);
            var response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<Electrodomestico>(json, _jsonOptions);
            }

            return null;
        }

        private async Task<RespuestaOperacion?> CrearElectrodomesticoREST(Electrodomestico electrodomestico)
        {
            var json = JsonSerializer.Serialize(electrodomestico, _jsonOptions);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(ConfiguracionEndpoints.REST.ELECTRODOMESTICOS, content);

            if (response.IsSuccessStatusCode)
            {
                var responseJson = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<RespuestaOperacion>(responseJson, _jsonOptions);
            }
            else
            {
                var errorJson = await response.Content.ReadAsStringAsync();
                var errorObj = JsonSerializer.Deserialize<Dictionary<string, object>>(errorJson, _jsonOptions);

                return new RespuestaOperacion
                {
                    Exito = false,
                    Mensaje = errorObj?.ContainsKey("error") == true ? errorObj["error"].ToString() : "Error desconocido"
                };
            }
        }

        private async Task<RespuestaOperacion?> ActualizarElectrodomesticoREST(int id, Electrodomestico electrodomestico)
        {
            var json = JsonSerializer.Serialize(electrodomestico, _jsonOptions);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var url = string.Format(ConfiguracionEndpoints.REST.ELECTRODOMESTICO_POR_ID, id);
            var response = await _httpClient.PutAsync(url, content);

            if (response.IsSuccessStatusCode)
            {
                var responseJson = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<RespuestaOperacion>(responseJson, _jsonOptions);
            }
            else
            {
                var errorJson = await response.Content.ReadAsStringAsync();
                var errorObj = JsonSerializer.Deserialize<Dictionary<string, object>>(errorJson, _jsonOptions);

                return new RespuestaOperacion
                {
                    Exito = false,
                    Mensaje = errorObj?.ContainsKey("error") == true ? errorObj["error"].ToString() : "Error desconocido"
                };
            }
        }

        private async Task<RespuestaOperacion?> EliminarElectrodomesticoREST(int id)
        {
            var url = string.Format(ConfiguracionEndpoints.REST.ELECTRODOMESTICO_POR_ID, id);
            var response = await _httpClient.DeleteAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var responseJson = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<RespuestaOperacion>(responseJson, _jsonOptions);
            }
            else
            {
                var errorJson = await response.Content.ReadAsStringAsync();
                var errorObj = JsonSerializer.Deserialize<Dictionary<string, object>>(errorJson, _jsonOptions);

                return new RespuestaOperacion
                {
                    Exito = false,
                    Mensaje = errorObj?.ContainsKey("error") == true ? errorObj["error"].ToString() : "Error desconocido"
                };
            }
        }

        private async Task<RespuestaVenta?> ProcesarVentaEfectivoREST(SolicitudVenta solicitud)
        {
            var json = JsonSerializer.Serialize(solicitud, _jsonOptions);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(ConfiguracionEndpoints.REST.VENTA_EFECTIVO, content);
            var responseJson = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<RespuestaVenta>(responseJson, _jsonOptions);
        }

        private async Task<RespuestaVenta?> ProcesarVentaCreditoREST(SolicitudVenta solicitud)
        {
            var json = JsonSerializer.Serialize(solicitud, _jsonOptions);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(ConfiguracionEndpoints.REST.VENTA_CREDITO, content);
            var responseJson = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<RespuestaVenta>(responseJson, _jsonOptions);
        }

        private async Task<ValidacionCreditoResponse?> ValidarSujetoCreditoREST(string cedula)
        {
            var url = string.Format(ConfiguracionEndpoints.REST.VALIDAR_CREDITO, cedula);
            var response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<ValidacionCreditoResponse>(json, _jsonOptions);
            }

            return null;
        }

        private async Task<MontoMaximoResponse?> ObtenerMontoMaximoREST(string cedula)
        {
            var url = string.Format(ConfiguracionEndpoints.REST.MONTO_MAXIMO, cedula);
            var response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<MontoMaximoResponse>(json, _jsonOptions);
            }

            return null;
        }

        private async Task<TablaAmortizacionResponse?> ObtenerTablaAmortizacionREST(int idCredito)
        {
            var url = string.Format(ConfiguracionEndpoints.REST.TABLA_AMORTIZACION, idCredito);
            var response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<TablaAmortizacionResponse>(json, _jsonOptions);
            }

            return null;
        }

        private async Task<TestConectividadResponse?> ProbarConectividadBanQuito()
        {
            try
            {
                var response = await _httpClient.GetAsync(ConfiguracionEndpoints.REST.TEST_BANQUITO);

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<TestConectividadResponse>(json, _jsonOptions);
                }
            }
            catch
            {
                // Silenciar errores de conectividad
            }

            return null;
        }

        public void Dispose()
        {
            _httpClient?.Dispose();
            _soapClient?.Dispose();
        }
    }
}