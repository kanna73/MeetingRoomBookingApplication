using Meeting_Room_Booking_Application.Interface.IService;
using Meeting_Room_Booking_Application.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Meeting_Room_Booking_Application.Controllers
{
    [Route("api/[action]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
       private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [ProducesResponseType(StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [HttpGet]
        public async Task<ActionResult<List<LocationView>>> locations()
        {
            var result = await _locationService.getAllLocation();
            return Ok(result);
        }
    }
}
