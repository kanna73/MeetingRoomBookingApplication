using Meeting_Room_Booking_Application.Models;
using System.Collections;

namespace Meeting_Room_Booking_Application.Interface.IRepo
{
    public interface ILocationRepo
    {
        Task<List<Location>> getAllLocation();
        Task<List<Location>> getLoactionByID(int id);
    }
}
