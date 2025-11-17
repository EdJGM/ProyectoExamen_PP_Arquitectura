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

        [DataMember(Order = 3)]
        public decimal MontoCreditoOtorgado { get; set; }

        [DataMember(Order = 4)]
        public decimal TasaInteres { get; set; }

        [DataMember(Order = 5)]
        public int NumeroCuotas { get; set; }

        [DataMember(Order = 6)]
        public DateTime FechaOtorgamiento { get; set; }

        [DataMember(Order = 7)]
        public string Estado { get; set; }

        public Credito() { }

        public Credito(int idCredito, int idCliente, decimal montoCreditoOtorgado, 
                      decimal tasaInteres, int numeroCuotas, DateTime fechaOtorgamiento, 
                      string estado)
        {
            IdCredito = idCredito;
            IdCliente = idCliente;
            MontoCreditoOtorgado = montoCreditoOtorgado;
            TasaInteres = tasaInteres;
            NumeroCuotas = numeroCuotas;
            FechaOtorgamiento = fechaOtorgamiento;
            Estado = estado;
        }
    }
}
