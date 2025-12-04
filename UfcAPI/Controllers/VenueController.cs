using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UfcAPI.Contexts;
using UfcAPI.Models;

namespace UfcAPI.Controllers;

[ApiController]
[Route("[controller]")]

public class VenueController(MyDbContext MyDbContext) : ControllerBase
{
    [HttpGet]
    public async Task <ActionResult<List<Venue>>> Get()
    {
        try
        {
            List<Venue> venues = await MyDbContext.Venues.ToListAsync();
            return venues;
        }
        catch (DbException)
        {
            return StatusCode(500, "Database Exception");
        }
        catch
        {
            return StatusCode(500, "Server side Exception");
        }
    }
}