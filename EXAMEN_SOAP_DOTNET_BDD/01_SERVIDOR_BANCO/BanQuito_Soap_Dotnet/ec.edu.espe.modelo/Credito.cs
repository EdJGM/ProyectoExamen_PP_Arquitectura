using System;
using System.Runtime.Serialization;

namespace BanQuito_Soap_Dotnet.ec.edu.monster.modelo
{
    [DataContract(Name = "credito")]
    public class Credito
    {
        [DataMember(Order = 1)]
        public int IdCredito { get; set; }

        [DataMember(Order = 2)]
        public int IdCliente { get; set; }

        // ✅ NUEVO CAMPO
        [DataMember(Order = 3)]
        public string Cedula { get; set; }

        [DataMember(Order = 4)]
        public decimal MontoCreditoOtorgado { get; set; }

        [DataMember(Order = 5)]
        public decimal TasaInteres { get; set; }

        [DataMember(Order = 6)]
        public int NumeroCuotas { get; set; }

        // ✅ NUEVO CAMPO
        [DataMember(Order = 7)]
        public decimal CuotaMensual { get; set; }

        [DataMember(Order = 8)]
        public DateTime FechaOtorgamiento { get; set; }

        [DataMember(Order = 9)]
        public string Estado { get; set; }

        public Credito() { }

        public Credito(int idCredito, int idCliente, string cedula, decimal montoCreditoOtorgado,
                      decimal tasaInteres, int numeroCuotas, decimal cuotaMensual,
                      DateTime fechaOtorgamiento, string estado)
        {
            IdCredito = idCredito;
            IdCliente = idCliente;
            Cedula = cedula; //
            MontoCreditoOtorgado = montoCreditoOtorgado;
            TasaInteres = tasaInteres;
            NumeroCuotas = numeroCuotas;
            CuotaMensual = cuotaMensual; //
            FechaOtorgamiento = fechaOtorgamiento;
            Estado = estado;
        }
    }
}