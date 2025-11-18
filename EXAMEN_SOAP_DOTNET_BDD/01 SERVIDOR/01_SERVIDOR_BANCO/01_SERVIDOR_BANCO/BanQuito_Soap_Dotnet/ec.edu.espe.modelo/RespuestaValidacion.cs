using System.Collections.Generic;
using System.Runtime.Serialization;

namespace BanQuito_Soap_Dotnet.ec.edu.monster.modelo
{
    [DataContract(Name = "respuestaValidacion")]
    public class RespuestaValidacion
    {
        [DataMember(Order = 1)]
        public bool EsSujetoCredito { get; set; }

        [DataMember(Order = 2)]
        public string Mensaje { get; set; }

        [DataMember(Order = 3)]
        public List<string> Razones { get; set; }

        public RespuestaValidacion()
        {
            Razones = new List<string>();
        }

        public RespuestaValidacion(bool esSujetoCredito, string mensaje)
        {
            EsSujetoCredito = esSujetoCredito;
            Mensaje = mensaje;
            Razones = new List<string>();
        }
    }
}
