using Application.Dto.config;
using Domain.Entities;


namespace Application.Interfaces.Repositories;

public interface ITorneoRepository
{
    Task<PagedResult<Torneo>> GetAllAsync(int page,
        int pageSize,
        string? search,
        string? tipo,
        string? tipoParticipante,
        string? estado);
    Task<Torneo> AddAsync(Torneo torneo);
    Task<Torneo> UpdateAsync(Torneo torneo);
    Task<Torneo?> GetByIdAsync(int id);
    Task<Torneo?> GetByNombreAsync(string nombre);

}
