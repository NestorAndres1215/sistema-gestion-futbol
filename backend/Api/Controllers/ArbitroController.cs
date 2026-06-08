using Application.Dto.arbitros;
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
    public async Task<IActionResult> Registrar([FromForm] ArbitrosRequest dto)
    {
        return Ok(await _service.AddAsync(dto));
    }

    [HttpPut("{id}")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Actualizar(int id, [FromForm] ArbitrosRequest dto)
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

    [HttpGet("total-arbitros")]
    public async Task<ActionResult<TotalCountResponse>> ObtenerTotalArbitros()
    {
        return Ok(await _service.ObtenerTotalArbitrosAsync());
    }

    [HttpGet("arbitros-activos")]
    public async Task<ActionResult<AverageResponse>> ObtenerArbitrosActivos()
    {
        return Ok(await _service.ObtenerArbitrosActivosAsync());
    }

    [HttpGet("precision-promedio")]
    public async Task<ActionResult<AverageResponse>> ObtenerPrecisionPromedio()
    {
        return Ok(await _service.ObtenerPrecisionPromedioAsync());
    }


    [HttpGet("arbitros-por-pais")]
    public async Task<IActionResult> ObtenerArbitrosPorPais()
    {
        return Ok(await _service.ObtenerArbitrosPorPaisAsync());
    }


    [HttpGet("arbitros-mas-partidos")]
    public async Task<IActionResult> ObtenerArbitrosConMasPartidos([FromQuery] int cantidad = 5)
    {
        return Ok(await _service.ObtenerArbitrosConMasPartidosAsync(cantidad));
    }

    [HttpGet("rol-arbitral")]
    public async Task<IActionResult> ObtenerRolArbitral()
    {
        return Ok(await _service.ObtenerRolArbitralAsync());
    }

    [HttpGet("estado-fisico")]
    public async Task<IActionResult> ObtenerEstadoFisico()
    {
        return Ok(await _service.ObtenerEstadoFisicoAsync());
    }

    [HttpGet("debuts-por-anio")]
    public async Task<IActionResult> ObtenerDebutsPorAnio()
    {
        return Ok(await _service.ObtenerDebutsPorAnioAsync());
    }

    [HttpGet("mejor-nivel")]
    public async Task<IActionResult> ObtenerArbitrosConMejorNivel([FromQuery] int cantidad = 5)
    {
        return Ok(await _service.ObtenerArbitrosConMejorNivelAsync(cantidad));
    }

    [HttpGet("activos-vs-retirados")]
    public async Task<IActionResult> ObtenerArbitrosActivosVsRetirados()
    {
        return Ok(await _service.ObtenerArbitrosActivosVsRetiradosAsync());
    }

    [HttpGet("edad-promedio")]
    public async Task<IActionResult> ObtenerEdadPromedio()
    {
        return Ok(await _service.ObtenerEdadPromedioAsync());
    }

    [HttpGet("promedio-tarjetas")]
    public async Task<IActionResult> ObtenerPromedioTarjetas()
    {
        return Ok(await _service.ObtenerPromedioTarjetasAsync());
    }

    [HttpGet("top-experiencia")]
    public async Task<IActionResult> ObtenerTopExperiencia([FromQuery] int cantidad = 5)
    {
        return Ok(await _service.ObtenerTopExperienciaAsync(cantidad));
    }

    [HttpGet("top-reputacion")]
    public async Task<IActionResult> ObtenerTopReputacion([FromQuery] int cantidad = 5)
    {
        return Ok(await _service.ObtenerTopReputacionAsync(cantidad));
    }
}
