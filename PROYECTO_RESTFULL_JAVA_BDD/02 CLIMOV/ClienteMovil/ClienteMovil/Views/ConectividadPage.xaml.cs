using ClienteMovil.Models;
using ClienteMovil.Services;
using ClienteMovil.Utils;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.ObjectModel;

namespace ClienteMovil.Views
{
    public partial class ConectividadPage : ContentPage
    {
        private readonly ClienteUnificado _clienteService;
        private ObservableCollection<string> _logConexiones;
        private Timer _timerActualizacion;
        private bool _actualizacionAutomaticaActiva;

        public ConectividadPage()
        {
            InitializeComponent();

            // Obtener servicio del contenedor DI
            _clienteService = ServiceHelper.GetService<ClienteUnificado>();

            // Inicializar collections
            _logConexiones = new ObservableCollection<string>();

            // Configurar binding
            LogCollectionView.ItemsSource = _logConexiones;

            // Configurar estado inicial
            _actualizacionAutomaticaActiva = true;

            // Inicializar componentes
            InicializarComponentes();

            // Realizar primera prueba
            _ = ProbarConectividadAsync();

            // Iniciar timer de actualización automática
            IniciarActualizacionAutomatica();
        }

        private void InicializarComponentes()
        {
            // Actualizar estado del protocolo actual
            ActualizarEstadoProtocolo();

            // Configurar switch de actualización automática
            SwitchActualizacionAutomatica.IsToggled = _actualizacionAutomaticaActiva;

            // Agregar mensaje inicial al log
            AgregarLogMensaje("🚀 Sistema de conectividad iniciado");
            AgregarLogMensaje($"🔧 Protocolo actual: {UIConstants.GetProtocolDisplayName(_clienteService.ProtocoloActual)}");
        }

        protected override void OnDisappearing()
        {
            base.OnDisappearing();

            // Detener timer al salir de la página
            _timerActualizacion?.Dispose();
            _timerActualizacion = null;
        }

        // ========== EVENTOS DE UI ==========

        private async void OnProbarConexionesClicked(object sender, EventArgs e)
        {
            await ProbarConectividadAsync();
        }

        private async void OnCambiarProtocoloClicked(object sender, EventArgs e)
        {
            var button = sender as Button;
            var nuevoProtocolo = button?.CommandParameter?.ToString();

            if (Enum.TryParse<TipoProtocolo>(nuevoProtocolo, out var protocolo))
            {
                await CambiarProtocoloAsync(protocolo);
            }
        }

        private void OnSwitchActualizacionChanged(object sender, ToggledEventArgs e)
        {
            _actualizacionAutomaticaActiva = e.Value;

            if (e.Value)
            {
                IniciarActualizacionAutomatica();
                AgregarLogMensaje("🔄 Actualización automática activada");
            }
            else
            {
                DetenerActualizacionAutomatica();
                AgregarLogMensaje("⏸️ Actualización automática desactivada");
            }
        }

        private void OnLimpiarLogClicked(object sender, EventArgs e)
        {
            _logConexiones.Clear();
            AgregarLogMensaje("🧹 Log de conexiones limpiado");
        }

        // ========== MÉTODOS PRINCIPALES ==========

        private async Task ProbarConectividadAsync()
        {
            try
            {
                // Mostrar estado de prueba
                ProgressBar.IsVisible = true;
                ProgressBar.Progress = 0;

                AgregarLogMensaje("🔍 Iniciando pruebas de conectividad...");

                // Probar conectividad
                var conectividad = await _clienteService.ProbarConectividadAsync();

                // Actualizar progress bar
                ProgressBar.Progress = 0.5;
                await Task.Delay(500); // Simular proceso

                // Actualizar estado visual
                ActualizarEstadoServicios(conectividad);

                // Completar progress bar
                ProgressBar.Progress = 1.0;
                await Task.Delay(500);

                // Log de resultados
                AgregarLogMensaje($"🏪 Comercializadora: {(conectividad.ComercializadoraActiva ? "✅ Activo" : "❌ Inactivo")}");
                AgregarLogMensaje($"🏦 BanQuito: {(conectividad.BanquitoActivo ? "✅ Activo" : "❌ Inactivo")}");
                AgregarLogMensaje($"📊 Estado general: {conectividad.EstadoGeneral}");

                // Ocultar progress bar
                ProgressBar.IsVisible = false;
            }
            catch (Exception ex)
            {
                AgregarLogMensaje($"❌ Error en pruebas: {ex.Message}");
                ProgressBar.IsVisible = false;

                // Mostrar estado de error
                ActualizarEstadoServicios(new EstadoConectividad
                {
                    ProtocoloActual = _clienteService.ProtocoloActual,
                    ComercializadoraActiva = false,
                    BanquitoActivo = false
                });
            }
        }

