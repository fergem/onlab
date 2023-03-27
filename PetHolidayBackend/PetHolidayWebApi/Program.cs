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

//builder.Services.AddTransient<DataSeeder>();
builder.Services.AddScoped<IPetRepository, PetRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<UserService, UserService>();
builder.Services.AddScoped<IJobRepository, JobRepository>();
builder.Services.AddScoped<JobService, JobService>();

var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    var context = serviceScope.ServiceProvider.GetRequiredService<PetHolidayDbContext>();
    context.Database.Migrate();
}

app.MapControllers();

app.Run();
