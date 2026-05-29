using Application.Dto;
using Application.Dto.estadisticas;
using Domain.Entities;


namespace Application.Interfaces.Services;

public interface IEstadioService
{
    Task<Estadio> AddAsync(EstadioDTo estadioDTo);
    Task<Estadio> UpdateAsync(int id,EstadioDTo estadioDTo);
    Task<PagedResult<Estadio>> GetAllAsync(int page,int pageSize,string? search,string? tipoCesped,string? pais,int? anio, string? estado);
    Task<Estadio?> GetByIdAsync(int id);
    Task<List<Estadio>> GetByPaisAsync(string pais);
    Task<Estadio?> GetByNombreAsync(string nombre);
    Task<List<int>> GetAniosAsync();
    Task<TotalCountDto> ObtenerTotalEstadiosAsync();
    Task<AverageDto> ObtenerPromedioCapacidadAsync();
    Task<TotalCountDto> ObtenerTotalPaisesConEstadiosAsync();
    Task<List<ItemDto>> ObtenerPaisesConMasEstadiosAsync(int cantidad);
    Task<List<ItemDto>> ObtenerPaisesConMenosEstadiosAsync(int cantidad);
    Task<List<ItemDto>> ObtenerCiudadesConMasEstadiosAsync(int cantidad);
    Task<List<ItemDto>> ObtenerCiudadesConMenosEstadiosAsync(int cantidad);
    Task<List<ItemDto>> ObtenerDistribucionPorEstadoAsync();
    Task<List<ItemDto>> ObtenerDistribucionTipoCespedAsync();
    Task<List<ItemDto>> ObtenerMayorCapacidadAsync(int cantidad);
    Task<List<ItemDto>> ObtenerMenorCapacidadAsync(int cantidad);
    Task<List<ItemDto>> ObtenerEstadiosMasAntiguosAsync(int cantidad);
    Task<List<ItemDto>> ObtenerEstadiosMasNuevosAsync(int cantidad);

}
