using Meeting_Room_Booking_Application.Interface.IRepo;
using Meeting_Room_Booking_Application.Models;
using Meeting_Room_Booking_Application.ViewModels;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Meeting_Room_Booking_Application.Repo
{
    public class BookingRepo : IBookingRepo
    {
        private readonly MeetingApplicationContext _dbContext;

        public BookingRepo(MeetingApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<BookMeeting> AddMeeting(BookMeeting meeting)
        {
            await _dbContext.AddAsync(meeting);
            await _dbContext.SaveChangesAsync();
            return meeting;
        }

       
        public async Task<bool> CheckRoomAvailable(BookMeeting book)
        {
            var recordExistParameter = new SqlParameter
            {
                ParameterName = "@RecordExist",
                SqlDbType = System.Data.SqlDbType.Bit,
                Direction = System.Data.ParameterDirection.Output
            };

            await _dbContext.Database.ExecuteSqlRawAsync(
                "EXEC UspCheckMeetingOverlap @InputStartTime, @InputEndTime, @InputMeetingID,@InputDate,@RecordExist OUTPUT",
                new SqlParameter("@InputStartTime", book.StartTime),
                new SqlParameter("@InputEndTime", book.EndTime),
                new SqlParameter("@InputMeetingID", book.MeetingId),
                new SqlParameter ("@InputDate",book.BookDate),
                recordExistParameter
            );
            bool recordExists = (bool)recordExistParameter.Value;
            return recordExists;
        }

        public async Task<List<TodaysMeetingView>> getTodayMeeting()
        {
            return await _dbContext.USPTodaysMeeting();
        }
    }
}
