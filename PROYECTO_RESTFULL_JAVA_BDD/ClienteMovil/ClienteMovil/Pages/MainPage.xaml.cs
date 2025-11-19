using ClienteMovil.Models;
using ClienteMovil.PageModels;

namespace ClienteMovil.Pages
{
    public partial class MainPage : ContentPage
    {
        public MainPage(MainPageModel model)
        {
            InitializeComponent();
            BindingContext = model;
        }
    }
}