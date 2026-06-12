using Application.Features.Auth.Dto;
using Application.Features.Usuarios.Dto;
using System.Security.Claims;


namespace Application.Features.Auth.Interfaces;

public interface IAuthService
{
    Task<Usuario> Register(RegisterUsuarioRequest dto);
    Task<Usuario> RegisterAdmin(RegisterUsuarioRequest dto);
    Task<Usuario> UpsatePassword(int id,PasswordRequest dto);
    Task<AuthResponse> Login(LoginRequest dto);
    Task<UsuarioReponse?> GetCurrentUserFromClaims(ClaimsPrincipal user);

}


