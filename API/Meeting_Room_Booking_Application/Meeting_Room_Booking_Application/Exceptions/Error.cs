using System.Text.Json;

namespace Meeting_Room_Booking_Application.Exceptions
{
    public class Error 
    {
        public int ID { get; set; } 
        public string Message { get; set; }

        public Error(int ID, string Message)
        {
            this.ID = ID;
            this.Message = Message;
        }

        /*public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }*/
    }
}
