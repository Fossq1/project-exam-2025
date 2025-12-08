using Microsoft.EntityFrameworkCore;
using SportsworldAPI.Contexts;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(
    options =>
    {
        options.AddPolicy("AllowAnyOrigin",
        policies => policies
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
        );
    }
);

// Add services to the container.

builder.Services.AddDbContext<MyDbContext>(
    options => options.UseSqlite("Data Source = Databases/SportsWorld.db")
);
builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Setting index.html as default file
DefaultFilesOptions options = new DefaultFilesOptions();
options.DefaultFileNames.Add("index.html");
app.UseDefaultFiles(options);



// CORS
app.UseCors("AllowAnyOrigin");

// Making it possible to use static files (images, html, css, js. osv)
app.UseStaticFiles();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
