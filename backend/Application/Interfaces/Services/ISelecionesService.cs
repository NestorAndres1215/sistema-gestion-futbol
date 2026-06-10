using Application.Common.Models;
using Application.Dto.config;
using Application.Dto.Selecciones;
using Domain.Entities;

namespace Application.Interfaces.Services;

public interface ISelecionesService
{
    Task<PagedResult<SeleccionesResponse>> GetAllAsync(int page,
        int pageSize,
        string? search,
        string? confederacion,
        string? estado);
    Task<Selecciones> AddAsync(SeleccionesRequest selecciones);
    Task<Selecciones> UpdateAsync(int id,SeleccionesRequest selecciones);
    Task<Selecciones?> GetByIdAsync(int id);
    Task<Selecciones?> GetByNombreAsync(string nombre);
    Task<Selecciones?> GetByClaveAsync(string clave);
    Task<Selecciones?> GetByConfederacionAsync(string confederacion);
}
