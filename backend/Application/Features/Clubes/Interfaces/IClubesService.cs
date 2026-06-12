using Application.Common.Models;
using Application.Features.Clubes.Dto;
using Domain.Entities;


namespace Application.Features.Clubes.Interfaces;

public interface IClubesService
{
    Task<PagedResult<ClubesResponse>> GetAllAsync(int page,
    int pageSize,
    string? search,
    string? confederacion,
    string? estado);
    Task<Club> AddAsync(ClubesRequest clubes);
    Task<Club> UpdateAsync(int id, ClubesRequest clubes);
    Task<Club?> GetByIdAsync(int id);
    Task<Club?> GetByNombreAsync(string nombre);
    Task<Club?> GetByConfederacionAsync(string confederacion);
}
