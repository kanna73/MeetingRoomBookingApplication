using Meeting_Room_Booking_Application.Models;

namespace Meeting_Room_Booking_Application.Interface.IRepo
{
    public interface IUserRepo
    {
        Task<User> getById(string userEmail);
        Task<User> addUser(User newUser);
        User GetByIdsync(string userEmail);
    }
}
