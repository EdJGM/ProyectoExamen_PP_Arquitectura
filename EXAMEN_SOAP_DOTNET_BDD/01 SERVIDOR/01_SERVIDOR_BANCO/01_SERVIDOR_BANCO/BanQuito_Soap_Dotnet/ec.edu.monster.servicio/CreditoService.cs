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
                string sqlCliente = "SELECT id_cliente, fecha_nacimiento, estado_civil FROM cliente WHERE cedula = @cedula";
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

                int idCliente = Convert.ToInt32(drCliente["id_cliente"]);
                DateTime fechaNacimiento = Convert.ToDateTime(drCliente["fecha_nacimiento"]);
                string estadoCivil = drCliente["estado_civil"].ToString();
                drCliente.Close();

                // REGLA 2: Verificar que tenga al menos un depósito en el último mes
                DateTime fechaLimite = DateTime.Now.AddMonths(-1);
                string sqlDeposito = @"
                    SELECT COUNT(*) 
                    FROM movimiento m
                    INNER JOIN cuenta c ON m.id_cuenta = c.id_cuenta
                    WHERE c.id_cliente = @idCliente 
                    AND m.tipo_movimiento = 'DEPOSITO'
                    AND m.fecha_movimiento >= @fechaLimite";

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
                string sqlCreditoActivo = "SELECT COUNT(*) FROM credito WHERE id_cliente = @idCliente AND estado = 'ACTIVO'";
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
                string sqlCliente = "SELECT id_cliente FROM cliente WHERE cedula = @cedula";
                SqlCommand cmdCliente = new SqlCommand(sqlCliente, cn);
                cmdCliente.Parameters.AddWithValue("@cedula", cedula);
                object objIdCliente = cmdCliente.ExecuteScalar();

                if (objIdCliente == null)
                    return 0;

                int idCliente = Convert.ToInt32(objIdCliente);

                // Obtener movimientos de los últimos 3 meses
                DateTime fechaLimite = DateTime.Now.AddMonths(-3);
                string sqlMovimientos = @"
                    SELECT m.tipo_movimiento, m.monto
                    FROM movimiento m
                    INNER JOIN cuenta c ON m.id_cuenta = c.id_cuenta
                    WHERE c.id_cliente = @idCliente 
                    AND m.fecha_movimiento >= @fechaLimite";

                SqlCommand cmdMovimientos = new SqlCommand(sqlMovimientos, cn);
                cmdMovimientos.Parameters.AddWithValue("@idCliente", idCliente);
                cmdMovimientos.Parameters.AddWithValue("@fechaLimite", fechaLimite);

                SqlDataReader dr = cmdMovimientos.ExecuteReader();

                List<decimal> depositos = new List<decimal>();
                List<decimal> retiros = new List<decimal>();

                while (dr.Read())
                {
                    string tipo = dr["tipo_movimiento"].ToString();
                    decimal monto = Convert.ToDecimal(dr["monto"]);

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
                    string sqlCliente = "SELECT id_cliente FROM cliente WHERE cedula = @cedula";
                    SqlCommand cmdCliente = new SqlCommand(sqlCliente, cn, tx);
                    cmdCliente.Parameters.AddWithValue("@cedula", cedula);
                    int idCliente = Convert.ToInt32(cmdCliente.ExecuteScalar());

                    // Calcular cuota fija ANTES de insertar el crédito
                    double tasaMensual = 0.18 / 12; // 18% anual (igual que Java)
                    double denominador = (1 - Math.Pow(1 + tasaMensual, -numeroCuotas)) / tasaMensual;
                    double cuotaFija = precioElectrodomestico / denominador;

                    // Insertar crédito
                    string sqlCredito = @"
                        INSERT INTO credito (id_cliente, cedula, monto_credito, tasa_interes, numero_cuotas, cuota_mensual, fecha_otorgamiento, estado)
                        VALUES (@idCliente, @cedula, @monto, 18.0, @numCuotas, @cuotaMensual, GETDATE(), 'ACTIVO');
                        SELECT SCOPE_IDENTITY();";

                    SqlCommand cmdCredito = new SqlCommand(sqlCredito, cn, tx);
                    cmdCredito.Parameters.AddWithValue("@idCliente", idCliente);
                    cmdCredito.Parameters.AddWithValue("@cedula", cedula);
                    cmdCredito.Parameters.AddWithValue("@monto", (decimal)precioElectrodomestico);
                    cmdCredito.Parameters.AddWithValue("@numCuotas", numeroCuotas);
                    cmdCredito.Parameters.AddWithValue("@cuotaMensual", (decimal)cuotaFija);

                    int idCredito = Convert.ToInt32(cmdCredito.ExecuteScalar());

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

                        // Calcular fecha de vencimiento
                        DateTime fechaVencimiento = DateTime.Now.AddMonths(i);

                        string sqlAmortizacion = @"
                            INSERT INTO amortizacion (id_credito, numero_cuota, valor_cuota, interes_pagado, capital_pagado, saldo, fecha_vencimiento)
                            VALUES (@idCredito, @numCuota, @valorCuota, @interes, @capitalPagado, @saldo, @fechaVenc)";

                        SqlCommand cmdAmortizacion = new SqlCommand(sqlAmortizacion, cn, tx);
                        cmdAmortizacion.Parameters.AddWithValue("@idCredito", idCredito);
                        cmdAmortizacion.Parameters.AddWithValue("@numCuota", i);
                        cmdAmortizacion.Parameters.AddWithValue("@valorCuota", (decimal)cuotaFija);
                        cmdAmortizacion.Parameters.AddWithValue("@interes", (decimal)interes);
                        cmdAmortizacion.Parameters.AddWithValue("@capitalPagado", (decimal)capitalPagado);
                        cmdAmortizacion.Parameters.AddWithValue("@saldo", (decimal)saldo);
                        cmdAmortizacion.Parameters.AddWithValue("@fechaVenc", fechaVencimiento);

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
                    SELECT id_amortizacion, id_credito, numero_cuota, valor_cuota, interes_pagado, capital_pagado, saldo, fecha_vencimiento
                    FROM amortizacion
                    WHERE id_credito = @idCredito
                    ORDER BY numero_cuota";

                SqlCommand cmd = new SqlCommand(sql, cn);
                cmd.Parameters.AddWithValue("@idCredito", idCredito);

                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    lista.Add(new TablaAmortizacion
                    {
                        IdAmortizacion = Convert.ToInt32(dr["id_amortizacion"]),
                        IdCredito = Convert.ToInt32(dr["id_credito"]),
                        NumeroCuota = Convert.ToInt32(dr["numero_cuota"]),
                        ValorCuota = Convert.ToDecimal(dr["valor_cuota"]),
                        Interes = Convert.ToDecimal(dr["interes_pagado"]),
                        CapitalPagado = Convert.ToDecimal(dr["capital_pagado"]),
                        Saldo = Convert.ToDecimal(dr["saldo"]),
                        FechaVencimiento = Convert.ToDateTime(dr["fecha_vencimiento"])
                    });
                }
            }

            return lista;
        }
    }
}