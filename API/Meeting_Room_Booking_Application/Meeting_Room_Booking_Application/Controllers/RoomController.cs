using Meeting_Room_Booking_Application.Interface.IService;
using Meeting_Room_Booking_Application.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Meeting_Room_Booking_Application.Controllers
{
    [Route("api/[action]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [ProducesResponseType(StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [HttpGet]
        public async Task<ActionResult<List<RoomsViewbyLocation>>> meetingRooms(int locationID)
        {
            var result = await _roomService.getRoomByLocation(locationID);
            return Ok(result);
        }
    }
}
