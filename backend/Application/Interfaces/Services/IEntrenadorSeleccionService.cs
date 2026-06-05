using Application.Dto.config;
using Application.Dto.entrenadores;
using Application.Dto.selecciones;
using Domain.Entities;

namespace Application.Interfaces.Services;

public interface IEntrenadorSeleccionService
{
    Task<EntrenadorSeleccion> AddAsync(SeleccioEntrenadorRequest seleccioEntrenadorRequest);
    Task<EntrenadorSeleccion> UpdateAsync(int id, SeleccioEntrenadorRequest seleccioEntrenadorRequest);
    Task<EntrenadorSeleccion?> GetByIdAsync(int id);
    Task<PagedResult<SeleccionEntrenadorResponse>> ListarPorSeleccion(int page, int pageSize, string? seleccion);
    Task<List<EntrenadorSelectResponse>> GetEntrenadoresAsync();
    Task<List<EntrenadorSeleccion>> ListarPorSeleccionNombre(string nombre);
    Task<EntrenadorSeleccion> DespedirAsync(int id);


}
