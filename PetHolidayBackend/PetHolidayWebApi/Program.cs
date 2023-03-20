using DataAccess;
using DataAccess.DataObjects;
using DataAccess.Repositories;
using Domain.Repositories;
using Domain.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();
builder.Services.AddDbContext<PetHolidayDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PetHolidayDbContext")));
builder.Services.AddIdentityCore<DbUser>()
    .AddEntityFrameworkStores<PetHolidayDbContext>();
builder.Services.AddTransient<DataSeeder>();
builder.Services.AddScoped<IPetRepository, PetRepository>();
builder.Services.AddScoped<PetService, PetService>();

var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    var context = serviceScope.ServiceProvider.GetRequiredService<PetHolidayDbContext>();
    //context.Database.EnsureCreated();
    context.Database.Migrate();
    var service = serviceScope.ServiceProvider.GetService<DataSeeder>();
    service.Seed();
    
}

app.MapControllers();

app.Run();
