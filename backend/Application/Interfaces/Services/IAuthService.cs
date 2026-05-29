using Application.Dto;
using Application.Dto.auth;
using System.Security.Claims;


namespace Application.Interfaces.Services;

public interface IAuthService
{
    Task<Usuario> Register(RegisterDto dto);
    Task<Usuario> RegisterAdmin(RegisterDto dto);
    Task<Usuario> UpsatePassword(int id,PasswordRequest dto);
    Task<AuthResponse> Login(LoginRequest dto);
    Task<Usuario?> GetCurrentUserFromClaims(ClaimsPrincipal user);

}


