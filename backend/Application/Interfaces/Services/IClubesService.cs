using Application.Common.Models;
using Application.Dto.Clubes;
using Domain.Entities;


namespace Application.Interfaces.Services;

public interface IClubesService
{
    Task<PagedResult<ClubesResponse>> GetAllAsync(int page,
    int pageSize,
    string? search,
    string? confederacion,
    string? estado);
    Task<Clubes> AddAsync(ClubesRequest clubes);
    Task<Clubes> UpdateAsync(int id, ClubesRequest clubes);
    Task<Clubes?> GetByIdAsync(int id);
    Task<Clubes?> GetByNombreAsync(string nombre);
    Task<Clubes?> GetByConfederacionAsync(string confederacion);
}
