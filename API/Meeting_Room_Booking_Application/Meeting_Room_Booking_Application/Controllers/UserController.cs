using Meeting_Room_Booking_Application.Interface.IService;
using Meeting_Room_Booking_Application.RequestModels;
using Meeting_Room_Booking_Application.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Meeting_Room_Booking_Application.Controllers
{
    [Route("api/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [ProducesResponseType(StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [HttpPost]
        public async Task<ActionResult<LoginView>> authenticateUser(LoginRequest user)
        {
            var result = await _userService.Login(user);
            return Ok(result);
        }
        [ProducesResponseType(StatusCodes.Status201Created)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [HttpPost]
        public async Task<ActionResult<RegisterRequest>> registerUser(RegisterRequest newUser)
        {
            var result = await _userService.Register(newUser);
            return Created("Employee registered",result);
        }

        [HttpPost]
        public ActionResult<LoginView> AuthenticateUsersync(LoginRequest user)
        {
            var result = _userService.Loginsync(user);
            return Ok(result);
        }

    }
}
