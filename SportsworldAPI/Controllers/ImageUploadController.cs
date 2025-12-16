using Microsoft.AspNetCore.Mvc;

namespace SportsworldAPI.Controllers;

[ApiController]
[Route("/imageupload")]

public class ImageUploadController(IWebHostEnvironment _webHostEnvironment) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post(IFormFile file)
    {
        if (file == null || file.Length == 0) 
            return BadRequest("No file uploaded");
        try
        {
            // 
            string type = Request.Form["type"].ToString();
            string webRootPath = _webHostEnvironment.WebRootPath;
            string absolutePath = Path.Combine(webRootPath, "images", type, file.FileName);
            // TODO BRUK GUID FOR TILFELDIGE NAVN

            using (var fileStream = new FileStream(absolutePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return Created();
        }
        catch
        {
            return StatusCode(500, "Something went wrong with the POST-Request");
        }
    }
}