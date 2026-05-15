using API.Middleware;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Services;
using Domain.Interfaces;
using Infrastructure.Auth;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("JwtSettings")
);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    var config = builder.Configuration.GetSection("JwtSettings");

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = config["Issuer"],
        ValidAudience = config["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(config["Key"])
        )
    };
});

builder.Services.AddAuthorization();

builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<ICategoriaRepository, CategoriaRepository>();
builder.Services.AddScoped<ITorneoRepository, TorneoRepository>(); 
builder.Services.AddScoped<IEstadioRepository, EstadioRepository>();
builder.Services.AddScoped<ICiudadesRepository, CiudadesRepository>();
builder.Services.AddScoped<IPaisesRepository, PaisesRepository>();
builder.Services.AddScoped<IPersonasRepository, PersonasRepository>();
builder.Services.AddScoped<IArbitroRepository,ArbitrosRepository>();
builder.Services.AddScoped<IEntrenadoresRepository, EntrenadoresRepository>();
builder.Services.AddScoped<IParametrosSistemaRepository, ParametrosSistemaRepository>();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<ICategoriaService, CategoriaService>();
builder.Services.AddScoped<ITorneoService, TorneoService>();
builder.Services.AddScoped<IEstadioService, EstadioService>();
builder.Services.AddScoped<ICiudadesService, CiudadesService>();
builder.Services.AddScoped<IPaisesService,PaisesService>();
builder.Services.AddScoped<IPersonasService, PersonasService>();
builder.Services.AddScoped<IArbitrosService,ArbitrosService>();
builder.Services.AddScoped<IEntrenadoresService, EntrenadoresService>();
builder.Services.AddScoped<IParametrosSistemaService, ParametrosSistemaService>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler =
            ReferenceHandler.IgnoreCycles;
    });

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ExceptionMiddleware>();
app.UseStaticFiles();
app.MapControllers();

app.Run();