using Comercializadora_Soap_Dotnet.ec.edu.monster.modelo;
using Comercializadora_Soap_Dotnet.BanQuitoServiceReference;
using System.Collections.Generic;
using System.ServiceModel;

namespace Comercializadora_Soap_Dotnet.ec.edu.monster.ws
{
    [ServiceContract]
    public interface IComercializadoraWS
    {
        // ========== ELECTRODOMÉSTICOS ==========
        [OperationContract]
        List<Electrodomestico> ListarElectrodomesticos();

        [OperationContract]
        Electrodomestico ObtenerElectrodomestico(int id);

        [OperationContract]
        string CrearElectrodomestico(string codigo, string nombre, string descripcion, string marca, double precioVenta, int stock);

        [OperationContract]
        string ActualizarElectrodomestico(int id, string nombre, string descripcion, string marca, double precioVenta, int stock);

        [OperationContract]
        string EliminarElectrodomestico(int id);

        // ========== FACTURACIÓN ==========
        [OperationContract]
        RespuestaVenta ProcesarVentaEfectivo(
            string cedula,
            int[] idsElectrodomesticos,
            int[] cantidades);

        [OperationContract]
        RespuestaVenta ProcesarVentaCredito(
            string cedula,
            int[] idsElectrodomesticos,
            int[] cantidades,
            int numeroCuotas);

        // ========== CONSULTAS ==========
        [OperationContract]
        List<tablaAmortizacion> ConsultarTablaAmortizacion(int idCreditoBanco);

        [OperationContract]
        string Health();
    }
}