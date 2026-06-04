using Application.Dto.config;
using Application.Dto.entrenadores;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface IEntrenadoresRepository
{
    Task<PagedResult<Entrenadores>> GetAllAsync(int page,
         int pageSize,
         string? search,
         string? estiloJuego,
         string? pais,
         string? estado);

    Task<Entrenadores> AddAsync(Entrenadores entrenadores);
    Task<Entrenadores> UpdateAsync(Entrenadores entrenadores);
    Task<Entrenadores?> GetByIdAsync(int id);
    Task<Entrenadores?> GetByNombreAsync(string nombre);
    Task<List<EntrenadorComboRequest>> GetComboAsync();
}
