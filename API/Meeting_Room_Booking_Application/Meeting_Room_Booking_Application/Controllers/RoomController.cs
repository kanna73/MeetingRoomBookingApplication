using Meeting_Room_Booking_Application.Interface.IService;
using Meeting_Room_Booking_Application.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Meeting_Room_Booking_Application.Controllers
{
    [Route("api/[Controller]/[action]")]
    [ApiController]
    public class RoomController : Controller
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet]

        public async Task<List<RoomsViewbyLocation>> getRoomByLocation(int locationID)
        {
            var result = await _roomService.getRoomByLocation(locationID);
            return result;
        }
    }
}
