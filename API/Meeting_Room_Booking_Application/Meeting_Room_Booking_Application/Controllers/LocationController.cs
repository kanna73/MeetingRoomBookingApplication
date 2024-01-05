using Meeting_Room_Booking_Application.Interface.IService;
using Meeting_Room_Booking_Application.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Meeting_Room_Booking_Application.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LocationController : Controller
    {
       private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<List<LocationView>> GetAllLocation()
        {
            var result = await _locationService.getAllLocation();
            return result;
        }
    }
}
