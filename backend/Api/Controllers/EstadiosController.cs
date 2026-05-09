using Application.Dto;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/estadios")]
public class EstadiosController : Controller
{
    private readonly IEstadioService _service;

    public EstadiosController(IEstadioService service)
    {
        _service = service;
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Registrar([FromForm] EstadioDTo dto)
    { 
        return Ok(await _service.AddAsync(dto));
    }
}
