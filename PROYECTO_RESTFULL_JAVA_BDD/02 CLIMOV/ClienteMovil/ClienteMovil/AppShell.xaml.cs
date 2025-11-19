using ClienteMovil.Models;
using ClienteMovil.Services;
using ClienteMovil.Utils;
using ClienteMovil.Views;

namespace ClienteMovil
{
    public partial class AppShell : Shell
    {
        private readonly ClienteUnificado _clienteService;

        public AppShell()
        {
            InitializeComponent();

            // Inicializar el servicio cliente (inyectado desde DI)
            _clienteService = ServiceHelper.GetService<ClienteUnificado>();

            // Configurar el protocolo inicial en el header
            ActualizarProtocoloHeader();

            // Configurar los colores del Shell basados en UIConstants
            ConfigurarEstilos();
        }

        private void ConfigurarEstilos()
        {
            // Configurar colores del Shell para que coincidan con el escritorio
            Shell.SetFlyoutBackdrop(this, new SolidColorBrush(UIConstants.WithAlpha(UIConstants.BLACK, 0.5f)));
            Shell.SetTabBarBackgroundColor(this, UIConstants.BACKGROUND_HEADER);
            Shell.SetTabBarForegroundColor(this, UIConstants.WHITE);
            Shell.SetNavBarHasShadow(this, true);
        }

        private void ActualizarProtocoloHeader()
        {
            if (_clienteService != null)
            {
                var protocolo = _clienteService.ProtocoloActual;
                ProtocolLabel.Text = UIConstants.GetProtocolDisplayName(protocolo);

                // Actualizar el color del frame según el protocolo
                var frame = ProtocolLabel.Parent as Frame;
                if (frame != null)
                {
                    frame.BackgroundColor = UIConstants.GetProtocolColor(protocolo);
                    ProtocolLabel.TextColor = UIConstants.WHITE;
                }

                // Actualizar menús de cambio de protocolo
                ActualizarMenusProtocolo(protocolo);
            }
        }

        private void ActualizarMenusProtocolo(TipoProtocolo protocolo)
        {
            MenuRest.Text = protocolo == TipoProtocolo.REST ?
                "✅ REST (Activo)" : "🔄 Cambiar a REST";

            MenuSoap.Text = protocolo == TipoProtocolo.SOAP ?
                "✅ SOAP (Activo)" : "🔄 Cambiar a SOAP";
        }

        // ========== EVENTOS DEL HEADER ==========

        /// <summary>
        /// Cerrar sesión (idéntico al cerrarSesion() de MainFrame.java)
        /// </summary>
        private async void OnCerrarSesionClicked(object sender, EventArgs e)
        {
            try
            {
                // Confirmar cierre de sesión
                bool confirmar = await DisplayAlert(
                    "Cerrar Sesión",
                    "¿Está seguro que desea cerrar la sesión?",
                    "Sí, cerrar",
                    "Cancelar"
                );

                if (!confirmar) return;

                // Cerrar el flyout
                Shell.Current.FlyoutIsPresented = false;

                // Mostrar loading
                await DisplayAlert("Cerrando Sesión", "Cerrando sesión...", "OK");

                // Limpiar datos de sesión si es necesario
                // _clienteService?.LimpiarSesion(); // Si tienes este método

                // Navegar de vuelta al LoginPage (idéntico al Java)
                Application.Current.MainPage = new NavigationPage(new LoginPage());

            }
            catch (Exception ex)
            {
                await DisplayAlert(
                    "Error",
                    $"Error al cerrar sesión: {ex.Message}",
                    "Aceptar"
                );
            }
        }

        // ========== EVENTOS DE CAMBIO DE PROTOCOLO ==========

        private async void OnCambiarRestClicked(object sender, EventArgs e)
        {
            if (_clienteService.ProtocoloActual != TipoProtocolo.REST)
            {
                await CambiarProtocoloAsync(TipoProtocolo.REST);
            }
        }

        private async void OnCambiarSoapClicked(object sender, EventArgs e)
        {
            if (_clienteService.ProtocoloActual != TipoProtocolo.SOAP)
            {
                await CambiarProtocoloAsync(TipoProtocolo.SOAP);
            }
        }

        private async Task CambiarProtocoloAsync(TipoProtocolo nuevoProtocolo)
        {
            try
            {
                // Mostrar loading modal
                var loadingPage = new ContentPage
                {
                    Title = "Cambiando Protocolo",
                    Content = new StackLayout
                    {
                        Children = {
                            new ActivityIndicator { IsRunning = true, Color = UIConstants.PRIMARY_COLOR },
                            new Label {
                                Text = $"Cambiando a {UIConstants.GetProtocolDisplayName(nuevoProtocolo)}...",
                                HorizontalOptions = LayoutOptions.Center,
                                Margin = new Thickness(0, 20, 0, 0)
                            }
                        },
                        VerticalOptions = LayoutOptions.Center,
                        HorizontalOptions = LayoutOptions.Center
                    }
                };

                await Navigation.PushModalAsync(loadingPage);

                // Cambiar protocolo
                _clienteService.CambiarProtocolo(nuevoProtocolo);

                // Actualizar UI
                ActualizarProtocoloHeader();

                // Probar conectividad
                var conectividad = await _clienteService.ProbarConectividadAsync();

                // Cerrar loading
                await Navigation.PopModalAsync();

                var mensaje = conectividad?.ComercializadoraActiva == true ?
                    "✅ Conectado exitosamente" :
                    conectividad?.ComercializadoraActiva == true ?
                    "⚠️ Solo BanQuito disponible" :
                    "❌ Servicios no disponibles" +
                    (conectividad != null ? "" : " - Usando fallback local");

                var color = conectividad?.ColorGeneral ?? UIConstants.INFO_COLOR;

                await DisplayAlert(
                    "Protocolo Cambiado",
                    $"Protocolo cambiado a: {UIConstants.GetProtocolDisplayName(nuevoProtocolo)}\n\n{mensaje}",
                    "Aceptar"
                );

                // Cerrar el flyout
                Shell.Current.FlyoutIsPresented = false;

            }
            catch (Exception ex)
            {
                // Cerrar loading si está abierto
                if (Navigation.ModalStack.Count > 0)
                {
                    await Navigation.PopModalAsync();
                }

                await DisplayAlert(
                    "Error",
                    $"Error al cambiar protocolo: {ex.Message}",
                    "Aceptar"
                );
            }
        }

        // Método para actualizar el protocolo desde otras páginas
        public void RefreshProtocoloHeader()
        {
            ActualizarProtocoloHeader();
        }
    }

    /// <summary>
    /// Helper estático para acceder a servicios desde cualquier parte de la app
    /// </summary>
    public static class ServiceHelper
    {
        public static T GetService<T>() => Current.GetService<T>();

        public static IServiceProvider Current =>
#if WINDOWS10_0_17763_0_OR_GREATER
            MauiWinUIApplication.Current.Services;
#elif ANDROID
            MauiApplication.Current.Services;
#elif IOS || MACCATALYST
            MauiUIApplicationDelegate.Current.Services;
#else
            null;
#endif
    }
}