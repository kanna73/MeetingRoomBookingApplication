using Meeting_Room_Booking_Application.Interface.IService;
using Meeting_Room_Booking_Application.Models;
using Meeting_Room_Booking_Application.RequestModels;
using Meeting_Room_Booking_Application.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Meeting_Room_Booking_Application.Controllers
{
    [Route("api/[action]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;


        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }
        [ProducesResponseType(StatusCodes.Status201Created)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [HttpPost]
        public async Task<ActionResult<BookingRequest>> meeting(BookingRequest book)
        {
            var result = await _bookingService.AddBooking(book);
            return Created("meeting booked",result);
        }

        [ProducesResponseType(StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [HttpPost]
        public async Task<ActionResult<bool>> validateMeeting(BookingRequest book)
        {
            var result  = await _bookingService.CheckRoomAvailable(book);
            return Ok(result);
        }

        [ProducesResponseType(StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [HttpGet]
        public async Task<ActionResult<List<TodaysMeetingView>>> getTodayMeeting()
        {
            return Ok(await _bookingService.getTodayMeeting());
        }
       

    }
}
