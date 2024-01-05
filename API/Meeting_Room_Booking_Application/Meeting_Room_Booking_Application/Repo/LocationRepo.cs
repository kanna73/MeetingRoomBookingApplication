using Meeting_Room_Booking_Application.Interface.IRepo;
using Meeting_Room_Booking_Application.Models;
using Microsoft.EntityFrameworkCore;

namespace Meeting_Room_Booking_Application.Repo
{
    public class LocationRepo : ILocationRepo
    {
        private readonly MeetingApplicationContext _dbContext;

        public LocationRepo(MeetingApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Location>> getAllLocation()
        {
            var result =await _dbContext.Locations.ToListAsync();
            return result;
        }
    }
}
