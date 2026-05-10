using Application.Dto;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/arbitros")]
public class ArbitroController : Controller
{
    private readonly IArbitrosService _service;

    public ArbitroController(IArbitrosService service)
    {
        _service = service;
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Registrar([FromForm] ArbitrosDto dto)
    {
        return Ok(await _service.AddAsync(dto));
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] string? categoria = null,
        [FromQuery] string? pais = null,
        [FromQuery] string? estado = null
    )
    {
        var result = await _service.GetAllAsync(page, pageSize, search, categoria, pais,  estado);
        return Ok(result);
    }
}
