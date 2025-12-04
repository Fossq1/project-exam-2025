using Microsoft.EntityFrameworkCore;

namespace UfcAPI.Contexts;

public class VenuesContext(DbContextOptions<VenuesContext> options) : DbContext(options)
{
    public DbSet<Models.Venue> Venues { get; set;}
}