
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Usuario> Usuarios => Set<Usuario>();
    public DbSet<Categoria> Categorias => Set<Categoria>();
    public DbSet<Rol> Roles => Set<Rol>();
    public DbSet<Torneo> Torneos => Set<Torneo>();
    public DbSet<Estadio> Estadios => Set<Estadio>(); 
    public DbSet<Ciudad> Ciudades => Set<Ciudad>();
    public DbSet<Pais> Paises => Set<Pais>();
    public DbSet<Persona> Personas => Set<Persona>();
    public DbSet<Arbitro> Arbitros => Set<Arbitro>();
    public DbSet<Jugador> Jugadores => Set<Jugador>();
    public DbSet<Entrenador> Entrenadores => Set<Entrenador>();
    public DbSet<ParametroSistema> ParametrosSistema => Set<ParametroSistema>();
    public DbSet<Seleccion> Selecciones => Set<Seleccion>();
    public DbSet<SeleccionEstadio> SeleccionEstadio => Set<SeleccionEstadio>();
    public DbSet<SeleccionEntrenador> EntrenadorSeleccion => Set<SeleccionEntrenador>();
    public DbSet<Club> Clubes => Set<Club>();
    public DbSet<ClubEntrenador> ClubEntrenador => Set<ClubEntrenador>();
    public DbSet<ClubEstadio> ClubEstadio => Set<ClubEstadio>();


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(AppDbContext).Assembly);

        base.OnModelCreating(modelBuilder);
    }

}