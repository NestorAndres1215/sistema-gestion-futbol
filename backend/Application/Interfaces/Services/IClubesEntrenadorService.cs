
using Application.Common.Models;
using Application.Dto.Clubes;
using Application.Dto.Entrenadores;
using Application.Dto.Selecciones;
using Domain.Entities;

namespace Application.Interfaces.Services;

public interface IClubesEntrenadorService
{
    Task<ClubEntrenador> AddAsync(ClubesEntrenadorRequest clubesEntrenadorRequest);
    Task<ClubEntrenador> UpdateAsync(int id, ClubesEntrenadorRequest clubesEntrenadorRequest);
    Task<ClubEntrenador?> GetByIdAsync(int id);
    Task<PagedResult<ClubesEntrenadorResponse>> ListarPorClub(int page, int pageSize, string? club);
    Task<List<EntrenadorSelectResponse>> GetEntrenadoresAsync();
    Task<List<ClubEntrenador>> ListarPorClubNombre(string nombre);
    Task<ClubEntrenador> DespedirAsync(int id);
}
