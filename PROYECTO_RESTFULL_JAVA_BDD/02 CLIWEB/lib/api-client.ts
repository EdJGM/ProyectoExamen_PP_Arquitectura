const BASE_COMERCIALIZADORA = "http://localhost:8080/ComercializadoraElectrodomesticos/api";
const BASE_BANQUITO = "http://localhost:8080/BanquitoCore/api/credito";

export type TipoProtocolo = "REST" | "SOAP";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class ClienteUnificado {
  private protocoloActual: TipoProtocolo = "REST";

  setProtocolo(protocolo: TipoProtocolo) {
    this.protocoloActual = protocolo;
  }

  // ========== ELECTRODOMÉSTICOS ==========
  
  async listarElectrodomesticos() {
    if (this.protocoloActual === "REST") {
      return this.listarElectrodomesticosREST();
    }
    throw new Error("SOAP no implementado aún");
  }

  async obtenerElectrodomestico(id: number) {
    if (this.protocoloActual === "REST") {
      return this.obtenerElectrodomesticoREST(id);
    }
    throw new Error("SOAP no implementado aún");
  }

  async crearElectrodomestico(producto: any) {
    if (this.protocoloActual === "REST") {
      return this.crearElectrodomesticoREST(producto);
    }
    throw new Error("SOAP no implementado aún");
  }

  async actualizarElectrodomestico(id: number, producto: any) {
    if (this.protocoloActual === "REST") {
      return this.actualizarElectrodomesticoREST(id, producto);
    }
    throw new Error("SOAP no implementado aún");
  }

  async eliminarElectrodomestico(id: number) {
    if (this.protocoloActual === "REST") {
      return this.eliminarElectrodomesticoREST(id);
    }
    throw new Error("SOAP no implementado aún");
  }

  // ========== FACTURACIÓN ==========

  async procesarVentaEfectivo(solicitud: any) {
    if (this.protocoloActual === "REST") {
      return this.procesarVentaEfectivoREST(solicitud);
    }
    throw new Error("SOAP no implementado aún");
  }

  async procesarVentaCredito(solicitud: any) {
    if (this.protocoloActual === "REST") {
      return this.procesarVentaCreditoREST(solicitud);
    }
    throw new Error("SOAP no implementado aún");
  }

  // ========== CRÉDITO BANQUITO ==========

  async validarSujetoCredito(cedula: string) {
    if (this.protocoloActual === "REST") {
      return this.validarSujetoCreditoREST(cedula);
    }
    throw new Error("SOAP no implementado aún");
  }

  async obtenerMontoMaximo(cedula: string) {
    if (this.protocoloActual === "REST") {
      return this.obtenerMontoMaximoREST(cedula);
    }
    throw new Error("SOAP no implementado aún");
  }

  async obtenerTablaAmortizacion(idCredito: number) {
    if (this.protocoloActual === "REST") {
      return this.obtenerTablaAmortizacionREST(idCredito);
    }
    throw new Error("SOAP no implementado aún");
  }

  // ========== CONECTIVIDAD ==========

  async probarConectividad() {
    try {
      const testBanquito = await this.testBanquitoREST();
      const testComercializadora = await this.listarElectrodomesticosREST();
      return testBanquito && testComercializadora;
    } catch {
      return false;
    }
  }

  async listarFacturas() {
    if (this.protocoloActual === "REST") {
      return this.listarFacturasREST();
    }
    throw new Error("SOAP no implementado aún");
  }

  async obtenerFactura(idFactura: number) {
    if (this.protocoloActual === "REST") {
      return this.obtenerFacturaREST(idFactura);
    }
    throw new Error("SOAP no implementado aún");
  }

  // ========== IMPLEMENTACIONES REST ==========

  private async listarFacturasREST() {
    try {
      const response = await fetch(`${BASE_COMERCIALIZADORA}/facturacion/facturas`, {
        method: "GET",
      });
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error("Error al listar facturas:", error);
      return [];
    }
  }

  private async obtenerFacturaREST(idFactura: number) {
    try {
      const response = await fetch(`${BASE_COMERCIALIZADORA}/facturacion/facturas/${idFactura}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        return {
          encontrada: true,
          mensaje: "Factura obtenida exitosamente",
          ...data
        };
      }
      return {
        encontrada: false,
        mensaje: "Factura no encontrada"
      };
    } catch (error) {
      return {
        encontrada: false,
        mensaje: `Error de conexión: ${error}`
      };
    }
  }

  // ========== REST IMPLEMENTATIONS ==========

  private async listarElectrodomesticosREST() {
    const response = await fetch(`${BASE_COMERCIALIZADORA}/electrodomesticos`, {
      method: "GET",
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  }

  private async obtenerElectrodomesticoREST(id: number) {
    const response = await fetch(`${BASE_COMERCIALIZADORA}/electrodomesticos/${id}`, {
      method: "GET",
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  }

  private async crearElectrodomesticoREST(producto: any) {
    try {
      const response = await fetch(`${BASE_COMERCIALIZADORA}/electrodomesticos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      return await response.json();
    } catch (error) {
      return { exito: false, mensaje: `Error al crear producto: ${error}` };
    }
  }

  private async actualizarElectrodomesticoREST(id: number, producto: any) {
    try {
      const response = await fetch(`${BASE_COMERCIALIZADORA}/electrodomesticos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      return await response.json();
    } catch (error) {
      return { exito: false, mensaje: `Error al actualizar producto: ${error}` };
    }
  }

  private async eliminarElectrodomesticoREST(id: number) {
    try {
      const response = await fetch(`${BASE_COMERCIALIZADORA}/electrodomesticos/${id}`, {
        method: "DELETE",
      });
      return await response.json();
    } catch (error) {
      return { exito: false, mensaje: `Error al eliminar producto: ${error}` };
    }
  }

  private async procesarVentaEfectivoREST(solicitud: any) {
    try {
      const response = await fetch(`${BASE_COMERCIALIZADORA}/facturacion/venta-efectivo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(solicitud),
      });
      return await response.json();
    } catch (error) {
      return { exito: false, mensaje: `Error al procesar venta: ${error}` };
    }
  }

  private async procesarVentaCreditoREST(solicitud: any) {
    try {
      const response = await fetch(`${BASE_COMERCIALIZADORA}/facturacion/venta-credito`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(solicitud),
      });
      return await response.json();
    } catch (error) {
      return { exito: false, mensaje: `Error al procesar venta a crédito: ${error}` };
    }
  }

  private async validarSujetoCreditoREST(cedula: string) {
    try {
      const response = await fetch(`${BASE_BANQUITO}/validar/${cedula}`, {
        method: "GET",
      });
      if (response.ok) {
        return await response.json();
      }
      return { sujetoCredito: false, mensaje: "Error en el servicio de validación" };
    } catch (error) {
      return { sujetoCredito: false, mensaje: `Error de conexión: ${error}` };
    }
  }

  private async obtenerMontoMaximoREST(cedula: string) {
    try {
      const response = await fetch(`${BASE_BANQUITO}/monto-maximo/${cedula}`, {
        method: "GET",
      });
      if (response.ok) {
        return await response.json();
      }
      return { aprobado: false, mensaje: "Error en el servicio" };
    } catch (error) {
      return { aprobado: false, mensaje: `Error de conexión: ${error}` };
    }
  }

  private async obtenerTablaAmortizacionREST(idCredito: number) {
    try {
      const response = await fetch(`${BASE_BANQUITO}/tabla-amortizacion/${idCredito}`, {
        method: "GET",
      });
      if (response.ok) {
        return await response.json();
      }
      return { encontrado: false, mensaje: "Tabla de amortización no encontrada" };
    } catch (error) {
      return { encontrado: false, mensaje: `Error de conexión: ${error}` };
    }
  }

  private async testBanquitoREST() {
    try {
      const response = await fetch(`${BASE_BANQUITO}/test`, {
        method: "GET",
      });
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch {
      return null;
    }
  }
}

// Singleton instance
export const clienteUnificado = new ClienteUnificado();
