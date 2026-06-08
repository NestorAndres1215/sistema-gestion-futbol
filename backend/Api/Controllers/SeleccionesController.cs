using Application.Dto.Selecciones;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SeleccionesController : ControllerBase
{

    private readonly ISelecionesService _service;

    public SeleccionesController(ISelecionesService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] string? confederacion = null,
        [FromQuery] string? estado = null)
    {
        var result = await _service.GetAllAsync(page, pageSize, search, confederacion, estado);
        return Ok(result);
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Registrar([FromForm] SeleccionesRequest seleccionesDto)
    {
        return Ok(await _service.AddAsync(seleccionesDto));
    }

    [HttpPut("{id}")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Actualizar(int id, [FromForm] SeleccionesRequest seleccionesDto )
    {
        return Ok(await _service.UpdateAsync(id, seleccionesDto));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }
    [HttpGet("nombre/{nombre}")]
    public async Task<IActionResult> GetByNombre(string nombre)
    {
        return Ok(await _service.GetByNombreAsync(nombre));
    }

    [HttpGet("clave/{clave}")]
    public async Task<IActionResult> GetByClave(string clave)
    {
        return Ok(await _service.GetByClaveAsync(clave));
    }

    [HttpGet("confederacion/{confederacion}")]
    public async Task<IActionResult> GetByConfederacion(string confederacion)
    {
        return Ok(await _service.GetByConfederacionAsync(confederacion));
    }
}
