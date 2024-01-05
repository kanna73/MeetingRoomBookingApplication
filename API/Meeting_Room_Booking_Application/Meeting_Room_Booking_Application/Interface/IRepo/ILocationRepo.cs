using Meeting_Room_Booking_Application.Models;

namespace Meeting_Room_Booking_Application.Interface.IRepo
{
    public interface ILocationRepo
    {
        Task<List<Location>> getAllLocation();
    }
}
