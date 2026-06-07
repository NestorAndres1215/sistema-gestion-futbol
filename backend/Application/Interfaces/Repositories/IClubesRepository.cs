using Application.Dto.clubes;
using Application.Dto.config;
using Application.Dto.selecciones;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Repositories;

public interface IClubesRepository
{
    Task<PagedResult<ClubesResponse>> GetAllAsync(int page,
    int pageSize,
    string? search,
    string? confederacion,
    string? estado);

    Task<Clubes> AddAsync(Clubes clubes);
    Task<Clubes> UpdateAsync(Clubes clubes);
    Task<Clubes?> GetByIdAsync(int id);
    Task<Clubes?> GetByNombreAsync(string nombre);
    Task<Clubes?> GetByPaisAsync(string pais);
    Task<Clubes?> GetByCodigoFifaAsync(string codigoFifa);
    Task<Clubes?> GetByConfederacionAsync(string confederacion);

}
