using System.Runtime.Serialization;

namespace Comercializadora_Soap_Dotnet.ec.edu.monster.modelo
{
    [DataContract(Name = "respuestaVenta")]
    public class RespuestaVenta
    {
        [DataMember(Order = 1)]
        public bool Exitoso { get; set; }

        [DataMember(Order = 2)]
        public string Mensaje { get; set; }

        [DataMember(Order = 3)]
        public int IdFactura { get; set; }

        [DataMember(Order = 4)]
        public double Total { get; set; }

        [DataMember(Order = 5)]
        public string FormaPago { get; set; }

        [DataMember(Order = 6)]
        public double Descuento { get; set; }

        [DataMember(Order = 7)]
        public int IdCreditoBanco { get; set; }

        [DataMember(Order = 8)]
        public double CuotaMensual { get; set; }

        [DataMember(Order = 9)]
        public int NumeroCuotas { get; set; }

        public RespuestaVenta()
        {
            Exitoso = false;
            Mensaje = "";
            IdFactura = 0;
            Total = 0;
            FormaPago = "";
            Descuento = 0;
            IdCreditoBanco = 0;
            CuotaMensual = 0;
            NumeroCuotas = 0;
        }
    }
}