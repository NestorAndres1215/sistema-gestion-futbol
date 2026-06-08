
using Application.Dto.Auth;
using System.Security.Claims;


namespace Application.Interfaces.Services;

public interface IAuthService
{
    Task<Usuario> Register(RegisterUsuarioRequest dto);
    Task<Usuario> RegisterAdmin(RegisterUsuarioRequest dto);
    Task<Usuario> UpsatePassword(int id,PasswordRequest dto);
    Task<AuthResponse> Login(LoginRequest dto);
    Task<UsuarioReponse?> GetCurrentUserFromClaims(ClaimsPrincipal user);

}


