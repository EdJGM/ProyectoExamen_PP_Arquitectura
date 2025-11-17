using BanQuito_Soap_Dotnet.ec.edu.monster.modelo;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace BanQuito_Soap_Dotnet.ec.edu.monster.servicio
{
    public class CreditoService
    {
        private static readonly string connectionString =
            ConfigurationManager.ConnectionStrings["BanQuitoDB"].ConnectionString;

        /// <summary>
        /// SERVICIO 1: Validar si una persona es sujeto de crédito
        /// </summary>
        public static RespuestaValidacion ValidarSujetoCredito(string cedula)
        {
            var respuesta = new RespuestaValidacion { Razones = new List<string>() };

            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();

                // REGLA 1: Verificar si es cliente del banco
                string sqlCliente = "SELECT IdCliente, FechaNacimiento, EstadoCivil FROM Clientes WHERE Cedula = @cedula AND Estado = 'ACTIVO'";
                SqlCommand cmdCliente = new SqlCommand(sqlCliente, cn);
                cmdCliente.Parameters.AddWithValue("@cedula", cedula);
                SqlDataReader drCliente = cmdCliente.ExecuteReader();

                if (!drCliente.Read())
                {
                    drCliente.Close();
                    respuesta.Razones.Add("No es cliente del banco");
                    respuesta.EsSujetoCredito = false;
                    respuesta.Mensaje = "Rechazado: No es cliente del banco";
                    return respuesta;
                }

                int idCliente = Convert.ToInt32(drCliente["IdCliente"]);
                DateTime fechaNacimiento = Convert.ToDateTime(drCliente["FechaNacimiento"]);
                string estadoCivil = drCliente["EstadoCivil"].ToString();
                drCliente.Close();

                // REGLA 2: Verificar que tenga al menos un depósito en el último mes
                DateTime fechaLimite = DateTime.Now.AddMonths(-1);
                string sqlDeposito = @"
                    SELECT COUNT(*) 
                    FROM Movimientos m
                    INNER JOIN Cuentas c ON m.IdCuenta = c.IdCuenta
                    WHERE c.IdCliente = @idCliente 
                    AND m.TipoMovimiento = 'DEPOSITO'
                    AND m.Fecha >= @fechaLimite";

                SqlCommand cmdDeposito = new SqlCommand(sqlDeposito, cn);
                cmdDeposito.Parameters.AddWithValue("@idCliente", idCliente);
                cmdDeposito.Parameters.AddWithValue("@fechaLimite", fechaLimite);
                int countDepositos = Convert.ToInt32(cmdDeposito.ExecuteScalar());

                if (countDepositos == 0)
                {
                    respuesta.Razones.Add("No tiene depósitos en el último mes");
                }

                // REGLA 3: Si es casado, debe ser mayor de 25 años
                int edad = DateTime.Now.Year - fechaNacimiento.Year;
                if (DateTime.Now < fechaNacimiento.AddYears(edad))
                    edad--;

                if (estadoCivil.Equals("CASADO", StringComparison.OrdinalIgnoreCase) && edad < 25)
                {
                    respuesta.Razones.Add("Es menor de 25 años siendo casado");
                }

                // REGLA 4: No debe tener crédito activo
                string sqlCreditoActivo = "SELECT COUNT(*) FROM Creditos WHERE IdCliente = @idCliente AND Estado = 'ACTIVO'";
                SqlCommand cmdCreditoActivo = new SqlCommand(sqlCreditoActivo, cn);
                cmdCreditoActivo.Parameters.AddWithValue("@idCliente", idCliente);
                int creditosActivos = Convert.ToInt32(cmdCreditoActivo.ExecuteScalar());

                if (creditosActivos > 0)
                {
                    respuesta.Razones.Add("Ya tiene un crédito activo");
                }

                // Resultado final
                respuesta.EsSujetoCredito = respuesta.Razones.Count == 0;
                respuesta.Mensaje = respuesta.EsSujetoCredito ? "Aprobado" : "Rechazado";
            }

            return respuesta;
        }

        /// <summary>
        /// SERVICIO 2: Obtener monto máximo de crédito
        /// </summary>
        public static double ObtenerMontoMaximoCredito(string cedula)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();

                // Obtener IdCliente
                string sqlCliente = "SELECT IdCliente FROM Clientes WHERE Cedula = @cedula AND Estado = 'ACTIVO'";
                SqlCommand cmdCliente = new SqlCommand(sqlCliente, cn);
                cmdCliente.Parameters.AddWithValue("@cedula", cedula);
                object objIdCliente = cmdCliente.ExecuteScalar();

                if (objIdCliente == null)
                    return 0;

                int idCliente = Convert.ToInt32(objIdCliente);

                // Obtener movimientos de los últimos 3 meses
                DateTime fechaLimite = DateTime.Now.AddMonths(-3);
                string sqlMovimientos = @"
                    SELECT m.TipoMovimiento, m.Monto
                    FROM Movimientos m
                    INNER JOIN Cuentas c ON m.IdCuenta = c.IdCuenta
                    WHERE c.IdCliente = @idCliente 
                    AND m.Fecha >= @fechaLimite";

                SqlCommand cmdMovimientos = new SqlCommand(sqlMovimientos, cn);
                cmdMovimientos.Parameters.AddWithValue("@idCliente", idCliente);
                cmdMovimientos.Parameters.AddWithValue("@fechaLimite", fechaLimite);

                SqlDataReader dr = cmdMovimientos.ExecuteReader();

                List<decimal> depositos = new List<decimal>();
                List<decimal> retiros = new List<decimal>();

                while (dr.Read())
                {
                    string tipo = dr["TipoMovimiento"].ToString();
                    decimal monto = Convert.ToDecimal(dr["Monto"]);

                    if (tipo == "DEPOSITO")
                        depositos.Add(monto);
                    else if (tipo == "RETIRO")
                        retiros.Add(monto);
                }
                dr.Close();

                // Calcular promedios
                double promedioDepositos = depositos.Count > 0 ? (double)depositos.Average() : 0;
                double promedioRetiros = retiros.Count > 0 ? (double)retiros.Average() : 0;

                // Aplicar fórmula: ((Promedio Depósitos – Promedio Retiros) * 60%) * 9
                double diferencia = promedioDepositos - promedioRetiros;
                double capacidadPago = diferencia * 0.60;
                double montoMaximo = capacidadPago * 9;

                return montoMaximo > 0 ? montoMaximo : 0;
            }
        }

        /// <summary>
        /// SERVICIO 3: Otorgar crédito y generar tabla de amortización
        /// </summary>
        public static RespuestaCredito OtorgarCredito(string cedula, double precioElectrodomestico, int numeroCuotas)
        {
            // Validar número de cuotas
            if (numeroCuotas < 3 || numeroCuotas > 24)
            {
                return new RespuestaCredito(false, "El número de cuotas debe estar entre 3 y 24 meses");
            }

            // Validar que sea sujeto de crédito
            var validacion = ValidarSujetoCredito(cedula);
            if (!validacion.EsSujetoCredito)
            {
                return new RespuestaCredito(false, "Cliente no es sujeto de crédito: " + validacion.Mensaje);
            }

            // Validar monto máximo
            double montoMaximo = ObtenerMontoMaximoCredito(cedula);
            if (precioElectrodomestico > montoMaximo)
            {
                return new RespuestaCredito(false, 
                    $"El monto solicitado (${precioElectrodomestico:F2}) excede el máximo aprobado (${montoMaximo:F2})");
            }

            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                SqlTransaction tx = cn.BeginTransaction();

                try
                {
                    // Obtener IdCliente
                    string sqlCliente = "SELECT IdCliente FROM Clientes WHERE Cedula = @cedula";
                    SqlCommand cmdCliente = new SqlCommand(sqlCliente, cn, tx);
                    cmdCliente.Parameters.AddWithValue("@cedula", cedula);
                    int idCliente = Convert.ToInt32(cmdCliente.ExecuteScalar());

                    // Insertar crédito
                    string sqlCredito = @"
                        INSERT INTO Creditos (IdCliente, MontoCreditoOtorgado, TasaInteres, NumeroCuotas, FechaOtorgamiento, Estado)
                        VALUES (@idCliente, @monto, 16.0, @numCuotas, GETDATE(), 'ACTIVO');
                        SELECT SCOPE_IDENTITY();";

                    SqlCommand cmdCredito = new SqlCommand(sqlCredito, cn, tx);
                    cmdCredito.Parameters.AddWithValue("@idCliente", idCliente);
                    cmdCredito.Parameters.AddWithValue("@monto", (decimal)precioElectrodomestico);
                    cmdCredito.Parameters.AddWithValue("@numCuotas", numeroCuotas);

                    int idCredito = Convert.ToInt32(cmdCredito.ExecuteScalar());

                    // Calcular cuota fija
                    double tasaMensual = 0.16 / 12; // 16% anual / 12 meses = 1.333% mensual
                    double denominador = (1 - Math.Pow(1 + tasaMensual, -numeroCuotas)) / tasaMensual;
                    double cuotaFija = precioElectrodomestico / denominador;

                    // Generar tabla de amortización
                    double saldo = precioElectrodomestico;

                    for (int i = 1; i <= numeroCuotas; i++)
                    {
                        double interes = saldo * tasaMensual;
                        double capitalPagado = cuotaFija - interes;
                        saldo -= capitalPagado;

                        // Ajustar última cuota para eliminar residuos de redondeo
                        if (i == numeroCuotas)
                            saldo = 0;

                        string sqlAmortizacion = @"
                            INSERT INTO TablaAmortizacion (IdCredito, NumeroCuota, ValorCuota, Interes, CapitalPagado, Saldo)
                            VALUES (@idCredito, @numCuota, @valorCuota, @interes, @capitalPagado, @saldo)";

                        SqlCommand cmdAmortizacion = new SqlCommand(sqlAmortizacion, cn, tx);
                        cmdAmortizacion.Parameters.AddWithValue("@idCredito", idCredito);
                        cmdAmortizacion.Parameters.AddWithValue("@numCuota", i);
                        cmdAmortizacion.Parameters.AddWithValue("@valorCuota", (decimal)cuotaFija);
                        cmdAmortizacion.Parameters.AddWithValue("@interes", (decimal)interes);
                        cmdAmortizacion.Parameters.AddWithValue("@capitalPagado", (decimal)capitalPagado);
                        cmdAmortizacion.Parameters.AddWithValue("@saldo", (decimal)saldo);

                        cmdAmortizacion.ExecuteNonQuery();
                    }

                    tx.Commit();

                    return new RespuestaCredito(true, "Crédito aprobado exitosamente", idCredito, cuotaFija);
                }
                catch (Exception ex)
                {
                    tx.Rollback();
                    return new RespuestaCredito(false, "Error al otorgar crédito: " + ex.Message);
                }
            }
        }

        /// <summary>
        /// SERVICIO 4: Obtener tabla de amortización
        /// </summary>
        public static List<TablaAmortizacion> ObtenerTablaAmortizacion(int idCredito)
        {
            var lista = new List<TablaAmortizacion>();

            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();

                string sql = @"
                    SELECT IdAmortizacion, IdCredito, NumeroCuota, ValorCuota, Interes, CapitalPagado, Saldo
                    FROM TablaAmortizacion
                    WHERE IdCredito = @idCredito
                    ORDER BY NumeroCuota";

                SqlCommand cmd = new SqlCommand(sql, cn);
                cmd.Parameters.AddWithValue("@idCredito", idCredito);

                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    lista.Add(new TablaAmortizacion
                    {
                        IdAmortizacion = Convert.ToInt32(dr["IdAmortizacion"]),
                        IdCredito = Convert.ToInt32(dr["IdCredito"]),
                        NumeroCuota = Convert.ToInt32(dr["NumeroCuota"]),
                        ValorCuota = Convert.ToDecimal(dr["ValorCuota"]),
                        Interes = Convert.ToDecimal(dr["Interes"]),
                        CapitalPagado = Convert.ToDecimal(dr["CapitalPagado"]),
                        Saldo = Convert.ToDecimal(dr["Saldo"])
                    });
                }
            }

            return lista;
        }
    }
}
