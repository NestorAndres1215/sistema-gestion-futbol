using Application.Common.Models;
using Application.Features.Torneos.Dto;
using Domain.Entities;

namespace Application.Features.Torneos.Interfaces;

public interface ITorneoService
{
    Task<PagedResult<TorneoResponse>> GetAllAsync(int page,
        int pageSize,
        string? search,
        string? tipo,
        string? tipoParticipante,
        string? estado);
    Task<Torneo> AddAsync(TorneoRequest torneo);
    Task<Torneo> UpdateAsync(int id ,TorneoRequest torneo);
    Task<Torneo> GetByIdAsync(int id);
    Task<Torneo> GetByNombreAsync(string nombre);
}
