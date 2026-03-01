using LibraryManagementSystemBackend.Data;
using LibraryManagementSystemBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystemBackend.Services
{
    public class BookService : IBookService
    {
        private readonly LibraryDb _context;

        public BookService(LibraryDb context)
        {
            _context = context;
        }

        public async Task<Book> AddBook(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return book;
        }

        public async Task<IEnumerable<Book>> GetAllBooks()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<Book?> GetBookById(int id)
        {
            return await _context.Books.FindAsync(id);           
        }

        public async Task<Book?> UpdateBook(int id, Book book)
        {
            try
            {
           var  currentBook = await _context.Books.FindAsync(id);

           if(currentBook == null)
            {
                return null;
            }

            currentBook.Title = book.Title;
            currentBook.Isbn = book.Isbn;
            currentBook.Author = book.Author;
            currentBook.IsAvailable = book.IsAvailable;
            currentBook.PublicationYear = book.PublicationYear;
            currentBook.Description = book.Description;

            await _context.SaveChangesAsync();
            return currentBook;
            }
            catch (DbUpdateException e)
            {
                throw new Exception("Database update error: " + e.Message);
            }
          
        }

        public async Task<Book?> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if(book == null)
            {
                return null;
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return book;
        }
    }
}