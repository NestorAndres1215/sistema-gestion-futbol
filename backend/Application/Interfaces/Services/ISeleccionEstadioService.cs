using Application.Dto;
using Domain.Entities;

namespace Application.Interfaces.Services;

public interface ISeleccionEstadioService
{
    Task<PagedResult<SeleccionEstadio>> GetAllAsync(
    int page,
    int pageSize,
    string? search,
    string? seleccion);
    Task<SeleccionEstadio> AddAsync(SeleccionEstadioDto seleccionEstadioDto);
    Task<SeleccionEstadio> UpdateAsync(int id, SeleccionEstadioDto seleccionEstadioDto);
    Task<SeleccionEstadio?> GetByIdAsync(int id);
}
