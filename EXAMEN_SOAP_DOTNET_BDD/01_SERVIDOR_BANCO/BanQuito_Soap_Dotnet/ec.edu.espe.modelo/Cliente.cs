using System;
using System.Runtime.Serialization;

namespace BanQuito_Soap_Dotnet.ec.edu.monster.modelo
{
    [DataContract(Name = "cliente")]
    public class Cliente
    {
        [DataMember(Order = 1)]
        public int IdCliente { get; set; }

        [DataMember(Order = 2)]
        public string Cedula { get; set; }

        [DataMember(Order = 3)]
        public string Nombres { get; set; }

        [DataMember(Order = 4)]
        public string Apellidos { get; set; }

        [DataMember(Order = 5)]
        public DateTime FechaNacimiento { get; set; }

        [DataMember(Order = 6)]
        public string EstadoCivil { get; set; }

        [DataMember(Order = 7)]
        public string Direccion { get; set; }

        [DataMember(Order = 8)]
        public string Telefono { get; set; }

        [DataMember(Order = 9)]
        public string Email { get; set; }

        [DataMember(Order = 10)] 
        public DateTime FechaRegistro { get; set; }

        public Cliente() { }

        public Cliente(int idCliente, string cedula, string nombres, string apellidos, 
                      DateTime fechaNacimiento, string estadoCivil, string direccion, 
                      string telefono, string email, DateTime fechaRegistro)
        {
            IdCliente = idCliente;
            Cedula = cedula;
            Nombres = nombres;
            Apellidos = apellidos;
            FechaNacimiento = fechaNacimiento;
            EstadoCivil = estadoCivil;
            Direccion = direccion;
            Telefono = telefono;
            Email = email;
            FechaRegistro = fechaRegistro;

        }
    }
}
