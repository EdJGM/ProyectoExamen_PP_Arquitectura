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

                // ✅ CAMBIO 1: Tabla y columnas en snake_case
                string sql = @"
                    SELECT id_cliente, cedula, nombre, apellido, fecha_nacimiento, 
                           estado_civil, direccion, telefono, email, fecha_registro
                    FROM cliente
                    WHERE cedula = @cedula";

                SqlCommand cmd = new SqlCommand(sql, cn);
                cmd.Parameters.AddWithValue("@cedula", cedula);

                SqlDataReader dr = cmd.ExecuteReader();

                if (dr.Read())
                {
                    // ✅ CAMBIO 2: DataReader usa nombres de columnas en snake_case
                    return new Cliente
                    {
                        IdCliente = Convert.ToInt32(dr["id_cliente"]),
                        Cedula = dr["cedula"].ToString(),
                        Nombres = dr["nombre"].ToString(),
                        Apellidos = dr["apellido"].ToString(),
                        FechaNacimiento = Convert.ToDateTime(dr["fecha_nacimiento"]),
                        EstadoCivil = dr["estado_civil"].ToString(),
                        Direccion = dr["direccion"].ToString(),
                        Telefono = dr["telefono"].ToString(),
                        Email = dr["email"].ToString(),
                        FechaRegistro = Convert.ToDateTime(dr["fecha_registro"])
                    };
                }

                return null;
            }
        }
    }
}