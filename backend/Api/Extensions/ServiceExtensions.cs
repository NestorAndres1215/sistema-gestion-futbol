using Application.Interfaces.Services;
using Application.Services;

namespace Api.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddApplicationServices(
        this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IUsuarioService, UsuarioService>();
        services.AddScoped<ICategoriaService, CategoriaService>();
        services.AddScoped<ITorneoService, TorneoService>();
        services.AddScoped<IEstadioService, EstadioService>();
        services.AddScoped<ICiudadesService, CiudadesService>();
        services.AddScoped<IPaisesService, PaisesService>();
        services.AddScoped<IPersonasService, PersonasService>();
        services.AddScoped<IArbitrosService, ArbitrosService>();
        services.AddScoped<IEntrenadoresService, EntrenadoresService>();
        services.AddScoped<IParametrosSistemaService, ParametrosSistemaService>();
        services.AddScoped<ISelecionesService, SeleccionesService>();
        services.AddScoped<ISeleccionEstadioService, SeleccionEstadioService>();
        services.AddScoped<IEntrenadorSeleccionService, EntrenadorSeleccionService>();
        services.AddScoped<IClubesService, ClubesService>();
        services.AddScoped<IFotoService, FotoService>();

        return services;
    }
}