using Application.Dto;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EntrenadoresController : ControllerBase
{
    private readonly IEntrenadoresService _service;

    public EntrenadoresController(IEntrenadoresService service)
    {
        _service = service;
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Registrar([FromForm] EntrenadoresDto dto)
    {
        return Ok(await _service.AddAsync(dto));
    }


    [HttpPut("{id}")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Actualizar(int id,[FromForm] EntrenadoresDto dto)
    {
        return Ok(await _service.UpdateAsync(id,dto));
    }


    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] string? estiloJuego = null,
        [FromQuery] string? pais = null,
        [FromQuery] string? estado = null
    )
    {
        var result = await _service.GetAllAsync(page, pageSize, search, estiloJuego, pais, estado);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }
}
