using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystemBackend.Models
{
    public class Book
    {
        [Key]
        public int Id {get; set;}

        [Required(ErrorMessage = "Title is required")]
        [StringLength(200, MinimumLength = 3)]
        public string Title {get; set;} = string.Empty;

        [Required(ErrorMessage = "ISBN is required")]
        [RegularExpression(@"^[0-9xX-]+$", 
         ErrorMessage = "Invalid ISBN format. Please use a format like 978-2-14-451212-0 or 1245210145.")]  
        public string Isbn {get; set;} = string.Empty;

        [Required(ErrorMessage = "Author is required")]
        [StringLength(100, MinimumLength = 2)]
        public string Author {get; set;} = string.Empty;

        public bool IsAvailable {get; set;} = true;

        [Required]
        [Range(1000, 2026, ErrorMessage = "Publication year must be between 1000 and 2026")]
        public int PublicationYear {get; set;} = 0;

        [Required(ErrorMessage = "Description is required")]
        [MaxLength(1000)]
        public string Description {get; set;} = string.Empty;


    }
}