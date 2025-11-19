using ClienteMovil.Models;
using ClienteMovil.Services;
using ClienteMovil.Utils;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.ObjectModel;

namespace ClienteMovil.Views
{
    [QueryProperty(nameof(CreditoId), "creditoId")]
    public partial class CreditoPage : ContentPage
    {
        private readonly ClienteUnificado _clienteService;
        private ObservableCollection<CuotaAmortizacion> _cuotas;
        private int? _creditoId;

        public string CreditoId
        {
            set
            {
                if (int.TryParse(value, out int id))
                {
                    _creditoId = id;
                    _ = CargarTablaAmortizacionAsync(id);
                }
            }
        }

        public CreditoPage()
        {
            InitializeComponent();

            // Obtener servicio del contenedor DI
            _clienteService = ServiceHelper.GetService<ClienteUnificado>();

            // Inicializar collections
            _cuotas = new ObservableCollection<CuotaAmortizacion>();

            // Configurar binding
            TablaCollectionView.ItemsSource = _cuotas;
        }

        protected override async void OnAppearing()
        {
            base.OnAppearing();

            // Si no se cargó un crédito específico, limpiar la vista
            if (!_creditoId.HasValue)
            {
                LimpiarFormulario();
            }
        }

        // ========== EVENTOS DE UI ==========

        private async void OnValidarCreditoClicked(object sender, EventArgs e)
        {
            await ValidarCreditoAsync();
        }

        private async void OnCalcularMontoClicked(object sender, EventArgs e)
        {
            await CalcularMontoMaximoAsync();
        }

        private async void OnConsultarTablaClicked(object sender, EventArgs e)
        {
            await ConsultarTablaAmortizacionAsync();
        }

        private void OnLimpiarFormularioClicked(object sender, EventArgs e)
        {
            LimpiarFormulario();
        }

        // ========== MÉTODOS PRINCIPALES ==========

