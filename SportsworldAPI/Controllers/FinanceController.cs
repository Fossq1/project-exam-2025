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
        try {
                List<Finance> finances = await _myDbContext.Finances.FindSync(id);

                if (finances != null) {
                    return Ok(finances);
                }
            } catch (DbException) {
                return NotFound("Database Exception");
            } catch {
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
        if (chosenBusinessFinance != null) {
            return Ok(chosenBusinessFinance);
        }
    } catch (DbException) {
        return NotFound("Database Exception");

    }

    }
}