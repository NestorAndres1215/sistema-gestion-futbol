using Application.Dto.config;
using Application.Dto.entrenadores;
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

    Task<Entrenadores> AddAsync(EntrenadoresRequest entrenadores);
    Task<Entrenadores> UpdateAsync(int id, EntrenadoresRequest entrenadores);
    Task<Entrenadores> GetByIdAsync(int id);
    Task<List<EntrenadorComboRequest>> GetComboAsync();

}
