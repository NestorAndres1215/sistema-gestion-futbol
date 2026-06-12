using Application.Common.Models;
using Application.Features.Entrenadores.Dto;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Features.Entrenadores.Interfaces;

public interface IEntrenadorService
{
    Task<PagedResult<EntrenadoresResponse>> GetAllAsync(
      int page, int pageSize, string? search,
      string? estiloJuego, string? pais, string? estado);

    Task<Entrenador> AddAsync(EntrenadoresRequest entrenadores);
    Task<Entrenador> UpdateAsync(int id, EntrenadoresRequest entrenadores);
    Task<Entrenador> GetByIdAsync(int id);
    Task<List<EntrenadorComboRequest>> GetComboAsync();

}
