using Application.Dto;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/estadios")]
public class EstadiosController : Controller
{
    private readonly IEstadioService _service;

    public EstadiosController(IEstadioService service)
    {
        _service = service;
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Registrar([FromForm] EstadioDTo dto)
    { 
        return Ok(await _service.AddAsync(dto));
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] string? tipoCesped = null,
        [FromQuery] string? pais = null,
        [FromQuery] int? anio = null,
        [FromQuery] string? estado = null
    )
    {
        var result = await _service.GetAllAsync(page, pageSize,search,tipoCesped,pais,anio,estado);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }

    [HttpGet("anio")]
    public async Task<IActionResult> GetAniosAsync()
    {
        return Ok(await _service.GetAniosAsync());
    }
}
