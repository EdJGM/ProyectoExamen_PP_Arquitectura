package ec.edu.monster.services;

import ec.edu.monster.models.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * Cliente unificado con soporte completo para REST (Java) y SOAP (.NET)
 * @author josue
 */
public class ClienteUnificado {

    public enum TipoProtocolo {
        REST, SOAP
    }

    private final HttpClient httpClient;
    private final Gson gson;
    private TipoProtocolo protocoloActual;
    private final SoapClient soapClient;

    // Endpoints REST (Java)
    private static final String BASE_COMERCIALIZADORA = "http://localhost:8080/ComercializadoraElectrodomesticos/api";
    private static final String BASE_BANQUITO = "http://localhost:8080/BanquitoCore/api/credito";

    public ClienteUnificado() {
        this.httpClient = HttpClient.newBuilder()
                .build();

        this.gson = new GsonBuilder()
                .setPrettyPrinting()
                .create();

        this.soapClient = new SoapClient();
        this.protocoloActual = TipoProtocolo.REST;
    }

    public CompletableFuture<List<Factura>> listarFacturasAsync() {
        return listarFacturasREST();
    }

    public CompletableFuture<RespuestaFactura> obtenerFacturaAsync(int idFactura) {
        return obtenerFacturaREST(idFactura);
    }

    // ========== CONFIGURACIÓN ==========

    public TipoProtocolo getProtocoloActual() {
        return protocoloActual;
    }

    public void cambiarProtocolo(TipoProtocolo nuevoProtocolo) {
        this.protocoloActual = nuevoProtocolo;
    }

    // ========== ELECTRODOMÉSTICOS ==========

    public CompletableFuture<List<Electrodomestico>> listarElectrodomesticosAsync() {
        if (protocoloActual == TipoProtocolo.REST) {
            return listarElectrodomesticosREST();
        } else {
            return soapClient.listarElectrodomesticosSOAP();
        }
    }

    public CompletableFuture<Electrodomestico> obtenerElectrodomesticoAsync(int id) {
        if (protocoloActual == TipoProtocolo.REST) {
            return obtenerElectrodomesticoREST(id);
        } else {
            return soapClient.obtenerElectrodomesticoSOAP(id);
        }
    }

    public CompletableFuture<RespuestaOperacion> crearElectrodomesticoAsync(Electrodomestico producto) {
        if (protocoloActual == TipoProtocolo.REST) {
            return crearElectrodomesticoREST(producto);
        } else {
            return soapClient.crearElectrodomesticoSOAP(producto);
        }
    }

    public CompletableFuture<RespuestaOperacion> actualizarElectrodomesticoAsync(int id, Electrodomestico producto) {
        if (protocoloActual == TipoProtocolo.REST) {
            return actualizarElectrodomesticoREST(id, producto);
        } else {
            return soapClient.actualizarElectrodomesticoSOAP(id, producto);
        }
    }

    public CompletableFuture<RespuestaOperacion> eliminarElectrodomesticoAsync(int id) {
        if (protocoloActual == TipoProtocolo.REST) {
            return eliminarElectrodomesticoREST(id);
        } else {
            return soapClient.eliminarElectrodomesticoSOAP(id);
        }
    }

    // ========== FACTURACIÓN ==========

    public CompletableFuture<RespuestaVenta> procesarVentaEfectivoAsync(SolicitudVenta solicitud) {
        if (protocoloActual == TipoProtocolo.REST) {
            return procesarVentaEfectivoREST(solicitud);
        } else {
            return soapClient.procesarVentaEfectivoSOAP(solicitud);
        }
    }

    public CompletableFuture<RespuestaVenta> procesarVentaCreditoAsync(SolicitudVenta solicitud) {
        if (protocoloActual == TipoProtocolo.REST) {
            return procesarVentaCreditoREST(solicitud);
        } else {
            return soapClient.procesarVentaCreditoSOAP(solicitud);
        }
    }

    // ========== CRÉDITO BANQUITO ==========

    public CompletableFuture<ValidacionCredito> validarSujetoCreditoAsync(String cedula) {
        if (protocoloActual == TipoProtocolo.REST) {
            return validarSujetoCreditoREST(cedula);
        } else {
            return soapClient.validarSujetoCreditoSOAP(cedula);
        }
    }

    public CompletableFuture<MontoMaximo> obtenerMontoMaximoAsync(String cedula) {
        if (protocoloActual == TipoProtocolo.REST) {
            return obtenerMontoMaximoREST(cedula);
        } else {
            return soapClient.obtenerMontoMaximoSOAP(cedula);
        }
    }

    public CompletableFuture<TablaAmortizacion> obtenerTablaAmortizacionAsync(int idCredito) {
        if (protocoloActual == TipoProtocolo.REST) {
            return obtenerTablaAmortizacionREST(idCredito);
        } else {
            return soapClient.obtenerTablaAmortizacionSOAP(idCredito);
        }
    }

