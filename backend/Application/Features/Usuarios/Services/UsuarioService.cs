using Application.Common.Exceptions;
using Application.Common.Helpers;
using Application.Common.Models;
using Application.Features.Arbitros.Validators;
using Application.Features.Usuarios.Dto;
using Application.Features.Usuarios.Interfaces;
using Application.Features.Usuarios.Validators;
using Application.Interfaces.Repositories;
using Domain.Catalogs;
using FluentValidation;


namespace Application.Features.Usuarios.Services;

public class UsuarioService : IUsuarioService
{
    private readonly IUsuarioRepository _repo;
    private readonly IValidator<UsuarioRequest> _validator;

    public UsuarioService(
        IUsuarioRepository repo,
        IValidator<UsuarioRequest> validator)
    {
        _repo = repo;
        _validator = validator;
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

        ValidationHelper.Validar(user, _validator);

        var existeUsername = await _repo.GetByUsernameAsync(user.Username);
        if (existeUsername != null && existeUsername.Id != id)
            throw new ConflictException("El username ya está en uso");

        var existeEmail = await _repo.GetByEmailAsync(user.Email);
        if (existeEmail != null && existeEmail.Id != id)
            throw new ConflictException("El email ya está en uso");

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