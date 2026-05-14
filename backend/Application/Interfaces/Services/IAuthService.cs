using Application.Dto;


namespace Application.Interfaces.Services;

public interface IAuthService
{
    Task<Usuario> Register(RegisterDto dto);
    Task<Usuario> RegisterAdmin(RegisterDto dto);
    Task<AuthResponseDto> Login(LoginDto dto);
}


