using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystemBackend.Models
{
    public class Book
    {
        [Key]
        public int Id {get; set;}

        [Required]
        [MaxLength(200)]
        public string Title {get; set;} = string.Empty;

        public string Isbn {get; set;} = string.Empty;

        public string Author {get; set;} = string.Empty;

        public bool IsAvailable {get; set;} = true;

        public int PublicationYear {get; set;} = 0;

        public string Description {get; set;} = string.Empty;


    }
}