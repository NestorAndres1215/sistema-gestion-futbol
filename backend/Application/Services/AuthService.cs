using Application.Common.Exceptions;
using Application.Dto;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;
using System.Security.Claims;

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
        var existingEmail = await _repo.GetByEmailAsync(dto.Email);

        if (existingEmail != null)
            throw new BadRequestException("El email ya está registrado");

        var existingUser = await _repo.GetByUsernameAsync(dto.Username);

        if (existingUser != null)
            throw new BadRequestException("El nombre de usuario ya existe");

        ValidatePassword(dto.Password);


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

    private void ValidatePassword(string password)
    {
        if (string.IsNullOrWhiteSpace(password) ||
            password.Length < 8 ||
            !password.Any(char.IsLetter) ||
            !password.Any(char.IsDigit))
        {
            throw new BadRequestException(
                "La contraseña debe tener al menos 8 caracteres e incluir letras y números"
            );
        }
    }

    public async Task<AuthResponseDto> Login(LoginDto dto)
    {
        var user = await _repo.GetByEmailAsync(dto.Email);

        if (user == null)
            throw new NotFoundException("Usuario no existe");

        if (!_hasher.Verify(dto.Password, user.Password))
            throw new BadRequestException("Password incorrecta");

        if (user.Estado != Estado.Activo)
            throw new UnauthorizedException("Usuario bloqueado o Inactivo");

        return new AuthResponseDto
        {
            Username = user.Username,
            Token = _jwt.GenerateToken(user.Id, user.Email, user.Rol.Nombre),
            Rol= user.Rol.Nombre
        };
    }

    public async Task<Usuario> RegisterAdmin(RegisterDto dto)
    {
        var existingEmail = await _repo.GetByEmailAsync(dto.Email);

        if (existingEmail != null)
            throw new BadRequestException("El email ya está registrado");

        var existingUser = await _repo.GetByUsernameAsync(dto.Username);

        if (existingUser != null)
            throw new BadRequestException("El nombre de usuario ya existe");
        ValidatePassword(dto.Password);


        var user = new Usuario
        {
            Username = dto.Username,
            Email = dto.Email,
            Password = _hasher.Hash(dto.Password),
            RolId = 1,
            Estado = Estado.Activo
        };

        await _repo.AddAsync(user);

        return user;
    }

    public async Task<Usuario?> GetCurrentUserFromClaims(ClaimsPrincipal user)
    {
        var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
            return null;

        var userId = int.Parse(userIdClaim);

        return await _repo.GetByIdAsync(userId);
    }

    public async Task<Usuario> UpsatePassword(int id, PasswordDto dto)
    {
        var entity = await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("Usuario no encontrado");

        var passwordActualCorrecta = _hasher.Verify(
            dto.PasswordActual,
            entity.Password
        );

        if (!passwordActualCorrecta)
            throw new BadRequestException(
                "La contraseña actual es incorrecta"
            );

        if (dto.PasswordActual == dto.PasswordNueva)
            throw new BadRequestException(
                "La nueva contraseña no puede ser igual a la actual"
            );

        if (dto.PasswordNueva != dto.PasswordConfirmacion)
            throw new BadRequestException(
                "La confirmación de contraseña no coincide"
            );

        ValidatePassword(dto.PasswordNueva);

        entity.Password = _hasher.Hash(dto.PasswordNueva);

        await _repo.UpdateAsync(entity);

        return entity;
    }
}