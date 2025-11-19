using ClienteMovil.Models;
using CommunityToolkit.Mvvm.Input;

namespace ClienteMovil.PageModels
{
    public interface IProjectTaskPageModel
    {
        IAsyncRelayCommand<ProjectTask> NavigateToTaskCommand { get; }
        bool IsBusy { get; }
    }
}