        private async Task ValidarCreditoAsync()
        {
            var cedula = EntryCedula.Text?.Trim();

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
                await MostrarEstado("Validando cliente para crédito...", UIConstants.INFO_COLOR, true);

                var validacion = await _clienteService.ValidarSujetoCreditoAsync(cedula);

                if (validacion != null)
                {
                    // Mostrar resultado
                    var icono = validacion.SujetoCredito ? "✅" : "❌";
                    var color = validacion.SujetoCredito ? UIConstants.SUCCESS_COLOR : UIConstants.DANGER_COLOR;

                    LabelResultadoValidacion.Text = $"{icono} {validacion.Mensaje}";
                    LabelResultadoValidacion.TextColor = color;
                    LabelResultadoValidacion.IsVisible = true;

                    // Habilitar botón de monto si es sujeto de crédito
                    ButtonCalcularMonto.IsEnabled = validacion.SujetoCredito;

                    await MostrarEstado($"{icono} Validación completada", color);
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

        private async Task CalcularMontoMaximoAsync()
        {
            var cedula = EntryCedula.Text?.Trim();

            if (string.IsNullOrEmpty(cedula))
            {
                await DisplayAlert("Advertencia", "Ingrese la cédula del cliente", "OK");
                return;
            }

            try
            {
                // Mostrar loading
                await MostrarEstado("Calculando monto máximo...", UIConstants.INFO_COLOR, true);

                var montoMaximo = await _clienteService.ObtenerMontoMaximoAsync(cedula);

                if (montoMaximo != null)
                {
                    if (montoMaximo.Aprobado)
                    {
                        LabelResultadoMonto.Text = $"💰 Monto máximo aprobado: ${montoMaximo.MontoMaximoCalculado:F2}";
                        LabelResultadoMonto.TextColor = UIConstants.SUCCESS_COLOR;

                        // Mostrar detalles del cálculo
                        var detalles = $"📊 DETALLES DEL CÁLCULO\n\n" +
                                     $"📈 Promedio Depósitos (3 meses): ${montoMaximo.PromedioDepositos:F2}\n" +
                                     $"📉 Promedio Retiros (3 meses): ${montoMaximo.PromedioRetiros:F2}\n" +
                                     $"💵 Capacidad de pago mensual: ${montoMaximo.CapacidadPago:F2}\n" +
                                     $"🏦 Monto máximo (9 meses): ${montoMaximo.MontoMaximoCalculado:F2}";

                        await DisplayAlert("Cálculo de Monto Máximo", detalles, "Entendido");

                        await MostrarEstado("✅ Monto máximo calculado", UIConstants.SUCCESS_COLOR);
                    }
                    else
                    {
                        LabelResultadoMonto.Text = $"❌ {montoMaximo.Mensaje}";
                        LabelResultadoMonto.TextColor = UIConstants.DANGER_COLOR;

                        await MostrarEstado("⚠️ No se puede calcular monto máximo", UIConstants.WARNING_COLOR);
                    }

                    LabelResultadoMonto.IsVisible = true;
                }
                else
                {
                    await MostrarEstado("❌ Error al calcular monto máximo", UIConstants.DANGER_COLOR);
                }
            }
            catch (Exception ex)
            {
                await MostrarEstado($"❌ Error: {ex.Message}", UIConstants.DANGER_COLOR);
            }
        }

        private async Task ConsultarTablaAmortizacionAsync()
        {
            var creditoIdText = EntryIdCredito.Text?.Trim();

            if (string.IsNullOrEmpty(creditoIdText))
            {
                await DisplayAlert("Advertencia", "Ingrese el ID del crédito", "OK");
                return;
            }

            if (!int.TryParse(creditoIdText, out int creditoId))
            {
                await DisplayAlert("Error", "El ID del crédito debe ser un número válido", "OK");
                return;
            }

            await CargarTablaAmortizacionAsync(creditoId);
        }

        private async Task CargarTablaAmortizacionAsync(int creditoId)
        {
            try
            {
                // Mostrar loading
                await MostrarEstado("Cargando tabla de amortización...", UIConstants.INFO_COLOR, true);

                var tablaAmortizacion = await _clienteService.ObtenerTablaAmortizacionAsync(creditoId);

                if (tablaAmortizacion?.Encontrado == true && tablaAmortizacion.Cuotas?.Any() == true)
                {
                    // Mostrar información del crédito
                    MostrarInformacionCredito(tablaAmortizacion);

                    // Cargar cuotas en la tabla
                    _cuotas.Clear();
                    foreach (var cuota in tablaAmortizacion.Cuotas)
                    {
                        _cuotas.Add(cuota);
                    }

                    // Mostrar sección de tabla
                    TablaSection.IsVisible = true;

                    await MostrarEstado($"✅ Tabla cargada: {_cuotas.Count} cuotas", UIConstants.SUCCESS_COLOR);
                }
                else
                {
                    var mensaje = tablaAmortizacion?.Mensaje ?? "Crédito no encontrado";
                    await MostrarEstado($"⚠️ {mensaje}", UIConstants.WARNING_COLOR);

                    // Ocultar sección de tabla
                    TablaSection.IsVisible = false;
                    _cuotas.Clear();
                }
            }
            catch (Exception ex)
            {
                await MostrarEstado($"❌ Error al cargar tabla: {ex.Message}", UIConstants.DANGER_COLOR);

                // Ocultar sección de tabla
                TablaSection.IsVisible = false;
                _cuotas.Clear();
            }
        }

        private void MostrarInformacionCredito(TablaAmortizacion tabla)
        {
            var info = $"🏦 INFORMACIÓN DEL CRÉDITO\n\n" +
                      $"📄 ID Crédito: {tabla.IdCredito}\n" +
                      $"👤 Cliente: {tabla.CedulaCliente}\n" +
                      $"💰 Monto: ${tabla.MontoCredito:F2}\n" +
                      $"📊 Cuotas: {tabla.Cuotas?.Count ?? 0}\n" +
                      $"💳 Cuota mensual: ${tabla.Cuotas?.FirstOrDefault()?.ValorCuota:F2}\n" +
                      $"📅 Fecha: {tabla.FechaCredito:dd/MM/yyyy}";

            LabelInfoCredito.Text = info;
            LabelInfoCredito.IsVisible = true;
        }

        private void LimpiarFormulario()
        {
            // Limpiar campos
            EntryCedula.Text = string.Empty;
            EntryIdCredito.Text = string.Empty;

            // Ocultar resultados
            LabelResultadoValidacion.IsVisible = false;
            LabelResultadoMonto.IsVisible = false;
            LabelInfoCredito.IsVisible = false;
            TablaSection.IsVisible = false;

            // Limpiar tabla
            _cuotas.Clear();

            // Deshabilitar botones
            ButtonCalcularMonto.IsEnabled = false;

            // Resetear estado
            _creditoId = null;
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

        // ========== FORMATTERS PARA BINDING ==========

        public string FormatearPrecio(decimal precio)
        {
            return $"${precio:F2}";
        }

        public string FormatearCuota(int numeroCuota)
        {
            return $"Cuota {numeroCuota}";
        }

        public Color ObtenerColorCuota(int numeroCuota)
        {
            // Alternar colores para mejor legibilidad
            return numeroCuota % 2 == 0 ? UIConstants.LIGHT_GRAY : Colors.White;
        }
    }
}