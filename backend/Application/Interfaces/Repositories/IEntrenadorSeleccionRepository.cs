using Application.Dto;
using Application.Dto.selecciones;
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
    Task<List<string>> GetEntrenadoresAsync(string seleccion);
    Task<List<EntrenadorSeleccion>> ListarPorSeleccionNombre(string nombre);
}
