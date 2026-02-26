using LibraryManagementSystemBackend.Models;
using LibraryManagementSystemBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystemBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetAllBooks()
        {
            var books = await _bookService.GetAllBooks();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBookById(int id)
        {
            var book = await _bookService.GetBookById(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public async Task<ActionResult<Book>> AddBook(Book book)
        {
            var createBook = await _bookService.AddBook(book);
            return CreatedAtAction(nameof(GetBookById), new { id = createBook.Id }, createBook);
        }

        [HttpPut("{id}")]

        public async Task<ActionResult<Book>> UpdateBook(int id, Book book)
        {
          var updateBook =   await _bookService.UpdateBook(id, book);

          if(updateBook == null)
            {
                return NotFound("Book not found");
            }
            return Ok(updateBook);
            
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<Book>> DeleteBook(int id)
        {
           var deleteBook = await _bookService.DeleteBook(id);

           if(deleteBook == null)
            {
                return NotFound("Book not found");
            }
            return Ok(deleteBook);
        }

        

    }
}