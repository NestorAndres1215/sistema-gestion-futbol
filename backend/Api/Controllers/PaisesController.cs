using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/paises")]
public class PaisesController : ControllerBase
{
    private readonly IPaisesService _service;

    public PaisesController(IPaisesService service)
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

    [HttpGet("nombre/{nombre}")]
    public async Task<IActionResult> GetByNombre(string nombre)
    {
        return Ok(await _service.GetByNombreAsync(nombre));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Paises pais)
    {
        return Ok(await _service.AddAsync(pais));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Paises pais)
    {
        return Ok(await _service.UpdateAsync(pais));
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        return Ok(await _service.DeleteAsync(id));
    }
}