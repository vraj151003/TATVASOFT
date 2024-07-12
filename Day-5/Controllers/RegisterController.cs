using Day_5.Data;
using Day_5.Dtos;
using Day_5.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Day_5.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RegisterController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegistrationDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (existingUser != null)
            {
                return BadRequest("Email is already registered.");
            }

            var newUser = new User
            {
                Username = model.Username,
                Email = model.Email,
                PasswordHash = model.Password // In a real application, hash the password before saving
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User registered successfully" });
        }

        [HttpPost("edit")]
        public async Task<IActionResult> Edit(UserEditDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FindAsync(model.Id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.Username = model.NewUsername;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok("Username updated successfully.");
        }
    }
}
