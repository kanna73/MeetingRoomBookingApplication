using Meeting_Room_Booking_Application.Interface.IRepo;
using Meeting_Room_Booking_Application.Models;
using Microsoft.EntityFrameworkCore;

namespace Meeting_Room_Booking_Application.Repo
{
    public class RoomRepo : IRoomRepo
    {
        private readonly MeetingApplicationContext _dbContext;

        public RoomRepo(MeetingApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Room>> getRoomByLocation(int  locationId)
        {
            var rooms = await _dbContext.Rooms.Where(r =>  r.LocationId == locationId).ToListAsync();
            return rooms;
        }
    }
}
