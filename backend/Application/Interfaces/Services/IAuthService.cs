using Application.Dto;
using System.Security.Claims;


namespace Application.Interfaces.Services;

public interface IAuthService
{
    Task<Usuario> Register(RegisterDto dto);
    Task<Usuario> RegisterAdmin(RegisterDto dto);
    Task<Usuario> UpsatePassword(int id,PasswordDto dto);
    Task<AuthResponseDto> Login(LoginDto dto);
    Task<Usuario?> GetCurrentUserFromClaims(ClaimsPrincipal user);

}


