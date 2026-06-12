using Application.Features.Catalogs.Intefaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/catalogs")]
public class CatalogsController : ControllerBase
{
    private readonly ICatalogService _catalogService;

    public CatalogsController(ICatalogService catalogService)
    {
        _catalogService = catalogService;
    }

    [HttpGet("categoria-arbitros")]
    public IActionResult CategoriaArbitros()
        => Ok(_catalogService.GetCategoriaArbitros());

    [HttpGet("confederaciones")]
    public IActionResult Confederaciones()
        => Ok(_catalogService.GetConfederaciones());

    [HttpGet("especialidad-arbitro")]
    public IActionResult EspecialidadArbitro()
        => Ok(_catalogService.GetEspecialidadArbitro());

    [HttpGet("estado")]
    public IActionResult Estado()
        => Ok(_catalogService.GetEstado());

    [HttpGet("estado-estadio")]
    public IActionResult EstadoEstadio()
        => Ok(_catalogService.GetEstadoEstadio());

    [HttpGet("estado-generico")]
    public IActionResult EstadoGenerico()
        => Ok(_catalogService.GetEstadoGenerico());

    [HttpGet("estilo-juego")]
    public IActionResult EstiloJuego()
        => Ok(_catalogService.GetEstiloJuego());

    [HttpGet("generos")]
    public IActionResult Generos()
        => Ok(_catalogService.GetGeneros());

    [HttpGet("licencias-entrenador")]
    public IActionResult LicenciasEntrenador()
        => Ok(_catalogService.GetLicenciasEntrenador());

    [HttpGet("pie-dominante")]
    public IActionResult PieDominante()
        => Ok(_catalogService.GetPieDominante());

    [HttpGet("tipo-cesped")]
    public IActionResult TipoCesped()
        => Ok(_catalogService.GetTipoCesped());

    [HttpGet("tipo-torneo")]
    public IActionResult TipoTorneo()
        => Ok(_catalogService.GetTipoTorneo());

    [HttpGet("tipo-dato")]
    public IActionResult TipoDato()
        => Ok(_catalogService.GetTipoDato());
}