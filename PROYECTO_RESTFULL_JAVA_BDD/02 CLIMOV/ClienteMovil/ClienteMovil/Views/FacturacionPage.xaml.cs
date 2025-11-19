using ClienteMovil.Models;
using ClienteMovil.Services;
using ClienteMovil.Utils;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.ObjectModel;
using System.Text.Json;

namespace ClienteMovil.Views
{
    public partial class FacturacionPage : ContentPage
    {
        private readonly ClienteUnificado _clienteService;
        private List<Electrodomestico> _productosDisponibles;
        private ObservableCollection<ItemVenta> _itemsVenta;
        private bool _clienteValidado;
        private ValidacionCredito _validacionCliente;

        public FacturacionPage()
        {
            InitializeComponent();

            // Obtener servicio del contenedor DI
            _clienteService = ServiceHelper.GetService<ClienteUnificado>();

            // Inicializar collections
            _productosDisponibles = new List<Electrodomestico>();
            _itemsVenta = new ObservableCollection<ItemVenta>();
            _clienteValidado = false;

            // Configurar binding
            ItemsCollectionView.ItemsSource = _itemsVenta;

            // Configurar eventos
            ConfigurarEventos();

            // Cargar productos inicialmente
            _ = CargarProductosAsync();
        }

        private void ConfigurarEventos()
        {
            _itemsVenta.CollectionChanged += OnItemsVentaChanged;
        }

        protected override async void OnAppearing()
        {
            base.OnAppearing();

            // Recargar productos al aparecer la página
            await CargarProductosAsync();
        }

        // ========== EVENTOS DE UI ==========

        private async void OnVerFacturasClicked(object sender, EventArgs e)
        {
            try
            {
                // Navegar a la página de facturas
                await Shell.Current.GoToAsync("//facturas");
            }
            catch (Exception ex)
            {
                await DisplayAlert("Error", $"Error al navegar a facturas: {ex.Message}", "OK");
            }
        }

        private async void OnCargarProductosClicked(object sender, EventArgs e)
        {
            await CargarProductosAsync();
        }

        private void OnLimpiarFormularioClicked(object sender, EventArgs e)
        {
            LimpiarFormulario();
        }

        private async void OnValidarClienteClicked(object sender, EventArgs e)
        {
            await ValidarClienteAsync();
        }

        private async void OnAgregarItemClicked(object sender, EventArgs e)
        {
            await AgregarItemAsync();
        }

        private void OnRemoverItemClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var item = button?.BindingContext as ItemVenta;
            if (item != null)
            {
                _itemsVenta.Remove(item);
            }
        }

        private async void OnVentaEfectivoClicked(object sender, EventArgs e)
        {
            await ProcesarVentaEfectivoAsync();
        }

        private async void OnVentaCreditoClicked(object sender, EventArgs e)
        {
            await ProcesarVentaCreditoAsync();
        }

        // ========== MÉTODOS PRINCIPALES ==========

        private async Task CargarProductosAsync()
        {
            try
            {
                // Mostrar loading
                await MostrarEstado("Cargando productos...", UIConstants.INFO_COLOR, true);

                var productos = await _clienteService.ListarElectrodomesticosAsync();

                if (productos != null && productos.Any())
                {
                    _productosDisponibles = productos;
                    ActualizarPickerProductos();
                    await MostrarEstado($"✅ {productos.Count} productos cargados", UIConstants.SUCCESS_COLOR);
                }
                else
                {
                    _productosDisponibles = new List<Electrodomestico>();
                    ActualizarPickerProductos();
                    await MostrarEstado("⚠️ No hay productos disponibles", UIConstants.WARNING_COLOR);
                }
            }
            catch (Exception ex)
            {
                await MostrarEstado($"❌ Error al cargar productos: {ex.Message}", UIConstants.DANGER_COLOR);
            }
        }

