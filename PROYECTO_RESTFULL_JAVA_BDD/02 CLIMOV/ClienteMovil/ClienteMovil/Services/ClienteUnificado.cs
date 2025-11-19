using ClienteMovil.Models;
using System.Text.Json;

namespace ClienteMovil.Services
{
    /// <summary>
    /// Cliente unificado para consumir servicios REST y SOAP
    /// </summary>
    public class ClienteUnificado
    {
        private readonly HttpClient _httpClient;
        private readonly JsonSerializerOptions _jsonOptions;

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
                WriteIndented = true
            };

            // Por defecto usar REST
            ProtocoloActual = TipoProtocolo.REST;
        }

        public void CambiarProtocolo(TipoProtocolo nuevoProtocolo)
        {
            ProtocoloActual = nuevoProtocolo;
        }

        // ========== ELECTRODOMÉSTICOS ==========

        public async Task<List<Electrodomestico>?> ListarElectrodomesticosAsync()
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ListarElectrodomesticosREST();
                }
                else
                {
                    // return await ListarElectrodomesticosSOAP();
                    throw new NotImplementedException("SOAP será implementado en la siguiente fase");
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en ListarElectrodomesticos: {ex.Message}");
                return null;
            }
        }

        public async Task<Electrodomestico?> ObtenerElectrodomesticoAsync(int id)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ObtenerElectrodomesticoREST(id);
                }
                else
                {
                    throw new NotImplementedException("SOAP será implementado en la siguiente fase");
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en ObtenerElectrodomestico: {ex.Message}");
                return null;
            }
        }

        public async Task<RespuestaOperacion?> CrearElectrodomesticoAsync(Electrodomestico electrodomestico)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await CrearElectrodomesticoREST(electrodomestico);
                }
                else
                {
                    throw new NotImplementedException("SOAP será implementado en la siguiente fase");
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

        public async Task<RespuestaOperacion?> ActualizarElectrodomesticoAsync(int id, Electrodomestico electrodomestico)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ActualizarElectrodomesticoREST(id, electrodomestico);
                }
                else
                {
                    throw new NotImplementedException("SOAP será implementado en la siguiente fase");
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

        public async Task<RespuestaOperacion?> EliminarElectrodomesticoAsync(int id)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await EliminarElectrodomesticoREST(id);
                }
                else
                {
                    throw new NotImplementedException("SOAP será implementado en la siguiente fase");
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

        public async Task<RespuestaVenta?> ProcesarVentaEfectivoAsync(SolicitudVenta solicitud)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ProcesarVentaEfectivoREST(solicitud);
                }
                else
                {
                    throw new NotImplementedException("SOAP será implementado en la siguiente fase");
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

        public async Task<RespuestaVenta?> ProcesarVentaCreditoAsync(SolicitudVenta solicitud)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ProcesarVentaCreditoREST(solicitud);
                }
                else
                {
                    throw new NotImplementedException("SOAP será implementado en la siguiente fase");
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

        // ========== CRÉDITO BANQUITO ==========

        public async Task<ValidacionCredito?> ValidarSujetoCreditoAsync(string cedula)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ValidarSujetoCreditoREST(cedula);
                }
                else
                {
                    throw new NotImplementedException("SOAP será implementado en la siguiente fase");
                }
            }
            catch (Exception ex)
            {
                return new ValidacionCredito
                {
                    SujetoCredito = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }

        public async Task<MontoMaximo?> ObtenerMontoMaximoAsync(string cedula)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ObtenerMontoMaximoREST(cedula);
                }
                else
                {
                    throw new NotImplementedException("SOAP será implementado en la siguiente fase");
                }
            }
            catch (Exception ex)
            {
                return new MontoMaximo
                {
                    Aprobado = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }

        public async Task<TablaAmortizacion?> ObtenerTablaAmortizacionAsync(int idCredito)
        {
            try
            {
                if (ProtocoloActual == TipoProtocolo.REST)
                {
                    return await ObtenerTablaAmortizacionREST(idCredito);
                }
                else
                {
                    throw new NotImplementedException("SOAP será implementado en la siguiente fase");
                }
            }
            catch (Exception ex)
            {
                return new TablaAmortizacion
                {
                    Encontrado = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }

        // ========== CONECTIVIDAD ==========

        public async Task<EstadoConectividad> ProbarConectividadAsync()
        {
            var estado = new EstadoConectividad
            {
                ProtocoloActual = ProtocoloActual
            };

            try
            {
                // Probar Comercializadora
                var productos = await ListarElectrodomesticosAsync();
                estado.ComercializadoraActiva = productos != null;

                // Probar BanQuito
                var test = await ProbarConectividadBanQuito();
                estado.BanquitoActivo = test?.EsActivo == true;
            }
            catch
            {
                estado.ComercializadoraActiva = false;
                estado.BanquitoActivo = false;
            }

            return estado;
        }

        // ========== IMPLEMENTACIONES REST ==========

        private async Task<List<Electrodomestico>?> ListarElectrodomesticosREST()
        {
            try
            {
                var response = await _httpClient.GetAsync(ConfiguracionEndpoints.REST.ELECTRODOMESTICOS);

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<List<Electrodomestico>>(json, _jsonOptions);
                }

                return null;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en ListarElectrodomesticosREST: {ex.Message}");
                return null;
            }
        }

        private async Task<Electrodomestico?> ObtenerElectrodomesticoREST(int id)
        {
            try
            {
                var response = await _httpClient.GetAsync(ConfiguracionEndpoints.REST.ElectrodomesticoPorId(id));

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<Electrodomestico>(json, _jsonOptions);
                }

                return null;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en ObtenerElectrodomesticoREST: {ex.Message}");
                return null;
            }
        }

        private async Task<RespuestaOperacion?> CrearElectrodomesticoREST(Electrodomestico electrodomestico)
        {
            try
            {
                var json = JsonSerializer.Serialize(electrodomestico, _jsonOptions);
                var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(ConfiguracionEndpoints.REST.ELECTRODOMESTICOS, content);

                if (response.IsSuccessStatusCode)
                {
                    var responseJson = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<RespuestaOperacion>(responseJson, _jsonOptions);
                }
                else
                {
                    return new RespuestaOperacion
                    {
                        Exito = false,
                        Mensaje = $"Error HTTP: {response.StatusCode}"
                    };
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

        private async Task<RespuestaOperacion?> ActualizarElectrodomesticoREST(int id, Electrodomestico electrodomestico)
        {
            try
            {
                var json = JsonSerializer.Serialize(electrodomestico, _jsonOptions);
                var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                var response = await _httpClient.PutAsync(ConfiguracionEndpoints.REST.ElectrodomesticoPorId(id), content);

                if (response.IsSuccessStatusCode)
                {
                    var responseJson = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<RespuestaOperacion>(responseJson, _jsonOptions);
                }
                else
                {
                    return new RespuestaOperacion
                    {
                        Exito = false,
                        Mensaje = $"Error HTTP: {response.StatusCode}"
                    };
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

        private async Task<RespuestaOperacion?> EliminarElectrodomesticoREST(int id)
        {
            try
            {
                var response = await _httpClient.DeleteAsync(ConfiguracionEndpoints.REST.ElectrodomesticoPorId(id));

                if (response.IsSuccessStatusCode)
                {
                    var responseJson = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<RespuestaOperacion>(responseJson, _jsonOptions);
                }
                else
                {
                    return new RespuestaOperacion
                    {
                        Exito = false,
                        Mensaje = $"Error HTTP: {response.StatusCode}"
                    };
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

        private async Task<RespuestaVenta?> ProcesarVentaEfectivoREST(SolicitudVenta solicitud)
        {
            try
            {
                var json = JsonSerializer.Serialize(solicitud, _jsonOptions);
                var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(ConfiguracionEndpoints.REST.VENTA_EFECTIVO, content);
                var responseJson = await response.Content.ReadAsStringAsync();

                return JsonSerializer.Deserialize<RespuestaVenta>(responseJson, _jsonOptions);
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

        private async Task<RespuestaVenta?> ProcesarVentaCreditoREST(SolicitudVenta solicitud)
        {
            try
            {
                var json = JsonSerializer.Serialize(solicitud, _jsonOptions);
                var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(ConfiguracionEndpoints.REST.VENTA_CREDITO, content);
                var responseJson = await response.Content.ReadAsStringAsync();

                return JsonSerializer.Deserialize<RespuestaVenta>(responseJson, _jsonOptions);
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

        private async Task<ValidacionCredito?> ValidarSujetoCreditoREST(string cedula)
        {
            try
            {
                var response = await _httpClient.GetAsync(ConfiguracionEndpoints.REST.ValidarCredito(cedula));

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<ValidacionCredito>(json, _jsonOptions);
                }

                return new ValidacionCredito
                {
                    SujetoCredito = false,
                    Mensaje = "Error en el servicio"
                };
            }
            catch (Exception ex)
            {
                return new ValidacionCredito
                {
                    SujetoCredito = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }

        private async Task<MontoMaximo?> ObtenerMontoMaximoREST(string cedula)
        {
            try
            {
                var response = await _httpClient.GetAsync(ConfiguracionEndpoints.REST.MontoMaximo(cedula));

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<MontoMaximo>(json, _jsonOptions);
                }

                return new MontoMaximo
                {
                    Aprobado = false,
                    Mensaje = "Error en el servicio"
                };
            }
            catch (Exception ex)
            {
                return new MontoMaximo
                {
                    Aprobado = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }

        private async Task<TablaAmortizacion?> ObtenerTablaAmortizacionREST(int idCredito)
        {
            try
            {
                var response = await _httpClient.GetAsync(ConfiguracionEndpoints.REST.TablaAmortizacion(idCredito));

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<TablaAmortizacion>(json, _jsonOptions);
                }

                return new TablaAmortizacion
                {
                    Encontrado = false,
                    Mensaje = "Tabla no encontrada"
                };
            }
            catch (Exception ex)
            {
                return new TablaAmortizacion
                {
                    Encontrado = false,
                    Mensaje = $"Error: {ex.Message}"
                };
            }
        }

        private async Task<TestConectividad?> ProbarConectividadBanQuito()
        {
            try
            {
                var response = await _httpClient.GetAsync(ConfiguracionEndpoints.REST.TEST_BANQUITO);

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<TestConectividad>(json, _jsonOptions);
                }
                return null;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en ProbarConectividadBanQuito: {ex.Message}");
                return null;
            }
        }

        // ========== CLEANUP ==========

        public void Dispose()
        {
            _httpClient?.Dispose();
        }
    }
}
