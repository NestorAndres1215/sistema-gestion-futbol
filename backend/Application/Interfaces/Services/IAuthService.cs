using Application.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Services
{
    public interface IAuthService
    {
        Task<Usuario> Register(RegisterDto dto);
        Task<AuthResponseDto> Login(LoginDto dto);
    }
}
