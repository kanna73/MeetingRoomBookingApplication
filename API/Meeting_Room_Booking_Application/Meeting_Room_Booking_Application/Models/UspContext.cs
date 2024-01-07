using Meeting_Room_Booking_Application.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Meeting_Room_Booking_Application.Models
{
    public partial class MeetingApplicationContext : DbContext
    {

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodaysMeetingView>().HasNoKey();
        }

        public async Task<List<TodaysMeetingView>> USPTodaysMeeting()
        {
            var result = await Set<TodaysMeetingView>().FromSqlRaw("EXEC USPGetTodayMeeting").ToListAsync();
            return result;
        }
    }
}
