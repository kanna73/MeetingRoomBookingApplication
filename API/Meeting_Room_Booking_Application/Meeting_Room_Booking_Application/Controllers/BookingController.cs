using Meeting_Room_Booking_Application.Interface.IService;
using Meeting_Room_Booking_Application.Models;
using Meeting_Room_Booking_Application.RequestModels;
using Meeting_Room_Booking_Application.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Meeting_Room_Booking_Application.Controllers
{
    [Route("api/[Controller]/[action]")]
    [ApiController]
    public class BookingController : Controller
    {
        private readonly IBookingService _bookingService;
        private readonly MeetingApplicationContext _dbContext;


        public BookingController(IBookingService bookingService, MeetingApplicationContext dbContext)
        {
            _bookingService = bookingService;
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<BookingRequest> AddBooking(BookingRequest book)
        {
            var result = await _bookingService.AddBooking(book);
            return result;
        }

        [HttpPost]
        public async Task<bool> CheckRoomAvailable(BookingRequest book)
        {
            var result  = await _bookingService.CheckRoomAvailable(book);
            return result;
        }

       

    }
}
