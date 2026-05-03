using Application.Common.Exceptions;
using Application.Dto;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Enums;
using System;
using System.Collections.Generic;


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
    /*
    public async Task<List<Usuario>> GetAllAsync()
    {
        return await _repo.GetAllAsync();
    }*/
    public async Task<PagedResult<Usuario>> GetAllAsync(
       int page,
       int pageSize,
       string? search
   )
    {
   
        return await _repo.GetAllAsync(page, pageSize, search);
    }

    public async Task<Usuario> GetByEmailAsync(string email)
    {
        return await _repo.GetByEmailAsync(email);
    }

    public async Task UpdateAsync(int id, UsuarioDto user)
    {
        var entity = await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("Usuario no encontrado");

        entity.Username = user.Username;
        entity.Email = user.Email;

        await _repo.UpdateAsync(entity);
    }

    public async Task UpdateEstadoAsync(int id, string estado)
    {
        await _repo.UpdateEstadoAsync(id, estado);
    }
}