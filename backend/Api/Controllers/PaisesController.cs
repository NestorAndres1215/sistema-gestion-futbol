using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Paises pais)
        {
            return Ok(await _service.AddAsync(pais));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Paises pais)
        {
            var existing = await _service.GetByIdAsync(id);

            if (existing is null)
                return NotFound();

            existing.Nombre = pais.Nombre;
            existing.CodigoISO = pais.CodigoISO;

            await _service.UpdateAsync(existing);

            return Ok(existing);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _service.DeleteAsync(id));
        }
    }
}