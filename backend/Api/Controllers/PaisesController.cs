using Application.Features.Paises.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/paises")]
public class PaisesController : ControllerBase
{
    private readonly IPaisService _service;

    public PaisesController(IPaisService service)
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
    public async Task<IActionResult> Create([FromBody] Pais pais)
    {
        return Ok(await _service.AddAsync(pais));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Pais pais)
    {
        return Ok(await _service.UpdateAsync(pais));
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        return Ok(await _service.DeleteAsync(id));
    }
}