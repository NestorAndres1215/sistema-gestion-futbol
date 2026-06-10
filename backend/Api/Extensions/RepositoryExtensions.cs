using Application.Interfaces.Repositories;
using Domain.Interfaces;
using Infrastructure.Repositories;

namespace Api.Extensions;

public static class RepositoryExtensions
{
    public static IServiceCollection AddRepositories(
        this IServiceCollection services)
    {
        services.AddScoped<IUsuarioRepository, UsuarioRepository>();
        services.AddScoped<ICategoriaRepository, CategoriaRepository>();
        services.AddScoped<ITorneoRepository, TorneoRepository>();
        services.AddScoped<IEstadioRepository, EstadioRepository>();
        services.AddScoped<ICiudadesRepository, CiudadesRepository>();
        services.AddScoped<IPaisesRepository, PaisesRepository>();
        services.AddScoped<IPersonasRepository, PersonasRepository>();
        services.AddScoped<IArbitroRepository, ArbitrosRepository>();
        services.AddScoped<IEntrenadoresRepository, EntrenadoresRepository>();
        services.AddScoped<IParametrosSistemaRepository, ParametrosSistemaRepository>();
        services.AddScoped<ISeleccionRepository, SeleccionRepository>();
        services.AddScoped<ISeleccionEstadioRepository, SeleccionEstadioRepository>();
        services.AddScoped<IEntrenadorSeleccionRepository, EntrenadorSeleccionRepository>();
        services.AddScoped<IClubesRepository, ClubesRepository>();

        return services;
    }
}