using Application.Dto;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Repositories;

public interface IEntrenadoresRepository
{
    Task<PagedResult<Entrenadores>> GetAllAsync(int page,
         int pageSize,
         string? search,
         string? estiloJuego,
         string? pais,
         string? estado);

    Task<Entrenadores> AddAsync(Entrenadores entrenadores);
    Task<Entrenadores> UpdateAsync(Entrenadores entrenadores);
    Task<Entrenadores?> GetByIdAsync(int id);
}
