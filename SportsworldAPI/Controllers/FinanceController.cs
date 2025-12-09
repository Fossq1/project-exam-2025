using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using SportsworldAPI.Models;

namespace SportsworldAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class FinanceController(MyDbContext _myDbContext) : ControllerBase
{
    //getAll
    [HttpGet]
    public async Task<ActionREsult<List<Finance>>> Get()
    {
        try
        {
            List<Finance> finances = await _myDbContext.Finances.FindSync(id);

            if (finances != null)
            {
                return Ok(finances);
            }
        }
        catch (DbException)
        {
            return NotFound("Database Exception");
        }
        catch
        {
            return NotFound("Server side Exception");
        }
    }

    //getById
    [HttpGet("{id}")]
    public ActionResult<Finance> Get(int id)
    {
        try
        {
            Finance? chosenBusinessFinance = finances.Find(finance => finance.Id == id);
            if (chosenBusinessFinance != null)
            {
                return Ok(chosenBusinessFinance);
            }
        }
        catch (DbException)
        {
            return NotFound("Database Exception");

        }

    }
    [HttpPut]
    public async Task<ActionResult> Put(Finance editedFinance)
    {
        try
        {
            _myDbContext.Entry(editedFinance).State = EntityState.Modified;
            await _myDbContext.SaveChangesAsync();
            return NoContent();
        }
        catch (DbException)
        {
            return ("500", "Database Exception");
        }
        catch (Exception)
        {
            return ("500", "Server Exception");
        }
    }
    [HttoPost]
    public async Task<ActionResult<Finance>> Post(Finance newFinance)
    {
        try
        {
            _myDbContext.finances.Add(newFinance);
            await _myDbContext.SaveChangesAsync();
            return CreateAtAction("Get", new { id = newFinance.Id }, newFinance);
        }
        catch (DbException)
        {
            return NotFound();
        }
    }
}