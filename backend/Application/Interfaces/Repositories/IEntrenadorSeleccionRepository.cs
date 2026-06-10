
using Application.Common.Models;
using Application.Dto.Entrenadores;
using Application.Dto.Selecciones;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface IEntrenadorSeleccionRepository
{
    Task<PagedResult<SeleccionEntrenadorResponse>> ListarPorSeleccion(
           int page,
           int pageSize,
           string? seleccion);
    Task<EntrenadorSeleccion> AddAsync(EntrenadorSeleccion entrenadorSeleccion);
    Task<EntrenadorSeleccion> UpdateAsync(EntrenadorSeleccion entrenadorSeleccion);
    Task<EntrenadorSeleccion?> GetByIdAsync(int id);
    Task<List<EntrenadorSelectResponse>> GetEntrenadoresAsync();
    Task<List<EntrenadorSeleccion>> ListarPorSeleccionNombre(string nombre);
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
