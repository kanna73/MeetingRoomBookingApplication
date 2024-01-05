using Meeting_Room_Booking_Application.Models;
using Meeting_Room_Booking_Application.ViewModels;

namespace Meeting_Room_Booking_Application.Interface.IRepo
{
    public interface IBookingRepo
    {
        Task<BookMeeting> AddMeeting(BookMeeting meeting);
        Task<bool> CheckRoomAvailable(BookMeeting book);

    }
}
