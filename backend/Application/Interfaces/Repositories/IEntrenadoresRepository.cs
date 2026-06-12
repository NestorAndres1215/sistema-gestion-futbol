using Application.Common.Models;
using Application.Features.Entrenadores.Dto;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface IEntrenadoresRepository
{
    Task<PagedResult<EntrenadoresResponse>> GetAllAsync(int page,
         int pageSize,
         string? search,
         string? estiloJuego,
         string? pais,
         string? estado);

    Task<Entrenador> AddAsync(Entrenador entrenadores);
    Task<Entrenador> UpdateAsync(Entrenador entrenadores);
    Task<Entrenador?> GetByIdAsync(int id);
    Task<Entrenador?> GetByNombreAsync(string nombre);
    Task<List<EntrenadorComboRequest>> GetComboAsync();
}
