using Application.Dto;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/arbitros")]
public class ArbitroController : Controller
{
    private readonly IArbitrosService _service;

    public ArbitroController(IArbitrosService service)
    {
        _service = service;
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Registrar([FromForm] ArbitrosDto dto)
    {
        return Ok(await _service.AddAsync(dto));
    }
}