        private async Task ValidarClienteAsync()
        {
            var cedula = EntryCliente.Text?.Trim();

            if (string.IsNullOrEmpty(cedula))
            {
                await DisplayAlert("Advertencia", "Ingrese la cédula del cliente", "OK");
                return;
            }

            if (cedula.Length != 10)
            {
                await DisplayAlert("Error", "La cédula debe tener 10 dígitos", "OK");
                return;
            }

            try
            {
                // Mostrar loading
                await MostrarEstado("Validando cliente...", UIConstants.INFO_COLOR, true);

                var validacion = await _clienteService.ValidarSujetoCreditoAsync(cedula);

                if (validacion != null)
                {
                    _validacionCliente = validacion;
                    _clienteValidado = true;

                    if (validacion.SujetoCredito)
                    {
                        LabelNombreCliente.Text = $"✅ Cliente validado";
                        LabelNombreCliente.TextColor = UIConstants.SUCCESS_COLOR;

                        // Habilitar venta a crédito
                        ButtonVentaCredito.IsEnabled = _itemsVenta.Any();

                        await MostrarEstado($"✅ {validacion.Mensaje}", UIConstants.SUCCESS_COLOR);
                    }
                    else
                    {
                        LabelNombreCliente.Text = $"❌ Cliente no apto para crédito";
                        LabelNombreCliente.TextColor = UIConstants.DANGER_COLOR;

                        // Deshabilitar venta a crédito
                        ButtonVentaCredito.IsEnabled = false;

                        await MostrarEstado($"⚠️ {validacion.Mensaje}", UIConstants.WARNING_COLOR);
                    }
                }
                else
                {
                    await MostrarEstado("❌ Error al validar cliente", UIConstants.DANGER_COLOR);
                }
            }
            catch (Exception ex)
            {
                await MostrarEstado($"❌ Error: {ex.Message}", UIConstants.DANGER_COLOR);
            }
        }

        private async Task AgregarItemAsync()
        {
            if (PickerProductos.SelectedItem is not Electrodomestico producto)
            {
                await DisplayAlert("Advertencia", "Seleccione un producto", "OK");
                return;
            }

            var cantidad = (int)StepperCantidad.Value;

            // Verificar si el producto ya está en la lista
            var itemExistente = _itemsVenta.FirstOrDefault(i => i.IdElectrodomestico == producto.IdElectrodomestico);

            if (itemExistente != null)
            {
                // Actualizar cantidad existente
                itemExistente.Cantidad += cantidad;
            }
            else
            {
                // Agregar nuevo item
                var nuevoItem = new ItemVenta
                {
                    IdElectrodomestico = producto.IdElectrodomestico,
                    Producto = producto,
                    Cantidad = cantidad,
                    Precio = producto.PrecioVenta
                };

                _itemsVenta.Add(nuevoItem);
            }

            // Resetear cantidad
            StepperCantidad.Value = 1;

            await MostrarEstado("✅ Producto agregado al carrito", UIConstants.SUCCESS_COLOR);
        }

