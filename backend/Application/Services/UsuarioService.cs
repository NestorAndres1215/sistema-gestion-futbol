using Application.Common.Exceptions;
using Application.Dto;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Enums;

namespace Application.Services;

public class UsuarioService : IUsuarioService
{
    private readonly IUsuarioRepository _repo;
    private readonly IPasswordHasher _hasher;

    public UsuarioService(IUsuarioRepository repo, IPasswordHasher hasher)
    {
        _repo = repo;
        _hasher = hasher;
    }


    public async Task<Usuario> GetByIdAsync(int id)
    {
        return await _repo.GetByIdAsync(id);
    }

    public async Task<PagedResult<Usuario>> GetAllAsync(
          int page,
      int pageSize,
      string? search,
      string? estado,
      string? rol
    )
    {

        page = page < 1 ? 1 : page;
        pageSize = pageSize < 1 ? 10 : pageSize;

        if (pageSize > 100)
            pageSize = 100;

        search = search?.Trim();
        estado = estado?.Trim();

        if (!string.IsNullOrEmpty(estado))
            estado = estado.ToUpper();

        return await _repo.GetAllAsync(page, pageSize, search, estado,rol);
    }

    public async Task<Usuario> GetByEmailAsync(string email)
    {
        return await _repo.GetByEmailAsync(email);
    }

    public async Task<Usuario> UpdateAsync(int id, UsuarioDto user)
    {
        var entity = await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("Usuario no encontrado");

        entity.Username = user.Username;
        entity.Email = user.Email;

        return await _repo.UpdateAsync(entity);
 
    }

    public async Task<Usuario> UpdateEstadoAsync(int id)
    {
        var entity = await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("Usuario no encontrado");

        entity.Estado = entity.Estado == Estado.Inactivo
            ? Estado.Activo
            : Estado.Inactivo;

        return await _repo.UpdateAsync(entity);
    }
}   