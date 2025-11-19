using Microsoft.Maui.Platform;
using Microsoft.Extensions.DependencyInjection;
using ClienteMovil.Services;
using CommunityToolkit.Maui;
using Microsoft.Extensions.Logging;
using ClienteMovil.Views;

namespace ClienteMovil
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .UseMauiCommunityToolkit()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });

            // Configurar servicios (idéntico al patrón del cliente de escritorio)
            builder.Services.AddSingleton<ClienteUnificado>();

            // Registrar las páginas como transient para navegación
            builder.Services.AddTransient<ProductosPage>();
            builder.Services.AddTransient<FacturacionPage>();
            builder.Services.AddTransient<CreditoPage>();
            builder.Services.AddTransient<ConectividadPage>();

            // Configurar HttpClient para el ClienteUnificado
            builder.Services.AddHttpClient();

#if DEBUG
            builder.Logging.AddDebug();
#endif

            // Configurar colores del sistema
            ConfigurarColoresSistema();

            return builder.Build();
        }

        private static void ConfigurarColoresSistema()
        {
            // Configurar colores globales basados en UIConstants
            Microsoft.Maui.Handlers.EntryHandler.Mapper.AppendToMapping(nameof(IEntry), (handler, view) =>
            {
                if (view is Entry)
                {
#if ANDROID
                    handler.PlatformView.BackgroundTintList =
                        Android.Content.Res.ColorStateList.ValueOf(Utils.UIConstants.PRIMARY_COLOR.ToPlatform());
#elif IOS
                    handler.PlatformView.TintColor = Utils.UIConstants.PRIMARY_COLOR.ToPlatform();
#endif
                }
            });
        }
    }
}