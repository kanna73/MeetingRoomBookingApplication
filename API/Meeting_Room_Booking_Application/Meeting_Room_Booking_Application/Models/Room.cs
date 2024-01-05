using System;
using System.Collections.Generic;

namespace Meeting_Room_Booking_Application.Models;

public partial class Room
{
    public int Id { get; set; }

    public string? RoomName { get; set; }

    public int? LocationId { get; set; }

    public int? Capacity { get; set; }

    public virtual ICollection<BookMeeting> BookMeetings { get; set; } = new List<BookMeeting>();

    public virtual Location? Location { get; set; }
}
