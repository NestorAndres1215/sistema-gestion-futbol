using Application.Dto;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FootballManagerSystem.API.Controllers;

[Authorize]
[ApiController]
[Route("api/usuarios")]
public class UsuarioController : ControllerBase
{
    private readonly IUsuarioService _service;

    public UsuarioController(IUsuarioService service)
    {
        _service = service;
    }


    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] string? estado = null,
         [FromQuery] string? rol = null

    )
    {
        var result = await _service.GetAllAsync(page, pageSize, search,estado, rol);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }

    [HttpGet("email/{email}")]
    public async Task<IActionResult> GetByEmail(string email)
    {
        return Ok(await _service.GetByEmailAsync(email));
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UsuarioDto user)
    {
        return Ok(await _service.UpdateAsync(id, user));
    }

    [HttpPut("estado/{id}")]
    public async Task<IActionResult> UpdateEstado(int id)
    {
        return Ok(await _service.UpdateEstadoAsync(id));
    }
}