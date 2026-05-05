using Application.Dto;
using Domain.Entities;
using Domain.Enums;

namespace Application.Interfaces.Repositories;

public interface IUsuarioRepository
{
    Task<Usuario?> GetByEmailAsync(string email);

    Task<Usuario?> GetByIdAsync(int id);

    Task<PagedResult<Usuario>> GetAllAsync(int page,
      int pageSize,
      string? search,
      string? estado,
      string? rol);

    Task AddAsync(Usuario user);

    Task <Usuario> UpdateAsync(Usuario user);

   
}