using System;
using System.Runtime.Serialization;

namespace BanQuito_Soap_Dotnet.ec.edu.monster.modelo
{
    [DataContract(Name = "tablaAmortizacion")]
    public class TablaAmortizacion
    {
        [DataMember(Order = 1)]
        public int IdAmortizacion { get; set; }

        [DataMember(Order = 2)]
        public int IdCredito { get; set; }

        [DataMember(Order = 3)]
        public int NumeroCuota { get; set; }

        [DataMember(Order = 4)]
        public decimal ValorCuota { get; set; }

        [DataMember(Order = 5)]
        public decimal Interes { get; set; }

        [DataMember(Order = 6)]
        public decimal CapitalPagado { get; set; }

        [DataMember(Order = 7)]
        public decimal Saldo { get; set; }

        public TablaAmortizacion() { }

        public TablaAmortizacion(int idAmortizacion, int idCredito, int numeroCuota, 
                                decimal valorCuota, decimal interes, decimal capitalPagado, 
                                decimal saldo)
        {
            IdAmortizacion = idAmortizacion;
            IdCredito = idCredito;
            NumeroCuota = numeroCuota;
            ValorCuota = valorCuota;
            Interes = interes;
            CapitalPagado = capitalPagado;
            Saldo = saldo;
        }
    }
}
