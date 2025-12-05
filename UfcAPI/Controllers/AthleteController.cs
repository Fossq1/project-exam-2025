using Microsoft.AspNetCore.Mvc;
using UfcAPI.Models;
using UfcAPI.Contexts;
using Microsoft.EntityFrameworkCore;

namespace UfcAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class AthleteController (MyDbContext _myDbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Athlete>>> Get()
    {
        try
        {
            List<Athlete> athletes = await _myDbContext.Athletes.ToListAsync();
            return Ok(athletes);
        } 
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPost]
    public async Task<ActionResult<Athlete>> Post(Athlete athlete)
    {
        try 
        {
            if(athlete!= null)
            {
                _myDbContext.Athletes.Add(athlete);
                await _myDbContext.SaveChangesAsync();
                return Created("", athlete);
            }
            else
            {
                return BadRequest("Could not insert athlete");
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put(Athlete editedAthlete)
    {
        try 
        {
            if(editedAthlete!= null)
            {
                _myDbContext.Entry(editedAthlete).State = EntityState.Modified;
                await _myDbContext.SaveChangesAsync();
                return NoContent();
            }
            else
            {
                return BadRequest("Could not update the athlete");
            }
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
            Athlete? athlete = await _myDbContext.Athletes.FindAsync(id);
            if (athlete != null)
            {
                _myDbContext.Athletes.Remove(athlete);
                await _myDbContext.SaveChangesAsync();
                return NoContent();
            }
            else
            {
                return NotFound("Could not find athlete to delete");
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }
}