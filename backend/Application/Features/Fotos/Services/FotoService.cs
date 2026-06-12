using Application.Features.Fotos.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Application.Features.Fotos.Services;

public class FotoService : IFotoService
{
    public void EliminarFoto(string fotoUrl)
    {
        if (string.IsNullOrEmpty(fotoUrl))
            return;

        var rutaFisica = Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot",
            fotoUrl.TrimStart('/')
        );

        if (File.Exists(rutaFisica))
            File.Delete(rutaFisica);
    }

    public async Task<string> GuardarFotoAsync(IFormFile foto, string modulo, string nombreBase)
    {
        if (foto == null)
            return "";

        var carpeta = Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot/uploads",
            modulo
        );

        if (!Directory.Exists(carpeta))
            Directory.CreateDirectory(carpeta);

        var extension = Path.GetExtension(foto.FileName);

        var nombreArchivo =
            $"{nombreBase}_{Guid.NewGuid()}{extension}"
            .Replace(" ", "_")
            .Replace("/", "")
            .Replace("\\", "")
            .ToLower();

        var rutaCompleta = Path.Combine(carpeta, nombreArchivo);

        using (var stream = new FileStream(rutaCompleta, FileMode.Create))
        {
            await foto.CopyToAsync(stream);
        }

        return $"/uploads/{modulo}/{nombreArchivo}";
    }

}
