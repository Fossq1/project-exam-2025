using System.Data.Common;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UfcAPI.Contexts;
using UfcAPI.Models;

namespace UfcAPI.Controllers;

[ApiController]
[Route("[controller]")]


public class VenueController(MyDbContext _myDbContext) : ControllerBase
{
    [HttpGet]
    public async Task <ActionResult<List<Venue>>> Get()
    {
        try
        {
            List<Venue> venues = await _myDbContext.Venues.ToListAsync();
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


    [HttpGet("{id}")]
    public async Task<ActionResult<Venue>> Get(int id)
    {
        try
        {
            Venue? venue = await _myDbContext.Venues.FindAsync(id);

            if (venue != null)
            {
                return Ok(venue);
            }
            else
            {
                return NotFound("Could not find a venue with that Id");
            }   
        }
        catch
        {
            return StatusCode(500);
        }

    }


    [HttpPost]
    public async Task<ActionResult<Venue>> Post(Venue newVenue)
    {
        try
        {
        _myDbContext.Venues.Add(newVenue);
        await _myDbContext.SaveChangesAsync();
        return CreatedAtAction("Get", new {id = newVenue.Id}, newVenue);

        }
        catch
        {
            return StatusCode(500);
        }
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
        Venue? venue = await _myDbContext.Venues.FindAsync(id);
            if (venue != null)
                {   
                    _myDbContext.Venues.Remove(venue);
                    await _myDbContext.SaveChangesAsync();
                    return NoContent();
            
                }
                
            return NotFound();
        }
        catch
        {
            return StatusCode(500);
        }
    }

    

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Venue editedVenue)
    {
        // Sjekker at frontend ikke sender med feil id som en "ekstra" failsafe
        if (id!= editedVenue.Id)
        {
            return BadRequest("Id mismatch");
        }


        try
        {
            _myDbContext.Entry(editedVenue).State = EntityState.Modified;
            await _myDbContext.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return StatusCode(500);
        }
    }
}