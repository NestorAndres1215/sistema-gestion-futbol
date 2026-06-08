using Application.Dto.Clubes;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClubesController : ControllerBase
{
    private readonly IClubesService _service;

    public ClubesController(IClubesService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        int page = 1,
        int pageSize = 10,
        string? search = null,
        string? confederacion = null,
        string? estado = null)
    {
        var result = await _service.GetAllAsync(page, pageSize, search, confederacion, estado);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var club = await _service.GetByIdAsync(id);
        return Ok(club);
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Create([FromForm] ClubesRequest request)
    {
        var result = await _service.AddAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Update(int id, [FromForm] ClubesRequest request)
    {
        var result = await _service.UpdateAsync(id, request);
        return Ok(result);
    }

    [HttpGet("confederacion/{confederacion}")]
    public async Task<IActionResult> GetByConfederacion(string confederacion)
    {
        return Ok(await _service.GetByConfederacionAsync(confederacion));
    }

    [HttpGet("nombre/{nombre}")]
    public async Task<IActionResult> GetByNombre(string nombre)
    {
        return Ok(await _service.GetByNombreAsync(nombre));
    }
}