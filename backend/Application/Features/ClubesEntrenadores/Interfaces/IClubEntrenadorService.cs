using Application.Common.Models;
using Application.Features.ClubesEntrenadores.Dto;
using Application.Features.Entrenadores.Dto;
using Domain.Entities;

namespace Application.Features.ClubesEntrenadores.Interfaces;

public interface IClubEntrenadorService
{
    Task<ClubEntrenador> AddAsync(ClubEntrenadorRequest clubesEntrenadorRequest);
    Task<ClubEntrenador> UpdateAsync(int id, ClubEntrenadorRequest clubesEntrenadorRequest);
    Task<ClubEntrenador?> GetByIdAsync(int id);
    Task<PagedResult<ClubEntrenadorResponse>> ListarPorClub(int page, int pageSize, string? club);
    Task<List<EntrenadorSelectResponse>> GetEntrenadoresAsync();
    Task<List<ClubEntrenador>> ListarPorClubNombre(string nombre);
    Task<ClubEntrenador> DespedirAsync(int id);
}
