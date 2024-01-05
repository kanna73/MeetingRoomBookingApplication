using Meeting_Room_Booking_Application.Models;
using Microsoft.IdentityModel.Tokens;

namespace Meeting_Room_Booking_Application.Interface.IService
{
    public interface ITokenGenerate
    {
        public string GenerateToken(User user);
    }
}
