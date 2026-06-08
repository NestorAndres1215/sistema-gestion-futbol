using Application.Dto.Config;
using Application.Dto.Selecciones;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface ISeleccionRepository
{

    Task<PagedResult<SeleccionesResponse>> GetAllAsync(int page,
        int pageSize,
        string? search,
        string? confederacion,
        string? estado);
    Task<Selecciones> AddAsync(Selecciones selecciones);
    Task<Selecciones> UpdateAsync(Selecciones selecciones);
    Task<Selecciones?> GetByIdAsync(int id);
    Task<Selecciones?> GetByNombreAsync(string nombre);
    Task<Selecciones?> GetByClaveAsync(string clave);
    Task<Selecciones?> GetByPaisAsync(string pais);
    Task<Selecciones?> GetByCodigoFifaAsync(string codigoFifa);
    Task<Selecciones?> GetByConfederacionAsync(string confederacion);
}
