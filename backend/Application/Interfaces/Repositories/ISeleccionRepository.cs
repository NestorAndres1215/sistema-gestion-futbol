using Application.Common.Models;
using Application.Features.Selecciones.Dto;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface ISeleccionRepository
{

    Task<PagedResult<SeleccionesResponse>> GetAllAsync(int page,
        int pageSize,
        string? search,
        string? confederacion,
        string? estado);
    Task<Seleccion> AddAsync(Seleccion selecciones);
    Task<Seleccion> UpdateAsync(Seleccion selecciones);
    Task<Seleccion?> GetByIdAsync(int id);
    Task<Seleccion?> GetByNombreAsync(string nombre);
    Task<Seleccion?> GetByClaveAsync(string clave);
    Task<Seleccion?> GetByPaisAsync(string pais);
    Task<Seleccion?> GetByCodigoFifaAsync(string codigoFifa);
    Task<Seleccion?> GetByConfederacionAsync(string confederacion);
}