        private async Task ProcesarVentaEfectivoAsync()
        {
            if (!ValidarVenta()) return;

            try
            {
                await MostrarEstado("Procesando venta en efectivo...", UIConstants.INFO_COLOR, true);

                var solicitud = CrearSolicitudVenta();

                // DEBUG: Ver el JSON que se envía
                await DebugSolicitudVenta(solicitud);
                System.Diagnostics.Debug.WriteLine($"Endpoint: {ConfiguracionEndpoints.REST.VENTA_EFECTIVO}");

                var resultado = await _clienteService.ProcesarVentaEfectivoAsync(solicitud);

                System.Diagnostics.Debug.WriteLine($"Resultado exito: {resultado?.Exito}");
                System.Diagnostics.Debug.WriteLine($"Resultado mensaje: {resultado?.Mensaje}");

                if (resultado?.Exito == true)
                {
                    await MostrarResultadoVenta(resultado, "EFECTIVO");
                    LimpiarFormulario();
                }
                else
                {
                    var mensaje = resultado?.Mensaje ?? "Error desconocido";
                    await MostrarEstado($"❌ Error en venta: {mensaje}", UIConstants.DANGER_COLOR);

                    // Mostrar error detallado
                    await DisplayAlert("Error Detallado",
                        $"Error en venta en efectivo:\n\n{mensaje}\n\nVerifique que los servicios estén activos.",
                        "OK");
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Excepción ProcesarVentaEfectivoAsync: {ex}");
                await MostrarEstado($"❌ Error: {ex.Message}", UIConstants.DANGER_COLOR);

                await DisplayAlert("Error de Conexión",
                    $"Error al conectar con el servidor:\n\n{ex.Message}\n\nVerifique:\n• Conexión de red\n• Servidores Java activos\n• IP correcta en configuración",
                    "OK");
            }
        }

        private async Task ProcesarVentaCreditoAsync()
        {
            if (!ValidarVenta()) return;

            if (!_clienteValidado || _validacionCliente?.SujetoCredito != true)
            {
                await DisplayAlert("Error", "Debe validar que el cliente sea sujeto de crédito antes de procesar venta a crédito", "OK");
                return;
            }

            try
            {
                await MostrarEstado("Procesando venta a crédito...", UIConstants.INFO_COLOR, true);

                var solicitud = CrearSolicitudVenta();
                solicitud.NumeroCuotas = (int)StepperCuotas.Value;

                // DEBUG: Ver el JSON que se envía
                await DebugSolicitudVenta(solicitud);
                System.Diagnostics.Debug.WriteLine($"Endpoint: {ConfiguracionEndpoints.REST.VENTA_CREDITO}");

                var resultado = await _clienteService.ProcesarVentaCreditoAsync(solicitud);

                System.Diagnostics.Debug.WriteLine($"Resultado exito: {resultado?.Exito}");
                System.Diagnostics.Debug.WriteLine($"Resultado mensaje: {resultado?.Mensaje}");

                if (resultado?.Exito == true)
                {
                    await MostrarResultadoVenta(resultado, "CREDITO");
                    LimpiarFormulario();
                }
                else
                {
                    var mensaje = resultado?.Mensaje ?? "Error desconocido";
                    await MostrarEstado($"❌ Error en venta a crédito: {mensaje}", UIConstants.DANGER_COLOR);

                    // Mostrar error detallado
                    await DisplayAlert("Error Detallado",
                        $"Error en venta a crédito:\n\n{mensaje}\n\nPosibles causas:\n• Cliente no aprobado para crédito\n• Monto excede límite\n• Error de conectividad",
                        "OK");
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Excepción ProcesarVentaCreditoAsync: {ex}");
                await MostrarEstado($"❌ Error: {ex.Message}", UIConstants.DANGER_COLOR);

                await DisplayAlert("Error de Conexión",
                    $"Error al conectar con el servidor:\n\n{ex.Message}",
                    "OK");
            }
        }

        // ========== MÉTODOS AUXILIARES ==========

        private void ActualizarPickerProductos()
        {
            PickerProductos.ItemsSource = _productosDisponibles;
            PickerProductos.ItemDisplayBinding = new Binding("NombreCompleto");
        }

        private bool ValidarVenta()
        {
            if (!_itemsVenta.Any())
            {
                DisplayAlert("Advertencia", "Agregue al menos un producto al carrito", "OK");
                return false;
            }

            var cedula = EntryCliente.Text?.Trim();
            if (string.IsNullOrEmpty(cedula))
            {
                DisplayAlert("Error", "Ingrese la cédula del cliente", "OK");
                return false;
            }

            if (cedula.Length != 10)
            {
                DisplayAlert("Error", "La cédula debe tener exactamente 10 dígitos", "OK");
                return false;
            }

            var nombreCliente = EntryNombreCliente.Text?.Trim();
            if (string.IsNullOrEmpty(nombreCliente))
            {
                DisplayAlert("Error", "Ingrese el nombre completo del cliente", "OK");
                return false;
            }

            return true;
        }

        private SolicitudVenta CrearSolicitudVenta()
        {
            return new SolicitudVenta
            {
                CedulaCliente = EntryCliente.Text?.Trim() ?? string.Empty,
                NombreCliente = EntryNombreCliente.Text?.Trim() ?? string.Empty,
                Items = _itemsVenta.ToList()
            };
        }

        // Método para debug - ver el JSON que se envía
        private async Task<string> DebugSolicitudVenta(SolicitudVenta solicitud)
        {
            try
            {
                var json = JsonSerializer.Serialize(solicitud, new JsonSerializerOptions
                {
                    WriteIndented = true,
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });

                System.Diagnostics.Debug.WriteLine("=== JSON SOLICITUD VENTA ===");
                System.Diagnostics.Debug.WriteLine(json);
                System.Diagnostics.Debug.WriteLine("=============================");

                return json;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error serializando: {ex.Message}");
                return $"Error: {ex.Message}";
            }
        }

        private async Task MostrarResultadoVenta(RespuestaVenta resultado, string tipoVenta)
        {
            var mensaje = $"🎉 VENTA {tipoVenta} EXITOSA\n\n" +
                         $"📄 Factura: #{resultado.IdFactura}\n" +
                         $"📅 Fecha: {DateTime.Now:dd/MM/yyyy HH:mm}";

            if (tipoVenta == "EFECTIVO")
            {
                mensaje += $"\n💸 Descuento aplicado: 33%";
            }
            else if (tipoVenta == "CREDITO")
            {
                mensaje += $"\n📊 Cuotas: {resultado.NumeroCuotas ?? 0}";
                if (resultado.IdCredito.HasValue)
                {
                    mensaje += $"\n🏦 ID Crédito: {resultado.IdCredito}";
                }
            }

            var verTabla = await DisplayAlert(
                "Venta Procesada",
                mensaje,
                "Ver Tabla de Amortización",
                "Cerrar"
            );

            if (verTabla && resultado.IdCredito.HasValue)
            {
                // Navegar a la página de crédito para mostrar la tabla
                await Shell.Current.GoToAsync($"//credito?creditoId={resultado.IdCredito}");
            }

            await MostrarEstado("✅ Venta procesada exitosamente", UIConstants.SUCCESS_COLOR);
        }

        private void OnItemsVentaChanged(object sender, System.Collections.Specialized.NotifyCollectionChangedEventArgs e)
        {
            ActualizarTotales();
            ActualizarEstadoBotones();
        }

        private void ActualizarTotales()
        {
            var subtotal = _itemsVenta.Sum(i => i.Subtotal);
            var descuento = subtotal * 0.33m; // 33% descuento en efectivo
            var total = subtotal;

            LabelSubtotal.Text = $"${subtotal:F2}";
            LabelDescuento.Text = $"${descuento:F2}";
            LabelTotal.Text = $"${total:F2}";
        }

        private void ActualizarEstadoBotones()
        {
            var hayItems = _itemsVenta.Any();

            ButtonVentaEfectivo.IsEnabled = hayItems;
            ButtonVentaCredito.IsEnabled = hayItems && _clienteValidado && _validacionCliente?.SujetoCredito == true;
        }

        private void LimpiarFormulario()
        {
            EntryCliente.Text = string.Empty;
            EntryNombreCliente.Text = string.Empty; // NUEVO: Limpiar el nombre
            LabelNombreCliente.Text = "Cliente no validado";
            LabelNombreCliente.TextColor = UIConstants.MEDIUM_GRAY;

            _itemsVenta.Clear();
            _clienteValidado = false;
            _validacionCliente = null;

            PickerProductos.SelectedItem = null;
            StepperCantidad.Value = 1;
            StepperCuotas.Value = 3;
        }

        private async Task MostrarEstado(string mensaje, Color color, bool mostrarLoading = false)
        {
            StatusLabel.Text = mensaje;
            StatusLabel.TextColor = color;
            StatusLabel.IsVisible = true;

            LoadingIndicator.IsVisible = mostrarLoading;
            LoadingIndicator.IsRunning = mostrarLoading;

            if (!mostrarLoading)
            {
                // Ocultar después de 3 segundos
                Device.StartTimer(TimeSpan.FromSeconds(3), () =>
                {
                    StatusLabel.IsVisible = false;
                    return false;
                });
            }
        }
    }
}