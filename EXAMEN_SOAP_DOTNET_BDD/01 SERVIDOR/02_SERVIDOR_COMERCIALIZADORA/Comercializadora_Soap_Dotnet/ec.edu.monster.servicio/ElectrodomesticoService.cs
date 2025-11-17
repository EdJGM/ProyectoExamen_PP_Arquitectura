using Comercializadora_Soap_Dotnet.ec.edu.monster.modelo;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;

namespace Comercializadora_Soap_Dotnet.ec.edu.monster.servicio
{
    public class ElectrodomesticoService
    {
        private static readonly string connectionString =
            ConfigurationManager.ConnectionStrings["ComercializadoraDB"].ConnectionString;

        public static List<Electrodomestico> ListarTodos()
        {
            var lista = new List<Electrodomestico>();
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                string sql = "SELECT * FROM Electrodomesticos WHERE Estado = 'ACTIVO'";
                SqlCommand cmd = new SqlCommand(sql, cn);
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    lista.Add(new Electrodomestico
                    {
                        IdElectrodomestico = Convert.ToInt32(dr["IdElectrodomestico"]),
                        Nombre = dr["Nombre"].ToString(),
                        Descripcion = dr["Descripcion"].ToString(),
                        Precio = Convert.ToDecimal(dr["Precio"]),
                        Estado = dr["Estado"].ToString(),
                        FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"])
                    });
                }
            }
            return lista;
        }

        public static Electrodomestico ObtenerPorId(int id)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                string sql = "SELECT * FROM Electrodomesticos WHERE IdElectrodomestico = @id";
                SqlCommand cmd = new SqlCommand(sql, cn);
                cmd.Parameters.AddWithValue("@id", id);
                SqlDataReader dr = cmd.ExecuteReader();

                if (dr.Read())
                {
                    return new Electrodomestico
                    {
                        IdElectrodomestico = Convert.ToInt32(dr["IdElectrodomestico"]),
                        Nombre = dr["Nombre"].ToString(),
                        Descripcion = dr["Descripcion"].ToString(),
                        Precio = Convert.ToDecimal(dr["Precio"]),
                        Estado = dr["Estado"].ToString(),
                        FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"])
                    };
                }
            }
            return null;
        }

        public static string Crear(string nombre, string descripcion, decimal precio)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                string sql = @"INSERT INTO Electrodomesticos (Nombre, Descripcion, Precio, Estado, FechaRegistro)
                             VALUES (@nombre, @descripcion, @precio, 'ACTIVO', GETDATE())";
                SqlCommand cmd = new SqlCommand(sql, cn);
                cmd.Parameters.AddWithValue("@nombre", nombre);
                cmd.Parameters.AddWithValue("@descripcion", descripcion);
                cmd.Parameters.AddWithValue("@precio", precio);
                cmd.ExecuteNonQuery();
                return "Electrodoméstico creado exitosamente";
            }
        }

        public static string Actualizar(int id, string nombre, string descripcion, decimal precio)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                string sql = @"UPDATE Electrodomesticos 
                             SET Nombre = @nombre, Descripcion = @descripcion, Precio = @precio
                             WHERE IdElectrodomestico = @id";
                SqlCommand cmd = new SqlCommand(sql, cn);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@nombre", nombre);
                cmd.Parameters.AddWithValue("@descripcion", descripcion);
                cmd.Parameters.AddWithValue("@precio", precio);
                cmd.ExecuteNonQuery();
                return "Electrodoméstico actualizado exitosamente";
            }
        }

        public static string Eliminar(int id)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                string sql = "UPDATE Electrodomesticos SET Estado = 'INACTIVO' WHERE IdElectrodomestico = @id";
                SqlCommand cmd = new SqlCommand(sql, cn);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
                return "Electrodoméstico eliminado exitosamente";
            }
        }
    }
}