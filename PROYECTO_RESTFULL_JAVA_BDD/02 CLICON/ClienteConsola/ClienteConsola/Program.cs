using System;
using System.Threading.Tasks;
using ClienteConsola.Models;
using ClienteConsola.Services;

namespace ClienteConsola.Models
{
    class Program
    {
        private static ClienteUnificado _cliente;
        private static TipoProtocolo _protocoloSeleccionado;
        private static bool _sesionIniciada = false;

        static async Task Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            Console.Title = "🏪 ESPE - Sistema Comercializadora Electrodomésticos";
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("╔══════════════════════════════════════════════════════════════╗");
            Console.WriteLine("║          ESCUELA POLITÉCNICA NACIONAL DEL EJÉRCITO          ║");
            Console.WriteLine("║              Sistema Comercializadora Electrodomésticos      ║");
            Console.WriteLine("║                    Cliente Consola v1.0                     ║");
            Console.WriteLine("╚══════════════════════════════════════════════════════════════╝");
            Console.ResetColor();
            while (true)
            {
                // 1. Selección de protocolo
                _protocoloSeleccionado = await MostrarSeleccionProtocolo();
                _cliente = new ClienteUnificado();
                _cliente.CambiarProtocolo(_protocoloSeleccionado);

                // 2. Login
                _sesionIniciada = await MostrarLogin();
                if (!_sesionIniciada)
                {
                    Console.WriteLine("\nCredenciales incorrectas. Presione cualquier tecla para intentar nuevamente...");
                    Console.ReadKey();
                    continue;
                }

                // 3. Menú principal
                await MostrarMenuPrincipal();
            }
        }

        private static async Task<TipoProtocolo> MostrarSeleccionProtocolo()
        {
            while (true)
            {
                Console.Clear();
                Console.ForegroundColor = ConsoleColor.Cyan;
                Console.WriteLine("╔══════════════════════════════════════════════════════════════╗");
                Console.WriteLine("║          SELECCIÓN DE PROTOCOLO DE COMUNICACIÓN            ║");
                Console.WriteLine("╚══════════════════════════════════════════════════════════════╝");
                Console.ResetColor();
                Console.WriteLine("\nSeleccione el protocolo a utilizar:");
                Console.WriteLine("   1. Java RESTful");
                Console.WriteLine("   2. SOAP .NET");
                Console.Write("\nOpción: ");
                string opcion = Console.ReadLine();

                if (opcion == "1")
                    return TipoProtocolo.REST;
                else if (opcion == "2")
                    return TipoProtocolo.SOAP;
                else
                {
                    Console.WriteLine("Opción inválida. Presione cualquier tecla para intentar nuevamente...");
                    Console.ReadKey();
                }
            }
        }

        private static async Task<bool> MostrarLogin()
        {
            Console.Clear();
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("╔══════════════════════════════════════════════════════════════╗");
            Console.WriteLine("║                        INICIO DE SESIÓN                    ║");
            Console.WriteLine("╚══════════════════════════════════════════════════════════════╝");
            Console.ResetColor();

            Console.Write("\nUsuario: ");
            string usuario = Console.ReadLine();
            Console.Write("Contraseña: ");
            string contrasena = LeerContrasena();

            return usuario == "MONSTER" && contrasena == "MONSTER9";
        }

        private static string LeerContrasena()
        {
            var contrasena = string.Empty;
            ConsoleKeyInfo key;
            do
            {
                key = Console.ReadKey(true);
                if (key.Key != ConsoleKey.Enter && key.Key != ConsoleKey.Backspace)
                {
                    contrasena += key.KeyChar;
                    Console.Write("*");
                }
                else if (key.Key == ConsoleKey.Backspace && contrasena.Length > 0)
                {
                    contrasena = contrasena.Substring(0, contrasena.Length - 1);
                    Console.Write("\b \b");
                }
            } while (key.Key != ConsoleKey.Enter);
            Console.WriteLine();
            return contrasena;
        }

