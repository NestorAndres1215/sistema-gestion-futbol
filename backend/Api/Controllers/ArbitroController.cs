using Application.Dto;
using Application.Dto.estadisticas;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/arbitros")]
public class ArbitroController : ControllerBase
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

    [HttpPut("{id}")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Actualizar(int id, [FromForm] ArbitrosDto dto)
    {
        return Ok(await _service.UpdateAsync(id, dto));
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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }
    // Controller

    [HttpGet("total-arbitros")]
    public async Task<ActionResult<AverageDto>> ObtenerTotalArbitros()
    {
        return Ok(await _service.ObtenerTotalArbitrosAsync());
    }

    [HttpGet("arbitros-activos")]
    public async Task<ActionResult<AverageDto>> ObtenerArbitrosActivos()
    {
        return Ok(await _service.ObtenerArbitrosActivosAsync());
    }

    [HttpGet("precision-promedio")]
    public async Task<ActionResult<AverageDto>> ObtenerPrecisionPromedio()
    {
        return Ok(await _service.ObtenerPrecisionPromedioAsync());
    }

    [HttpGet("reputacion-promedio")]
    public async Task<ActionResult<AverageDto>> ObtenerReputacionPromedio()
    {
        return Ok(await _service.ObtenerReputacionPromedioAsync());
    }
}
