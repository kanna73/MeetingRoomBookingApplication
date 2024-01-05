using Meeting_Room_Booking_Application.ViewModels;

namespace Meeting_Room_Booking_Application.Interface.IService
{
    public interface ILocationService
    {
        Task<List<LocationView>> getAllLocation();
    }
}
