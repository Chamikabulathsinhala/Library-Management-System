using LibraryManagementSystemBackend.Data;
using LibraryManagementSystemBackend.Models;
using Microsoft.Extensions.DependencyModel;

namespace LibraryManagementSystemBackend.Services
{
    public class UseerService : IUserService
    {
        private readonly LibraryDb _context;

        public Task<User> AddUser(User user)
        {
            throw new NotImplementedException();
        }

        public Task<User?> DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        public Task<User?> GetUserById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<User?> UpdateUser(int id, User user)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<User>> GetAllUsers(){
            throw new NotImplementedException();
        }

        Task<IEnumerable<User>> IUserService.GetAllUsers()
        {
            return GetAllUsers();
        }
    }
}