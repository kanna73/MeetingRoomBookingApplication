namespace Meeting_Room_Booking_Application.ViewModels
{
    public class LocationView
    {
        public int Id { get; set; }

        public string? LocationNames { get; set; }

        public LocationView( int id, string LocationName)
        {
            this.Id = id;
            this.LocationNames = LocationName;
        }
    }
}
