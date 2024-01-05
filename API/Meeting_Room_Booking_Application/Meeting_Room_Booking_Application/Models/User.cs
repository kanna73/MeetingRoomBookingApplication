using System;
using System.Collections.Generic;

namespace Meeting_Room_Booking_Application.Models;

public partial class User
{
    public int Id { get; set; }

    public string? EmpName { get; set; }

    public string? EmpNo { get; set; }

    public string? Email { get; set; }

    public byte[]? Password { get; set; }

    public byte[]? Hashkey { get; set; }

    public int? LocationId { get; set; }

    public virtual ICollection<BookMeeting> BookMeetings { get; set; } = new List<BookMeeting>();

    public virtual Location? Location { get; set; }
}
