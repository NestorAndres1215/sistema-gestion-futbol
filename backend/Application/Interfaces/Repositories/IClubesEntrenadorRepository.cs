using Application.Common.Models;

using Application.Features.ClubesEntrenadores.Dto;
using Application.Features.Entrenadores.Dto;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Repositories;

public interface IClubesEntrenadorRepository
{
    Task<PagedResult<ClubEntrenadorResponse>> ListarPorSeleccion( int page, int pageSize, string? club);
    Task<ClubEntrenador> AddAsync(ClubEntrenador clubEntrenador);
    Task<ClubEntrenador> UpdateAsync(ClubEntrenador clubEntrenador);
    Task<ClubEntrenador?> GetByIdAsync(int id);
    Task<List<EntrenadorSelectResponse>> GetEntrenadoresAsync();
    Task<List<ClubEntrenador>> ListarPorClubesNombre(string nombre);
    Task<bool> ExisteCruceFechasAsync( int clubId, DateTime fechaInicio, DateTime? fechaFin);
    Task<bool> ExisteCruceFechasActualizarAsync( int clubId, DateTime fechaInicio, DateTime? fechaFin, int idExcluir);

}
