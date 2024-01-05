using Meeting_Room_Booking_Application.ViewModels;

namespace Meeting_Room_Booking_Application.Interface.IService
{
    public interface IRoomService
    {
        Task<List<RoomsViewbyLocation>> getRoomByLocation(int locationId);
    }
}