    // ========== CONECTIVIDAD ==========

    public CompletableFuture<Boolean> probarConectividadAsync() {
        return CompletableFuture.supplyAsync(() -> {
            try {
                if (protocoloActual == TipoProtocolo.REST) {
                    var testBanquito = testBanquitoREST().get();
                    var testComercializadora = listarElectrodomesticosREST().get();
                    return testBanquito != null && testComercializadora != null;
                } else {
                    // Para SOAP, probar conexión básica
                    var testComercializadora = soapClient.listarElectrodomesticosSOAP().get();
                    var testBanquito = soapClient.validarSujetoCreditoSOAP("1234567890").get();
                    return testComercializadora != null && testBanquito != null;
                }
            } catch (Exception e) {
                return false;
            }
        });
    }

    // ========== IMPLEMENTACIONES REST ==========

    private CompletableFuture<List<Electrodomestico>> listarElectrodomesticosREST() {
        return CompletableFuture.supplyAsync(() -> {
            try {
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_COMERCIALIZADORA + "/electrodomesticos"))
                        .GET()
                        .build();

                HttpResponse<String> response = httpClient.send(request,
                        HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    return gson.fromJson(response.body(),
                            new TypeToken<List<Electrodomestico>>(){}.getType());
                }
                return null;
            } catch (Exception e) {
                throw new RuntimeException("Error al listar electrodomésticos: " + e.getMessage(), e);
            }
        });
    }

    private CompletableFuture<Electrodomestico> obtenerElectrodomesticoREST(int id) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_COMERCIALIZADORA + "/electrodomesticos/" + id))
                        .GET()
                        .build();

                HttpResponse<String> response = httpClient.send(request,
                        HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    return gson.fromJson(response.body(), Electrodomestico.class);
                }
                return null;
            } catch (Exception e) {
                throw new RuntimeException("Error al obtener electrodoméstico: " + e.getMessage(), e);
            }
        });
    }

    private CompletableFuture<RespuestaOperacion> crearElectrodomesticoREST(Electrodomestico producto) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String jsonBody = gson.toJson(producto);

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_COMERCIALIZADORA + "/electrodomesticos"))
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                        .build();

                HttpResponse<String> response = httpClient.send(request,
                        HttpResponse.BodyHandlers.ofString());

                RespuestaOperacion respuesta = gson.fromJson(response.body(), RespuestaOperacion.class);
                return respuesta != null ? respuesta : new RespuestaOperacion(false, "Error desconocido");

            } catch (Exception e) {
                return new RespuestaOperacion(false, "Error al crear producto: " + e.getMessage());
            }
        });
    }

    private CompletableFuture<RespuestaOperacion> actualizarElectrodomesticoREST(int id, Electrodomestico producto) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String jsonBody = gson.toJson(producto);

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_COMERCIALIZADORA + "/electrodomesticos/" + id))
                        .header("Content-Type", "application/json")
                        .PUT(HttpRequest.BodyPublishers.ofString(jsonBody))
                        .build();

                HttpResponse<String> response = httpClient.send(request,
                        HttpResponse.BodyHandlers.ofString());

                RespuestaOperacion respuesta = gson.fromJson(response.body(), RespuestaOperacion.class);
                return respuesta != null ? respuesta : new RespuestaOperacion(false, "Error desconocido");

            } catch (Exception e) {
                return new RespuestaOperacion(false, "Error al actualizar producto: " + e.getMessage());
            }
        });
    }

    private CompletableFuture<RespuestaOperacion> eliminarElectrodomesticoREST(int id) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_COMERCIALIZADORA + "/electrodomesticos/" + id))
                        .DELETE()
                        .build();

                HttpResponse<String> response = httpClient.send(request,
                        HttpResponse.BodyHandlers.ofString());

                RespuestaOperacion respuesta = gson.fromJson(response.body(), RespuestaOperacion.class);
                return respuesta != null ? respuesta : new RespuestaOperacion(false, "Error desconocido");

            } catch (Exception e) {
                return new RespuestaOperacion(false, "Error al eliminar producto: " + e.getMessage());
            }
        });
    }

    private CompletableFuture<RespuestaVenta> procesarVentaEfectivoREST(SolicitudVenta solicitud) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String jsonBody = gson.toJson(solicitud);

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_COMERCIALIZADORA + "/facturacion/venta-efectivo"))
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                        .build();

                HttpResponse<String> response = httpClient.send(request,
                        HttpResponse.BodyHandlers.ofString());

                return gson.fromJson(response.body(), RespuestaVenta.class);

            } catch (Exception e) {
                RespuestaVenta error = new RespuestaVenta();
                error.setExito(false);
                error.setMensaje("Error al procesar venta: " + e.getMessage());
                return error;
            }
        });
    }

    private CompletableFuture<RespuestaVenta> procesarVentaCreditoREST(SolicitudVenta solicitud) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String jsonBody = gson.toJson(solicitud);

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_COMERCIALIZADORA + "/facturacion/venta-credito"))
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                        .build();

                HttpResponse<String> response = httpClient.send(request,
                        HttpResponse.BodyHandlers.ofString());

                return gson.fromJson(response.body(), RespuestaVenta.class);

            } catch (Exception e) {
                RespuestaVenta error = new RespuestaVenta();
                error.setExito(false);
                error.setMensaje("Error al procesar venta a crédito: " + e.getMessage());
                return error;
            }
        });
    }

    private CompletableFuture<ValidacionCredito> validarSujetoCreditoREST(String cedula) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_BANQUITO + "/validar/" + cedula))
                        .GET()
                        .build();

                HttpResponse<String> response = httpClient.send(request,
                        HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    return gson.fromJson(response.body(), ValidacionCredito.class);
                }

                ValidacionCredito error = new ValidacionCredito();
                error.setSujetoCredito(false);
                error.setMensaje("Error en el servicio de validación");
                return error;

            } catch (Exception e) {
                ValidacionCredito error = new ValidacionCredito();
                error.setSujetoCredito(false);
                error.setMensaje("Error de conexión: " + e.getMessage());
                return error;
            }
        });
    }

    private CompletableFuture<MontoMaximo> obtenerMontoMaximoREST(String cedula) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_BANQUITO + "/monto-maximo/" + cedula))
                        .GET()
                        .build();

                HttpResponse<String> response = httpClient.send(request,
                        HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    return gson.fromJson(response.body(), MontoMaximo.class);
                }

                MontoMaximo error = new MontoMaximo();
                error.setAprobado(false);
                error.setMensaje("Error en el servicio");
                return error;

            } catch (Exception e) {
                MontoMaximo error = new MontoMaximo();
                error.setAprobado(false);
                error.setMensaje("Error de conexión: " + e.getMessage());
                return error;
            }
        });
    }

    private CompletableFuture<TablaAmortizacion> obtenerTablaAmortizacionREST(int idCredito) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_BANQUITO + "/tabla-amortizacion/" + idCredito))
                        .GET()
                        .build();

                HttpResponse<String> response = httpClient.send(request,
                        HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    return gson.fromJson(response.body(), TablaAmortizacion.class);
                }

                TablaAmortizacion error = new TablaAmortizacion();
                error.setEncontrado(false);
                error.setMensaje("Tabla de amortización no encontrada");
                return error;

            } catch (Exception e) {
                TablaAmortizacion error = new TablaAmortizacion();
                error.setEncontrado(false);
                error.setMensaje("Error de conexión: " + e.getMessage());
                return error;
            }
        });
    }

    private CompletableFuture<TestConectividad> testBanquitoREST() {
        return CompletableFuture.supplyAsync(() -> {
            try {
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_BANQUITO + "/test"))
                        .GET()
                        .build();

                HttpResponse<String> response = httpClient.send(request,
                        HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    return gson.fromJson(response.body(), TestConectividad.class);
                }
                return null;

            } catch (Exception e) {
                return null;
            }
        });
    }

    private CompletableFuture<List<Factura>> listarFacturasREST() {
        return CompletableFuture.supplyAsync(() -> {
            try {
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_COMERCIALIZADORA + "/facturacion/facturas"))
                        .GET()
                        .build();

                HttpResponse<String> response = httpClient.send(request,
                        HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    return gson.fromJson(response.body(),
                            new TypeToken<List<Factura>>(){}.getType());
                }
                return new ArrayList<>();
            } catch (Exception e) {
                throw new RuntimeException("Error al listar facturas: " + e.getMessage(), e);
            }
        });
    }

    private CompletableFuture<RespuestaFactura> obtenerFacturaREST(int idFactura) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_COMERCIALIZADORA + "/facturacion/facturas/" + idFactura))
                        .GET()
                        .build();

                HttpResponse<String> response = httpClient.send(request,
                        HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    // La respuesta contiene la factura directamente con algunos campos adicionales
                    Factura factura = gson.fromJson(response.body(), Factura.class);

                    RespuestaFactura respuesta = new RespuestaFactura();
                    respuesta.setEncontrada(true);
                    respuesta.setMensaje("Factura obtenida exitosamente");
                    respuesta.setFactura(factura);

                    return respuesta;
                } else {
                    RespuestaFactura respuesta = new RespuestaFactura();
                    respuesta.setEncontrada(false);
                    respuesta.setMensaje("Factura no encontrada");
                    return respuesta;
                }
            } catch (Exception e) {
                RespuestaFactura respuesta = new RespuestaFactura();
                respuesta.setEncontrada(false);
                respuesta.setMensaje("Error al obtener factura: " + e.getMessage());
                return respuesta;
            }
        });
    }
}