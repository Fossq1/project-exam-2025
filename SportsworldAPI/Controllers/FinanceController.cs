using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using SportsworldAPI.Models;
using SportsworldAPI.Contexts;


namespace SportsworldAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FinanceController(MyDbContext _myDbContext) : ControllerBase
{
        //getAll
    [HttpGet]
    public async Task<ActionResult<List<Finance>>> Get()
    {
        try
        {
            List<Finance> finances = await _myDbContext.Finances.ToListAsync();
            return Ok(finances);
        }
        catch (DbException)
        {
            return StatusCode(500, "Database Exception");
        }
        catch (Exception)
        {
            return NotFound("Server side Exception");
        }
    }

    //getById
    [HttpGet("{id}")]
    public async Task<ActionResult<Finance>> Get(int id)
    {
        try
        {
            Finance? chosenBusinessFinance = await _myDbContext.Finances.FindAsync(id);
            if (chosenBusinessFinance == null)
            {
                return NotFound();
            }
            return Ok(chosenBusinessFinance);
        }
        catch (DbException)
        {
            return StatusCode(500, "Database Exception");
        }
        catch
        {
            return StatusCode(500, "Server Exception");
        }

    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Put( int id, Finance editedFinance)
    {
        try
        {
            _myDbContext.Entry(editedFinance).State = EntityState.Modified;
            await _myDbContext.SaveChangesAsync();

            return NoContent();
        }
        catch (DbException)
        {
            return StatusCode(500, "Database Exception");
        }
        catch 
        {
            return StatusCode(500, "Server Exception");
        }
    }

    [HttpPost]
    public async Task<ActionResult<Finance>> Post(Finance newFinance)
    {
        try
        {
            _myDbContext.Finances.Add(newFinance);
            await _myDbContext.SaveChangesAsync();
            return Created();
        }
        catch (DbException)
        {
            return StatusCode(500, "Database error");
        }
        catch
        {
            return StatusCode(500, "Server error");
        }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            Finance? finance = await _myDbContext.Finances.FindAsync(id);
            if (finance != null)
            {
                _myDbContext.Finances.Remove(finance);
                await _myDbContext.SaveChangesAsync();
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception)
        {
            return StatusCode(500);
        }
    }
}