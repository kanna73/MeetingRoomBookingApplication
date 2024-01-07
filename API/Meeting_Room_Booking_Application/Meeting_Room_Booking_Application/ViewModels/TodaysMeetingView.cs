namespace Meeting_Room_Booking_Application.ViewModels
{
    public class TodaysMeetingView
    {
        public string? RoomName { get; set; }
        public string? MeetingTitle { get; set; }

        public TimeSpan? StartTime { get; set; }

        public TimeSpan? EndTime { get; set; }

        public DateTime? BookDate { get; set; }
        public string? LocationName { get; set; }
        public string? EmpName { get; set; }


    }
}
