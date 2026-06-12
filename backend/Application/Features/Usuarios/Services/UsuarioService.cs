using Application.Common.Exceptions;
using Application.Common.Models;
using Application.Features.Usuarios.Dto;
using Application.Features.Usuarios.Interfaces;
using Application.Interfaces.Repositories;
using Domain.Catalogs;


namespace Application.Features.Usuarios.Services;

public class UsuarioService : IUsuarioService
{
    private readonly IUsuarioRepository _repo;
  

    public UsuarioService(IUsuarioRepository repo)
    {
        _repo = repo;
    }

    public async Task<Usuario> GetByIdAsync(int id)
    {
        return await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("Usuario no encontrado");
    }

    public async Task<PagedResult<UsuarioReponse>> GetAllAsync( int page,int pageSize,string? search, string? estado,string? rol)
    {
        return await _repo.GetAllAsync(page, pageSize, search, estado,rol);
    }

    public async Task<Usuario> GetByEmailAsync(string email)
    {
        return await _repo.GetByEmailAsync(email)
            ?? throw new NotFoundException("Usuario no encontrado");
    }

    public async Task<Usuario> UpdateAsync(int id, UsuarioRequest user)
    {
        var entity = await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("Usuario no encontrado");

        await ValidarDuplicadosAsync(id, user);

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

    private async Task ValidarDuplicadosAsync(int id, UsuarioRequest user)
    {
        if (string.IsNullOrWhiteSpace(user.Username))
            throw new BadRequestException("Username requerido");

        if (string.IsNullOrWhiteSpace(user.Email))
            throw new BadRequestException("Email requerido");

        var existeUsername = await _repo.GetByUsernameAsync(user.Username);

        if (existeUsername != null && existeUsername.Id != id)
            throw new BadRequestException("El username ya está en uso");

        var existeEmail = await _repo.GetByEmailAsync(user.Email);

        if (existeEmail != null && existeEmail.Id != id)
            throw new BadRequestException("El email ya está en uso");
    }

}   