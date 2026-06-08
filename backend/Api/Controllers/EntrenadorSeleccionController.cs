using Application.Dto.Selecciones;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/entrenador-seleccion")]
[ApiController]
public class EntrenadorSeleccionController : ControllerBase
{
    private readonly IEntrenadorSeleccionService _service;

    public EntrenadorSeleccionController(IEntrenadorSeleccionService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] SeleccionEntrenadorRequest request)
    {
        return Ok(await _service.AddAsync(request));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] SeleccionEntrenadorRequest request)
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
    public async Task<IActionResult> GetEntrenadores()
    {
        return Ok(await _service.GetEntrenadoresAsync());
    }

    [HttpGet("selecciones")]
    public async Task<IActionResult> ListarPorSeleccionNombre([FromQuery]  string nombre)
    {
        return Ok(await _service.ListarPorSeleccionNombre(nombre));
    }

    [HttpPut("despedir/{id}")]
    public async Task<IActionResult> Despedir(int id)
    {
        return Ok(await _service.DespedirAsync(id));
    }
}
