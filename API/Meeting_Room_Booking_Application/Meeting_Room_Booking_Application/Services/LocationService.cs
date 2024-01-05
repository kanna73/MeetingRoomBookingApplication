using AutoMapper;
using Meeting_Room_Booking_Application.Exceptions;
using Meeting_Room_Booking_Application.Interface.IRepo;
using Meeting_Room_Booking_Application.Interface.IService;
using Meeting_Room_Booking_Application.ViewModels;

namespace Meeting_Room_Booking_Application.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepo _locationRepo;
        private readonly IMapper _mapper;

        public LocationService(IMapper mapper,ILocationRepo locationRepo)
        {
            _locationRepo = locationRepo;
            _mapper = mapper;
        }

        public async Task<List<LocationView>> getAllLocation()
        {
            var locations = await _locationRepo.getAllLocation();
            if(locations.Count == 0)
            {
                throw new NotFoundException("this location  Entity is empty");
            }
            List<LocationView> result = new List<LocationView>();   
            result =_mapper.Map<List<LocationView>>(locations);
            return result;
        }
    }
}
