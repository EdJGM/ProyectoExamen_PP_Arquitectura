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
        public string Codigo { get; set; }

        [DataMember(Order = 3)]
        public string Nombre { get; set; }

        [DataMember(Order = 4)]
        public string Descripcion { get; set; }

        [DataMember(Order = 5)]
        public string Marca { get; set; }

        [DataMember(Order = 6)]
        public decimal PrecioVenta { get; set; }

        [DataMember(Order = 7)]
        public int Stock { get; set; }

        [DataMember(Order = 8)]
        public string Estado { get; set; }

        [DataMember(Order = 9)]
        public DateTime FechaRegistro { get; set; }

        public Electrodomestico() { }
    }
}