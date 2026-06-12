
using Application.Common.Models;
using Application.Features.Entrenadores.Dto;
using Application.Features.SeleccionesEntrenadores.Dto;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface IEntrenadorSeleccionRepository
{
    Task<PagedResult<SeleccionEntrenadorResponse>> ListarPorSeleccion(
           int page,
           int pageSize,
           string? seleccion);
    Task<SeleccionEntrenador> AddAsync(SeleccionEntrenador entrenadorSeleccion);
    Task<SeleccionEntrenador> UpdateAsync(SeleccionEntrenador entrenadorSeleccion);
    Task<SeleccionEntrenador?> GetByIdAsync(int id);
    Task<List<EntrenadorSelectResponse>> GetEntrenadoresAsync();
    Task<List<SeleccionEntrenador>> ListarPorSeleccionNombre(string nombre);
    Task<bool> ExisteCruceFechasAsync(
        int seleccionId,
        DateTime fechaInicio,
        DateTime? fechaFin);

     Task<bool> ExisteCruceFechasActualizarAsync(
        int seleccionId,
        DateTime fechaInicio,
        DateTime? fechaFin,
        int idExcluir);

}
