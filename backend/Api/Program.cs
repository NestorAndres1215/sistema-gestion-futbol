using Api.Extensions;
using API.Middleware;
using FluentValidation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDatabase(builder.Configuration);

// Authentication & JWT
builder.Services.AddJwtAuthentication(builder.Configuration);

// Repositories
builder.Services.AddRepositories();

// Services
builder.Services.AddApplicationServices();

// Infrastructure
builder.Services.AddInfrastructureServices();
// Validaciones
builder.Services.AddFluentValidationAutoValidation();
// Controllers
builder.Services.AddApiControllers();

// CORS
builder.Services.AddCorsPolicy();

// Authorization
builder.Services.AddAuthorization();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middlewares
app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("AllowAll");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();