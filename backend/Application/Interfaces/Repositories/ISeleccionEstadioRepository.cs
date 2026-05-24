using Application.Dto;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface ISeleccionEstadioRepository
{
    Task<PagedResult<SeleccionEstadio>> GetAllAsync(
        int page,
        int pageSize,
        string? search,
        string? seleccion);
    Task<SeleccionEstadio> AddAsync(SeleccionEstadio seleccionEstadio);
    Task<SeleccionEstadio> UpdateAsync(SeleccionEstadio seleccionEstadio);
    Task<SeleccionEstadio?> GetByIdAsync(int id);
}
