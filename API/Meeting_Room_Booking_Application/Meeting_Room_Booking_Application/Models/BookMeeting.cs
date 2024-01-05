using System;
using System.Collections.Generic;

namespace Meeting_Room_Booking_Application.Models;

public partial class BookMeeting
{
    public int Id { get; set; }

    public int? MeetingId { get; set; }

    public string? MeetingTitle { get; set; }

    public TimeSpan? StartTime { get; set; }

    public TimeSpan? EndTime { get; set; }

    public DateTime? BookDate { get; set; }

    public int? UserId { get; set; }

    public virtual Room? Meeting { get; set; }

    public virtual User? User { get; set; }
}
