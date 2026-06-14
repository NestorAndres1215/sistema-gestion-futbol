using Application.Common.Exceptions;
using Application.Common.Helpers;
using Application.Common.Services;
using Application.Features.Auth.Dto;
using Application.Features.Auth.Interfaces;
using Application.Features.Auth.Validators;
using Application.Features.Usuarios.Dto;
using Application.Interfaces.Repositories;
using Domain.Catalogs;
using FluentValidation;
using System.Security.Claims;

namespace Application.Features.Auth.Services;

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
    // REGISTRO DE USUARIOS

    public async Task<Usuario> Register(RegisterUsuarioRequest dto)
    {
        Validar(dto, new RegistroUsuarioValidators());

        var existingEmail = await _repo.GetByEmailAsync(dto.Email);
        if (existingEmail != null)
            throw new ConflictException("El email ya está registrado");

        var existingUser = await _repo.GetByUsernameAsync(dto.Username);
        if (existingUser != null)
            throw new ConflictException("El nombre de usuario ya existe");

        var password = _hasher.Hash(dto.Password);

        var user = new Usuario
        {
            Username = dto.Username,
            Email = dto.Email,
            Password = password,
            RolId = 2,
            Estado = Estado.Activo
        };

        return  await _repo.AddAsync(user);
    }

    public async Task<Usuario> RegisterAdmin(RegisterUsuarioRequest dto)
    {
        Validar(dto, new RegistroUsuarioValidators());

        var existingEmail = await _repo.GetByEmailAsync(dto.Email);
        if (existingEmail != null)
            throw new ConflictException("El email ya está registrado");

        var existingUser = await _repo.GetByUsernameAsync(dto.Username);
        if (existingUser != null)
            throw new ConflictException("El nombre de usuario ya existe");

        var password = _hasher.Hash(dto.Password);

        var user = new Usuario
        {
            Username = dto.Username,
            Email = dto.Email,
            Password = password,
            RolId = 1,
            Estado = Estado.Activo
        };


        return await _repo.AddAsync(user);
    }

    // LOGIN
    public async Task<AuthResponse> Login(LoginRequest dto)
    {
        Validar(dto, new AuthValidators());

        var user = await _repo.GetByEmailAsync(dto.Email);

        if (user == null)
            throw new NotFoundException("Correo no existe");

        if (!_hasher.Verify(dto.Password, user.Password))
            throw new BadRequestException("Password incorrecta");

        if (user.Estado != Estado.Activo)
            throw new UnauthorizedException("Usuario bloqueado o Inactivo");

        var token = _jwt.GenerateToken(
            user.Id,
            user.Email,
            user.Rol?.Nombre ?? "");

        return new AuthResponse
        {
            Username = user.Username,
            Token = token,
            Rol = user.Rol?.Nombre ?? ""
        };
    }

    // USUARIO ACTUAL LOGUEADO
    public async Task<UsuarioReponse?> GetCurrentUserFromClaims(ClaimsPrincipal user)
    {
        var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrWhiteSpace(userIdClaim))
            throw new UnauthorizedException("Token inválido.");

        var userId = int.Parse(userIdClaim);

        var usuario = await _repo.GetByIdAsync(userId);

        if (usuario == null)
            throw new NotFoundException("Usuario no encontrado.");

        return new UsuarioReponse
        {
            Id = usuario.Id,
            UserName = usuario.Username ?? "",
            Email = usuario.Email ?? "",
            Role = usuario.Rol?.Nombre ?? ""
        };
    }

   // ACTUALIZAR CONTRASEÑA
    public async Task<Usuario> UpdatePassword(int id, PasswordRequest dto)
    {
        var entity = await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("Usuario no encontrado");

        if (!_hasher.Verify(dto.PasswordActual, entity.Password))
            throw new UnauthorizedException("Credenciales inválidas");


        ValidationHelper.Validar(dto, new PasswordValidators());

        entity.Password = _hasher.Hash(dto.PasswordNueva);


        return await _repo.UpdateAsync(entity);
    }

    private void Validar<T>(T dto, IValidator<T> validator)
    {
        var result = validator.Validate(dto);

        if (!result.IsValid)
            throw new BadRequestException(result.Errors.First().ErrorMessage);
    }

}