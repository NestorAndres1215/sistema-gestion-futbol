using Application.Dto.Clubes;
using Application.Dto.Config;
using Application.Dto.Entrenadores;
using Application.Dto.Selecciones;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Repositories;

public interface IClubesEntrenadorRepository
{
    Task<PagedResult<ClubesEntrenadorResponse>> ListarPorSeleccion( int page, int pageSize, string? club);
    Task<ClubEntrenador> AddAsync(ClubEntrenador clubEntrenador);
    Task<ClubEntrenador> UpdateAsync(ClubEntrenador clubEntrenador);
    Task<ClubEntrenador?> GetByIdAsync(int id);
    Task<List<EntrenadorSelectResponse>> GetEntrenadoresAsync();
    Task<List<ClubEntrenador>> ListarPorClubesNombre(string nombre);
    Task<bool> ExisteCruceFechasAsync( int clubId, DateTime fechaInicio, DateTime? fechaFin);
    Task<bool> ExisteCruceFechasActualizarAsync( int clubId, DateTime fechaInicio, DateTime? fechaFin, int idExcluir);

}
