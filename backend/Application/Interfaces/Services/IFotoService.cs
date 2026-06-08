
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces.Services;

public interface IFotoService
{
    void EliminarFoto(string fotoUrl);
    Task<string> GuardarFotoAsync(IFormFile foto, string modulo, string nombreBase);
}
