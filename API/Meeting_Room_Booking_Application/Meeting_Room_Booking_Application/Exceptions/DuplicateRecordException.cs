namespace Meeting_Room_Booking_Application.Exceptions
{
    public class DuplicateRecordException : Exception
    {
        string message;
        public DuplicateRecordException()
        {
            message = "This Record is already present";
        }
        public DuplicateRecordException(string message)
        {
            this.message = message;
        }

        public override string Message
        {
            get { return message; }
        }
    }
}
