using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using SportsworldAPI.Models;
using SportsworldAPI.Contexts;



//creating a namespace for Finance controller
namespace SportsworldAPI.Controllers;

//To Make the class behave as a Web API controller
[ApiController]
//Sets Endpoint route to be controllers name ("controller" part excluded)
[Route("[controller]")]
public class FinanceController(MyDbContext _myDbContext) : ControllerBase
{

//getAll - Returns a list of all finance records from the database   [HttpGet]
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


 //getById - returns a finance object from the database by searching for id

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

   //HTTP PUT - updates a finance entry and saves the changes to the database.
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
           return StatusCode(500, "Database Exception");
       }
       catch
       {
           return StatusCode(500, "Server Exception");
       }
   }

   //HTTP POST - creates new finance entry to the database.
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

   //Deletes a finance record from the database by ID.
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

