using Application.Features.Catalogs.Dto;

namespace Application.Features.Catalogs.Intefaces;

public interface ICatalogService
{
    List<CatalogResponse> GetCategoriaArbitros();
    List<CatalogResponse> GetConfederaciones();
    List<CatalogResponse> GetEspecialidadArbitro();
    List<CatalogResponse> GetEstado(); 
    List<CatalogResponse> GetEstadoEstadio();
    List<CatalogResponse> GetEstadoGenerico();
    List<CatalogResponse> GetEstiloJuego();
    List<CatalogResponse> GetGeneros();
    List<CatalogResponse> GetLicenciasEntrenador();
    List<CatalogResponse> GetPieDominante();
    List<CatalogResponse> GetTipoCesped();
    List<CatalogResponse> GetTipoTorneo();
    List<CatalogResponse> GetTipoDato();
}