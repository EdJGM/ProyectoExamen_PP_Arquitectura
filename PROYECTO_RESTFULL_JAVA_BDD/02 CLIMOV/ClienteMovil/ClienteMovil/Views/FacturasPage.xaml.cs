using ClienteMovil.Models;
using ClienteMovil.Services;
using ClienteMovil.Utils;
using System.Collections.ObjectModel;

namespace ClienteMovil.Views
{
    public partial class FacturasPage : ContentPage
    {
        private readonly ClienteUnificado _clienteService;
        private ObservableCollection<Factura> _facturas;
        private List<Factura> _todasLasFacturas;

        public FacturasPage()
        {
            InitializeComponent();

            // Obtener servicio del contenedor DI
            _clienteService = ServiceHelper.GetService<ClienteUnificado>();

            // Inicializar colecciones
            _facturas = new ObservableCollection<Factura>();
            _todasLasFacturas = new List<Factura>();

            // Configurar binding
            FacturasCollectionView.ItemsSource = _facturas;

            // Configurar valores por defecto de filtros
            PickerFormaPago.SelectedIndex = 0; // "Todas"
            PickerEstado.SelectedIndex = 0;    // "Todos"
        }

        protected override async void OnAppearing()
        {
            base.OnAppearing();
            await CargarFacturasAsync();
        }

        // ========== EVENTOS DE UI ==========

        private async void OnRefrescarClicked(object sender, EventArgs e)
        {
            await CargarFacturasAsync();
        }

        private async void OnRefreshing(object sender, EventArgs e)
        {
            await CargarFacturasAsync();
            RefreshView.IsRefreshing = false;
        }

        private void OnFiltrarClicked(object sender, EventArgs e)
        {
            AplicarFiltros();
        }

        private void OnLimpiarFiltrosClicked(object sender, EventArgs e)
        {
            LimpiarFiltros();
        }

        private async void OnBuscarFacturaClicked(object sender, EventArgs e)
        {
            await BuscarFacturaPorId();
        }

        private async void OnFacturaTapped(object sender, TappedEventArgs e)
        {
            if (sender is Frame frame && frame.BindingContext is Factura factura)
            {
                await MostrarDetalleFactura(factura.IdFactura);
            }
        }

        // ========== MÉTODOS PRINCIPALES ==========

        private async Task CargarFacturasAsync()
        {
            try
            {
                await MostrarEstado("Cargando facturas...", UIConstants.INFO_COLOR, true);

                var facturas = await _clienteService.ListarFacturasAsync();

                if (facturas != null)
                {
                    _todasLasFacturas = facturas;
                    ActualizarListaFacturas(_todasLasFacturas);
                    await MostrarEstado($"✅ {facturas.Count} facturas cargadas", UIConstants.SUCCESS_COLOR);
                }
                else
                {
                    _todasLasFacturas = new List<Factura>();
                    ActualizarListaFacturas(_todasLasFacturas);
                    await MostrarEstado("⚠️ No se pudieron cargar las facturas", UIConstants.WARNING_COLOR);
                }
            }
            catch (Exception ex)
            {
                await MostrarEstado($"❌ Error: {ex.Message}", UIConstants.DANGER_COLOR);
            }
        }

        private void AplicarFiltros()
        {
            try
            {
                var textoFiltro = EntryBusqueda.Text?.Trim().ToLower() ?? "";
                var formaPagoFiltro = PickerFormaPago.SelectedItem?.ToString() ?? "Todas";
                var estadoFiltro = PickerEstado.SelectedItem?.ToString() ?? "Todos";

                var facturasFiltradas = _todasLasFacturas.Where(f =>
                {
                    // Filtro por texto
                    bool coincideTexto = string.IsNullOrEmpty(textoFiltro) ||
                        f.NumeroFactura.ToLower().Contains(textoFiltro) ||
                        f.NombreCliente.ToLower().Contains(textoFiltro) ||
                        f.CedulaCliente.Contains(textoFiltro);

                    // Filtro por forma de pago
                    bool coincideFormaPago = formaPagoFiltro == "Todas" ||
                        f.FormaPago.Equals(formaPagoFiltro, StringComparison.OrdinalIgnoreCase);

                    // Filtro por estado
                    bool coincideEstado = estadoFiltro == "Todos" ||
                        f.Estado.Equals(estadoFiltro, StringComparison.OrdinalIgnoreCase);

                    return coincideTexto && coincideFormaPago && coincideEstado;

                }).ToList();

                ActualizarListaFacturas(facturasFiltradas);
                _ = MostrarEstado($"🔍 {facturasFiltradas.Count} facturas encontradas", UIConstants.INFO_COLOR);
            }
            catch (Exception ex)
            {
                _ = MostrarEstado($"❌ Error en filtros: {ex.Message}", UIConstants.DANGER_COLOR);
            }
        }

        private void LimpiarFiltros()
        {
            EntryBusqueda.Text = "";
            PickerFormaPago.SelectedIndex = 0;
            PickerEstado.SelectedIndex = 0;
            ActualizarListaFacturas(_todasLasFacturas);
            _ = MostrarEstado("🧹 Filtros limpiados", UIConstants.SUCCESS_COLOR);
        }

