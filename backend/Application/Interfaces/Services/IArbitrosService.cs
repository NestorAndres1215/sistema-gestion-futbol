using Application.Dto;
using Application.Dto.estadisticas;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Services;

public interface IArbitrosService
{
    Task<PagedResult<Arbitros>> GetAllAsync(
        int page,int pageSize, string? search,
        string? categoria, string? pais,string? estado);

    Task<Arbitros> AddAsync(ArbitrosDto arbitros);
    Task<Arbitros> UpdateAsync(int id,ArbitrosDto arbitros);
    Task<Arbitros> GetByIdAsync(int id);
    Task<AverageDto> ObtenerTotalArbitrosAsync();

    Task<AverageDto> ObtenerArbitrosActivosAsync();

    Task<AverageDto> ObtenerPrecisionPromedioAsync();

    Task<List<ItemDto>> ObtenerArbitrosPorPaisAsync();
    Task<List<ItemDto>> ObtenerArbitrosConMasPartidosAsync(int cantidad);
    Task<List<ItemDto>> ObtenerRolArbitralAsync();
    Task<List<ItemDto>> ObtenerEstadoFisicoAsync();
    Task<List<ItemDto>> ObtenerDebutsPorAnioAsync();
    Task<List<ItemDto>> ObtenerArbitrosConMejorNivelAsync(int cantidad);
    Task<List<ItemDto>> ObtenerArbitrosActivosVsRetiradosAsync();
    Task<AverageDto> ObtenerEdadPromedioAsync();
    Task<List<ItemDto>> ObtenerPromedioTarjetasAsync();
    Task<List<ItemDto>> ObtenerTopExperienciaAsync(int cantidad);

    Task<List<ItemDto>> ObtenerTopReputacionAsync(int cantidad);

}
