using Meeting_Room_Booking_Application.Models;
using Meeting_Room_Booking_Application.RequestModels;
using Meeting_Room_Booking_Application.ViewModels;

namespace Meeting_Room_Booking_Application.Interface.IService
{
    public interface IBookingService
    {
        Task<BookingRequest> AddBooking(BookingRequest book);
        Task<bool> CheckRoomAvailable(BookingRequest book);
        Task<List<TodaysMeetingView>> getTodayMeeting();
    }
}
