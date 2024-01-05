using AutoMapper;
using Meeting_Room_Booking_Application.Models;
using Meeting_Room_Booking_Application.RequestModels;
using Meeting_Room_Booking_Application.ViewModels;

namespace Meeting_Room_Booking_Application.Mapper
{
    public class MappingProfile :Profile
    {
        public MappingProfile()
        {
            CreateMap<User, RegisterRequest>().ReverseMap();
            CreateMap<Location,LocationView>().ReverseMap();
            CreateMap<Room, RoomsViewbyLocation>().ReverseMap();
            CreateMap<BookMeeting, BookingRequest>().ReverseMap();

        }
    }
}
