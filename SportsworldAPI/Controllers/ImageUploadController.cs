using Microsoft.AspNetCore.Mvc;

namespace SportsworldAPI.Controllers;

[ApiController]
[Route("/imageupload")]
public class ImageUploadController(IWebHostEnvironment _webHostEnvironment) : ControllerBase
{
    [HttpPost]
public async Task<IActionResult> Post(IFormFile file, [FromForm] string category)
{
    if (file == null || file.Length == 0) 
        return BadRequest("No file uploaded");

    try
    {
        string webRootPath = _webHostEnvironment.WebRootPath;

        // Bestem mappe basert på kategori
        string folderPath = Path.Combine(webRootPath, "images", category);

        if (!Directory.Exists(folderPath))
            Directory.CreateDirectory(folderPath);

        string fileExtension = Path.GetExtension(file.FileName);
        string uniqueFileName = Guid.NewGuid().ToString() + fileExtension;

        string filePath = Path.Combine(folderPath, uniqueFileName);

        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(fileStream);
        }

        string relativeFilePath = Path.Combine("images", category, uniqueFileName).Replace("\\", "/");
        return Created("",new
        {
           path = relativeFilePath 
        });
    }
    catch (Exception ex)
    {
        // Log exception for debugging
        Console.WriteLine(ex);
        return StatusCode(500, "Something went wrong with the POST-Request");
    }
}

}