        private static async Task MostrarMenuPrincipal()
        {
            while (true)
            {
                Console.Clear();
                MostrarHeader();

                //Console.ResetColor();

                Console.WriteLine("\n📋 GESTIÓN DE ELECTRODOMÉSTICOS:");
                Console.WriteLine("   3. Listar productos disponibles");
                Console.WriteLine("   4. Buscar producto por ID");
                Console.WriteLine("   5. Crear nuevo producto");
                Console.WriteLine("   6. Actualizar producto");
                Console.WriteLine("   7. Eliminar producto");

                Console.WriteLine("\n💳 FACTURACIÓN:");
                Console.WriteLine("   8. Venta en EFECTIVO (33% descuento)");
                Console.WriteLine("   9. Venta a CRÉDITO DIRECTO");

                Console.WriteLine("\n📄 CONSULTA DE FACTURAS:");
                Console.WriteLine("   14. Listar todas las facturas");
                Console.WriteLine("   15. Buscar factura por ID");

                Console.WriteLine("\n🏦 CONSULTAS BANQUITO:");
                Console.WriteLine("   10. Validar sujeto de crédito");
                Console.WriteLine("   11. Consultar monto máximo de crédito");
                Console.WriteLine("   12. Ver tabla de amortización");

                Console.WriteLine("\n🔧 HERRAMIENTAS:");
                Console.WriteLine("   13. Test de conectividad");
                Console.WriteLine("   0.  Salir");
                Console.WriteLine("   99. Cerrar sesión");

                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.Write("\nSeleccione una opción: ");
                Console.ResetColor();

                string opcion = Console.ReadLine();

                try
                {
                    switch (opcion)
                    {
                        case "1":
                            _cliente.CambiarProtocolo(TipoProtocolo.REST);
                            MostrarMensaje("✅ Cambiado a protocolo REST (Java)", ConsoleColor.Green);
                            break;
                        case "2":
                            _cliente.CambiarProtocolo(TipoProtocolo.SOAP);
                            MostrarMensaje("✅ Cambiado a protocolo SOAP (.NET)", ConsoleColor.Green);
                            break;
                        case "3":
                            await ListarProductos();
                            break;
                        case "4":
                            await BuscarProductoPorId();
                            break;
                        case "5":
                            await CrearProducto();
                            break;
                        case "6":
                            await ActualizarProducto();
                            break;
                        case "7":
                            await EliminarProducto();
                            break;
                        case "8":
                            await VentaEfectivo();
                            break;
                        case "9":
                            await VentaCredito();
                            break;
                        case "10":
                            await ValidarSujetoCredito();
                            break;
                        case "11":
                            await ConsultarMontoMaximo();
                            break;
                        case "12":
                            await VerTablaAmortizacion();
                            break;
                        case "13":
                            await TestConectividad();
                            break;
                        case "14":
                            await ListarFacturas();
                            break;
                        case "15":
                            await BuscarFacturaPorId();
                            break;
                        case "0":
                            Console.WriteLine("\n👋 Gracias por usar el sistema ESPE. ¡Hasta luego!");
                            return;
                        case "99":
                            return;
                        default:
                            MostrarMensaje("❌ Opción no válida", ConsoleColor.Red);
                            break;
                    }
                }
                catch (Exception ex)
                {
                    MostrarError($"❌ Error: {ex.Message}");
                }

                if (opcion != "0")
                {
                    Console.WriteLine("\nPresione cualquier tecla para continuar...");
                    Console.ReadKey();
                }
            }
        }

