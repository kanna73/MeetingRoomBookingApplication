using Meeting_Room_Booking_Application.Models;
using Meeting_Room_Booking_Application.ViewModels;

namespace Meeting_Room_Booking_Application.Interface.IService
{
    public interface ILocationService
    {
        Task<List<LocationView>> getAllLocation();
        Task<List<Location>> SimulateDatabaseCallsync();
        List<Location> SimulateDatabaseCall();
    }
}
