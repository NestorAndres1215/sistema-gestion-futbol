using Application.Dto.selecciones;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/seleccion-estadio")]
public class SeleccionEstadioController : ControllerBase
{
    private readonly ISeleccionEstadioService _service;

    public SeleccionEstadioController(ISeleccionEstadioService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] string? seleccion = null
    )
    {
        var result = await _service.GetAllAsync(page, pageSize, search, seleccion);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] SeleccionEstadioRequest seleccionEstadio)
    {
        return Ok(await _service.AddAsync(seleccionEstadio));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] SeleccionEstadioRequest seleccionEstadioDto)
    {
        return Ok(await _service.UpdateAsync(id, seleccionEstadioDto));
    }

    [HttpGet("seleccion")]
    public async Task<IActionResult> ListarPorSeleccionId(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? seleccion=null)
    {
        return Ok(await _service.ListarPorSeleccion(page,pageSize,seleccion));
    }

    [HttpGet("estadios")]
    public async Task<IActionResult> GetEstadios(
        [FromQuery] string seleccion)
    {
        return Ok(await _service.GetEstadioAsync(seleccion));
    }

}
