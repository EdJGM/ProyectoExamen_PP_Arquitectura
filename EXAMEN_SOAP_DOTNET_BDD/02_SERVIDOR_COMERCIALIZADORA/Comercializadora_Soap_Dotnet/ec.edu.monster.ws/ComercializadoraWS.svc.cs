using Comercializadora_Soap_Dotnet.ec.edu.monster.modelo;
using Comercializadora_Soap_Dotnet.ec.edu.monster.servicio;
using Comercializadora_Soap_Dotnet.ec.edu.monster.soapclient;
using Comercializadora_Soap_Dotnet.BanQuitoServiceReference;
using System;
using System.Collections.Generic;
using System.Diagnostics;

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

        public string CrearElectrodomestico(string codigo, string nombre, string descripcion, string marca, double precioVenta, int stock)
        {
            return ElectrodomesticoService.Crear(codigo, nombre, descripcion, marca, (decimal)precioVenta, stock);
        }

        public string ActualizarElectrodomestico(int id, string nombre, string descripcion, string marca, double precioVenta, int stock)
        {
            return ElectrodomesticoService.Actualizar(id, nombre, descripcion, marca, (decimal)precioVenta, stock);
        }

        public string EliminarElectrodomestico(int id)
        {
            return ElectrodomesticoService.Eliminar(id);
        }

        // ========== FACTURACIÓN ==========

        public RespuestaVenta ProcesarVentaEfectivo(string cedula, int[] idsElectrodomesticos, int[] cantidades)
        {
            var listaIds = new List<int>(idsElectrodomesticos ?? new int[0]);
            var listaCantidades = new List<int>(cantidades ?? new int[0]);
            return FacturacionService.ProcesarVentaEfectivo(cedula, listaIds, listaCantidades);
        }

        public RespuestaVenta ProcesarVentaCredito(string cedula, int[] idsElectrodomesticos, int[] cantidades, int numeroCuotas)
        {
            var listaIds = new List<int>(idsElectrodomesticos ?? new int[0]);
            var listaCantidades = new List<int>(cantidades ?? new int[0]);
            return FacturacionService.ProcesarVentaCredito(cedula, listaIds, listaCantidades, numeroCuotas);
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