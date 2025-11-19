
using ClienteMovil.Models;
using ClienteMovil.Services;
using ClienteMovil.Utils;

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
                }

                // Actualizar visibilidad de los menús
                ActualizarMenusProtocolo(protocolo);
            }
        }

        private void ActualizarMenusProtocolo(TipoProtocolo protocoloActual)
        {
            // Mostrar/ocultar opciones de menú según el protocolo actual
            MenuRest.IsEnabled = protocoloActual != TipoProtocolo.REST;
            MenuSoap.IsEnabled = protocoloActual != TipoProtocolo.SOAP;

            // Actualizar texto del menú activo
            if (protocoloActual == TipoProtocolo.REST)
            {
                MenuSoap.Text = "🔄 Cambiar a SOAP (.NET)";
            }
            else
            {
                MenuRest.Text = "🔄 Cambiar a REST (Java)";
            }
        }

        private async void OnCambiarRestClicked(object sender, EventArgs e)
        {
            await CambiarProtocolo(TipoProtocolo.REST);
        }

        private async void OnCambiarSoapClicked(object sender, EventArgs e)
        {
            await CambiarProtocolo(TipoProtocolo.SOAP);
        }

        private async Task CambiarProtocolo(TipoProtocolo nuevoProtocolo)
        {
            try
            {
                // Mostrar loading
                var loadingPage = new ContentPage
                {
                    Content = new StackLayout
                    {
                        Children =
                        {
                            new ActivityIndicator { IsRunning = true, Color = UIConstants.PRIMARY_COLOR },
                            new Label
                            {
                                Text = $"Cambiando a {UIConstants.GetProtocolDisplayName(nuevoProtocolo)}...",
                                HorizontalOptions = LayoutOptions.Center,
                                TextColor = UIConstants.DARK_GRAY,
                                Margin = new Thickness(0, 20, 0, 0)
                            }
                        },
                        VerticalOptions = LayoutOptions.Center,
                        HorizontalOptions = LayoutOptions.Center
                    },
                    BackgroundColor = UIConstants.BACKGROUND_MAIN
                };

                await Navigation.PushModalAsync(loadingPage);

                // Cambiar protocolo
                _clienteService?.CambiarProtocolo(nuevoProtocolo);

                // Actualizar UI
                ActualizarProtocoloHeader();

                // Probar conectividad con el nuevo protocolo
                var conectividad = await _clienteService?.ProbarConectividadAsync();

                // Cerrar loading
                await Navigation.PopModalAsync();

                // Mostrar resultado
                var mensaje = conectividad?.EstadoGeneral ?? "Protocolo cambiado";
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
