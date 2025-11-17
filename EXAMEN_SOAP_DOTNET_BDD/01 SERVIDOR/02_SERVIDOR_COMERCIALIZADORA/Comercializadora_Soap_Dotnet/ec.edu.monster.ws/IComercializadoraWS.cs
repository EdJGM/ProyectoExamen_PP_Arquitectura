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
        string CrearElectrodomestico(string nombre, string descripcion, double precio);

        [OperationContract]
        string ActualizarElectrodomestico(int id, string nombre, string descripcion, double precio);

        [OperationContract]
        string EliminarElectrodomestico(int id);

        // ========== FACTURACIÓN ==========
        [OperationContract]
        RespuestaVenta ProcesarVentaEfectivo(
            string cedula,
            List<int> idsElectrodomesticos,
            List<int> cantidades);

        [OperationContract]
        RespuestaVenta ProcesarVentaCredito(
            string cedula,
            List<int> idsElectrodomesticos,
            List<int> cantidades,
            int numeroCuotas);

        // ========== CONSULTAS ==========
        [OperationContract]
        List<tablaAmortizacion> ConsultarTablaAmortizacion(int idCreditoBanco);

        [OperationContract]
        string Health();
    }
}