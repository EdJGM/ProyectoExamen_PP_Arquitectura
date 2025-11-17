using System;
using System.Runtime.Serialization;

namespace BanQuito_Soap_Dotnet.ec.edu.monster.modelo
{
    [DataContract(Name = "cuenta")]
    public class Cuenta
    {
        [DataMember(Order = 1)]
        public int IdCuenta { get; set; }

        [DataMember(Order = 2)]
        public int IdCliente { get; set; }

        [DataMember(Order = 3)]
        public string NumeroCuenta { get; set; }

        [DataMember(Order = 4)]
        public string TipoCuenta { get; set; }

        [DataMember(Order = 5)]
        public decimal Saldo { get; set; }

        [DataMember(Order = 6)]
        public DateTime FechaApertura { get; set; }

        [DataMember(Order = 7)]
        public string Estado { get; set; }

        public Cuenta() { }
    }
}
