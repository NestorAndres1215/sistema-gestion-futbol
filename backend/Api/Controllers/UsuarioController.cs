using Application.Dto;
using Application.Interfaces.Services;
using Application.Services;
using Domain.Entities;
using Domain.Enums;
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

    [HttpGet("hola")]
    public IActionResult Hola()
    {
        return Ok("Hola mundo");
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null
    )
    {
        var result = await _service.GetAllAsync(page, pageSize, search);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var user = await _service.GetByIdAsync(id);

        if (user == null)
            return NotFound("Usuario no encontrado");

        return Ok(user);
    }

    [HttpGet("email/{email}")]
    public async Task<IActionResult> GetByEmail(string email)
    {
        var user = await _service.GetByEmailAsync(email);

        if (user == null)
            return NotFound("Usuario no encontrado");

        return Ok(user);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UsuarioDto user)
    {
        await _service.UpdateAsync(id, user);
        return Ok("Usuario actualizado");
    }


    [HttpPatch("estado/{id}")]
    public async Task<IActionResult> UpdateEstado(int id, [FromQuery] string estado)
    {
        await _service.UpdateEstadoAsync(id, estado);
        return Ok("Estado actualizado");
    }
}