using System;
using System.Collections.Generic;

namespace Meeting_Room_Booking_Application.Models;

public partial class Location
{
    public int Id { get; set; }

    public string? LocationName { get; set; }

    public virtual ICollection<Room> Rooms { get; set; } = new List<Room>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
