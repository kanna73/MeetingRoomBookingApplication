using Meeting_Room_Booking_Application.Interface.IService;
using Meeting_Room_Booking_Application.RequestModels;
using Meeting_Room_Booking_Application.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Meeting_Room_Booking_Application.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<LoginView> Login(LoginRequest user)
        {
            var result = await _userService.Login(user);
            return result;
        }

        [HttpPost]
        public async Task<RegisterRequest> Register(RegisterRequest newUser)
        {
            var result = await _userService.Register(newUser);
            return result;
        }
    }
}
