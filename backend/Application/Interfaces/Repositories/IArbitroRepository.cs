using Application.Common.Models;
using Application.Dto.Arbitros;
using Application.Dto.Estadisticas;
namespace Application.Interfaces.Repositories;

public interface IArbitroRepository
{
    Task<PagedResult<ArbitrosResponse>> GetAllAsync(int page,int pageSize,string? search,string? categoria,string? pais,string? estado);
    Task<Arbitros> AddAsync(Arbitros arbitros);
    Task<Arbitros> UpdateAsync(Arbitros arbitros);
    Task<Arbitros?> GetByIdAsync(int id);
    Task<int> ObtenerTotalArbitrosAsync();
    Task<int> ObtenerArbitrosActivosAsync();
    Task<double> ObtenerPrecisionPromedioAsync();
    Task<double> ObtenerReputacionPromedioAsync();
    Task<List<ItemResponse>> ObtenerArbitrosPorPaisAsync();
    Task<List<ItemResponse>> ObtenerArbitrosConMasPartidosAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerRolArbitralAsync();
    Task<List<ItemResponse>> ObtenerEstadoFisicoAsync();
    Task<List<ItemResponse>> ObtenerDebutsPorAnioAsync();
    Task<List<ItemResponse>> ObtenerArbitrosConMejorNivelAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerArbitrosActivosVsRetiradosAsync();
    Task<double> ObtenerEdadPromedioAsync();
    Task<List<ItemResponse>> ObtenerPromedioTarjetasAsync();
    Task<List<ItemResponse>> ObtenerTopExperienciaAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerTopReputacionAsync(int cantidad);
}
