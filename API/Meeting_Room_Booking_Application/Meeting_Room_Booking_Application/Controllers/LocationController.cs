using Meeting_Room_Booking_Application.Interface.IService;
using Meeting_Room_Booking_Application.Models;
using Meeting_Room_Booking_Application.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Meeting_Room_Booking_Application.Controllers
{
    [Route("api/[action]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
       private readonly ILocationService _locationService;
        private readonly MeetingApplicationContext _dbContext;


        public LocationController(ILocationService locationService, MeetingApplicationContext dbContext)
        {
            _locationService = locationService;
            _dbContext = dbContext;
        }

        [ProducesResponseType(StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [HttpGet]
        public async Task<ActionResult<List<LocationView>>> locations()
        {
            var result = await _locationService.getAllLocation();
            return Ok(result);
        }

        [HttpGet]
        public  List<Location> get()
        {
            var stopwatch = Stopwatch.StartNew();

            var result = _dbContext.Locations.ToList();
            Console.WriteLine(stopwatch.Elapsed);

            return result;
        }

        [HttpGet]
        public async Task<List<Location>> getasync()
        {
            var stopwatch = Stopwatch.StartNew();

            var result = await _dbContext.Locations.ToListAsync();
            Console.WriteLine(stopwatch.Elapsed);
            return result;


        }

       

        [HttpGet]
        public async Task<IActionResult> GetDatasync()
        {
            var stopwatch = Stopwatch.StartNew();

            // Simulate a time-consuming database call
            var databaseTask = _locationService.SimulateDatabaseCallsync();

            // While waiting for the database call, do other tasks
            Console.WriteLine("Performing other tasks while waiting for the database...");

            // Simulate some additional work (replace this with your actual logic)
            await Task.Delay(TimeSpan.FromSeconds(2));
            Console.WriteLine("Additional work completed.");

            // Now, await the completion of the database call
            var result = await databaseTask;

            // Continue with processing the database results
            Console.WriteLine($"Database call completed in {stopwatch.Elapsed}");

            return Ok(result);
        }
        

        [HttpGet]
        public IActionResult GetData()
        {
            var stopwatch = Stopwatch.StartNew();

            // Simulate a time-consuming database call
            var result = _locationService.SimulateDatabaseCall();

            // While waiting for the database call, do other tasks
            Console.WriteLine(" waiting for the database result ...");

            // Simulate some additional work (replace this with your actual logic)
            Thread.Sleep(2000);
            Console.WriteLine("Additional work completed.");

            // Continue with processing the database results
            Console.WriteLine($"Database call completed in {stopwatch.Elapsed}");

            return Ok(result);
        }

        [HttpGet]

        public async Task<List<LocationView>> getLoactionByID(int id)
        {
            var result = await _locationService.getLocationById(id);
            return result;
        }


    }

}
