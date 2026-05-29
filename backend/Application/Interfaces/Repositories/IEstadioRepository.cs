using Application.Dto;
using Application.Dto.estadisticas;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface IEstadioRepository
{
    Task<PagedResult<Estadio>> GetAllAsync(int page,int pageSize, string? search, string? tipoCesped, string? pais, int? anio, string? estado);
    Task<Estadio> AddAsync(Estadio estadio);
    Task<Estadio> UpdateAsync(Estadio torneo);
    Task<Estadio?> GetByIdAsync(int id);
    Task<Estadio?> GetByNombreAsync(string nombre);
    Task<List<int>> GetAniosAsync();
    Task<List<Estadio>> GetByPaisAsync(string pais);
    Task<int> ObtenerTotalEstadiosAsync();
    Task<double> ObtenerPromedioCapacidadAsync();
    Task<int> ObtenerTotalPaisesConEstadiosAsync();
    Task<List<ItemDto>> ObtenerPaisesConMasEstadiosAsync(int cantidad);
    Task<List<ItemDto>> ObtenerPaisesConMenosEstadiosAsync(int cantidad);
    Task<List<ItemDto>> ObtenerCiudadesConMasEstadiosAsync(int cantidad);
    Task<List<ItemDto>> ObtenerCiudadesConMenosEstadiosAsync(int cantidad);
    Task<List<ItemDto>> ObtenerDistribucionPorEstadoAsync();
    Task<List<ItemDto>> ObtenerDistribucionTipoCespedAsync();
    Task<List<ItemDto>> ObtenerMayorCapacidadAsync(int capacidad);
    Task<List<ItemDto>> ObtenerMenorCapacidadAsync(int capacidad);
    Task<List<ItemDto>> ObtenerEstadiosMasAntiguosAsync(int cantidad);
    Task<List<ItemDto>> ObtenerEstadiosMasNuevosAsync(int cantidad);


}
