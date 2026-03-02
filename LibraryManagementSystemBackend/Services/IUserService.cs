using LibraryManagementSystemBackend.Models;

namespace LibraryManagementSystemBackend.Services
{
    public interface IUserService
    {
            Task<User?> Register(User user);
            Task<User?> Login(string email, string password);

            Task<int> GetUserCount();

            Task<bool> DeleteUser(int userId);
    }
}