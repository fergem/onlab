using DataAccess;
using DataAccess.DataObjects;
using DataAccess.Repositories;
using Domain.Models;
using Domain.Repositories;
using Domain.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();
builder.Services.AddDbContext<PetHolidayDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PetHolidayDbContext")));

builder.Services.AddIdentity<DbUser, IdentityRole<int>>(x =>
{
    x.Password.RequiredLength = 6;
    x.Password.RequireUppercase = false;
    x.Password.RequireLowercase = false;
    x.Password.RequireNonAlphanumeric = false;
    x.Password.RequireDigit = false;
})
       .AddEntityFrameworkStores<PetHolidayDbContext>()
       .AddDefaultTokenProviders();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<UserService, UserService>();
builder.Services.AddScoped<IJobRepository, JobRepository>();
builder.Services.AddScoped<JobService, JobService>();
builder.Services.AddScoped<IStatusRepository, StatusRepository>();
builder.Services.AddScoped<IPetRepository, PetRepository>();
builder.Services.AddScoped<AuthService,AuthService>();


builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => {
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = bool.Parse(builder.Configuration["JsonWebTokenKeys:ValidateIssuerSigningKey"]),
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JsonWebTokenKeys:IssuerSigningKey"])),
        ValidateIssuer = bool.Parse(builder.Configuration["JsonWebTokenKeys:ValidateIssuer"]),
        ValidAudience = builder.Configuration["JsonWebTokenKeys:ValidAudience"],
        ValidIssuer = builder.Configuration["JsonWebTokenKeys:ValidIssuer"],
        ValidateAudience = bool.Parse(builder.Configuration["JsonWebTokenKeys:ValidateAudience"]),
        RequireExpirationTime = bool.Parse(builder.Configuration["JsonWebTokenKeys:RequireExpirationTime"]),
        ValidateLifetime = bool.Parse(builder.Configuration["JsonWebTokenKeys:ValidateLifetime"])
    };
});


var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    var context = serviceScope.ServiceProvider.GetRequiredService<PetHolidayDbContext>();
    context.Database.EnsureDeleted();
    context.Database.Migrate();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
