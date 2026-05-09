using Application.Dto;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Services;

public interface IEstadioService
{
    Task<Estadio> AddAsync(EstadioDTo estadioDTo);

    Task<PagedResult<Estadio>> GetAllAsync(int page,
         int pageSize,
         string? search,
         string? tipoCesped,
         string? pais,
         int? anio,
         string? estado);

    Task<Estadio?> GetByIdAsync(int id);
    Task<Estadio?> GetByNombreAsync(string nombre);
    Task<List<int>> GetAniosAsync();
}
