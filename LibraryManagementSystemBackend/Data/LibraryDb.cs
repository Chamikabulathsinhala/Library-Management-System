
using Microsoft.EntityFrameworkCore;
using LibraryManagementSystemBackend.Models;

namespace LibraryManagementSystemBackend.Data
{
    public class LibraryDb : DbContext
    {
        public LibraryDb(DbContextOptions<LibraryDb> options) : base(options)
        {
        }

        public DbSet<Book> Books {get; set;} = null!;
        public DbSet<User> Users {get; set;} = null!;
    }
}