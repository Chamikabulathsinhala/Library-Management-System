using LibraryManagementSystemBackend.Data;
using LibraryManagementSystemBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystemBackend.Services
{
    public class UserService : IUserService
    {
        private readonly LibraryDb _context;

        public UserService(LibraryDb context)
        {
            _context = context;
        }

        public async Task<User?> Register(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }


         public async Task<User?> Login(string email, string password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        }

        public async Task<int> GetUserCount()
        {
            return await _context.Users.CountAsync();
        }

       

       
    }
}