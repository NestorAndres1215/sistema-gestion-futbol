

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

}
