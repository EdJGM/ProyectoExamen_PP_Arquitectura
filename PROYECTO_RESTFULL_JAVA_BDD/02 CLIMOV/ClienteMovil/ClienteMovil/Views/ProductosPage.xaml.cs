using ClienteMovil.Models;
using ClienteMovil.Services;
using ClienteMovil.Utils;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.ObjectModel;

namespace ClienteMovil.Views
{
    public partial class ProductosPage : ContentPage
    {
        private readonly ClienteUnificado _clienteService;
        private ObservableCollection<Electrodomestico> _productos;
        private List<Electrodomestico> _todosProductos;
        private bool _isLoading;

        public ProductosPage()
        {
            InitializeComponent();

            // Obtener servicio del contenedor DI
            _clienteService = ServiceHelper.GetService<ClienteUnificado>();

            // Inicializar collections
            _productos = new ObservableCollection<Electrodomestico>();
            _todosProductos = new List<Electrodomestico>();

            // Configurar binding
            ProductosCollectionView.ItemsSource = _productos;

            // Configurar eventos
            ConfigurarEventos();

            // Cargar productos inicialmente
            _ = CargarProductosAsync();
        }

        private void ConfigurarEventos()
        {
            SearchBar.TextChanged += OnSearchTextChanged;
        }

        protected override async void OnAppearing()
        {
            base.OnAppearing();

            // Actualizar productos cada vez que la página aparece
            await CargarProductosAsync();
        }

        // ========== EVENTOS DE UI ==========

        private async void OnRefreshClicked(object sender, EventArgs e)
        {
            await CargarProductosAsync();
        }

        private async void OnAgregarProductoClicked(object sender, EventArgs e)
        {
            // Por ahora solo mostrar un mensaje informativo
            // En una implementación completa aquí iría el formulario de agregar producto
            await DisplayAlert(
                "Información",
                "Funcionalidad de agregar producto será implementada en versiones futuras.\n\n" +
                "Los productos se gestionan desde el sistema web administrativo.",
                "Entendido"
            );
        }

        private void OnSearchTextChanged(object sender, TextChangedEventArgs e)
        {
            FiltrarProductos(e.NewTextValue);
        }

        private async void OnProductoSeleccionado(object sender, SelectionChangedEventArgs e)
        {
            var producto = e.CurrentSelection.FirstOrDefault() as Electrodomestico;
            if (producto == null) return;

            // Mostrar detalles del producto
            await MostrarDetallesProducto(producto);

            // Limpiar selección
            ((CollectionView)sender).SelectedItem = null;
        }

        // ========== MÉTODOS PRINCIPALES ==========

        private async Task CargarProductosAsync()
        {
            if (_isLoading) return;

            try
            {
                _isLoading = true;

                // Mostrar indicador de carga
                LoadingIndicator.IsVisible = true;
                LoadingIndicator.IsRunning = true;
                ProductosCollectionView.IsVisible = false;

                // Obtener productos del servicio
                var productos = await _clienteService.ListarElectrodomesticosAsync();

                if (productos != null && productos.Any())
                {
                    _todosProductos = productos;
                    ActualizarListaProductos(_todosProductos);

                    // Mostrar mensaje de éxito
                    await MostrarMensajeEstado($"✅ {productos.Count} productos cargados", UIConstants.SUCCESS_COLOR);
                }
                else
                {
                    _todosProductos = new List<Electrodomestico>();
                    ActualizarListaProductos(_todosProductos);

                    // Mostrar mensaje de advertencia
                    await MostrarMensajeEstado("⚠️ No hay productos disponibles", UIConstants.WARNING_COLOR);
                }
            }
            catch (Exception ex)
            {
                // Mostrar error
                await MostrarMensajeEstado($"❌ Error: {ex.Message}", UIConstants.DANGER_COLOR);

                // Log para depuración
                System.Diagnostics.Debug.WriteLine($"Error cargando productos: {ex}");
            }
            finally
            {
                _isLoading = false;

                // Ocultar indicador de carga
                LoadingIndicator.IsVisible = false;
                LoadingIndicator.IsRunning = false;
                ProductosCollectionView.IsVisible = true;
            }
        }

        private void FiltrarProductos(string textoBusqueda)
        {
            if (string.IsNullOrWhiteSpace(textoBusqueda))
            {
                ActualizarListaProductos(_todosProductos);
                return;
            }

            var productosFiltrados = _todosProductos.Where(p =>
                p.Nombre?.Contains(textoBusqueda, StringComparison.OrdinalIgnoreCase) == true ||
                p.Marca?.Contains(textoBusqueda, StringComparison.OrdinalIgnoreCase) == true ||
                p.Codigo?.Contains(textoBusqueda, StringComparison.OrdinalIgnoreCase) == true
            ).ToList();

            ActualizarListaProductos(productosFiltrados);
        }

        private void ActualizarListaProductos(IEnumerable<Electrodomestico> productos)
        {
            _productos.Clear();
            foreach (var producto in productos)
            {
                _productos.Add(producto);
            }

            // Actualizar contador
            ContadorLabel.Text = $"📦 {_productos.Count} productos encontrados";
        }

        private async Task MostrarDetallesProducto(Electrodomestico producto)
        {
            var detalles = $"📦 {producto.Nombre}\n\n" +
                          $"🏷️ Código: {producto.Codigo}\n" +
                          $"🏭 Marca: {producto.Marca}\n" +
                          $"💰 Precio: ${producto.PrecioVenta:F2}\n" +
                          $"📊 Stock: {producto.Stock} unidades\n" +
                          $"📈 Estado: {(producto.Activo ? "Activo" : "Inactivo")}";

            var accion = await DisplayActionSheet(
                "Detalles del Producto",
                "Cerrar",
                null,
                "🛒 Ir a Facturación"
            );

            if (accion == "🛒 Ir a Facturación")
            {
                await Shell.Current.GoToAsync("//facturacion");
            }
        }

        private async Task MostrarMensajeEstado(string mensaje, Color color)
        {
            // Crear y mostrar un snackbar-style message
            var frame = new Frame
            {
                BackgroundColor = color,
                CornerRadius = 8,
                Padding = new Thickness(16, 8),
                Margin = new Thickness(16),
                Content = new Label
                {
                    Text = mensaje,
                    TextColor = Colors.White,
                    FontSize = 14,
                    HorizontalTextAlignment = TextAlignment.Center
                }
            };

            // Agregar temporalmente a la página
            if (Content is StackLayout layout)
            {
                layout.Children.Insert(0, frame);

                // Remover después de 3 segundos
                Device.StartTimer(TimeSpan.FromSeconds(3), () =>
                {
                    layout.Children.Remove(frame);
                    return false;
                });
            }
        }

        // ========== HELPERS ==========

        public string FormatearPrecio(decimal precio)
        {
            return $"${precio:F2}";
        }

        public string FormatearStock(int stock)
        {
            return $"{stock} unidades";
        }

        public string ObtenerEstadoTexto(bool activo)
        {
            return activo ? "✅ Activo" : "❌ Inactivo";
        }

        public Color ObtenerColorEstado(bool activo)
        {
            return activo ? UIConstants.SUCCESS_COLOR : UIConstants.DANGER_COLOR;
        }
    }
}