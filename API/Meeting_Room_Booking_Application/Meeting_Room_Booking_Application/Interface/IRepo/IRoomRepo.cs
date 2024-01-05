using Meeting_Room_Booking_Application.Models;

namespace Meeting_Room_Booking_Application.Interface.IRepo
{
    public interface IRoomRepo
    {
        Task<List<Room>> getRoomByLocation(int locationId);
    }
}