        private async Task BuscarFacturaPorId()
        {
            try
            {
                string idString = await DisplayPromptAsync(
                    "Buscar Factura",
                    "Ingrese el ID de la factura:",
                    "Buscar",
                    "Cancelar",
                    "ID de factura...",
                    keyboard: Keyboard.Numeric);

                if (!string.IsNullOrEmpty(idString) && int.TryParse(idString, out int id))
                {
                    await MostrarDetalleFactura(id);
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Error", $"Error al buscar factura: {ex.Message}", "OK");
            }
        }

        private async Task MostrarDetalleFactura(int idFactura)
        {
            try
            {
                await MostrarEstado("Cargando detalle de factura...", UIConstants.INFO_COLOR, true);

                var respuesta = await _clienteService.ObtenerFacturaAsync(idFactura);

                if (respuesta?.Encontrada == true)
                {
                    var factura = respuesta.ToFactura();
                    await MostrarDialogoDetalle(factura, respuesta.Items);
                    await MostrarEstado("✅ Detalle cargado", UIConstants.SUCCESS_COLOR);
                }
                else
                {
                    await DisplayAlert("Factura no encontrada",
                        respuesta?.Mensaje ?? "La factura no existe o no está disponible",
                        "OK");
                    await MostrarEstado("❌ Factura no encontrada", UIConstants.DANGER_COLOR);
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Error", $"Error al cargar detalle: {ex.Message}", "OK");
                await MostrarEstado($"❌ Error: {ex.Message}", UIConstants.DANGER_COLOR);
            }
        }

        private async Task MostrarDialogoDetalle(Factura factura, List<ItemFactura> items)
        {
            var mensaje = $"📄 {factura.NumeroFactura}\n" +
                         $"📅 {factura.FechaFactura}\n\n" +
                         $"👤 Cliente: {factura.NombreCliente}\n" +
                         $"🆔 Cédula: {factura.CedulaCliente}\n" +
                         $"📊 Estado: {factura.EstadoTexto}\n" +
                         $"💳 Pago: {factura.FormaPagoTexto}\n\n" +
                         $"💰 Subtotal: ${factura.Subtotal:F2}\n";

            if (factura.Descuento > 0)
            {
                mensaje += $"💸 Descuento: ${factura.Descuento:F2}\n";
            }

            mensaje += $"💵 TOTAL: ${factura.Total:F2}\n";

            if (factura.FormaPago == "CREDITO_DIRECTO" && factura.NumeroCuotas.HasValue)
            {
                mensaje += $"\n🏦 Información de Crédito:\n" +
                          $"• ID Crédito: #{factura.IdCreditoBanco}\n" +
                          $"• {factura.ResumenCredito}";
            }

            if (items?.Count > 0)
            {
                mensaje += $"\n\n🛒 Productos ({items.Count}):\n";
                foreach (var item in items.Take(3))
                {
                    mensaje += $"• {item.DescripcionCompleta} = ${item.Subtotal:F2}\n";
                }
                if (items.Count > 3)
                {
                    mensaje += $"• ... y {items.Count - 3} productos más\n";
                }
            }

            // Mostrar opciones adicionales para crédito
            if (factura.FormaPago == "CREDITO_DIRECTO" && factura.IdCreditoBanco.HasValue)
            {
                bool verTabla = await DisplayAlert(
                    "Detalle de Factura",
                    mensaje,
                    "Ver Tabla de Amortización",
                    "Cerrar"
                );

                if (verTabla)
                {
                    await NavegararACredito(factura.IdCreditoBanco.Value);
                }
            }
            else
            {
                await DisplayAlert("Detalle de Factura", mensaje, "Cerrar");
            }
        }

        private async Task NavegararACredito(int idCredito)
        {
            try
            {
                await Shell.Current.GoToAsync($"//credito?creditoId={idCredito}");
            }
            catch (Exception ex)
            {
                await DisplayAlert("Error", $"Error al navegar: {ex.Message}", "OK");
            }
        }

        // ========== HELPERS ==========

        private void ActualizarListaFacturas(List<Factura> facturas)
        {
            _facturas.Clear();
            foreach (var factura in facturas.OrderByDescending(f => f.IdFactura))
            {
                _facturas.Add(factura);
            }
        }

        private async Task MostrarEstado(string mensaje, Color color, bool mostrarLoading = false)
        {
            StatusLabel.Text = mensaje;
            StatusLabel.TextColor = color;

            LoadingIndicator.IsVisible = mostrarLoading;
            LoadingIndicator.IsRunning = mostrarLoading;

            if (!mostrarLoading)
            {
                // Ocultar después de 3 segundos
                Device.StartTimer(TimeSpan.FromSeconds(3), () =>
                {
                    MainThread.BeginInvokeOnMainThread(() =>
                    {
                        if (StatusLabel.Text == mensaje) // Solo si no ha cambiado
                        {
                            StatusLabel.Text = "Listo";
                            StatusLabel.TextColor = UIConstants.TEXT_PRIMARY;
                        }
                    });
                    return false;
                });
            }
        }
    }
}