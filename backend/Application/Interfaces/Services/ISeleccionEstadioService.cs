using Application.Common.Models;
using Application.Dto.config;
using Application.Dto.Selecciones;
using Domain.Entities;

namespace Application.Interfaces.Services;

public interface ISeleccionEstadioService
{
    Task<PagedResult<SeleccionEstadio>> GetAllAsync(
    int page,
    int pageSize,
    string? search,
    string? seleccion);
    Task<SeleccionEstadio> AddAsync(SeleccionEstadioRequest seleccionEstadioDto);
    Task<SeleccionEstadio> UpdateAsync(int id, SeleccionEstadioRequest seleccionEstadioDto);
    Task<SeleccionEstadio?> GetByIdAsync(int id);
    Task<PagedResult<SeleccionEstadioResponse>> ListarPorSeleccion(int page, int pageSize, string? seleccion);
    Task<List<string>> GetEstadioAsync(string seleccion);
}
