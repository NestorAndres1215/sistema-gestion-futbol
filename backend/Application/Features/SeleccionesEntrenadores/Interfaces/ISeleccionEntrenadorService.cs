using Application.Common.Models;
using Application.Features.Entrenadores.Dto;
using Application.Features.SeleccionesEntrenadores.Dto;
using Domain.Entities;

namespace Application.Features.SeleccionesEntrenadores.Interfaces;

public interface ISeleccionEntrenadorService
{
    Task<SeleccionEntrenador> AddAsync(SeleccionEntrenadorRequest seleccioEntrenadorRequest);
    Task<SeleccionEntrenador> UpdateAsync(int id, SeleccionEntrenadorRequest seleccioEntrenadorRequest);
    Task<SeleccionEntrenador?> GetByIdAsync(int id);
    Task<PagedResult<SeleccionEntrenadorResponse>> ListarPorSeleccion(int page, int pageSize, string? seleccion);
    Task<List<EntrenadorSelectResponse>> GetEntrenadoresAsync();
    Task<List<SeleccionEntrenador>> ListarPorSeleccionNombre(string nombre);
    Task<SeleccionEntrenador> DespedirAsync(int id);


}
