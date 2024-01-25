using AutoMapper;
using Meeting_Room_Booking_Application.Exceptions;
using Meeting_Room_Booking_Application.Interface.IRepo;
using Meeting_Room_Booking_Application.Interface.IService;
using Meeting_Room_Booking_Application.Models;
using Meeting_Room_Booking_Application.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Meeting_Room_Booking_Application.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepo _locationRepo;
        private readonly IMapper _mapper;
        private readonly MeetingApplicationContext _dbContext;

        public LocationService(IMapper mapper,ILocationRepo locationRepo, MeetingApplicationContext dbContext)
        {
            _locationRepo = locationRepo;
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<List<LocationView>> getAllLocation()
        {
            var stopwatch =Stopwatch.StartNew();
            var locations = await _locationRepo.getAllLocation();
            if(!locations.Any())
            {
                throw new NotFoundException("this location  Entity is empty");
            }
            List<LocationView> result = new List<LocationView>();   
/*            result =_mapper.Map<List<LocationView>>(locations);
*/            for(int i=0;i<locations.Count;i++)
            {
                var id = locations[i].Id;
                var location = locations[i].LocationName;
                LocationView  loc = new LocationView(id, location);
                result.Add(loc);
            }
            Console.WriteLine(stopwatch.Elapsed);
            return result;
        }

        public async Task<List<Location>> SimulateDatabaseCallsync()
        {
            // Simulate a database call that takes time
            await Task.Delay(TimeSpan.FromSeconds(5));

            // Perform the actual database query (replace this with your actual query)
            var result = await _dbContext.Locations.ToListAsync();

            return result;
        }

        public List<Location> SimulateDatabaseCall()
        {
            // Simulate a database call that takes time
            Thread.Sleep(20000); // Simulating a 5-second delay

            // Perform the actual database query (replace this with your actual query)
            var result = _dbContext.Locations.ToList();

            return result;
        }
    }
}
