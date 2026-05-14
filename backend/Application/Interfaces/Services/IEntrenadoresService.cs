using Application.Dto;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Services;

public interface IEntrenadoresService
{
    Task<PagedResult<Entrenadores>> GetAllAsync(
      int page, int pageSize, string? search,
      string? estiloJuego, string? pais, string? estado);

    Task<Entrenadores> AddAsync(EntrenadoresDto entrenadores);
    Task<Entrenadores> UpdateAsync(int id, EntrenadoresDto entrenadores);
    Task<Entrenadores> GetByIdAsync(int id);


}
