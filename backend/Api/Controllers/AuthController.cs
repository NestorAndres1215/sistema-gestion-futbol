using Application.Dto;
using Application.Interfaces.Services;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;


namespace FootballManagerSystem.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth;

    public AuthController(IAuthService auth)
    {
        _auth = auth;
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var user = await _auth.GetCurrentUserFromClaims(User);

        if (user == null)
            return Unauthorized();

        return Ok(new
        {
            id = user.Id,
            email = user.Email,
            role = user.Rol,
            nombre = user.Username
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var result = await _auth.Register(dto);
        return Ok(result);
    }


    [HttpPost("register/admin")]
    public async Task<IActionResult> RegisterAdmin(RegisterDto dto)
    {
        var result = await _auth.RegisterAdmin(dto);
        return Ok(result);
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var result = await _auth.Login(dto);
        return Ok(result);
    }
}