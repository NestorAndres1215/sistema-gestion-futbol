using Application.Common.Models;
using Application.Features.Usuarios.Dto;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface IUsuarioRepository
{
    Task<Usuario?> GetByEmailAsync(string email);
    Task<Usuario?> GetByUsernameAsync(string username);
    Task<Usuario?> GetByIdAsync(int id);
    Task<PagedResult<UsuarioReponse>> GetAllAsync(int page, int pageSize, string? search, string? estado, string? rol);
    Task <Usuario> AddAsync(Usuario user);
    Task<Usuario> UpdateAsync(Usuario user);

}
