using Comercializadora_Soap_Dotnet.ec.edu.monster.modelo;
using Comercializadora_Soap_Dotnet.ec.edu.monster.soapclient;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Comercializadora_Soap_Dotnet.ec.edu.monster.servicio
{
    public class FacturacionService
    {
        private static readonly string connectionString =
            System.Configuration.ConfigurationManager.ConnectionStrings["ComercializadoraDB"].ConnectionString;

        /// <summary>
        /// Procesar venta en EFECTIVO (con 33% de descuento)
        /// </summary>
        public static RespuestaVenta ProcesarVentaEfectivo(
            string cedula,
            List<int> idsElectrodomesticos,
            List<int> cantidades)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                SqlTransaction tx = cn.BeginTransaction();

                try
                {
                    // Calcular subtotal
                    decimal subtotal = 0;
                    for (int i = 0; i < idsElectrodomesticos.Count; i++)
                    {
                        int idElectro = idsElectrodomesticos[i];
                        int cantidad = cantidades[i];

                        string sqlPrecio = "SELECT Precio FROM Electrodomesticos WHERE IdElectrodomestico = @id";
                        SqlCommand cmdPrecio = new SqlCommand(sqlPrecio, cn, tx);
                        cmdPrecio.Parameters.AddWithValue("@id", idElectro);
                        decimal precio = Convert.ToDecimal(cmdPrecio.ExecuteScalar());

                        subtotal += precio * cantidad;
                    }

                    // Aplicar descuento del 33%
                    decimal descuento = subtotal * 0.33m;
                    decimal total = subtotal - descuento;

                    // Insertar factura
                    string sqlFactura = @"
                        INSERT INTO Facturas (Cedula, FormaPago, FechaVenta, Descuento, Subtotal, Total, Estado)
                        VALUES (@cedula, 'EFECTIVO', GETDATE(), @descuento, @subtotal, @total, 'PAGADO');
                        SELECT SCOPE_IDENTITY();";

                    SqlCommand cmdFactura = new SqlCommand(sqlFactura, cn, tx);
                    cmdFactura.Parameters.AddWithValue("@cedula", cedula);
                    cmdFactura.Parameters.AddWithValue("@descuento", descuento);
                    cmdFactura.Parameters.AddWithValue("@subtotal", subtotal);
                    cmdFactura.Parameters.AddWithValue("@total", total);

                    int idFactura = Convert.ToInt32(cmdFactura.ExecuteScalar());

                    // Insertar detalles
                    for (int i = 0; i < idsElectrodomesticos.Count; i++)
                    {
                        int idElectro = idsElectrodomesticos[i];
                        int cantidad = cantidades[i];

                        string sqlPrecio = "SELECT Precio FROM Electrodomesticos WHERE IdElectrodomestico = @id";
                        SqlCommand cmdPrecio = new SqlCommand(sqlPrecio, cn, tx);
                        cmdPrecio.Parameters.AddWithValue("@id", idElectro);
                        decimal precioUnit = Convert.ToDecimal(cmdPrecio.ExecuteScalar());

                        string sqlDetalle = @"
                            INSERT INTO DetallesFactura (IdFactura, IdElectrodomestico, Cantidad, PrecioUnitario, Subtotal)
                            VALUES (@idFactura, @idElectro, @cantidad, @precioUnit, @subtotal)";

                        SqlCommand cmdDetalle = new SqlCommand(sqlDetalle, cn, tx);
                        cmdDetalle.Parameters.AddWithValue("@idFactura", idFactura);
                        cmdDetalle.Parameters.AddWithValue("@idElectro", idElectro);
                        cmdDetalle.Parameters.AddWithValue("@cantidad", cantidad);
                        cmdDetalle.Parameters.AddWithValue("@precioUnit", precioUnit);
                        cmdDetalle.Parameters.AddWithValue("@subtotal", precioUnit * cantidad);

                        cmdDetalle.ExecuteNonQuery();
                    }

                    tx.Commit();

                    return new RespuestaVenta
                    {
                        Exitoso = true,
                        Mensaje = "Venta en efectivo procesada exitosamente",
                        IdFactura = idFactura,
                        Total = (double)total,
                        FormaPago = "EFECTIVO",
                        Descuento = (double)descuento
                    };
                }
                catch (Exception ex)
                {
                    tx.Rollback();
                    return new RespuestaVenta
                    {
                        Exitoso = false,
                        Mensaje = "Error al procesar venta: " + ex.Message
                    };
                }
            }
        }

        /// <summary>
        /// Procesar venta a CRÉDITO DIRECTO (sin descuento, consulta al banco)
        /// </summary>
        public static RespuestaVenta ProcesarVentaCredito(
            string cedula,
            List<int> idsElectrodomesticos,
            List<int> cantidades,
            int numeroCuotas)
        {
            // PASO 1: Calcular total
            decimal total = 0;
            for (int i = 0; i < idsElectrodomesticos.Count; i++)
            {
                using (SqlConnection cn = new SqlConnection(connectionString))
                {
                    cn.Open();
                    string sqlPrecio = "SELECT Precio FROM Electrodomesticos WHERE IdElectrodomestico = @id";
                    SqlCommand cmdPrecio = new SqlCommand(sqlPrecio, cn);
                    cmdPrecio.Parameters.AddWithValue("@id", idsElectrodomesticos[i]);
                    
                    object result = cmdPrecio.ExecuteScalar();
                    if (result != null)
                    {
                        decimal precio = Convert.ToDecimal(result);
                        total += precio * cantidades[i];
                    }
                }
            }

            if (total <= 0)
            {
                return new RespuestaVenta
                {
                    Exitoso = false,
                    Mensaje = "Error: No se pudo calcular el total. Verifica los productos."
                };
            }

            // ⭐ CONSUMIR SERVICIOS DEL BANCO
            BanQuitoClient bancoClient = new BanQuitoClient();

            // PASO 2: Validar sujeto de crédito
            var validacion = bancoClient.ValidarSujetoCredito(cedula);
            if (!validacion.EsSujetoCredito)
            {
                return new RespuestaVenta
                {
                    Exitoso = false,
                    Mensaje = "Cliente no es sujeto de crédito: " + validacion.Mensaje
                };
            }

            // PASO 3: Verificar monto máximo
            double montoMaximo = bancoClient.ObtenerMontoMaximoCredito(cedula);
            if ((double)total > montoMaximo)
            {
                return new RespuestaVenta
                {
                    Exitoso = false,
                    Mensaje = $"El monto (${total}) excede el crédito máximo aprobado (${montoMaximo})"
                };
            }

            // PASO 4: Otorgar crédito
            var credito = bancoClient.OtorgarCredito(cedula, (double)total, numeroCuotas);
            if (!credito.Aprobado)
            {
                return new RespuestaVenta
                {
                    Exitoso = false,
                    Mensaje = "Crédito rechazado por el banco: " + credito.Mensaje
                };
            }

            // PASO 5: Registrar factura LOCAL
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                SqlTransaction tx = cn.BeginTransaction();

                try
                {
                    // Insertar factura
                    string sqlFactura = @"
                        INSERT INTO Facturas (Cedula, FormaPago, FechaVenta, Descuento, Subtotal, Total, IdCreditoBanco, Estado)
                        VALUES (@cedula, 'CREDITO_DIRECTO', GETDATE(), 0, @total, @total, @idCredito, 'PAGADO');
                        SELECT SCOPE_IDENTITY();";

                    SqlCommand cmdFactura = new SqlCommand(sqlFactura, cn, tx);
                    cmdFactura.Parameters.AddWithValue("@cedula", cedula);
                    cmdFactura.Parameters.AddWithValue("@total", total);
                    cmdFactura.Parameters.AddWithValue("@idCredito", credito.IdCredito);

                    int idFactura = Convert.ToInt32(cmdFactura.ExecuteScalar());

                    // Insertar detalles
                    for (int i = 0; i < idsElectrodomesticos.Count; i++)
                    {
                        int idElectro = idsElectrodomesticos[i];
                        int cantidad = cantidades[i];

                        string sqlPrecio = "SELECT Precio FROM Electrodomesticos WHERE IdElectrodomestico = @id";
                        SqlCommand cmdPrecio = new SqlCommand(sqlPrecio, cn, tx);
                        cmdPrecio.Parameters.AddWithValue("@id", idElectro);
                        decimal precioUnit = Convert.ToDecimal(cmdPrecio.ExecuteScalar());

                        string sqlDetalle = @"
                            INSERT INTO DetallesFactura (IdFactura, IdElectrodomestico, Cantidad, PrecioUnitario, Subtotal)
                            VALUES (@idFactura, @idElectro, @cantidad, @precioUnit, @subtotal)";

                        SqlCommand cmdDetalle = new SqlCommand(sqlDetalle, cn, tx);
                        cmdDetalle.Parameters.AddWithValue("@idFactura", idFactura);
                        cmdDetalle.Parameters.AddWithValue("@idElectro", idElectro);
                        cmdDetalle.Parameters.AddWithValue("@cantidad", cantidad);
                        cmdDetalle.Parameters.AddWithValue("@precioUnit", precioUnit);
                        cmdDetalle.Parameters.AddWithValue("@subtotal", precioUnit * cantidad);

                        cmdDetalle.ExecuteNonQuery();
                    }

                    tx.Commit();

                    return new RespuestaVenta
                    {
                        Exitoso = true,
                        Mensaje = "Venta a crédito procesada exitosamente",
                        IdFactura = idFactura,
                        Total = (double)total,
                        FormaPago = "CREDITO_DIRECTO",
                        Descuento = 0,
                        IdCreditoBanco = credito.IdCredito,
                        CuotaMensual = credito.CuotaMensual,
                        NumeroCuotas = numeroCuotas
                    };
                }
                catch (Exception ex)
                {
                    tx.Rollback();
                    return new RespuestaVenta
                    {
                        Exitoso = false,
                        Mensaje = "Error al registrar factura: " + ex.Message
                    };
                }
            }
        }
    }
}