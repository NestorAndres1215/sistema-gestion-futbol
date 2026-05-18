

using Application.Dto;
using Application.Dto.estadisticas;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface IArbitroRepository
{
    Task<PagedResult<Arbitros>> GetAllAsync(int page,
     int pageSize,
     string? search,
     string? categoria,
     string? pais,
     string? estado);

    Task<Arbitros> AddAsync(Arbitros arbitros);
    Task<Arbitros> UpdateAsync(Arbitros arbitros);
    Task<Arbitros?> GetByIdAsync(int id);
    Task<int> ObtenerTotalArbitrosAsync();
    Task<int> ObtenerArbitrosActivosAsync();
    Task<double> ObtenerPrecisionPromedioAsync();
    Task<double> ObtenerReputacionPromedioAsync();
    Task<List<ItemDto>> ObtenerArbitrosPorPaisAsync();


    Task<List<ItemDto>> ObtenerArbitrosConMasPartidosAsync(int cantidad);

    Task<List<ItemDto>> ObtenerRolArbitralAsync();

    Task<List<ItemDto>> ObtenerEstadoFisicoAsync();

    Task<List<ItemDto>> ObtenerDebutsPorAnioAsync();

    Task<List<ItemDto>> ObtenerArbitrosConMejorNivelAsync(int cantidad);

    Task<List<ItemDto>> ObtenerArbitrosActivosVsRetiradosAsync();

    Task<double> ObtenerEdadPromedioAsync();
    Task<List<ItemDto>> ObtenerPromedioTarjetasAsync();
    Task<List<ItemDto>> ObtenerTopExperienciaAsync(int cantidad);
    Task<List<ItemDto>> ObtenerTopReputacionAsync(int cantidad);

}
