using Application.Common.Estadisticas;
using Application.Common.Models;
using Application.Features.Estadios.Dto;
using Domain.Entities;


namespace Application.Features.Estadios.Interfaces;

public interface IEstadioService
{
    Task<Estadio> AddAsync(EstadioRequest estadioDTo);
    Task<Estadio> UpdateAsync(int id,EstadioRequest estadioDTo);
    Task<PagedResult<EstadioResponse>> GetAllAsync(int page,int pageSize,string? search,string? tipoCesped,string? pais,int? anio, string? estado);
    Task<Estadio?> GetByIdAsync(int id);
    Task<List<Estadio>> GetByPaisAsync(string pais);
    Task<Estadio?> GetByNombreAsync(string nombre);
    Task<List<int>> GetAniosAsync();
    Task<TotalCountResponse> ObtenerTotalEstadiosAsync();
    Task<AverageResponse> ObtenerPromedioCapacidadAsync();
    Task<TotalCountResponse> ObtenerTotalPaisesConEstadiosAsync();
    Task<List<ItemResponse>> ObtenerPaisesConMasEstadiosAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerPaisesConMenosEstadiosAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerCiudadesConMasEstadiosAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerCiudadesConMenosEstadiosAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerDistribucionPorEstadoAsync();
    Task<List<ItemResponse>> ObtenerDistribucionTipoCespedAsync();
    Task<List<ItemResponse>> ObtenerMayorCapacidadAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerMenorCapacidadAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerEstadiosMasAntiguosAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerEstadiosMasNuevosAsync(int cantidad);

}
