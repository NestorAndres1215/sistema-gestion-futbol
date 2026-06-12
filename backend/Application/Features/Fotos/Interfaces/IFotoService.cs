using Microsoft.AspNetCore.Http;

namespace Application.Features.Fotos.Interfaces;

public interface IFotoService
{
    void EliminarFoto(string fotoUrl);
    Task<string> GuardarFotoAsync(IFormFile foto, string modulo, string nombreBase);
}
