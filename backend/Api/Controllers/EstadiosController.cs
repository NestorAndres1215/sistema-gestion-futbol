using Application.Dto.personas;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/estadios")]
public class EstadiosController : ControllerBase
{
    private readonly IEstadioService _service;

    public EstadiosController(IEstadioService service)
    {
        _service = service;
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Registrar([FromForm] EstadioRequest dto)
    { 
        return Ok(await _service.AddAsync(dto));
    }


    [HttpPut("{id}")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Update(int id, [FromForm] EstadioRequest dto)
    {
        return Ok(await _service.UpdateAsync(id, dto));
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

    [HttpGet("pais/{pais}")]
    public async Task<IActionResult> GetByPais(string pais)
    {
        return Ok(await _service.GetByPaisAsync(pais));
    }

    [HttpGet("anio")]
    public async Task<IActionResult> GetAniosAsync()
    {
        return Ok(await _service.GetAniosAsync());
    }

    // ESTADISTICAS

    [HttpGet("total-registro")]
    public async Task<IActionResult> ObtenerTotalEstadios()
    {
        var total = await _service.ObtenerTotalEstadiosAsync();

        return Ok(total);
    }

    [HttpGet("promedio-capacidad")]
    public async Task<IActionResult> ObtenerPromedioCapacidad()
    {
        var result = await _service.ObtenerPromedioCapacidadAsync();

        return Ok(result);
    }

    [HttpGet("total-paises")]
    public async Task<IActionResult> ObtenerTotalPaisesConEstadios()
    {
        var result = await _service.ObtenerTotalPaisesConEstadiosAsync();

        return Ok(result);
    }

    // Controller
    [HttpGet("paises-mas-estadios")]
    public async Task<IActionResult> ObtenerPaisesConMasEstadios([FromQuery] int cantidad = 5)
    {
        var result = await _service.ObtenerPaisesConMasEstadiosAsync(cantidad);

        return Ok(result);
    }

    [HttpGet("paises-menos-estadios")]
    public async Task<IActionResult> ObtenerPaisesConMenosEstadios([FromQuery] int cantidad = 5)
    {
        var result = await _service.ObtenerPaisesConMenosEstadiosAsync(cantidad);

        return Ok(result);
    }

    [HttpGet("ciudades-mas-estadios")]
    public async Task<IActionResult> ObtenerCiudadesConMasEstadios([FromQuery] int cantidad = 5)
    {
        var result = await _service.ObtenerCiudadesConMasEstadiosAsync(cantidad);

        return Ok(result);
    }

    [HttpGet("ciudades-menos-estadios")]
    public async Task<IActionResult> ObtenerCiudadesConMenosEstadios([FromQuery] int cantidad = 5)
    {
        var result = await _service.ObtenerCiudadesConMenosEstadiosAsync(cantidad);

        return Ok(result);
    }

    [HttpGet("distribucion-estado")]
    public async Task<IActionResult> ObtenerDistribucionPorEstado()
    {
        var result = await _service.ObtenerDistribucionPorEstadoAsync();

        return Ok(result);
    }

    [HttpGet("tipos-cesped")]
    public async Task<IActionResult> ObtenerDistribucionTipoCesped()
    {
        var result = await _service.ObtenerDistribucionTipoCespedAsync();

        return Ok(result);
    }

    [HttpGet("mayor-capacidad")]
    public async Task<IActionResult> ObtenerMayorCapacidad([FromQuery] int cantidad = 5)
    {
        var result = await _service.ObtenerMayorCapacidadAsync(cantidad);

        return Ok(result);
    }

    [HttpGet("menor-capacidad")]
    public async Task<IActionResult> ObtenerMenorCapacidad([FromQuery] int cantidad = 5)
    {
        var result = await _service.ObtenerMenorCapacidadAsync(cantidad);

        return Ok(result);
    }

    [HttpGet("estadios-mas-antiguos")]
    public async Task<IActionResult> ObtenerEstadiosMasAntiguos([FromQuery] int cantidad = 5)
    {
        var result = await _service.ObtenerEstadiosMasAntiguosAsync(cantidad);

        return Ok(result);
    }

    [HttpGet("estadios-mas-nuevos")]
    public async Task<IActionResult> ObtenerEstadiosMasNuevos([FromQuery] int cantidad = 5)
    {
        var result = await _service.ObtenerEstadiosMasNuevosAsync(cantidad);

        return Ok(result);
    }
}
