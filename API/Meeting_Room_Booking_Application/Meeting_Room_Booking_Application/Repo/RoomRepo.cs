using Meeting_Room_Booking_Application.Interface.IRepo;
using Meeting_Room_Booking_Application.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections;

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
            IQueryable<Room> rm = _dbContext.Rooms;
            var room = await rm.Where(r => r.LocationId == locationId).ToListAsync();
            IEnumerable<Room> rm1 = _dbContext.Rooms;
/*            var room1 = await rm1.Where(r => r.LocationId == locationId).ToListAsync();
*/            var rooms = await _dbContext.Rooms.Where(r =>  r.LocationId == locationId).ToListAsync();
            return rooms;
        }
    }
}
