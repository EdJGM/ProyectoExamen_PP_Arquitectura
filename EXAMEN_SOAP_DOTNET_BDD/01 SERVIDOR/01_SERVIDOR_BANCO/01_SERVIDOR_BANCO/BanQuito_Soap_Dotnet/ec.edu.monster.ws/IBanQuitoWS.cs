using BanQuito_Soap_Dotnet.ec.edu.monster.modelo;
using System.Collections.Generic;
using System.ServiceModel;

namespace BanQuito_Soap_Dotnet.ec.edu.monster.ws
{
    /// <summary>
    /// Interfaz del Web Service SOAP del Banco BanQuito
    /// Módulo de Crédito
    /// </summary>
    [ServiceContract]
    public interface IBanQuitoWS
    {
        /// <summary>
        /// SERVICIO 1: Validar si una persona es sujeto de crédito
        /// </summary>
        /// <param name="cedula">Cédula del cliente</param>
        /// <returns>Respuesta con validación y razones</returns>
        [OperationContract]
        RespuestaValidacion ValidarSujetoCredito(string cedula);

        /// <summary>
        /// SERVICIO 2: Obtener monto máximo de crédito autorizado
        /// </summary>
        /// <param name="cedula">Cédula del cliente</param>
        /// <returns>Monto máximo en dólares</returns>
        [OperationContract]
        double ObtenerMontoMaximoCredito(string cedula);

        /// <summary>
        /// SERVICIO 3: Otorgar crédito y generar tabla de amortización
        /// </summary>
        /// <param name="cedula">Cédula del cliente</param>
        /// <param name="precioElectrodomestico">Precio del electrodoméstico</param>
        /// <param name="numeroCuotas">Número de cuotas (3-24)</param>
        /// <returns>Respuesta con aprobación y detalles del crédito</returns>
        [OperationContract]
        RespuestaCredito OtorgarCredito(string cedula, double precioElectrodomestico, int numeroCuotas);

        /// <summary>
        /// SERVICIO 4: Obtener tabla de amortización de un crédito
        /// </summary>
        /// <param name="idCredito">ID del crédito</param>
        /// <returns>Lista con todas las cuotas</returns>
        [OperationContract]
        List<TablaAmortizacion> ObtenerTablaAmortizacion(int idCredito);

        /// <summary>
        /// Servicio de salud para verificar que el servicio está activo
        /// </summary>
        [OperationContract]
        string Health();
    }
}
