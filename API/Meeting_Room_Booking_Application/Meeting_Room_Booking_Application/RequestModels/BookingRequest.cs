namespace Meeting_Room_Booking_Application.RequestModels
{
    public class BookingRequest
    {
        public int Id { get; set; }

        public int? MeetingId { get; set; }

        public string? MeetingTitle { get; set; }

        public TimeSpan? StartTime { get; set; }

        public TimeSpan? EndTime { get; set; }
        public int? UserId { get; set; }
        public DateTime? BookDate { get; set; }


    }
}
