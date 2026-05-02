using Application.Common.Exceptions;
using Application.Dto;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;

namespace Application.Services;

public class AuthService : IAuthService
{
    private readonly IUsuarioRepository _repo;
    private readonly IPasswordHasher _hasher;
    private readonly IJwtTokenGenerator _jwt;

    public AuthService(
        IUsuarioRepository repo,
        IPasswordHasher hasher,
        IJwtTokenGenerator jwt)
    {
        _repo = repo;
        _hasher = hasher;
        _jwt = jwt;
    }

    public async Task<Usuario> Register(RegisterDto dto)
    {
    
        var existingUser = await _repo.GetByEmailAsync(dto.Email);

        if (existingUser != null)
            throw new BadRequestException("El email ya está registrado");

        var user = new Usuario
        {
            Username = dto.Username,
            Email = dto.Email,
            Password = _hasher.Hash(dto.Password),
            RolId = 2,
            Estado = Estado.Activo
        };

        await _repo.AddAsync(user);

        return user;
    }

    public async Task<AuthResponseDto> Login(LoginDto dto)
    {
        var user = await _repo.GetByEmailAsync(dto.Email);

        if (user == null)
            throw new Exception("Usuario no existe");

        if (!_hasher.Verify(dto.Password, user.Password))
            throw new Exception("Password incorrecta");

        if (user.Estado != Estado.Activo)
            throw new Exception("Usuario bloqueado o Inactivo");

        return new AuthResponseDto
        {
            Username = user.Username,
            Token = _jwt.GenerateToken(user.Id, user.Email, user.Rol.Nombre)
        };
    }
}