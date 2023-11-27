using Domain.Models;
using DataAccess.Repositories;
using Domain.Repositories;
using Domain.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using PetHolidayWebApi.Hubs;
using DataAccess;
using FluentValidation;
using System;
using Domain.Common.AuthHelpers;
using FluentValidation.AspNetCore;
using Domain.Common.UpdateModels;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();
builder.Services.AddDbContext<PetHolidayDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PetHolidayDbContext")));

builder.Services.AddIdentity<User, IdentityRole<int>>(options =>
        {
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 8;
            options.Password.RequireNonAlphanumeric = true;
            options.Password.RequireUppercase = true;
            options.Password.RequireLowercase = true;
            options.Password.RequiredUniqueChars = 1;
        })
       .AddEntityFrameworkStores<PetHolidayDbContext>()
       .AddDefaultTokenProviders();


builder.Services.AddScoped<IJobApplicationRepository, JobApplicationRepository>();
builder.Services.AddScoped<IJobApplicationCommentRepository, JobApplicationCommentRepository>();
builder.Services.AddScoped<JobApplicationService, JobApplicationService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<UserService, UserService>();
builder.Services.AddScoped<IJobRepository, JobRepository>();
builder.Services.AddScoped<JobService, JobService>();
builder.Services.AddScoped<IPetRepository, PetRepository>();
builder.Services.AddScoped<AuthService,AuthService>();



builder.Services.AddScoped<IValidator<LoginModel>, LoginModelModelValidator>();
builder.Services.AddScoped<IValidator<UpdatePasswordModel>, UpdatePasswordModelValidator>();
builder.Services.AddScoped<IValidator<RegisterModel>, RegisterModelModelValidator>();
builder.Services.AddFluentValidationAutoValidation();


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options => {
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
    };
});

builder.Services.AddSignalR();

var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    
    var context = serviceScope.ServiceProvider.GetRequiredService<PetHolidayDbContext>();
    context.Database.Migrate();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<JobApplicationHub>("/hub");


app.Run();
