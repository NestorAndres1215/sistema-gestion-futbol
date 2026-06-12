using Application.Common.Models;
using Application.Features.Selecciones.Dto;
using Domain.Entities;

namespace Application.Features.Selecciones.Interfaces;

public interface ISelecionService
{
    Task<PagedResult<SeleccionesResponse>> GetAllAsync(int page,
        int pageSize,
        string? search,
        string? confederacion,
        string? estado);
    Task<Seleccion> AddAsync(SeleccionesRequest selecciones);
    Task<Seleccion> UpdateAsync(int id,SeleccionesRequest selecciones);
    Task<Seleccion?> GetByIdAsync(int id);
    Task<Seleccion?> GetByNombreAsync(string nombre);
    Task<Seleccion?> GetByClaveAsync(string clave);
    Task<Seleccion?> GetByConfederacionAsync(string confederacion);
}
