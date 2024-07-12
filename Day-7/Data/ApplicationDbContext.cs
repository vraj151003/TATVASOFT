using Day_5.Models;
using Microsoft.EntityFrameworkCore;

namespace Day_5.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        // Override OnModelCreating if needed to configure the model
    }
}
