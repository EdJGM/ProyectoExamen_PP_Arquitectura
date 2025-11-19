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
                string sql = "SELECT * FROM electrodomestico WHERE estado = 'DISPONIBLE'";
                SqlCommand cmd = new SqlCommand(sql, cn);
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    lista.Add(new Electrodomestico
                    {
                        IdElectrodomestico = Convert.ToInt32(dr["id_electrodomestico"]),
                        Codigo = dr["codigo"].ToString(),
                        Nombre = dr["nombre"].ToString(),
                        Descripcion = dr["descripcion"].ToString(),
                        Marca = dr["marca"].ToString(),
                        PrecioVenta = Convert.ToDecimal(dr["precio_venta"]),
                        Stock = Convert.ToInt32(dr["stock"]),
                        Estado = dr["estado"].ToString(),
                        FechaRegistro = Convert.ToDateTime(dr["fecha_registro"])
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
                string sql = "SELECT * FROM electrodomestico WHERE id_electrodomestico = @id";
                SqlCommand cmd = new SqlCommand(sql, cn);
                cmd.Parameters.AddWithValue("@id", id);
                SqlDataReader dr = cmd.ExecuteReader();

                if (dr.Read())
                {
                    return new Electrodomestico
                    {
                        IdElectrodomestico = Convert.ToInt32(dr["id_electrodomestico"]),
                        Codigo = dr["codigo"].ToString(),
                        Nombre = dr["nombre"].ToString(),
                        Descripcion = dr["descripcion"].ToString(),
                        Marca = dr["marca"].ToString(),
                        PrecioVenta = Convert.ToDecimal(dr["precio_venta"]),
                        Stock = Convert.ToInt32(dr["stock"]),
                        Estado = dr["estado"].ToString(),
                        FechaRegistro = Convert.ToDateTime(dr["fecha_registro"])
                    };
                }
            }
            return null;
        }

        public static string Crear(string codigo, string nombre, string descripcion, string marca, decimal precioVenta, int stock)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                string sql = @"INSERT INTO electrodomestico 
                    (codigo, nombre, descripcion, marca, precio_venta, stock, estado, fecha_registro)
                    VALUES (@codigo, @nombre, @descripcion, @marca, @precio_venta, @stock, 'DISPONIBLE', GETDATE())";
                SqlCommand cmd = new SqlCommand(sql, cn);
                cmd.Parameters.AddWithValue("@codigo", codigo);
                cmd.Parameters.AddWithValue("@nombre", nombre);
                cmd.Parameters.AddWithValue("@descripcion", descripcion);
                cmd.Parameters.AddWithValue("@marca", marca);
                cmd.Parameters.AddWithValue("@precio_venta", precioVenta);
                cmd.Parameters.AddWithValue("@stock", stock);
                cmd.ExecuteNonQuery();
                return "Electrodoméstico creado exitosamente";
            }
        }

        public static string Actualizar(int id, string nombre, string descripcion, string marca, decimal precioVenta, int stock)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                string sql = @"UPDATE electrodomestico 
                    SET nombre = @nombre, descripcion = @descripcion, marca = @marca, precio_venta = @precio_venta, stock = @stock
                    WHERE id_electrodomestico = @id";
                SqlCommand cmd = new SqlCommand(sql, cn);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@nombre", nombre);
                cmd.Parameters.AddWithValue("@descripcion", descripcion);
                cmd.Parameters.AddWithValue("@marca", marca);
                cmd.Parameters.AddWithValue("@precio_venta", precioVenta);
                cmd.Parameters.AddWithValue("@stock", stock);
                cmd.ExecuteNonQuery();
                return "Electrodoméstico actualizado exitosamente";
            }
        }

        public static string Eliminar(int id)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                string sql = "UPDATE electrodomestico SET estado = 'INACTIVO' WHERE id_electrodomestico = @id";
                SqlCommand cmd = new SqlCommand(sql, cn);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
                return "Electrodoméstico eliminado exitosamente";
            }
        }
    }
}