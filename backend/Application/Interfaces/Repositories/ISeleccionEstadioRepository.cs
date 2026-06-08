using Application.Dto.config;
using Application.Dto.Config;
using Application.Dto.Selecciones;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface ISeleccionEstadioRepository
{
    Task<PagedResult<SeleccionEstadioResponse>> ListarPorSeleccion(
        int page,
        int pageSize,
        string? seleccion);
    Task<PagedResult<SeleccionEstadio>> GetAllAsync(
        int page,
        int pageSize,
        string? search,
        string? seleccion);
    Task<SeleccionEstadio> AddAsync(SeleccionEstadio seleccionEstadio);
    Task<SeleccionEstadio> UpdateAsync(SeleccionEstadio seleccionEstadio);
    Task<SeleccionEstadio?> GetByIdAsync(int id);
    Task<List<string>> GetEstadioAsync(string seleccion);
}
