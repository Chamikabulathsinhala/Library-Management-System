using LibraryManagementSystemBackend.Models;
using LibraryManagementSystemBackend.Services;
using LibraryManagementSystemBackend.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystemBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            var newUser = await _userService.Register(user);
            if (newUser == null)
            {
                return BadRequest("Registration failed");
            }
            return Ok(newUser);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await _userService.Login(req.Email, req.Password);
                if (user == null)
                {
                    return Unauthorized("Invalid email or password");
                }
                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message + "server error while logging in");
            }
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetUserCount()
        {
            var count = await _userService.GetUserCount();
            return Ok(count);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUser(id);
            if (!result)
            {
                return NotFound($"User with ID {id} not found");
            }

            return Ok(new { message = "User deleted successfully" });
        }
    }
}