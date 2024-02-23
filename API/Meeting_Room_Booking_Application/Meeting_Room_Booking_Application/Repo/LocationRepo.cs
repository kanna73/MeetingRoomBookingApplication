using Meeting_Room_Booking_Application.Interface.IRepo;
using Meeting_Room_Booking_Application.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections;

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

        public async Task<List<Location>> getLoactionByID(int id)
        {
            var result = await _dbContext.Locations.Where(l => l.Id == id).ToListAsync();
            return result;
        }

    }
}
