using System;
using System.Runtime.Serialization;

namespace Comercializadora_Soap_Dotnet.ec.edu.monster.modelo
{
    [DataContract(Name = "factura")]
    public class Factura
    {
        [DataMember(Order = 1)]
        public int IdFactura { get; set; }

        [DataMember(Order = 2)]
        public string NumeroFactura { get; set; }

        [DataMember(Order = 3)]
        public string CedulaCliente { get; set; }

        [DataMember(Order = 4)]
        public string NombreCliente { get; set; }

        [DataMember(Order = 5)]
        public DateTime FechaFactura { get; set; }

        [DataMember(Order = 6)]
        public decimal Subtotal { get; set; }

        [DataMember(Order = 7)]
        public decimal Descuento { get; set; }

        [DataMember(Order = 8)]
        public decimal Total { get; set; }

        [DataMember(Order = 9)]
        public string FormaPago { get; set; }

        [DataMember(Order = 10)]
        public string Estado { get; set; }

        public Factura() { }
    }
}