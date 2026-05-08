using Application.Dto;
using Domain.Entities;

namespace Application.Interfaces.Services;

public interface ITorneoService
{
    Task<PagedResult<Torneo>> GetAllAsync(int page,
        int pageSize,
        string? search,
        string? tipo,
        string? tipoParticipante,
        string? estado);
    Task<Torneo> AddAsync(TorneoDto torneo);
    Task<Torneo> UpdateAsync(int id ,TorneoDto torneo);
    Task<Torneo> GetByIdAsync(int id);
    Task<Torneo> GetByNombreAsync(string nombre);
}
