

using Application.Common.Models;
using Application.Interfaces.Services;
using Domain.Catalogs;
using Domain.Constants;

namespace Application.Services;

public class CatalogService : ICatalogService
{
    private static List<CatalogResponse> Map(IReadOnlyList<string> list)
        => list.Select(x => new CatalogResponse
        {
            Value = x,
            Label = x
        }).ToList();

    public List<CatalogResponse> GetCategoriaArbitros()
        => Map(CategoriaArbitro.All);
    public List<CatalogResponse> GetConfederaciones()
        => Map(Confederaciones.All);
    public List<CatalogResponse> GetEspecialidadArbitro()
        => Map(EspecialidadArbitro.All);
    public List<CatalogResponse> GetEstado()
         => Map(Estado.All);
    public List<CatalogResponse> GetEstadoEstadio()
        => Map(EstadoEstadio.All);
    public List<CatalogResponse> GetEstadoGenerico()
        => Map(EstadoGenerico.All);
    public List<CatalogResponse> GetEstiloJuego()
        => Map(EstilosJuego.All);
    public List<CatalogResponse> GetGeneros()
        => Map(Generos.All);
    public List<CatalogResponse> GetLicenciasEntrenador()
        => Map(LicenciasEntrenador.All);
    public List<CatalogResponse> GetPieDominante()
        => Map(PieDominante.All);
    public List<CatalogResponse> GetTipoCesped()
        => Map(TipoCesped.All);
    public List<CatalogResponse> GetTipoTorneo()
        => Map(TipoTorneo.All);
    public List<CatalogResponse> GetTipoDato()
        => Map(TipoDato.All);
}