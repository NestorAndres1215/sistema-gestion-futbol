using Application.Dto;
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
}
