using AutoMapper;
using Meeting_Room_Booking_Application.Exceptions;
using Meeting_Room_Booking_Application.Interface.IRepo;
using Meeting_Room_Booking_Application.Interface.IService;
using Meeting_Room_Booking_Application.ViewModels;

namespace Meeting_Room_Booking_Application.Services
{
    public class RoomService : IRoomService
    {

        private readonly IRoomRepo _roomRepo;
        private readonly IMapper _mapper;

        public RoomService(IRoomRepo roomRepo,IMapper mapper)
        {
            _mapper = mapper;
            _roomRepo = roomRepo;
        }

        public async Task<List<RoomsViewbyLocation>> getRoomByLocation(int locationId)
        {
            var result = await _roomRepo.getRoomByLocation(locationId);
            foreach(var r in result)
            {
                var lazy = r.BookMeetings;
                Console.WriteLine(lazy);
            }
            if (result.Count == 0) 
            {
                throw new NotFoundException("There is no Room in this Location");
            }
            List<RoomsViewbyLocation> rooms = new List<RoomsViewbyLocation>();
            rooms = _mapper.Map<List<RoomsViewbyLocation>>(result);
            return rooms;
        }
    }
}
