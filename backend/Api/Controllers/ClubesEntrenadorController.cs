
using Application.Features.ClubesEntrenadores.Dto;
using Application.Features.ClubesEntrenadores.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/clubes-entrenador")]
[ApiController]
public class ClubesEntrenadorController : ControllerBase
{
    private readonly IClubEntrenadorService _service;

    public ClubesEntrenadorController(IClubEntrenadorService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] ClubEntrenadorRequest request)
    {
        return Ok(await _service.AddAsync(request));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] ClubEntrenadorRequest request)
    {
        return Ok(await _service.UpdateAsync(id, request));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }

    [HttpGet]
    public async Task<IActionResult> ListarPorClubes([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? clubes = null)
    {
        return Ok(await _service.ListarPorClub(page, pageSize, clubes));
    }

    [HttpGet("entrenadores")]
    public async Task<IActionResult> GetEntrenadores()
    {
        return Ok(await _service.GetEntrenadoresAsync());
    }

    [HttpGet("clubes")]
    public async Task<IActionResult> ListarPorClubesNombre([FromQuery] string nombre)
    {
        return Ok(await _service.ListarPorClubNombre(nombre));
    }

    [HttpPut("despedir/{id}")]
    public async Task<IActionResult> Despedir(int id)
    {
        return Ok(await _service.DespedirAsync(id));
    }
}
