using System.Runtime.Serialization;

namespace Comercializadora_Soap_Dotnet.ec.edu.monster.modelo
{
    [DataContract(Name = "detalleFactura")]
    public class DetalleFactura
    {
        [DataMember(Order = 1)]
        public int IdDetalle { get; set; }

        [DataMember(Order = 2)]
        public int IdFactura { get; set; }

        [DataMember(Order = 3)]
        public int IdElectrodomestico { get; set; }

        [DataMember(Order = 4)]
        public int Cantidad { get; set; }

        [DataMember(Order = 5)]
        public decimal PrecioUnitario { get; set; }

        [DataMember(Order = 6)]
        public decimal Subtotal { get; set; }

        public DetalleFactura() { }
    }
}