using Application.Dto.config;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/parametros")]
[ApiController]
public class ParametrosSistemaController : ControllerBase
{
    private readonly IParametrosSistemaService _service;

    public ParametrosSistemaController(IParametrosSistemaService service)
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
    public async Task<IActionResult> Register([FromBody] ParametrosSistemaRequest dto)
    {
        var result = await _service.AddAsync(dto);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePassword( int id, [FromBody] ParametrosSistemaRequest dto)
    {
        var result = await _service.UpdateAsync(id, dto);

        return Ok(result);
    }

}
