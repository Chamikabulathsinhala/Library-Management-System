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
            try
            {
                var books = await _bookService.GetAllBooks();
                return Ok(books);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message+"server error while fetching books");
            }
            
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBookById(int id)
        {
            try
            {
                 var book = await _bookService.GetBookById(id);
                if (book == null)
                {
                    return NotFound();
                }
                return Ok(book);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message+"server error while fetching book");
            }
            
        }

        [HttpPost]
        public async Task<ActionResult<Book>> AddBook(Book book)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                    
                    var createBook = await _bookService.AddBook(book);
                    return CreatedAtAction(nameof(GetBookById), new { id = createBook.Id }, createBook);
                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message+"server error while adding book");
            }
            
        }

        [HttpPut("{id}")]

        public async Task<ActionResult<Book>> UpdateBook(int id, Book book)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var updateBook =   await _bookService.UpdateBook(id, book);
                 if(updateBook == null)
                 {
                return NotFound("Book not found");
                }

            return Ok(updateBook);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message+"server error while updating book");
            }        
            
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<Book>> DeleteBook(int id)
        {
            try
            {
                var deleteBook = await _bookService.DeleteBook(id);
                if(deleteBook == null)
                {
                    return NotFound("Book not found");
                }
                return Ok(deleteBook);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message+"server error while deleting book");
            }
           
        }

        

    }
}