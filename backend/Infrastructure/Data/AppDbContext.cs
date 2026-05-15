using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Rol> Roles { get; set; }
    public DbSet<Torneo> Torneos { get; set; }
    public DbSet<Estadio> Estadios { get; set; }
    public DbSet<Ciudades> Ciudades { get; set; }
    public DbSet<Paises> Paises { get; set; }
    public DbSet<Personas> Personas { get; set; }
    public DbSet<Arbitros> Arbitros { get; set; }
    public DbSet<Jugadores> Jugadores { get; set; }
    public DbSet<Entrenadores> Entrenadores { get; set; }
    public DbSet<ParametrosSistema> ParametrosSistema { get; set; }

}