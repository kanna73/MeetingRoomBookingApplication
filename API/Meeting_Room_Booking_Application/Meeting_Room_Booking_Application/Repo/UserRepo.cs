using Meeting_Room_Booking_Application.Exceptions;
using Meeting_Room_Booking_Application.Interface.IRepo;
using Meeting_Room_Booking_Application.Models;
using Microsoft.EntityFrameworkCore;

namespace Meeting_Room_Booking_Application.Repo
{
    public class UserRepo : IUserRepo
    {
        private readonly MeetingApplicationContext _dbContext;

        public UserRepo(MeetingApplicationContext dbContext)
        {
            _dbContext = dbContext;    
        }

        public async Task<User> getById(string userEmail)
        {
            var existingUser = await _dbContext.Users.FirstOrDefaultAsync(u =>  u.Email == userEmail);
            if (existingUser == null)
            {
                throw new NotFoundException("this user does not exist");
            }
            return existingUser;
        }

        public async Task<User> addUser(User newUser)
        {
            var oldUser = await _dbContext.Users.SingleOrDefaultAsync(u =>  u.Email == newUser.Email);
            if (oldUser == null)
            {
                await _dbContext.Users.AddAsync(newUser);
                await _dbContext.SaveChangesAsync();
                return newUser;
            }
            throw new DuplicateRecordException("this account already exist");
        }
        public User GetByIdsync(string userEmail)
        {
            Task.Delay(TimeSpan.FromMinutes(1)).Wait();

            var existingUser = _dbContext.Users.FirstOrDefault(u => u.Email == userEmail);
            if (existingUser == null)
            {
                throw new NotFoundException("This user does not exist");
            }
            return existingUser;
        }

    }
}
