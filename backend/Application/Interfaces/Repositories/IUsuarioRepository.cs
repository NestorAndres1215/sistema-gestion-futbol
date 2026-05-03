using Application.Dto;
using Domain.Entities;
using Domain.Enums;

namespace Application.Interfaces.Repositories;

public interface IUsuarioRepository
{
    Task<Usuario> GetByEmailAsync(string email);

    Task<Usuario> GetByIdAsync(int id);
    /*
    Task<List<Usuario>> GetAllAsync();*/

    Task<PagedResult<Usuario>> GetAllAsync(int page, int pageSize, string? search);

    Task AddAsync(Usuario user);

    Task UpdateAsync(Usuario user);

    Task UpdateEstadoAsync(int id, String estado);
}