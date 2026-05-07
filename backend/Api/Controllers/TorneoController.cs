using Application.Dto;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Authorize]
[ApiController]
[Route("api/torneos")]
public class TorneoController : Controller
{
    private readonly ITorneoService _service;

    public TorneoController(ITorneoService service)
    {
        _service = service;
    }



    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _service.GetByIdAsync(id));
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] TorneoDto torneoDto)
    {
        return Ok(await _service.AddAsync(torneoDto));
    }
}
