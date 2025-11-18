using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using Comercializadora_Soap_Dotnet.BanQuitoServiceReference;

namespace Comercializadora_Soap_Dotnet.ec.edu.monster.soapclient
{
    /// <summary>
    /// Cliente para consumir servicios SOAP del Banco BanQuito
    /// </summary>
    public class BanQuitoClient
    {
        private readonly string serviceURL;

        public BanQuitoClient()
        {
            // Leer URL del Web.config
            serviceURL = System.Configuration.ConfigurationManager.AppSettings["BanQuitoServiceURL"];
        }

        /// <summary>
        /// Validar si el cliente es sujeto de crédito
        /// </summary>
        public respuestaValidacion ValidarSujetoCredito(string cedula)
        {
            try
            {
                using (var client = new BanQuitoWSClient())
                {
                    return client.ValidarSujetoCredito(cedula);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al validar sujeto de crédito: " + ex.Message);
            }
        }

        /// <summary>
        /// Obtener monto máximo de crédito
        /// </summary>
        public double ObtenerMontoMaximoCredito(string cedula)
        {
            try
            {
                using (var client = new BanQuitoWSClient())
                {
                    return client.ObtenerMontoMaximoCredito(cedula);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener monto máximo: " + ex.Message);
            }
        }

        /// <summary>
        /// Otorgar crédito
        /// </summary>
        public respuestaCredito OtorgarCredito(string cedula, double precio, int numCuotas)
        {
            try
            {
                using (var client = new BanQuitoWSClient())
                {
                    return client.OtorgarCredito(cedula, precio, numCuotas);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al otorgar crédito: " + ex.Message);
            }
        }

        /// <summary>
        /// Obtener tabla de amortización
        /// </summary>
        public List<tablaAmortizacion> ObtenerTablaAmortizacion(int idCredito)
        {
            try
            {
                using (var client = new BanQuitoWSClient())
                {
                    return client.ObtenerTablaAmortizacion(idCredito).ToList();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener tabla de amortización: " + ex.Message);
            }
        }
    }
}