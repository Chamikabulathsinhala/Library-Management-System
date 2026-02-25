using LibraryManagementSystemBackend.Models;

namespace LibraryManagementSystemBackend.Services
{
    public interface IBookService
    {
        Task<IEnumerable<Book>> GetAllBooks();
        Task<Book?> GetBookById(int id);
        Task<Book> AddBook(Book book);
        

    }
}