using BanQuito_Soap_Dotnet.ec.edu.monster.modelo;
using System;
using System.Configuration;
using System.Data.SqlClient;

namespace BanQuito_Soap_Dotnet.ec.edu.monster.servicio
{
    public class ClienteService
    {
        private static readonly string connectionString =
            ConfigurationManager.ConnectionStrings["BanQuitoDB"].ConnectionString;

        /// <summary>
        /// Obtener cliente por cédula
        /// </summary>
        public static Cliente ObtenerPorCedula(string cedula)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();

                string sql = @"
                    SELECT IdCliente, Cedula, Nombres, Apellidos, FechaNacimiento, 
                           EstadoCivil, Direccion, Telefono, Email, Estado
                    FROM Clientes
                    WHERE Cedula = @cedula";

                SqlCommand cmd = new SqlCommand(sql, cn);
                cmd.Parameters.AddWithValue("@cedula", cedula);

                SqlDataReader dr = cmd.ExecuteReader();

                if (dr.Read())
                {
                    return new Cliente
                    {
                        IdCliente = Convert.ToInt32(dr["IdCliente"]),
                        Cedula = dr["Cedula"].ToString(),
                        Nombres = dr["Nombres"].ToString(),
                        Apellidos = dr["Apellidos"].ToString(),
                        FechaNacimiento = Convert.ToDateTime(dr["FechaNacimiento"]),
                        EstadoCivil = dr["EstadoCivil"].ToString(),
                        Direccion = dr["Direccion"].ToString(),
                        Telefono = dr["Telefono"].ToString(),
                        Email = dr["Email"].ToString(),
                        Estado = dr["Estado"].ToString()
                    };
                }

                return null;
            }
        }
    }
}
