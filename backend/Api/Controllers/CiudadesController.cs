using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/ciudades")]
public class CiudadesController : ControllerBase
{
    private readonly ICiudadesService _service;

    public CiudadesController(ICiudadesService service)
    {
        _service = service;
    }


    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }

    [HttpGet("pais/{nombrePais}")]
    public async Task<IActionResult> GetByPais(string nombrePais)
    {
        return Ok(await _service.GetByPaisNombreAsync(nombrePais));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Ciudades ciudad)
    {
        return Ok(await _service.AddAsync(ciudad));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Ciudades ciudad)
    {
        return Ok(await _service.UpdateAsync(id, ciudad));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        return Ok(await _service.DeleteAsync(id));
    }
}