using Application.Dto.Torneo;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Authorize]
[ApiController]
[Route("api/torneos")]
public class TorneoController : ControllerBase
{
    private readonly ITorneoService _service;

    public TorneoController(ITorneoService service)
    {
        _service = service;
    }


    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] string? tipo = null,
        [FromQuery] string? tipoParticipante = null,
        [FromQuery] string? estado = null)
    {
        var result = await _service.GetAllAsync(page, pageSize, search, tipo, tipoParticipante, estado);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] TorneoRequest torneoDto)
    {
        return Ok(await _service.AddAsync(torneoDto));
    }
}
