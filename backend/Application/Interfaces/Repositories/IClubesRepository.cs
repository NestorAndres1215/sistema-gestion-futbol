

using Application.Common.Models;
using Application.Features.Clubes.Dto;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface IClubesRepository
{
    Task<PagedResult<ClubesResponse>> GetAllAsync(int page,
    int pageSize,
    string? search,
    string? confederacion,
    string? estado);

    Task<Club> AddAsync(Club clubes);
    Task<Club> UpdateAsync(Club clubes);
    Task<Club?> GetByIdAsync(int id);
    Task<Club?> GetByNombreAsync(string nombre);
    Task<Club?> GetByPaisAsync(string pais);
    Task<Club?> GetByCodigoFifaAsync(string codigoFifa);
    Task<Club?> GetByConfederacionAsync(string confederacion);

}
