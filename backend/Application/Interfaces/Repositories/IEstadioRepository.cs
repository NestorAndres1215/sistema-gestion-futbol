using Application.Common.Estadisticas;
using Application.Common.Models;
using Application.Features.Estadios.Dto;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface IEstadioRepository
{
    Task<PagedResult<EstadioResponse>> GetAllAsync(int page,int pageSize, string? search, string? tipoCesped, string? pais, int? anio, string? estado);
    Task<Estadio> AddAsync(Estadio estadio);
    Task<Estadio> UpdateAsync(Estadio torneo);
    Task<Estadio?> GetByIdAsync(int id);
    Task<Estadio?> GetByNombreAsync(string nombre);
    Task<List<int>> GetAniosAsync();
    Task<List<Estadio>> GetByPaisAsync(string pais);
    Task<int> ObtenerTotalEstadiosAsync();
    Task<double> ObtenerPromedioCapacidadAsync();
    Task<int> ObtenerTotalPaisesConEstadiosAsync();
    Task<List<ItemResponse>> ObtenerPaisesConMasEstadiosAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerPaisesConMenosEstadiosAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerCiudadesConMasEstadiosAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerCiudadesConMenosEstadiosAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerDistribucionPorEstadoAsync();
    Task<List<ItemResponse>> ObtenerDistribucionTipoCespedAsync();
    Task<List<ItemResponse>> ObtenerMayorCapacidadAsync(int capacidad);
    Task<List<ItemResponse>> ObtenerMenorCapacidadAsync(int capacidad);
    Task<List<ItemResponse>> ObtenerEstadiosMasAntiguosAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerEstadiosMasNuevosAsync(int cantidad);


}
