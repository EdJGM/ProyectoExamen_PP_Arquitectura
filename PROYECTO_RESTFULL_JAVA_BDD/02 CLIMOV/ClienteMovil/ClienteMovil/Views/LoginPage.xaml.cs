using ClienteMovil.Services;
using ClienteMovil.Models;

namespace ClienteMovil.Views
{
    public partial class LoginPage : ContentPage
    {
        private readonly ClienteUnificado _clienteService;

        public LoginPage()
        {
            InitializeComponent();

            // Obtener servicio del contenedor DI
            _clienteService = ServiceHelper.GetService<ClienteUnificado>();

            // Configurar evento Enter en contraseña
            EntryContrasena.Completed += async (s, e) => await RealizarLoginAsync();
        }

        private async void OnLoginClicked(object sender, EventArgs e)
        {
            await RealizarLoginAsync();
        }

        private async Task RealizarLoginAsync()
        {
            var usuario = EntryUsuario.Text?.Trim();
            var contrasena = EntryContrasena.Text?.Trim();
            var protocoloIndex = PickerProtocolo.SelectedIndex;

            // Validar credenciales (idéntico al Java)
            if (usuario != "MONSTER" || contrasena != "MONSTER9")
            {
                await DisplayAlert("Error de Acceso",
                    "Usuario o contraseña incorrectos.\n\nCredenciales válidas:\nUsuario: MONSTER\nContraseña: MONSTER9",
                    "Aceptar");
                return;
            }

            if (protocoloIndex < 0)
            {
                await DisplayAlert("Advertencia", "Seleccione un protocolo", "Aceptar");
                return;
            }

            try
            {
                // Mostrar loading
                LoadingIndicator.IsVisible = true;
                LoadingIndicator.IsRunning = true;
                ButtonLogin.IsEnabled = false;
                ButtonLogin.Text = "🔄 Autenticando...";

                await Task.Delay(1000); // Simular tiempo de autenticación

                // Configurar protocolo (idéntico al Java)
                var protocoloNombre = PickerProtocolo.Items[protocoloIndex];
                var tipoProtocolo = protocoloNombre == "Java RESTful" ?
                    TipoProtocolo.REST : TipoProtocolo.SOAP;

                // Cambiar protocolo en el servicio
                _clienteService.CambiarProtocolo(tipoProtocolo);

                // Probar conectividad inicial
                var conectividad = await _clienteService.ProbarConectividadAsync();

                var mensajeConexion = conectividad?.ComercializadoraActiva == true ?
                    "✅ Conectado exitosamente" :
                    "⚠️ Conectado con limitaciones";

                await DisplayAlert("Login Exitoso",
                    $"Bienvenido al sistema\n\nProtocolo: {protocoloNombre}\n{mensajeConexion}",
                    "Continuar");

                // Navegar al AppShell (pantalla principal)
                Application.Current.MainPage = new AppShell();

            }
            catch (Exception ex)
            {
                await DisplayAlert("Error de Conexión",
                    $"Error al inicializar el sistema:\n{ex.Message}",
                    "Aceptar");
            }
            finally
            {
                // Ocultar loading
                LoadingIndicator.IsVisible = false;
                LoadingIndicator.IsRunning = false;
                ButtonLogin.IsEnabled = true;
                ButtonLogin.Text = "🔓 Iniciar Sesión";
            }
        }

        // Override para prevenir navegación hacia atrás
        protected override bool OnBackButtonPressed()
        {
            // En Android, prevenir que se cierre la app desde login
            return true;
        }
    }

    /// <summary>
    /// Helper estático para acceder a servicios desde cualquier parte de la app
    /// (mover a un archivo separado si no existe)
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