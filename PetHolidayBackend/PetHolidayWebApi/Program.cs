using DataAccess;
using DataAccess.Repositories;
using Domain.Repositories;
using Domain.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();
builder.Services.AddDbContext<PetHolidayDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PetHolidayDbContext")));
builder.Services.AddScoped<IPetRepository, PetRepository>();
builder.Services.AddScoped<IPetService, PetService>();

var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    var context = serviceScope.ServiceProvider.GetRequiredService<PetHolidayDbContext>();
    context.Database.EnsureCreated();
}

app.MapControllers();

app.Run();
