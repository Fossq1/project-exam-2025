using Microsoft.EntityFrameworkCore;
using SportsworldAPI.Models;

namespace SportsworldAPI.Contexts;

public interface IMyDbContext
{
    DbSet<Venue> Venues { get; set; }
    DbSet<Athlete> Athletes { get; set; }
    DbSet<Finance> Finances { get; set; }
}

public class MyDbContext(DbContextOptions<MyDbContext> options) : DbContext(options), IMyDbContext
{
    // ALLE TABELLER OPPRETTES HER, IKKE BARE VENUE- KJØR dotnet ef migrations add *navnPåMigration* ETTERFULGT AV dotnet ef database update

    public DbSet<Models.Venue> Venues { get; set; }

    public DbSet<Models.Athlete> Athletes { get; set; }

    public DbSet<Models.Finance> Finances { get; set; }

}