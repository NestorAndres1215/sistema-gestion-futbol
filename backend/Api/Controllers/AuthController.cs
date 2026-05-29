using Application.Dto;
using Application.Dto.auth;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


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
            nombre = user.Username,
            password=user.Password
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
    public async Task<IActionResult> Login(LoginRequest dto)
    {
        var result = await _auth.Login(dto);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePassword(
        int id,
        [FromBody] PasswordRequest dto)
    {
        var result = await _auth.UpsatePassword(id, dto);

        return Ok(result);
    }
}