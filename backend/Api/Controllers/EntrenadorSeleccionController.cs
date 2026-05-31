using Application.Dto.selecciones;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EntrenadorSeleccionController : ControllerBase
{
    private readonly IEntrenadorSeleccionService _service;

    public EntrenadorSeleccionController(IEntrenadorSeleccionService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] SeleccioEntrenadorRequest request)
    {
        return Ok(await _service.AddAsync(request));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] SeleccioEntrenadorRequest request)
    {
        return Ok(await _service.UpdateAsync(id, request));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }

    [HttpGet]
    public async Task<IActionResult> ListarPorSeleccion([FromQuery] int page = 1,[FromQuery] int pageSize = 10,[FromQuery] string? seleccion = null)
    {
        return Ok(await _service.ListarPorSeleccion(page, pageSize, seleccion));
    }

    [HttpGet("entrenadores")]
    public async Task<IActionResult> GetEntrenadores([FromQuery] string seleccion)
    {
        return Ok(await _service.GetEntrenadoresAsync(seleccion));
    }

    [HttpGet("selecciones")]
    public async Task<IActionResult> ListarPorSeleccionNombre([FromQuery]  string nombre)
    {
        return Ok(await _service.ListarPorSeleccionNombre(nombre));
    }

}
