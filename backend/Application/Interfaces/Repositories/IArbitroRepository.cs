

using Application.Dto;
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
}
