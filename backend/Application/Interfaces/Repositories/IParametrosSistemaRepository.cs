using Application.Dto;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Repositories;

public interface IParametrosSistemaRepository
{
    Task<PagedResult<ParametrosSistema>> GetAllAsync(int page,
     int pageSize,
     string? search,
     string? categoria,
     string? tipoDato,
     string? estado);

    Task<ParametrosSistema?> GetByIdAsync(int id);

    Task<ParametrosSistema?> GetByClaveAsync(string clave);

    Task<ParametrosSistema> AddAsync(ParametrosSistema parametro);

    Task<ParametrosSistema> UpdateAsync(ParametrosSistema parametro);
}