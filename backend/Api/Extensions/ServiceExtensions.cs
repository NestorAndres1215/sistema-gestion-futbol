using Application.Features.Arbitros.Interfaces;
using Application.Features.Arbitros.Service;
using Application.Features.Auth.Interfaces;
using Application.Features.Auth.Services;
using Application.Features.Catalogs.Intefaces;
using Application.Features.Catalogs.Service;
using Application.Features.Categorias.Interfaces;
using Application.Features.Categorias.Services;
using Application.Features.Ciudades.Interfaces;
using Application.Features.Ciudades.Services;
using Application.Features.Clubes.Interfaces;
using Application.Features.Clubes.Services;
using Application.Features.Entrenadores.Interfaces;
using Application.Features.Entrenadores.Services;
using Application.Features.Estadios.Interfaces;
using Application.Features.Estadios.Services;
using Application.Features.Fotos.Interfaces;
using Application.Features.Fotos.Services;
using Application.Features.Paises.Interfaces;
using Application.Features.Paises.Services;
using Application.Features.ParamatrosSistemas.Interfaces;
using Application.Features.ParamatrosSistemas.Services;
using Application.Features.Personas.Interfaces;
using Application.Features.Personas.Service;
using Application.Features.Selecciones.Interfaces;
using Application.Features.Selecciones.Services;
using Application.Features.SeleccionesEntrenadores.Interfaces;
using Application.Features.SeleccionesEntrenadores.Services;
using Application.Features.SeleccionesEstadios.Interfaces;
using Application.Features.SeleccionesEstadios.Services;
using Application.Features.Torneos.Interfaces;
using Application.Features.Torneos.Services;
using Application.Features.Usuarios.Interfaces;
using Application.Features.Usuarios.Services;

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
        services.AddScoped<ICiudadService, CiudadService>();
        services.AddScoped<IPaisService, PaisService>();
        services.AddScoped<IPersonasService, PersonasService>();
        services.AddScoped<IArbitroService, ArbitroService>();
        services.AddScoped<IEntrenadorService, EntrenadorService>();
        services.AddScoped<IParametroSistemaService, ParametroSistemaService>();
        services.AddScoped<ISelecionService, SeleccionService>();
        services.AddScoped<ISeleccionEstadioService, SeleccionEstadioService>();
        services.AddScoped<ISeleccionEntrenadorService, SeleccionEntrenadorService>();
        services.AddScoped<IClubesService, ClubesService>();
        services.AddScoped<IFotoService, FotoService>();
        services.AddScoped<ICatalogService, CatalogService>();

        return services;
    }
}