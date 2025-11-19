using System;
using System.Runtime.Serialization;

namespace BanQuito_Soap_Dotnet.ec.edu.monster.modelo
{
    [DataContract(Name = "movimiento")]
    public class Movimiento
    {
        [DataMember(Order = 1)]
        public int IdMovimiento { get; set; }

        [DataMember(Order = 2)]
        public int IdCuenta { get; set; }

        [DataMember(Order = 3)]
        public string TipoMovimiento { get; set; }

        [DataMember(Order = 4)]
        public decimal Monto { get; set; }

        [DataMember(Order = 5)]
        public DateTime Fecha { get; set; }

        [DataMember(Order = 6)]
        public string Descripcion { get; set; }

        public Movimiento() { }
    }
}
