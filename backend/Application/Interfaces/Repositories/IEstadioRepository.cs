using Application.Dto;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface IEstadioRepository
{
    Task<PagedResult<Estadio>> GetAllAsync(int page,
     int pageSize,
     string? search,
     string? tipoCesped,
     string? pais,
     int? anio,
     string? estado);

    Task<Estadio> AddAsync(Estadio estadio);
    Task<Estadio> UpdateAsync(Estadio torneo);
    Task<Estadio?> GetByIdAsync(int id);
    Task<Estadio?> GetByNombreAsync(string nombre);
    Task<List<int>> GetAniosAsync();

}
