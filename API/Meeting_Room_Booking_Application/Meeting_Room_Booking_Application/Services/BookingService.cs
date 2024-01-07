using AutoMapper;
using Meeting_Room_Booking_Application.Exceptions;
using Meeting_Room_Booking_Application.Interface.IRepo;
using Meeting_Room_Booking_Application.Interface.IService;
using Meeting_Room_Booking_Application.Models;
using Meeting_Room_Booking_Application.RequestModels;
using Meeting_Room_Booking_Application.ViewModels;

namespace Meeting_Room_Booking_Application.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepo _bookingRepo;
        private readonly IMapper _mapper;

        public BookingService(IBookingRepo bookingRepo, IMapper mapper)
        {
            _bookingRepo = bookingRepo;
            _mapper = mapper;   
        }

        public async Task<BookingRequest> AddBooking(BookingRequest book)
        {
            BookMeeting newbook =_mapper.Map<BookMeeting>(book);
            await _bookingRepo.AddMeeting(newbook);
            return book;
        }
        public async Task<bool> CheckRoomAvailable(BookingRequest book)
        {
            BookMeeting newbook = _mapper.Map<BookMeeting>(book);
            var result = await _bookingRepo.CheckRoomAvailable(newbook);
            return result;

        }

        public async Task<List<TodaysMeetingView>> getTodayMeeting()
        {
            var result = await _bookingRepo.getTodayMeeting();
            if(result.Count==0)
            {
                throw new NotFoundException("there is no meeting for today");
            }
            return result;
        }
    }
}
