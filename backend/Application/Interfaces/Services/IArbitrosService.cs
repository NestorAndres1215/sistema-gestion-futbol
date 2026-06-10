
using Application.Common.Models;
using Application.Dto.Arbitros;
using Application.Dto.Estadisticas;


namespace Application.Interfaces.Services;

public interface IArbitrosService
{
    Task<PagedResult<ArbitrosResponse>> GetAllAsync(int page,int pageSize, string? search,string? categoria, string? pais,string? estado);
    Task<Arbitros> AddAsync(ArbitrosRequest arbitros);
    Task<Arbitros> UpdateAsync(int id,ArbitrosRequest arbitros);
    Task<Arbitros> GetByIdAsync(int id);
    Task<TotalCountResponse> ObtenerTotalArbitrosAsync();
    Task<TotalCountResponse> ObtenerArbitrosActivosAsync();
    Task<AverageResponse> ObtenerPrecisionPromedioAsync();
    Task<List<ItemResponse>> ObtenerArbitrosPorPaisAsync();
    Task<List<ItemResponse>> ObtenerArbitrosConMasPartidosAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerRolArbitralAsync();
    Task<List<ItemResponse>> ObtenerEstadoFisicoAsync();
    Task<List<ItemResponse>> ObtenerDebutsPorAnioAsync();
    Task<List<ItemResponse>> ObtenerArbitrosConMejorNivelAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerArbitrosActivosVsRetiradosAsync();
    Task<AverageResponse> ObtenerEdadPromedioAsync();
    Task<List<ItemResponse>> ObtenerPromedioTarjetasAsync();
    Task<List<ItemResponse>> ObtenerTopExperienciaAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerTopReputacionAsync(int cantidad);
}
