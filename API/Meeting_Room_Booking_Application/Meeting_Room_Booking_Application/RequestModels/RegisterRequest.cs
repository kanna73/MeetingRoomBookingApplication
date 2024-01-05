namespace Meeting_Room_Booking_Application.RequestModels
{
    public class RegisterRequest
    {
        public int Id { get; set; }

        public string? EmpName { get; set; }

        public string? EmpNo { get; set; }

        public string? Email { get; set; }

        public int? LocationId { get; set; }

        public string? UserPassword { get; set; }   
    }
}
