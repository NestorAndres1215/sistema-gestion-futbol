
using Application.Dto;

namespace Application.Interfaces.Services;

public interface IUsuarioService
{
    Task<Usuario?> GetByIdAsync(int id);
    Task<PagedResult<Usuario>> GetAllAsync(int page,int pageSize,string? search,string? estado,string? rol);
    Task<Usuario> GetByEmailAsync(string email);
    Task<Usuario> UpdateAsync(int id, UsuarioDto user);
    Task<Usuario> UpdateEstadoAsync(int id);
}
