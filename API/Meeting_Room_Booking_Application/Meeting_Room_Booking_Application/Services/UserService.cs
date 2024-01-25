using AutoMapper;
using Meeting_Room_Booking_Application.Exceptions;
using Meeting_Room_Booking_Application.Interface.IRepo;
using Meeting_Room_Booking_Application.Interface.IService;
using Meeting_Room_Booking_Application.Models;
using Meeting_Room_Booking_Application.Repo;
using Meeting_Room_Booking_Application.RequestModels;
using Meeting_Room_Booking_Application.ViewModels;
using Microsoft.AspNetCore.Server.IIS.Core;
using System.Security.Cryptography;
using System.Text;

namespace Meeting_Room_Booking_Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepo _userRepo;
        private readonly IMapper _mapper;
        private readonly ITokenGenerate _tokenService;

        public UserService(IUserRepo userRepo, IMapper mapper,ITokenGenerate tokenService)
        {
            _userRepo = userRepo;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        public async Task<RegisterRequest> Register(RegisterRequest user)
        {
            User newUser = _mapper.Map<User>(user);

            using (var hmac = new HMACSHA512())
            {
                newUser.Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.UserPassword));
                newUser.Hashkey = hmac.Key;
                var resultUser = await _userRepo.addUser(newUser);
                RegisterRequest addedUser = new RegisterRequest();
                addedUser.Email = resultUser.Email;
                return addedUser;
            }
        }

        public async Task<LoginView> Login(LoginRequest  loginRequest)
        {
            var userData = await _userRepo.getById(loginRequest.Email);
            if (userData != null)
            {
                var hmac = new HMACSHA512(userData.Hashkey);
                var userPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginRequest.UserPassword));
                for (int i = 0; i < userPass.Length; i++)
                {
                    if (userPass[i] != userData.Password[i])
                         throw new NotFoundException("the user name or password incorrect");
                }
                LoginView user = new LoginView();
                user.Token = _tokenService.GenerateToken(userData);
                return user;
            }
            throw new NotFoundException("the user name or password incorrect");
        }

        public LoginView Loginsync(LoginRequest loginRequest)
        {
            var userData = _userRepo.GetByIdsync(loginRequest.Email);
            if (userData != null)
            {
                using (var hmac = new HMACSHA512(userData.Hashkey))
                {
                    var userPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginRequest.UserPassword));
                    for (int i = 0; i < userPass.Length; i++)
                    {
                        if (userPass[i] != userData.Password[i])
                            throw new NotFoundException("The username or password is incorrect");
                    }
                }
                LoginView user = new LoginView();
                user.Token = _tokenService.GenerateToken(userData);
                return user;
            }
            throw new NotFoundException("The username or password is incorrect");
        }

    }
}
