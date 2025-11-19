package ec.edu.monster.services;

import ec.edu.monster.models.*;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.StringReader;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * Cliente SOAP para servicios .NET - Basado en la implementación de consola C# que funciona 100%
 */
public class SoapClient {

    private final HttpClient httpClient;

    // Endpoints SOAP (mismos que en C#)
    private static final String BANQUITO_SOAP_URL = "http://localhost:58001/ec.edu.monster.ws/BanQuitoWS.svc";
    private static final String COMERCIALIZADORA_SOAP_URL = "http://localhost:58002/ec.edu.monster.ws/ComercializadoraWS.svc";

    // Namespaces del WSDL (mismos que en C#)
    private static final String TEMPURI_NS = "http://tempuri.org/";

    public SoapClient() {
        this.httpClient = HttpClient.newBuilder()
                .build();
    }

    // ========== MÉTODOS SOAP PARA ELECTRODOMÉSTICOS ==========

    public CompletableFuture<List<Electrodomestico>> listarElectrodomesticosSOAP() {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String soapEnvelope = String.format(
                        "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                                "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" " +
                                "               xmlns:tem=\"%s\">" +
                                "    <soap:Header />" +
                                "    <soap:Body>" +
                                "        <tem:ListarElectrodomesticos />" +
                                "    </soap:Body>" +
                                "</soap:Envelope>", TEMPURI_NS);

                String response = sendSoapRequest(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                        "http://tempuri.org/IComercializadoraWS/ListarElectrodomesticos");

                return parseElectrodomesticosList(response);
            } catch (Exception ex) {
                System.err.println("Error SOAP ListarElectrodomesticos: " + ex.getMessage());
                return null;
            }
        });
    }

    public CompletableFuture<Electrodomestico> obtenerElectrodomesticoSOAP(int id) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String soapEnvelope = String.format(
                        "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                                "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" " +
                                "               xmlns:tem=\"%s\">" +
                                "    <soap:Header />" +
                                "    <soap:Body>" +
                                "        <tem:ObtenerElectrodomestico>" +
                                "            <tem:id>%d</tem:id>" +
                                "        </tem:ObtenerElectrodomestico>" +
                                "    </soap:Body>" +
                                "</soap:Envelope>", TEMPURI_NS, id);

                String response = sendSoapRequest(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                        "http://tempuri.org/IComercializadoraWS/ObtenerElectrodomestico");

                return parseSingleElectrodomestico(response);
            } catch (Exception ex) {
                System.err.println("Error SOAP ObtenerElectrodomestico: " + ex.getMessage());
                return null;
            }
        });
    }

    public CompletableFuture<RespuestaOperacion> crearElectrodomesticoSOAP(Electrodomestico electrodomestico) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String soapEnvelope = String.format(
                        "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                                "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" " +
                                "               xmlns:tem=\"%s\">" +
                                "    <soap:Header />" +
                                "    <soap:Body>" +
                                "        <tem:CrearElectrodomestico>" +
                                "            <tem:nombre>%s</tem:nombre>" +
                                "            <tem:descripcion>%s</tem:descripcion>" +
                                "            <tem:precio>%s</tem:precio>" +
                                "        </tem:CrearElectrodomestico>" +
                                "    </soap:Body>" +
                                "</soap:Envelope>",
                        TEMPURI_NS,
                        escapeXml(electrodomestico.getNombre()),
                        escapeXml(electrodomestico.getDescripcion()),
                        electrodomestico.getPrecioVenta());

                String response = sendSoapRequest(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                        "http://tempuri.org/IComercializadoraWS/CrearElectrodomestico");

                return parseStringToRespuestaOperacion(response, "CrearElectrodomestico");
            } catch (Exception ex) {
                return new RespuestaOperacion(false, "Error SOAP CrearElectrodomestico: " + ex.getMessage());
            }
        });
    }

    public CompletableFuture<RespuestaOperacion> actualizarElectrodomesticoSOAP(int id, Electrodomestico electrodomestico) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String soapEnvelope = String.format(
                        "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                                "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" " +
                                "               xmlns:tem=\"%s\">" +
                                "    <soap:Header />" +
                                "    <soap:Body>" +
                                "        <tem:ActualizarElectrodomestico>" +
                                "            <tem:id>%d</tem:id>" +
                                "            <tem:nombre>%s</tem:nombre>" +
                                "            <tem:descripcion>%s</tem:descripcion>" +
                                "            <tem:precio>%s</tem:precio>" +
                                "        </tem:ActualizarElectrodomestico>" +
                                "    </soap:Body>" +
                                "</soap:Envelope>",
                        TEMPURI_NS, id,
                        escapeXml(electrodomestico.getNombre()),
                        escapeXml(electrodomestico.getDescripcion()),
                        electrodomestico.getPrecioVenta());

                String response = sendSoapRequest(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                        "http://tempuri.org/IComercializadoraWS/ActualizarElectrodomestico");

                return parseStringToRespuestaOperacion(response, "ActualizarElectrodomestico");
            } catch (Exception ex) {
                return new RespuestaOperacion(false, "Error SOAP ActualizarElectrodomestico: " + ex.getMessage());
            }
        });
    }

    public CompletableFuture<RespuestaOperacion> eliminarElectrodomesticoSOAP(int id) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String soapEnvelope = String.format(
                        "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                                "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" " +
                                "               xmlns:tem=\"%s\">" +
                                "    <soap:Header />" +
                                "    <soap:Body>" +
                                "        <tem:EliminarElectrodomestico>" +
                                "            <tem:id>%d</tem:id>" +
                                "        </tem:EliminarElectrodomestico>" +
                                "    </soap:Body>" +
                                "</soap:Envelope>", TEMPURI_NS, id);

                String response = sendSoapRequest(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                        "http://tempuri.org/IComercializadoraWS/EliminarElectrodomestico");

                return parseStringToRespuestaOperacion(response, "EliminarElectrodomestico");
            } catch (Exception ex) {
                return new RespuestaOperacion(false, "Error SOAP EliminarElectrodomestico: " + ex.getMessage());
            }
        });
    }

    // ========== MÉTODOS SOAP PARA FACTURACIÓN ==========

    public CompletableFuture<RespuestaVenta> procesarVentaEfectivoSOAP(SolicitudVenta solicitud) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String idsXml = buildWCFIntArray(solicitud.getItems(), true);
                String cantidadesXml = buildWCFIntArray(solicitud.getItems(), false);

                String soapEnvelope = String.format(
                        "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                                "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" " +
                                "               xmlns:tem=\"%s\"" +
                                "               xmlns:arr=\"http://schemas.microsoft.com/2003/10/Serialization/Arrays\">" +
                                "    <soap:Header />" +
                                "    <soap:Body>" +
                                "        <tem:ProcesarVentaEfectivo>" +
                                "            <tem:cedula>%s</tem:cedula>" +
                                "            <tem:idsElectrodomesticos>" +
                                "                %s" +
                                "            </tem:idsElectrodomesticos>" +
                                "            <tem:cantidades>" +
                                "                %s" +
                                "            </tem:cantidades>" +
                                "        </tem:ProcesarVentaEfectivo>" +
                                "    </soap:Body>" +
                                "</soap:Envelope>", TEMPURI_NS, solicitud.getCedula(), idsXml, cantidadesXml);

                String response = sendSoapRequest(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                        "http://tempuri.org/IComercializadoraWS/ProcesarVentaEfectivo");

                return parseRespuestaVenta(response);
            } catch (Exception ex) {
                RespuestaVenta error = new RespuestaVenta();
                error.setExito(false);
                error.setMensaje("Error SOAP ProcesarVentaEfectivo: " + ex.getMessage());
                return error;
            }
        });
    }

    public CompletableFuture<RespuestaVenta> procesarVentaCreditoSOAP(SolicitudVenta solicitud) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String idsXml = buildWCFIntArray(solicitud.getItems(), true);
                String cantidadesXml = buildWCFIntArray(solicitud.getItems(), false);

                String soapEnvelope = String.format(
                        "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                                "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" " +
                                "               xmlns:tem=\"%s\"" +
                                "               xmlns:arr=\"http://schemas.microsoft.com/2003/10/Serialization/Arrays\">" +
                                "    <soap:Header />" +
                                "    <soap:Body>" +
                                "        <tem:ProcesarVentaCredito>" +
                                "            <tem:cedula>%s</tem:cedula>" +
                                "            <tem:idsElectrodomesticos>" +
                                "                %s" +
                                "            </tem:idsElectrodomesticos>" +
                                "            <tem:cantidades>" +
                                "                %s" +
                                "            </tem:cantidades>" +
                                "            <tem:numeroCuotas>%d</tem:numeroCuotas>" +
                                "        </tem:ProcesarVentaCredito>" +
                                "    </soap:Body>" +
                                "</soap:Envelope>", TEMPURI_NS, solicitud.getCedula(), idsXml, cantidadesXml, solicitud.getNumeroCuotas());

                String response = sendSoapRequest(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                        "http://tempuri.org/IComercializadoraWS/ProcesarVentaCredito");

                return parseRespuestaVenta(response);
            } catch (Exception ex) {
                RespuestaVenta error = new RespuestaVenta();
                error.setExito(false);
                error.setMensaje("Error SOAP ProcesarVentaCredito: " + ex.getMessage());
                return error;
            }
        });
    }

    // ========== MÉTODOS SOAP PARA BANQUITO ==========

    public CompletableFuture<ValidacionCredito> validarSujetoCreditoSOAP(String cedula) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String soapEnvelope = String.format(
                        "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                                "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" " +
                                "               xmlns:tem=\"%s\">" +
                                "    <soap:Header />" +
                                "    <soap:Body>" +
                                "        <tem:ValidarSujetoCredito>" +
                                "            <tem:cedula>%s</tem:cedula>" +
                                "        </tem:ValidarSujetoCredito>" +
                                "    </soap:Body>" +
                                "</soap:Envelope>", TEMPURI_NS, cedula);

                String response = sendSoapRequest(BANQUITO_SOAP_URL, soapEnvelope,
                        "http://tempuri.org/IBanQuitoWS/ValidarSujetoCredito");

                return parseValidacionCreditoResponse(response);
            } catch (Exception ex) {
                ValidacionCredito error = new ValidacionCredito();
                error.setSujetoCredito(false);
                error.setMensaje("Error SOAP ValidarSujetoCredito: " + ex.getMessage());
                return error;
            }
        });
    }

    public CompletableFuture<MontoMaximo> obtenerMontoMaximoSOAP(String cedula) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String soapEnvelope = String.format(
                        "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                                "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" " +
                                "               xmlns:tem=\"%s\">" +
                                "    <soap:Header />" +
                                "    <soap:Body>" +
                                "        <tem:ObtenerMontoMaximoCredito>" +
                                "            <tem:cedula>%s</tem:cedula>" +
                                "        </tem:ObtenerMontoMaximoCredito>" +
                                "    </soap:Body>" +
                                "</soap:Envelope>", TEMPURI_NS, cedula);

                String response = sendSoapRequest(BANQUITO_SOAP_URL, soapEnvelope,
                        "http://tempuri.org/IBanQuitoWS/ObtenerMontoMaximoCredito");

                return parseMontoMaximoResponse(response);
            } catch (Exception ex) {
                MontoMaximo error = new MontoMaximo();
                error.setAprobado(false);
                error.setMensaje("Error SOAP ObtenerMontoMaximo: " + ex.getMessage());
                return error;
            }
        });
    }

    public CompletableFuture<TablaAmortizacion> obtenerTablaAmortizacionSOAP(int idCredito) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String soapEnvelope = String.format(
                        "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                                "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" " +
                                "               xmlns:tem=\"%s\">" +
                                "    <soap:Header />" +
                                "    <soap:Body>" +
                                "        <tem:ObtenerTablaAmortizacion>" +
                                "            <tem:idCredito>%d</tem:idCredito>" +
                                "        </tem:ObtenerTablaAmortizacion>" +
                                "    </soap:Body>" +
                                "</soap:Envelope>", TEMPURI_NS, idCredito);

                String response = sendSoapRequest(BANQUITO_SOAP_URL, soapEnvelope,
                        "http://tempuri.org/IBanQuitoWS/ObtenerTablaAmortizacion");

                return parseTablaAmortizacionResponse(response);
            } catch (Exception ex) {
                TablaAmortizacion error = new TablaAmortizacion();
                error.setEncontrado(false);
                error.setMensaje("Error SOAP ObtenerTablaAmortizacion: " + ex.getMessage());
                return error;
            }
        });
    }

    public CompletableFuture<TablaAmortizacion> consultarTablaAmortizacionSOAP(int idFactura) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String soapEnvelope = String.format(
                        "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                                "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" " +
                                "               xmlns:tem=\"%s\">" +
                                "    <soap:Header />" +
                                "    <soap:Body>" +
                                "        <tem:ConsultarTablaAmortizacion>" +
                                "            <tem:idFactura>%d</tem:idFactura>" +
                                "        </tem:ConsultarTablaAmortizacion>" +
                                "    </soap:Body>" +
                                "</soap:Envelope>", TEMPURI_NS, idFactura);

                String response = sendSoapRequest(COMERCIALIZADORA_SOAP_URL, soapEnvelope,
                        "http://tempuri.org/IComercializadoraWS/ConsultarTablaAmortizacion");

                return parseTablaAmortizacionResponse(response);
            } catch (Exception ex) {
                TablaAmortizacion error = new TablaAmortizacion();
                error.setEncontrado(false);
                error.setMensaje("Error SOAP ConsultarTablaAmortizacion: " + ex.getMessage());
                return error;
            }
        });
    }

    // ========== MÉTODOS AUXILIARES ==========

    private String sendSoapRequest(String url, String soapEnvelope, String soapAction) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "text/xml; charset=utf-8")
                .header("SOAPAction", "\"" + soapAction + "\"")
                .POST(HttpRequest.BodyPublishers.ofString(soapEnvelope))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new RuntimeException("SOAP Error: " + response.statusCode() + " - " + response.body());
        }

        return response.body();
    }

    private String escapeXml(String input) {
        if (input == null) return "";
        return input.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }

    private String buildWCFIntArray(List<ItemVenta> items, boolean useIds) {
        StringBuilder sb = new StringBuilder();
        for (ItemVenta item : items) {
            int value = useIds ? item.getIdElectrodomestico() : item.getCantidad();
            sb.append(String.format("<arr:int>%d</arr:int>", value));
        }
        return sb.toString();
    }

    // ========== MÉTODOS DE PARSING XML ==========

    private List<Electrodomestico> parseElectrodomesticosList(String xmlResponse) {
        List<Electrodomestico> productos = new ArrayList<>();

        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setNamespaceAware(true);
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new InputSource(new StringReader(xmlResponse)));

            NodeList electrodomesticos = doc.getElementsByTagName("*");

            for (int i = 0; i < electrodomesticos.getLength(); i++) {
                Node node = electrodomesticos.item(i);
                if (node.getNodeType() == Node.ELEMENT_NODE &&
                        (node.getLocalName().equals("Electrodomestico") ||
                                node.getLocalName().contains("Electrodomestico"))) {

                    Electrodomestico producto = parseElectrodomesticoFromNode(node);
                    if (producto != null) {
                        productos.add(producto);
                    }
                }
            }

        } catch (Exception ex) {
            System.err.println("Error parsing electrodomésticos list: " + ex.getMessage());
        }

        return productos;
    }

    private Electrodomestico parseSingleElectrodomestico(String xmlResponse) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setNamespaceAware(true);
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new InputSource(new StringReader(xmlResponse)));

            NodeList nodes = doc.getElementsByTagName("*");
            for (int i = 0; i < nodes.getLength(); i++) {
                Node node = nodes.item(i);
                if (node.getNodeType() == Node.ELEMENT_NODE &&
                        (node.getLocalName().equals("Electrodomestico") ||
                                node.getLocalName().contains("Electrodomestico"))) {
                    return parseElectrodomesticoFromNode(node);
                }
            }
        } catch (Exception ex) {
            System.err.println("Error parsing single electrodoméstico: " + ex.getMessage());
        }

        return null;
    }

    private Electrodomestico parseElectrodomesticoFromNode(Node node) {
        try {
            Electrodomestico producto = new Electrodomestico();
            NodeList children = node.getChildNodes();

            for (int i = 0; i < children.getLength(); i++) {
                Node child = children.item(i);
                if (child.getNodeType() == Node.ELEMENT_NODE) {
                    String localName = child.getLocalName();
                    String textContent = child.getTextContent();

                    if (textContent != null && !textContent.trim().isEmpty()) {
                        switch (localName) {
                            case "IdElectrodomestico":
                            case "idElectrodomestico":
                                producto.setIdElectrodomestico(Integer.parseInt(textContent));
                                break;
                            case "Codigo":
                            case "codigo":
                                producto.setCodigo(textContent);
                                break;
                            case "Nombre":
                            case "nombre":
                                producto.setNombre(textContent);
                                break;
                            case "Descripcion":
                            case "descripcion":
                                producto.setDescripcion(textContent);
                                break;
                            case "Marca":
                            case "marca":
                                producto.setMarca(textContent);
                                break;
                            case "PrecioVenta":
                            case "precioVenta":
                                producto.setPrecioVenta(Double.parseDouble(textContent));
                                break;
                            case "Stock":
                            case "stock":
                                producto.setStock(Integer.parseInt(textContent));
                                break;
                            case "Estado":
                            case "estado":
                                producto.setEstado(textContent);
                                break;
                        }
                    }
                }
            }

            return producto;
        } catch (Exception ex) {
            System.err.println("Error parsing electrodoméstico from node: " + ex.getMessage());
            return null;
        }
    }

    private RespuestaOperacion parseStringToRespuestaOperacion(String xmlResponse, String operacion) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setNamespaceAware(true);
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new InputSource(new StringReader(xmlResponse)));

            NodeList resultNodes = doc.getElementsByTagName("*");
            for (int i = 0; i < resultNodes.getLength(); i++) {
                Node node = resultNodes.item(i);
                if (node.getLocalName() != null &&
                        (node.getLocalName().equals(operacion + "Result") ||
                                node.getLocalName().contains("Result"))) {

                    String resultado = node.getTextContent();
                    return new RespuestaOperacion(true, resultado);
                }
            }

            return new RespuestaOperacion(false, "No se encontró resultado en la respuesta SOAP");

        } catch (Exception ex) {
            return new RespuestaOperacion(false, "Error parsing respuesta: " + ex.getMessage());
        }
    }

    private RespuestaVenta parseRespuestaVenta(String xmlResponse) {
        RespuestaVenta respuesta = new RespuestaVenta();

        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setNamespaceAware(true);
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new InputSource(new StringReader(xmlResponse)));

            NodeList nodes = doc.getElementsByTagName("*");
            for (int i = 0; i < nodes.getLength(); i++) {
                Node node = nodes.item(i);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    String localName = node.getLocalName();
                    String textContent = node.getTextContent();

                    if (textContent != null && !textContent.trim().isEmpty()) {
                        switch (localName) {
                            case "Exito":
                            case "exito":
                                respuesta.setExito(Boolean.parseBoolean(textContent));
                                break;
                            case "Mensaje":
                            case "mensaje":
                                respuesta.setMensaje(textContent);
                                break;
                            case "IdFactura":
                            case "idFactura":
                                respuesta.setIdFactura(Integer.parseInt(textContent));
                                break;
                            case "IdCreditoBanco":
                            case "idCreditoBanco":
                                respuesta.setIdCreditoBanco(Integer.parseInt(textContent));
                                break;
                            case "CuotaMensual":
                            case "cuotaMensual":
                                respuesta.setCuotaMensual(Double.parseDouble(textContent));
                                break;
                            case "NumeroCuotas":
                            case "numeroCuotas":
                                respuesta.setNumeroCuotas(Integer.parseInt(textContent));
                                break;
                        }
                    }
                }
            }

        } catch (Exception ex) {
            respuesta.setExito(false);
            respuesta.setMensaje("Error parsing RespuestaVenta: " + ex.getMessage());
        }

        return respuesta;
    }

    private ValidacionCredito parseValidacionCreditoResponse(String xmlResponse) {
        ValidacionCredito validacion = new ValidacionCredito();

        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setNamespaceAware(true);
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new InputSource(new StringReader(xmlResponse)));

            NodeList nodes = doc.getElementsByTagName("*");
            for (int i = 0; i < nodes.getLength(); i++) {
                Node node = nodes.item(i);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    String localName = node.getLocalName();
                    String textContent = node.getTextContent();

                    if (textContent != null && !textContent.trim().isEmpty()) {
                        switch (localName) {
                            case "SujetoCredito":
                            case "sujetoCredito":
                                validacion.setSujetoCredito(Boolean.parseBoolean(textContent));
                                break;
                            case "Mensaje":
                            case "mensaje":
                                validacion.setMensaje(textContent);
                                break;
                            case "IdCliente":
                            case "idCliente":
                                validacion.setIdCliente(Integer.parseInt(textContent));
                                break;
                        }
                    }
                }
            }

        } catch (Exception ex) {
            validacion.setSujetoCredito(false);
            validacion.setMensaje("Error parsing ValidacionCredito: " + ex.getMessage());
        }

        return validacion;
    }

    private MontoMaximo parseMontoMaximoResponse(String xmlResponse) {
        MontoMaximo monto = new MontoMaximo();

        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setNamespaceAware(true);
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new InputSource(new StringReader(xmlResponse)));

            NodeList nodes = doc.getElementsByTagName("*");
            for (int i = 0; i < nodes.getLength(); i++) {
                Node node = nodes.item(i);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    String localName = node.getLocalName();
                    String textContent = node.getTextContent();

                    if (textContent != null && !textContent.trim().isEmpty()) {
                        switch (localName) {
                            case "Aprobado":
                            case "aprobado":
                                monto.setAprobado(Boolean.parseBoolean(textContent));
                                break;
                            case "Mensaje":
                            case "mensaje":
                                monto.setMensaje(textContent);
                                break;
                            case "MontoMaximo":
                            case "montoMaximo":
                                monto.setMontoMaximo(Double.parseDouble(textContent));
                                break;
                        }
                    }
                }
            }

        } catch (Exception ex) {
            monto.setAprobado(false);
            monto.setMensaje("Error parsing MontoMaximo: " + ex.getMessage());
        }

        return monto;
    }

    private TablaAmortizacion parseTablaAmortizacionResponse(String xmlResponse) {
        TablaAmortizacion tabla = new TablaAmortizacion();

        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setNamespaceAware(true);
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new InputSource(new StringReader(xmlResponse)));

            NodeList nodes = doc.getElementsByTagName("*");
            List<CuotaAmortizacion> cuotas = new ArrayList<>();

            for (int i = 0; i < nodes.getLength(); i++) {
                Node node = nodes.item(i);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    String localName = node.getLocalName();
                    String textContent = node.getTextContent();

                    if (textContent != null && !textContent.trim().isEmpty()) {
                        switch (localName) {
                            case "Encontrado":
                            case "encontrado":
                                tabla.setEncontrado(Boolean.parseBoolean(textContent));
                                break;
                            case "Mensaje":
                            case "mensaje":
                                tabla.setMensaje(textContent);
                                break;
                            case "IdCredito":
                            case "idCredito":
                                tabla.setIdCredito(Integer.parseInt(textContent));
                                break;
                            case "MontoCredito":
                            case "montoCredito":
                                tabla.setMontoCredito(Double.parseDouble(textContent));
                                break;
                            case "TasaInteres":
                            case "tasaInteres":
                                tabla.setTasaInteres(Double.parseDouble(textContent));
                                break;
                            case "NumeroCuotas":
                            case "numeroCuotas":
                                tabla.setNumeroCuotas(Integer.parseInt(textContent));
                                break;
                        }
                    }

                    // Parsear cuotas individuales si existen
                    if (localName.equals("Cuota") || localName.equals("cuota")) {
                        CuotaAmortizacion cuota = parseCuotaFromNode(node);
                        if (cuota != null) {
                            cuotas.add(cuota);
                        }
                    }
                }
            }

            tabla.setCuotas(cuotas);

        } catch (Exception ex) {
            tabla.setEncontrado(false);
            tabla.setMensaje("Error parsing TablaAmortizacion: " + ex.getMessage());
        }

        return tabla;
    }

    private CuotaAmortizacion parseCuotaFromNode(Node node) {
        try {
            CuotaAmortizacion cuota = new CuotaAmortizacion();
            NodeList children = node.getChildNodes();

            for (int i = 0; i < children.getLength(); i++) {
                Node child = children.item(i);
                if (child.getNodeType() == Node.ELEMENT_NODE) {
                    String localName = child.getLocalName();
                    String textContent = child.getTextContent();

                    if (textContent != null && !textContent.trim().isEmpty()) {
                        switch (localName) {
                            case "NumeroCuota":
                            case "numeroCuota":
                                cuota.setNumeroCuota(Integer.parseInt(textContent));
                                break;
                            case "ValorCuota":
                            case "valorCuota":
                                cuota.setValorCuota(Double.parseDouble(textContent));
                                break;
                            case "InteresPagado":
                            case "interesPagado":
                                cuota.setInteresPagado(Double.parseDouble(textContent));
                                break;
                            case "CapitalPagado":
                            case "capitalPagado":
                                cuota.setCapitalPagado(Double.parseDouble(textContent));
                                break;
                            case "Saldo":
                            case "saldo":
                                cuota.setSaldo(Double.parseDouble(textContent));
                                break;
                        }
                    }
                }
            }

            return cuota;
        } catch (Exception ex) {
            System.err.println("Error parsing cuota from node: " + ex.getMessage());
            return null;
        }
    }
}