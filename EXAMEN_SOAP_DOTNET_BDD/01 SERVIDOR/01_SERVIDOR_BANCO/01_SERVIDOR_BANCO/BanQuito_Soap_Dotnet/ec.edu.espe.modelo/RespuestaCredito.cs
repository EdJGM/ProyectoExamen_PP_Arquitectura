using System.Runtime.Serialization;

namespace BanQuito_Soap_Dotnet.ec.edu.monster.modelo
{
    [DataContract(Name = "respuestaCredito")]
    public class RespuestaCredito
    {
        [DataMember(Order = 1)]
        public bool Aprobado { get; set; }

        [DataMember(Order = 2)]
        public string Mensaje { get; set; }

        [DataMember(Order = 3)]
        public int IdCredito { get; set; }

        [DataMember(Order = 4)]
        public double CuotaMensual { get; set; }

        public RespuestaCredito() { }

        public RespuestaCredito(bool aprobado, string mensaje)
        {
            Aprobado = aprobado;
            Mensaje = mensaje;
            IdCredito = 0;
            CuotaMensual = 0;
        }

        public RespuestaCredito(bool aprobado, string mensaje, int idCredito, double cuotaMensual)
        {
            Aprobado = aprobado;
            Mensaje = mensaje;
            IdCredito = idCredito;
            CuotaMensual = cuotaMensual;
        }
    }
}
