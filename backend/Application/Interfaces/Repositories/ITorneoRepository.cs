using Application.Dto;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Repositories;

public interface ITorneoRepository
{
    Task<PagedResult<Torneo>> GetAllAsync(int page, int pageSize, string? search, string? tipo, string? estado);
    Task<Torneo> AddAsync(Torneo torneo);
    Task<Torneo> UpdateAsync(Torneo torneo);
    Task<Torneo?> GetByIdAsync(int id);
    Task<Torneo?> GetByNombreAsync(string nombre);

}
