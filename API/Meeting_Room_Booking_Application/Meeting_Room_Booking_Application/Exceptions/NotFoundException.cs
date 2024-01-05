namespace Meeting_Room_Booking_Application.Exceptions
{
    public class NotFoundException : Exception
    {
        string message;
        public NotFoundException()
        {
            message = "Null Exception";
        }
        public NotFoundException(string message)
        {
            this.message = message;
        }

        public override string Message
        {
            get { return message; }
        }

    }
}
