using System;
using System.Runtime.Serialization;

namespace Comercializadora_Soap_Dotnet.ec.edu.monster.modelo
{
    [DataContract(Name = "electrodomestico")]
    public class Electrodomestico
    {
        [DataMember(Order = 1)]
        public int IdElectrodomestico { get; set; }

        [DataMember(Order = 2)]
        public string Nombre { get; set; }

        [DataMember(Order = 3)]
        public string Descripcion { get; set; }

        [DataMember(Order = 4)]
        public decimal Precio { get; set; }

        [DataMember(Order = 5)]
        public string Estado { get; set; }

        [DataMember(Order = 6)]
        public DateTime FechaRegistro { get; set; }

        public Electrodomestico() { }
    }
}