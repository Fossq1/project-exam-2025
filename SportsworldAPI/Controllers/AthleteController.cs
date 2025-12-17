using Microsoft.AspNetCore.Mvc;
using SportsworldAPI.Models;
using SportsworldAPI.Contexts;
using Microsoft.EntityFrameworkCore;


namespace SportsworldAPI.Controllers;


// Creating a controller to establish communication between front end back end for CRUD-operations against DB


[ApiController]
[Route("[controller]")]
public class AthleteController (MyDbContext _myDbContext) : ControllerBase
{
// GET method returns list of Athletes
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
// GetById method takes an id-argument and returns an athlete if exists
[HttpGet("{id}")]
public async Task<ActionResult<Athlete>> Get(int id)
{
try
{
// Checking if athlete exists and if not, returns NotFound = statuscode 404
Athlete? athlete = await _myDbContext.Athletes.FindAsync(id);


if (athlete != null)
{
return Ok(athlete);
}
else
{
return NotFound("Could not find an athlete with that Id");
}
}
catch
// If something else causes an error - this will send statuscode 500
{
return StatusCode(500);
}


}


// POST method for adding new athletes to DB, receives an athlete and returns an Actionresult of type Athlete
[HttpPost]
public async Task<ActionResult<Athlete>> Post(Athlete athlete)
{
try
{
// Checking if athlete has been passed and adds it, if not returns badrequest statuscode = 400
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
// If something else goes wrong it returns statuscode 500.
return StatusCode(500);
}
}


// PUT method updates an athlete's info by receiving said athlete and returns NoContent, BadRequest, or StatusCode 500.
[HttpPut]
public async Task<IActionResult> Put(Athlete editedAthlete)
{
try
{
// Checks if athlete is empty and returns NoContent() statuscode = 204 if success
if(editedAthlete!= null)
{
_myDbContext.Entry(editedAthlete).State = EntityState.Modified;
await _myDbContext.SaveChangesAsync();
return NoContent();
}
else
{
// BadRequest if athlete is null
return BadRequest("Could not update the athlete");
}
}
catch
{
// If something else is wrong, returns statuscode 500
return StatusCode(500);
}
}


// Delete-method takes an integer and uses it to delete a row from the db


[HttpDelete("{id}")]
public async Task<IActionResult> Delete(int id)
{
try
{
// Checks if there is an athlete with id matching the one sent as an argument
Athlete? athlete = await _myDbContext.Athletes.FindAsync(id);
// If exists, saves the changes to the db and returns nocontent
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

