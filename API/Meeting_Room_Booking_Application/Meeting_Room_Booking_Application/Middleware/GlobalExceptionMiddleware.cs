using Meeting_Room_Booking_Application.Exceptions;
using System.Net;

namespace Meeting_Room_Booking_Application.Middleware
{
    public class GlobalExceptionMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var statusCode = HttpStatusCode.InternalServerError; // 500 by default
            var message = "An unexpected error occurred.";

            // Customize the response based on the exception type
            if (exception is NotFoundException)
            {
                statusCode = HttpStatusCode.NotFound; // 404
                message = exception.Message;
            }
            else if (exception is InvalidSqlException)
            {
                statusCode = HttpStatusCode.BadRequest; // 400
                message = exception.Message;
            }
            else if (exception is DuplicateRecordException)
            {
                statusCode = HttpStatusCode.Conflict; // 409
                message = exception.Message;
            }

            context.Response.StatusCode = (int)statusCode;
            context.Response.ContentType = "application/json";

            // You can log the exception here if needed

            return context.Response.WriteAsync(new Error((int)statusCode, message).ToString());
        }
    }
}
