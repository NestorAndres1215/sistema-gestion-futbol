using Application.Features.ParamatrosSistemas.Dto;
using Application.Features.ParamatrosSistemas.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/parametros")]
[ApiController]
public class ParametrosSistemaController : ControllerBase
{
    private readonly IParametroSistemaService _service;

    public ParametrosSistemaController(IParametroSistemaService service)
    {
        _service = service;
    }


    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] string? categoria = null,
        [FromQuery] string? tipoDato = null,
        [FromQuery] string? estado = null
    )
    {
        var result = await _service.GetAllAsync(page, pageSize, search,categoria, tipoDato, estado);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] ParametroRequest dto)
    {
        var result = await _service.AddAsync(dto);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePassword( int id, [FromBody] ParametroRequest dto)
    {
        var result = await _service.UpdateAsync(id, dto);

        return Ok(result);
    }

}
