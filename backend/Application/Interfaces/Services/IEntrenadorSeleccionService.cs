using Application.Common.Models;
using Application.Dto.Entrenadores;
using Application.Dto.Selecciones;
using Domain.Entities;

namespace Application.Interfaces.Services;

public interface IEntrenadorSeleccionService
{
    Task<EntrenadorSeleccion> AddAsync(SeleccionEntrenadorRequest seleccioEntrenadorRequest);
    Task<EntrenadorSeleccion> UpdateAsync(int id, SeleccionEntrenadorRequest seleccioEntrenadorRequest);
    Task<EntrenadorSeleccion?> GetByIdAsync(int id);
    Task<PagedResult<SeleccionEntrenadorResponse>> ListarPorSeleccion(int page, int pageSize, string? seleccion);
    Task<List<EntrenadorSelectResponse>> GetEntrenadoresAsync();
    Task<List<EntrenadorSeleccion>> ListarPorSeleccionNombre(string nombre);
    Task<EntrenadorSeleccion> DespedirAsync(int id);


}