        private static void MostrarHeader()
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("╔══════════════════════════════════════════════════════════════╗");
            Console.WriteLine("║                    MENÚ PRINCIPAL                           ║");
            Console.WriteLine("╚══════════════════════════════════════════════════════════════╝");
            Console.ResetColor();
        }

        private static async Task ListarFacturas()
        {
            Console.Clear();
            Console.WriteLine("📄 LISTA DE FACTURAS\n");

            var facturas = await _cliente.ListarFacturasAsync();

            if (facturas?.Count > 0)
            {
                Console.WriteLine("┌─────┬──────────────┬──────────────────────────┬─────────────┬─────────────┬─────────────┬───────────┐");
                Console.WriteLine("│ ID  │ Número       │ Cliente                  │ Cédula      │ Fecha       │ Total       │ Estado    │");
                Console.WriteLine("├─────┼──────────────┼──────────────────────────┼─────────────┼─────────────┼─────────────┼───────────┤");

                foreach (var f in facturas)
                {
                    // Formatear fecha para mostrar solo fecha sin hora si es muy larga
                    string fechaCorta = f.FechaFactura.Length > 10 ?
                                       f.FechaFactura.Substring(0, 10) : f.FechaFactura;

                    Console.WriteLine($"│ {f.IdFactura,-3} │ {TruncarTexto(f.NumeroFactura, 12),-12} │ {TruncarTexto(f.NombreCliente, 24),-24} │ {f.CedulaCliente,-11} │ {fechaCorta,-11} │ ${f.Total,10:F2} │ {TruncarTexto(f.EstadoTexto, 9),-9} │");
                }

                Console.WriteLine("└─────┴──────────────┴──────────────────────────┴─────────────┴─────────────┴─────────────┴───────────┘");
                Console.WriteLine($"\nTotal: {facturas.Count} facturas");

                // Opción para ver detalle
                Console.WriteLine("\n¿Desea ver el detalle de alguna factura? (ID/0 para salir)");
                Console.Write("ID de factura: ");

                if (int.TryParse(Console.ReadLine(), out int id) && id > 0)
                {
                    await MostrarDetalleFactura(id);
                }
            }
            else
            {
                MostrarMensaje("ℹ️ No hay facturas registradas", ConsoleColor.Yellow);
            }
        }

        private static async Task BuscarFacturaPorId()
        {
            Console.Clear();
            Console.WriteLine("🔍 BUSCAR FACTURA POR ID\n");

            Console.Write("Ingrese el ID de la factura: ");
            if (int.TryParse(Console.ReadLine(), out int id))
            {
                await MostrarDetalleFactura(id);
            }
            else
            {
                MostrarMensaje("❌ ID inválido", ConsoleColor.Red);
            }
        }

        private static async Task MostrarDetalleFactura(int idFactura)
        {
            Console.WriteLine($"\n🔄 Consultando factura #{idFactura}...");

            var respuesta = await _cliente.ObtenerFacturaAsync(idFactura);

            if (respuesta?.Encontrada == true)
            {
                var factura = respuesta.ToFactura();

                Console.Clear();
                Console.WriteLine("📄 DETALLE DE FACTURA");
                Console.WriteLine("══════════════════════════════════════════════════════════════");

                // Información básica
                Console.ForegroundColor = ConsoleColor.Cyan;
                Console.WriteLine($"📋 Factura: {factura.NumeroFactura}");
                Console.WriteLine($"📅 Fecha: {factura.FechaFactura}");
                Console.ResetColor();

                Console.WriteLine($"👤 Cliente: {factura.NombreCliente}");
                Console.WriteLine($"🆔 Cédula: {factura.CedulaCliente}");

                // Estado con color
                Console.Write("📊 Estado: ");
                if (factura.Estado == "PAGADA")
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine(factura.EstadoTexto);
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine(factura.EstadoTexto);
                }
                Console.ResetColor();

                Console.WriteLine($"💳 Forma de Pago: {factura.FormaPagoTexto}");

                // Información de crédito si aplica
                if (factura.FormaPago == "CREDITO_DIRECTO" && factura.NumeroCuotas > 0)
                {
                    Console.WriteLine($"🏦 Información de Crédito:");
                    Console.WriteLine($"   • ID Crédito BanQuito: #{factura.IdCreditoBanco}");
                    Console.WriteLine($"   • {factura.ResumenCredito}");
                }

                Console.WriteLine("\n💰 TOTALES:");
                Console.WriteLine($"   • Subtotal: ${factura.Subtotal:F2}");
                if (factura.Descuento > 0)
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine($"   • Descuento: -${factura.Descuento:F2}");
                    Console.ResetColor();
                }
                Console.ForegroundColor = ConsoleColor.Cyan;
                Console.WriteLine($"   • TOTAL: ${factura.Total:F2}");
                Console.ResetColor();

                // Items de la factura
                if (respuesta.Items?.Count > 0)
                {
                    Console.WriteLine("\n🛒 PRODUCTOS FACTURADOS:");
                    Console.WriteLine("┌──────────────────────────────────┬──────────────┬──────────┬─────────────┬─────────────┐");
                    Console.WriteLine("│ Producto                         │ Marca        │ Cantidad │ Precio Unit.│ Subtotal    │");
                    Console.WriteLine("├──────────────────────────────────┼──────────────┼──────────┼─────────────┼─────────────┤");

                    foreach (var item in respuesta.Items)
                    {
                        Console.WriteLine($"│ {TruncarTexto(item.Nombre, 32),-32} │ {TruncarTexto(item.Marca, 12),-12} │ {item.Cantidad,8} │ ${item.PrecioUnitario,10:F2} │ ${item.Subtotal,10:F2} │");
                    }

                    Console.WriteLine("└──────────────────────────────────┴──────────────┴──────────┴─────────────┴─────────────┘");
                }
            }
            else
            {
                MostrarMensaje($"❌ Factura no encontrada: {respuesta?.Mensaje ?? "Error desconocido"}", ConsoleColor.Red);
            }
        }

        private static async Task MostrarTablaAmortizacionDirecta(int idCredito)
        {
            Console.WriteLine($"\n🔄 Consultando tabla de amortización para crédito #{idCredito}...");

            var resultado = await _cliente.ObtenerTablaAmortizacion(idCredito);

            if (resultado?.Encontrado == true && resultado.Cuotas?.Count > 0)
            {
                Console.WriteLine($"\n💳 TABLA DE AMORTIZACIÓN - CRÉDITO #{resultado.IdCredito}");
                Console.WriteLine($"💰 Monto del crédito: ${resultado.MontoCredito:F2}");
                Console.WriteLine($"📈 Tasa de interés: {resultado.TasaInteres:P2}");
                Console.WriteLine($"📅 Número de cuotas: {resultado.NumeroCuotas}");
                Console.WriteLine();

                Console.WriteLine("┌────────┬────────────┬────────────┬────────────┬────────────┬──────────────┐");
                Console.WriteLine("│ Cuota  │ Valor      │ Interés    │ Capital    │ Saldo      │ Vencimiento  │");
                Console.WriteLine("├────────┼────────────┼────────────┼────────────┼────────────┼──────────────┤");

                foreach (var cuota in resultado.Cuotas)
                {
                    Console.WriteLine($"│ {cuota.NumeroCuota,6} │ ${cuota.ValorCuota,9:F2} │ ${cuota.InteresPagado,9:F2} │ ${cuota.CapitalPagado,9:F2} │ ${cuota.Saldo,9:F2} │ {cuota.FechaVencimiento,12} │");
                }

                Console.WriteLine("└────────┴────────────┴────────────┴────────────┴────────────┴──────────────┘");
            }
            else
            {
                MostrarMensaje($"❌ {resultado?.Mensaje ?? "Tabla de amortización no encontrada"}", ConsoleColor.Red);
            }
        }

        // ========== GESTIÓN DE PRODUCTOS ==========

        private static async Task ListarProductos()
        {
            Console.Clear();
            Console.WriteLine("📋 LISTA DE ELECTRODOMÉSTICOS DISPONIBLES\n");

            var productos = await _cliente.ListarElectrodomesticos();

            if (productos?.Count > 0)
            {
                Console.WriteLine("┌─────┬──────────┬──────────────────────────┬─────────────┬─────────────┬───────┐");
                Console.WriteLine("│ ID  │ Código   │ Nombre                   │ Marca       │ Precio      │ Stock │");
                Console.WriteLine("├─────┼──────────┼──────────────────────────┼─────────────┼─────────────┼───────┤");

                foreach (var p in productos)
                {
                    Console.WriteLine($"│ {p.IdElectrodomestico,-3} │ {p.Codigo,-8} │ {TruncarTexto(p.Nombre, 24),-24} │ {TruncarTexto(p.Marca, 11),-11} │ ${p.PrecioVenta,10:F2} │ {p.Stock,5} │");
                }

                Console.WriteLine("└─────┴──────────┴──────────────────────────┴─────────────┴─────────────┴───────┘");
                Console.WriteLine($"\nTotal: {productos.Count} productos");
            }
            else
            {
                MostrarMensaje("ℹ️ No hay productos disponibles", ConsoleColor.Yellow);
            }
        }

        private static async Task BuscarProductoPorId()
        {
            Console.Clear();
            Console.WriteLine("🔍 BUSCAR PRODUCTO POR ID\n");

            Console.Write("Ingrese el ID del producto: ");
            if (int.TryParse(Console.ReadLine(), out int id))
            {
                var producto = await _cliente.ObtenerElectrodomestico(id);

                if (producto != null)
                {
                    Console.WriteLine("\n✅ PRODUCTO ENCONTRADO:");
                    MostrarDetalleProducto(producto);
                }
                else
                {
                    MostrarMensaje("❌ Producto no encontrado", ConsoleColor.Red);
                }
            }
            else
            {
                MostrarMensaje("❌ ID inválido", ConsoleColor.Red);
            }
        }

        private static async Task CrearProducto()
        {
            Console.Clear();
            Console.WriteLine("➕ CREAR NUEVO ELECTRODOMÉSTICO\n");

            var producto = new Electrodomestico();

            Console.Write("Código: ");
            producto.Codigo = Console.ReadLine();

            Console.Write("Nombre: ");
            producto.Nombre = Console.ReadLine();

            Console.Write("Descripción: ");
            producto.Descripcion = Console.ReadLine();

            Console.Write("Marca: ");
            producto.Marca = Console.ReadLine();

            Console.Write("Precio de venta: $");
            if (double.TryParse(Console.ReadLine(), out double precio))
                producto.PrecioVenta = precio;

            Console.Write("Stock inicial: ");
            if (int.TryParse(Console.ReadLine(), out int stock))
                producto.Stock = stock;

            producto.Estado = "DISPONIBLE";

            var resultado = await _cliente.CrearElectrodomestico(producto);

            if (resultado?.Exito == true)
            {
                MostrarMensaje("✅ Producto creado exitosamente", ConsoleColor.Green);
            }
            else
            {
                MostrarMensaje($"❌ Error: {resultado?.Mensaje ?? "Error desconocido"}", ConsoleColor.Red);
            }
        }

        private static async Task ActualizarProducto()
        {
            Console.Clear();
            Console.WriteLine("✏️ ACTUALIZAR ELECTRODOMÉSTICO\n");

            Console.Write("Ingrese el ID del producto a actualizar: ");
            if (!int.TryParse(Console.ReadLine(), out int id))
            {
                MostrarMensaje("❌ ID inválido", ConsoleColor.Red);
                return;
            }

            var producto = await _cliente.ObtenerElectrodomestico(id);
            if (producto == null)
            {
                MostrarMensaje("❌ Producto no encontrado", ConsoleColor.Red);
                return;
            }

            Console.WriteLine("\n📝 Datos actuales:");
            MostrarDetalleProducto(producto);

            Console.WriteLine("\n✏️ Ingrese los nuevos datos (Enter para mantener el actual):");

            Console.Write($"Código [{producto.Codigo}]: ");
            string codigo = Console.ReadLine();
            if (!string.IsNullOrWhiteSpace(codigo)) producto.Codigo = codigo;

            Console.Write($"Nombre [{producto.Nombre}]: ");
            string nombre = Console.ReadLine();
            if (!string.IsNullOrWhiteSpace(nombre)) producto.Nombre = nombre;

            Console.Write($"Descripción [{producto.Descripcion}]: ");
            string descripcion = Console.ReadLine();
            if (!string.IsNullOrWhiteSpace(descripcion)) producto.Descripcion = descripcion;

            Console.Write($"Marca [{producto.Marca}]: ");
            string marca = Console.ReadLine();
            if (!string.IsNullOrWhiteSpace(marca)) producto.Marca = marca;

            Console.Write($"Precio [{producto.PrecioVenta:F2}]: $");
            if (double.TryParse(Console.ReadLine(), out double precio)) producto.PrecioVenta = precio;

            Console.Write($"Stock [{producto.Stock}]: ");
            if (int.TryParse(Console.ReadLine(), out int stock)) producto.Stock = stock;

            var resultado = await _cliente.ActualizarElectrodomestico(id, producto);

            if (resultado?.Exito == true)
            {
                MostrarMensaje("✅ Producto actualizado exitosamente", ConsoleColor.Green);
            }
            else
            {
                MostrarMensaje($"❌ Error: {resultado?.Mensaje ?? "Error desconocido"}", ConsoleColor.Red);
            }
        }

        private static async Task EliminarProducto()
        {
            Console.Clear();
            Console.WriteLine("🗑️ ELIMINAR ELECTRODOMÉSTICO\n");

            Console.Write("Ingrese el ID del producto a eliminar: ");
            if (!int.TryParse(Console.ReadLine(), out int id))
            {
                MostrarMensaje("❌ ID inválido", ConsoleColor.Red);
                return;
            }

            var producto = await _cliente.ObtenerElectrodomestico(id);
            if (producto == null)
            {
                MostrarMensaje("❌ Producto no encontrado", ConsoleColor.Red);
                return;
            }

            Console.WriteLine("\n⚠️ Producto a eliminar:");
            MostrarDetalleProducto(producto);

            Console.ForegroundColor = ConsoleColor.Red;
            Console.Write("\n¿Está seguro de eliminar este producto? (s/N): ");
            Console.ResetColor();

            string confirmacion = Console.ReadLine()?.ToLower();
            if (confirmacion == "s" || confirmacion == "si")
            {
                var resultado = await _cliente.EliminarElectrodomestico(id);

                if (resultado?.Exito == true)
                {
                    MostrarMensaje("✅ Producto eliminado exitosamente", ConsoleColor.Green);
                }
                else
                {
                    MostrarMensaje($"❌ Error: {resultado?.Mensaje ?? "Error desconocido"}", ConsoleColor.Red);
                }
            }
            else
            {
                MostrarMensaje("ℹ️ Operación cancelada", ConsoleColor.Yellow);
            }
        }

        // ========== FACTURACIÓN ==========

        private static async Task VentaEfectivo()
        {
            Console.Clear();
            Console.WriteLine("💵 VENTA EN EFECTIVO (33% DESCUENTO)\n");

            var solicitud = await CrearSolicitudVenta();
            if (solicitud == null) return;

            var resultado = await _cliente.ProcesarVentaEfectivo(solicitud);

            if (resultado?.Exito == true)
            {
                Console.WriteLine($"\n✅ VENTA PROCESADA EXITOSAMENTE");
                Console.WriteLine($"📄 Número de factura: #{resultado.IdFactura}");
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine($"💰 Descuento aplicado: 33%");
                Console.ResetColor();
                Console.WriteLine($"📝 {resultado.Mensaje}");
            }
            else
            {
                MostrarMensaje($"❌ Error: {resultado?.Mensaje ?? "Error desconocido"}", ConsoleColor.Red);
            }
        }

        private static async Task VentaCredito()
        {
            Console.Clear();
            Console.WriteLine("💳 VENTA A CRÉDITO DIRECTO\n");

            var solicitud = await CrearSolicitudVenta();
            if (solicitud == null) return;

            Console.Write("Número de cuotas (3-24): ");
            if (!int.TryParse(Console.ReadLine(), out int cuotas) || cuotas < 3 || cuotas > 24)
            {
                MostrarMensaje("❌ Número de cuotas inválido (debe ser entre 3 y 24)", ConsoleColor.Red);
                return;
            }

            Console.WriteLine("\n🔄 Procesando venta a crédito...");
            Console.WriteLine("   ⏳ Validando sujeto de crédito en BanQuito...");

            var resultado = await _cliente.ProcesarVentaCredito(solicitud, cuotas);

            if (resultado?.Exito == true)
            {
                Console.WriteLine($"\n✅ CRÉDITO APROBADO Y VENTA PROCESADA");
                Console.WriteLine($"📄 Número de factura: #{resultado.IdFactura}");
                Console.WriteLine($"🏦 ID Crédito BanQuito: #{resultado.IdCreditoBanco}");
                Console.WriteLine($"💰 Cuota mensual: ${resultado.CuotaMensual:F2}");
                Console.WriteLine($"📅 Número de cuotas: {resultado.NumeroCuotas}");
                Console.WriteLine($"📝 {resultado.Mensaje}");
            }
            else
            {
                MostrarMensaje($"❌ Crédito rechazado: {resultado?.Mensaje ?? "Error desconocido"}", ConsoleColor.Red);
            }
        }

        private static async Task<SolicitudVenta> CrearSolicitudVenta()
        {
            Console.Write("Cédula del cliente: ");
            string cedula = Console.ReadLine();

            Console.Write("Nombre del cliente: ");
            string nombre = Console.ReadLine();

            if (string.IsNullOrWhiteSpace(cedula) || string.IsNullOrWhiteSpace(nombre))
            {
                MostrarMensaje("❌ Cédula y nombre son requeridos", ConsoleColor.Red);
                return null;
            }

            var items = new List<ItemVenta>();

            Console.WriteLine("\n📦 AGREGAR PRODUCTOS:");

            while (true)
            {
                Console.Write("ID del producto (0 para terminar): ");
                if (!int.TryParse(Console.ReadLine(), out int idProducto) || idProducto == 0)
                    break;

                var producto = await _cliente.ObtenerElectrodomestico(idProducto);
                if (producto == null)
                {
                    MostrarMensaje("❌ Producto no encontrado", ConsoleColor.Red);
                    continue;
                }

                Console.WriteLine($"Producto: {producto.Nombre} - ${producto.PrecioVenta:F2}");
                Console.Write("Cantidad: ");

                if (int.TryParse(Console.ReadLine(), out int cantidad) && cantidad > 0)
                {
                    items.Add(new ItemVenta
                    {
                        IdElectrodomestico = idProducto,
                        Cantidad = cantidad,
                        Precio = producto.PrecioVenta
                    });

                    Console.WriteLine($"✅ Agregado: {cantidad} x {producto.Nombre}");
                }
            }

            if (items.Count == 0)
            {
                MostrarMensaje("❌ Debe agregar al menos un producto", ConsoleColor.Red);
                return null;
            }

            Console.WriteLine($"\n📋 RESUMEN DE LA VENTA:");
            double total = 0;
            foreach (var item in items)
            {
                var producto = await _cliente.ObtenerElectrodomestico(item.IdElectrodomestico);
                double subtotal = item.Cantidad * item.Precio;
                total += subtotal;
                Console.WriteLine($"   {item.Cantidad} x {producto.Nombre} = ${subtotal:F2}");
            }
            Console.WriteLine($"   TOTAL: ${total:F2}");

            return new SolicitudVenta
            {
                Cedula = cedula,
                NombreCliente = nombre,
                Items = items
            };
        }

        // ========== CONSULTAS BANQUITO ==========

        private static async Task ValidarSujetoCredito()
        {
            Console.Clear();
            Console.WriteLine("🔍 VALIDAR SUJETO DE CRÉDITO\n");

            Console.Write("Ingrese la cédula del cliente: ");
            string cedula = Console.ReadLine();

            if (string.IsNullOrWhiteSpace(cedula))
            {
                MostrarMensaje("❌ La cédula es requerida", ConsoleColor.Red);
                return;
            }

            Console.WriteLine("⏳ Consultando en BanQuito...");

            var resultado = await _cliente.ValidarSujetoCredito(cedula);

            if (resultado?.SujetoCredito == true)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("\n✅ CLIENTE APROBADO PARA CRÉDITO");
                Console.ResetColor();
                Console.WriteLine($"📝 {resultado.Mensaje}");
                if (resultado.IdCliente > 0)
                    Console.WriteLine($"🆔 ID Cliente BanQuito: {resultado.IdCliente}");
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("\n❌ CLIENTE NO APROBADO PARA CRÉDITO");
                Console.ResetColor();
                Console.WriteLine($"📝 Motivo: {resultado?.Mensaje ?? "Sin información"}");
            }
        }

        private static async Task ConsultarMontoMaximo()
        {
            Console.Clear();
            Console.WriteLine("💰 CONSULTAR MONTO MÁXIMO DE CRÉDITO\n");

            Console.Write("Ingrese la cédula del cliente: ");
            string cedula = Console.ReadLine();

            if (string.IsNullOrWhiteSpace(cedula))
            {
                MostrarMensaje("❌ La cédula es requerida", ConsoleColor.Red);
                return;
            }

            Console.WriteLine("⏳ Consultando en BanQuito...");

            var resultado = await _cliente.ObtenerMontoMaximo(cedula);

            if (resultado?.Aprobado == true)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("\n✅ MONTO MÁXIMO CALCULADO");
                Console.WriteLine($"💰 Monto máximo aprobado: ${resultado.MontoMaximo:F2}");
                Console.ResetColor();
                Console.WriteLine($"📝 {resultado.Mensaje}");
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("\n❌ NO SE PUDO CALCULAR EL MONTO MÁXIMO");
                Console.ResetColor();
                Console.WriteLine($"📝 Motivo: {resultado?.Mensaje ?? "Sin información"}");
            }
        }

        private static async Task VerTablaAmortizacion()
        {
            Console.Clear();
            Console.WriteLine("📊 TABLA DE AMORTIZACIÓN\n");

            Console.Write("Ingrese el ID del crédito: ");
            if (!int.TryParse(Console.ReadLine(), out int idCredito))
            {
                MostrarMensaje("❌ ID de crédito inválido", ConsoleColor.Red);
                return;
            }

            Console.WriteLine("⏳ Consultando tabla de amortización...");

            var resultado = await _cliente.ObtenerTablaAmortizacion(idCredito);

            if (resultado?.Encontrado == true && resultado.Cuotas?.Count > 0)
            {
                Console.WriteLine($"\n✅ TABLA DE AMORTIZACIÓN - CRÉDITO #{resultado.IdCredito}");
                Console.WriteLine($"💰 Monto del crédito: ${resultado.MontoCredito:F2}");
                Console.WriteLine($"📈 Tasa de interés: {resultado.TasaInteres:P2}");
                Console.WriteLine($"📅 Número de cuotas: {resultado.NumeroCuotas}");
                Console.WriteLine();

                Console.WriteLine("┌────────┬────────────┬────────────┬────────────┬────────────┬──────────────┐");
                Console.WriteLine("│ Cuota  │ Valor      │ Interés    │ Capital    │ Saldo      │ Vencimiento  │");
                Console.WriteLine("├────────┼────────────┼────────────┼────────────┼────────────┼──────────────┤");

                foreach (var cuota in resultado.Cuotas)
                {
                    Console.WriteLine($"│ {cuota.NumeroCuota,6} │ ${cuota.ValorCuota,9:F2} │ ${cuota.InteresPagado,9:F2} │ ${cuota.CapitalPagado,9:F2} │ ${cuota.Saldo,9:F2} │ {cuota.FechaVencimiento,12} │");
                }

                Console.WriteLine("└────────┴────────────┴────────────┴────────────┴────────────┴──────────────┘");
            }
            else
            {
                MostrarMensaje($"❌ {resultado?.Mensaje ?? "Tabla de amortización no encontrada"}", ConsoleColor.Red);
            }
        }

        // ========== HERRAMIENTAS ==========

        private static async Task TestConectividad()
        {
            Console.Clear();
            Console.WriteLine("🔧 TEST DE CONECTIVIDAD\n");

            Console.WriteLine($"Protocolo actual: {_cliente.ProtocoloActual}");
            Console.WriteLine("⏳ Probando conexiones...\n");

            var conectividad = await _cliente.ProbarConectividad();

            Console.WriteLine("🏪 Comercializadora Electrodomésticos:");
            if (conectividad.ComercializadoraActiva)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("   ✅ CONECTADO");
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("   ❌ NO DISPONIBLE");
            }
            Console.ResetColor();

            Console.WriteLine("\n🏦 BanQuito Core:");
            if (conectividad.BanquitoActivo)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("   ✅ CONECTADO");
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("   ❌ NO DISPONIBLE");
            }
            Console.ResetColor();

            if (conectividad.ComercializadoraActiva && conectividad.BanquitoActivo)
            {
                Console.WriteLine("\n🎉 Todos los servicios están funcionando correctamente!");
            }
            else
            {
                Console.WriteLine("\n⚠️ Algunos servicios no están disponibles. Verifique la configuración.");
            }
        }

        // ========== HELPERS ==========

        private static void MostrarDetalleProducto(Electrodomestico producto)
        {
            Console.WriteLine($"┌─────────────────────────────────────────────────────────────┐");
            Console.WriteLine($"│ ID: {producto.IdElectrodomestico,-3} │ Código: {producto.Codigo,-8} │ Estado: {producto.Estado,-11} │");
            Console.WriteLine($"├─────────────────────────────────────────────────────────────┤");
            Console.WriteLine($"│ Nombre: {TruncarTexto(producto.Nombre, 47),-47} │");
            Console.WriteLine($"│ Marca:  {TruncarTexto(producto.Marca, 47),-47} │");
            Console.WriteLine($"│ Precio: ${producto.PrecioVenta,-10:F2} │ Stock: {producto.Stock,-6} │");
            Console.WriteLine($"├─────────────────────────────────────────────────────────────┤");
            Console.WriteLine($"│ Descripción: {TruncarTexto(producto.Descripcion ?? "", 43),-43} │");
            Console.WriteLine($"└─────────────────────────────────────────────────────────────┘");
        }

        private static string TruncarTexto(string texto, int maxLength)
        {
            if (string.IsNullOrEmpty(texto))
                return "";

            return texto.Length <= maxLength ? texto : texto.Substring(0, maxLength - 3) + "...";
        }

        private static void MostrarMensaje(string mensaje, ConsoleColor color)
        {
            Console.ForegroundColor = color;
            Console.WriteLine($"\n{mensaje}");
            Console.ResetColor();
        }

        private static void MostrarError(string error)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"\n{error}");
            Console.ResetColor();
        }
    }
}