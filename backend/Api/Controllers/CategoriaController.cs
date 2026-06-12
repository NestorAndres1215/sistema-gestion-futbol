using Application.Features.Categorias;
using Application.Features.Categorias.Dto;
using Application.Features.Categorias.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace FootballManagerSystem.API.Controllers;

[Authorize]
[ApiController]
[Route("api/categorias")]
public class CategoriaController : ControllerBase
{
    private readonly ICategoriaService _service;

    public CategoriaController(ICategoriaService service)
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

    [HttpGet("nombre")]
    public async Task<IActionResult> GetByNombre([FromQuery] string nombre)
    {
        return Ok(await _service.GetByNombreAsync(nombre));
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CategoriaRequest categoria)
    {
        return Ok(await _service.AddAsync(categoria));
    }



}
