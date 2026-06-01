using Application.Dto;
using Application.Dto.config;
using Application.Dto.estadisticas;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Services;

public interface IArbitrosService
{
    Task<PagedResult<Arbitros>> GetAllAsync(int page,int pageSize, string? search,string? categoria, string? pais,string? estado);
    Task<Arbitros> AddAsync(ArbitrosDto arbitros);
    Task<Arbitros> UpdateAsync(int id,ArbitrosDto arbitros);
    Task<Arbitros> GetByIdAsync(int id);
    Task<TotalCountResponse> ObtenerTotalArbitrosAsync();
    Task<TotalCountResponse> ObtenerArbitrosActivosAsync();
    Task<AverageResponse> ObtenerPrecisionPromedioAsync();
    Task<List<ItemResponse>> ObtenerArbitrosPorPaisAsync();
    Task<List<ItemResponse>> ObtenerArbitrosConMasPartidosAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerRolArbitralAsync();
    Task<List<ItemResponse>> ObtenerEstadoFisicoAsync();
    Task<List<ItemResponse>> ObtenerDebutsPorAnioAsync();
    Task<List<ItemResponse>> ObtenerArbitrosConMejorNivelAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerArbitrosActivosVsRetiradosAsync();
    Task<AverageResponse> ObtenerEdadPromedioAsync();
    Task<List<ItemResponse>> ObtenerPromedioTarjetasAsync();
    Task<List<ItemResponse>> ObtenerTopExperienciaAsync(int cantidad);
    Task<List<ItemResponse>> ObtenerTopReputacionAsync(int cantidad);
}
