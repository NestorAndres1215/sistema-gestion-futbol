using Application.Dto.clubes;
using Application.Dto.config;
using Application.Dto.selecciones;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Services;

public interface IClubesService
{
    Task<PagedResult<ClubesResponse>> GetAllAsync(int page,
    int pageSize,
    string? search,
    string? confederacion,
    string? estado);
    Task<Clubes> AddAsync(ClubesRequest clubes);
    Task<Clubes> UpdateAsync(int id, ClubesRequest clubes);
    Task<Clubes?> GetByIdAsync(int id);
    Task<Clubes?> GetByNombreAsync(string nombre);
    Task<Clubes?> GetByConfederacionAsync(string confederacion);
}