        private async Task CambiarProtocoloAsync(TipoProtocolo nuevoProtocolo)
        {
            if (nuevoProtocolo == _clienteService.ProtocoloActual)
            {
                AgregarLogMensaje($"ℹ️ Ya está usando {UIConstants.GetProtocolDisplayName(nuevoProtocolo)}");
                return;
            }

            try
            {
                // Mostrar loading
                ProgressBar.IsVisible = true;
                ProgressBar.Progress = 0;

                var protocoloAnterior = _clienteService.ProtocoloActual;
                AgregarLogMensaje($"🔄 Cambiando protocolo: {UIConstants.GetProtocolDisplayName(protocoloAnterior)} → {UIConstants.GetProtocolDisplayName(nuevoProtocolo)}");

                // Cambiar protocolo
                _clienteService.CambiarProtocolo(nuevoProtocolo);

                // Actualizar UI
                ActualizarEstadoProtocolo();

                // Progress
                ProgressBar.Progress = 0.5;
                await Task.Delay(500);

                // Probar nueva conectividad
                var conectividad = await _clienteService.ProbarConectividadAsync();
                ActualizarEstadoServicios(conectividad);

                // Completar
                ProgressBar.Progress = 1.0;
                await Task.Delay(500);

                AgregarLogMensaje($"✅ Protocolo cambiado exitosamente a {UIConstants.GetProtocolDisplayName(nuevoProtocolo)}");

                // Actualizar AppShell si es posible
                if (Application.Current?.MainPage is AppShell shell)
                {
                    shell.RefreshProtocoloHeader();
                }

                ProgressBar.IsVisible = false;
            }
            catch (Exception ex)
            {
                AgregarLogMensaje($"❌ Error al cambiar protocolo: {ex.Message}");
                ProgressBar.IsVisible = false;
            }
        }

        private void ActualizarEstadoProtocolo()
        {
            var protocolo = _clienteService.ProtocoloActual;
            var color = UIConstants.GetProtocolColor(protocolo);
            var displayName = UIConstants.GetProtocolDisplayName(protocolo);

            // Actualizar label de protocolo actual
            LabelProtocoloActual.Text = $"🔧 Protocolo: {displayName}";
            LabelProtocoloActual.TextColor = color;

            // Actualizar botones
            ButtonCambiarRest.BackgroundColor = protocolo == TipoProtocolo.REST ? UIConstants.SUCCESS_COLOR : UIConstants.MEDIUM_GRAY;
            ButtonCambiarRest.Text = protocolo == TipoProtocolo.REST ? "✅ REST (Activo)" : "🔄 Cambiar a REST";

            ButtonCambiarSoap.BackgroundColor = protocolo == TipoProtocolo.SOAP ? UIConstants.SUCCESS_COLOR : UIConstants.MEDIUM_GRAY;
            ButtonCambiarSoap.Text = protocolo == TipoProtocolo.SOAP ? "✅ SOAP (Activo)" : "🔄 Cambiar a SOAP";
        }

        private void ActualizarEstadoServicios(EstadoConectividad conectividad)
        {
            // Comercializadora
            var iconoCom = conectividad.ComercializadoraActiva ? "✅" : "❌";
            var colorCom = conectividad.ColorComercializadora;
            LabelEstadoComercializadora.Text = $"{iconoCom} Comercializadora: {(conectividad.ComercializadoraActiva ? "Conectado" : "Desconectado")}";
            LabelEstadoComercializadora.TextColor = colorCom;

            // BanQuito
            var iconoBan = conectividad.BanquitoActivo ? "✅" : "❌";
            var colorBan = conectividad.ColorBanquito;
            LabelEstadoBanquito.Text = $"{iconoBan} BanQuito: {(conectividad.BanquitoActivo ? "Conectado" : "Desconectado")}";
            LabelEstadoBanquito.TextColor = colorBan;

            // Estado general
            var iconoGen = (conectividad.ComercializadoraActiva && conectividad.BanquitoActivo) ? "✅" : "⚠️";
            LabelEstadoGeneral.Text = $"{iconoGen} {conectividad.EstadoGeneral}";
            LabelEstadoGeneral.TextColor = conectividad.ColorGeneral;
        }

        private void IniciarActualizacionAutomatica()
        {
            DetenerActualizacionAutomatica(); // Asegurar que no haya timers duplicados

            _timerActualizacion = new Timer(async _ =>
            {
                await Device.InvokeOnMainThreadAsync(async () =>
                {
                    if (_actualizacionAutomaticaActiva)
                    {
                        AgregarLogMensaje("🔄 Actualización automática...");
                        await ProbarConectividadAsync();
                    }
                });
            }, null, TimeSpan.Zero, TimeSpan.FromSeconds(30)); // Cada 30 segundos
        }

        private void DetenerActualizacionAutomatica()
        {
            _timerActualizacion?.Dispose();
            _timerActualizacion = null;
        }

        private void AgregarLogMensaje(string mensaje)
        {
            var timestamp = DateTime.Now.ToString("HH:mm:ss");
            var logEntry = $"[{timestamp}] {mensaje}";

            // Agregar al inicio de la lista para mostrar los más recientes primero
            _logConexiones.Insert(0, logEntry);

            // Limitar a 100 entradas para evitar problemas de memoria
            while (_logConexiones.Count > 100)
            {
                _logConexiones.RemoveAt(_logConexiones.Count - 1);
            }
        }

        // ========== FORMATTERS PARA BINDING ==========

        public Color ObtenerColorLogEntry(string logEntry)
        {
            if (logEntry.Contains("✅") || logEntry.Contains("exitosamente"))
                return UIConstants.SUCCESS_COLOR;

            if (logEntry.Contains("❌") || logEntry.Contains("Error"))
                return UIConstants.DANGER_COLOR;

            if (logEntry.Contains("⚠️") || logEntry.Contains("⏸️"))
                return UIConstants.WARNING_COLOR;

            if (logEntry.Contains("🔍") || logEntry.Contains("🔄"))
                return UIConstants.INFO_COLOR;

            return UIConstants.TEXT_PRIMARY;
        }
    }
}