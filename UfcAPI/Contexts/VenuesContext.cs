using Microsoft.EntityFrameworkCore;
using UfcAPI.Models;

namespace UfcAPI.Contexts;

public interface IVenuesContext
{
    DbSet<Venue> Venues { get; set; }
    DbSet<Athlete> Athletes { get; set; }
    DbSet<Finance> Finances { get; set; }
}

public class VenuesContext(DbContextOptions<VenuesContext> options) : DbContext(options), IVenuesContext
{
    // ALLE TABELLER OPPRETTES HER, IKKE BARE VENUE- KJØR dotnet ef migrations add AddNewTable ETTERFULGT AV dotnet ef database update

    public DbSet<Models.Venue> Venues { get; set; }

    public DbSet<Models.Athlete> Athletes { get; set; }

    public DbSet<Models.Finance> Finances { get; set; }
}