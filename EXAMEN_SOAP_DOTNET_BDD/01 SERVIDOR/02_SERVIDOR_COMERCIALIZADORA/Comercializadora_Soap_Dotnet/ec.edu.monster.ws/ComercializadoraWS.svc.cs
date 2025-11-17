using Comercializadora_Soap_Dotnet.ec.edu.monster.modelo;
using Comercializadora_Soap_Dotnet.ec.edu.monster.servicio;
using Comercializadora_Soap_Dotnet.ec.edu.monster.soapclient;
using Comercializadora_Soap_Dotnet.BanQuitoServiceReference;
using System;
using System.Collections.Generic;

namespace Comercializadora_Soap_Dotnet.ec.edu.monster.ws
{
    public class ComercializadoraWS : IComercializadoraWS
    {
        // ========== ELECTRODOMÉSTICOS ==========
        public List<Electrodomestico> ListarElectrodomesticos()
        {
            return ElectrodomesticoService.ListarTodos();
        }

        public Electrodomestico ObtenerElectrodomestico(int id)
        {
            return ElectrodomesticoService.ObtenerPorId(id);
        }

        public string CrearElectrodomestico(string nombre, string descripcion, double precio)
        {
            return ElectrodomesticoService.Crear(nombre, descripcion, (decimal)precio);
        }

        public string ActualizarElectrodomestico(int id, string nombre, string descripcion, double precio)
        {
            return ElectrodomesticoService.Actualizar(id, nombre, descripcion, (decimal)precio);
        }

        public string EliminarElectrodomestico(int id)
        {
            return ElectrodomesticoService.Eliminar(id);
        }

        // ========== FACTURACIÓN ==========
        public RespuestaVenta ProcesarVentaEfectivo(string cedula, List<int> idsElectrodomesticos, List<int> cantidades)
        {
            return FacturacionService.ProcesarVentaEfectivo(cedula, idsElectrodomesticos, cantidades);
        }

        public RespuestaVenta ProcesarVentaCredito(string cedula, List<int> idsElectrodomesticos, List<int> cantidades, int numeroCuotas)
        {
            return FacturacionService.ProcesarVentaCredito(cedula, idsElectrodomesticos, cantidades, numeroCuotas);
        }

        // ========== CONSULTAS ==========
        public List<tablaAmortizacion> ConsultarTablaAmortizacion(int idCreditoBanco)
        {
            var bancoClient = new BanQuitoClient();
            return bancoClient.ObtenerTablaAmortizacion(idCreditoBanco);
        }

        public string Health()
        {
            return "Servicio Comercializadora SOAP activo y funcionando correctamente";
        }
    }
}
