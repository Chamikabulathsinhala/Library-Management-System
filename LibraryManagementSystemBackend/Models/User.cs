using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystemBackend.Models
{
    public class User
    {
        [Key]
        public int Id {get; set;}

        [Required]
        [MaxLength(100)]
        [MinLength(2, ErrorMessage = "First name must be at least 2 characters")]
        public string FirstName {get; set;}= string.Empty;

        [Required(ErrorMessage = "Last name is required")]
        [MaxLength(100)]
        public string LastName {get; set;}= string.Empty;

        [Required(ErrorMessage = "Email address is required")]
        [EmailAddress(ErrorMessage = "Invalid email address format")]
        public string Email {get; set;}= string.Empty;

        [Required(ErrorMessage = "Password is required")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long")]
        public string Password {get; set;}= string.Empty;
    
    }
}