using BanQuito_Soap_Dotnet.ec.edu.monster.modelo;
using BanQuito_Soap_Dotnet.ec.edu.monster.servicio;
using System;
using System.Collections.Generic;

namespace BanQuito_Soap_Dotnet.ec.edu.monster.ws
{
    /// <summary>
    /// Implementación del Web Service SOAP del Banco BanQuito
    /// </summary>
    public class BanQuitoWS : IBanQuitoWS
    {
        public RespuestaValidacion ValidarSujetoCredito(string cedula)
        {
            try
            {
                return CreditoService.ValidarSujetoCredito(cedula);
            }
            catch (Exception ex)
            {
                return new RespuestaValidacion(false, "Error: " + ex.Message);
            }
        }

        public double ObtenerMontoMaximoCredito(string cedula)
        {
            try
            {
                return CreditoService.ObtenerMontoMaximoCredito(cedula);
            }
            catch (Exception ex)
            {
                // Log del error (en producción usar un sistema de logs)
                return 0;
            }
        }

        public RespuestaCredito OtorgarCredito(string cedula, double precioElectrodomestico, int numeroCuotas)
        {
            try
            {
                return CreditoService.OtorgarCredito(cedula, precioElectrodomestico, numeroCuotas);
            }
            catch (Exception ex)
            {
                return new RespuestaCredito(false, "Error al procesar crédito: " + ex.Message);
            }
        }

        public List<TablaAmortizacion> ObtenerTablaAmortizacion(int idCredito)
        {
            try
            {
                return CreditoService.ObtenerTablaAmortizacion(idCredito);
            }
            catch (Exception ex)
            {
                // Log del error
                return new List<TablaAmortizacion>();
            }
        }

        public string Health()
        {
            return "Servicio BanQuito SOAP activo - Módulo de Crédito funcionando correctamente";
        }
    }
}
