using Meeting_Room_Booking_Application.RequestModels;
using Meeting_Room_Booking_Application.ViewModels;
using System.Threading.Tasks;

namespace Meeting_Room_Booking_Application.Interface.IService
{
    public interface IUserService
    {
        Task<RegisterRequest> Register(RegisterRequest user);
        Task<LoginView> Login(LoginRequest loginRequest);
    }
}
