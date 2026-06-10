using Application.Common.Exceptions;
using Application.Common.Models;
using Application.Dto.Clubes;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Catalogs;

using Domain.Entities;



namespace Application.Services;

public class ClubesService : IClubesService 
{

    private readonly IClubesRepository _repo;

    public ClubesService(IClubesRepository repo)
    {
        _repo = repo;
    }


    public async Task<PagedResult<ClubesResponse>> GetAllAsync(int page, int pageSize, string? search, string? confederacion, string? estado)
    {
        return await _repo.GetAllAsync(page, pageSize, search, confederacion, estado);
    }

    public async Task<Clubes?> GetByIdAsync(int id)
    {
        return await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("Club no encontrado");
    }

    public async Task<Clubes?> GetByNombreAsync(string nombre)
    {
        return await _repo.GetByNombreAsync(nombre)
            ?? throw new NotFoundException("Club no encontrado");
    }


    public async Task<Clubes> AddAsync(ClubesRequest clubesdto)
    {

        await ValidarDuplicadosAsync(clubesdto);

        var archivos = await GuardarFotoAsync(clubesdto);

        var clubes = new Clubes
        {
            Nombre = clubesdto.Nombre,
            Confederacion = clubesdto.Confederacion,

            Seudonimo = clubesdto.Seudonimo,
            CodigoFifa = clubesdto.CodigoFifa,
            Pais = clubesdto.Pais,
            Ciudad = clubesdto.Ciudad,
            EscudoUrl = archivos,
            FechaCreacion = DateTime.Now,
            Estado = Estado.Activo
        };

        return await _repo.AddAsync(clubes);
    }

    private async Task ValidarDuplicadosAsync(ClubesRequest dto, int? id = null)
    {
        var existeNombre = await _repo.GetByNombreAsync(dto.Nombre);
        if (existeNombre != null && existeNombre.Id != id)
            throw new BadRequestException("Ya existe un club con ese nombre");

        var existeCodigoFifa = await _repo.GetByCodigoFifaAsync(dto.CodigoFifa);
        if (existeCodigoFifa != null && existeCodigoFifa.Id != id)
            throw new BadRequestException("El código FIFA ya está registrado");

        var existePais = await _repo.GetByPaisAsync(dto.Pais);
        if (existePais != null && existePais.Id != id)
            throw new BadRequestException("El país ya tiene un club registrado");
    }

    private async Task<string> GuardarFotoAsync(ClubesRequest dto)
    {
        if (dto.EscudoUrl == null)
            return "";

        var carpeta = Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot/uploads/clubes"
        );

        if (!Directory.Exists(carpeta))
            Directory.CreateDirectory(carpeta);

        var extension = Path.GetExtension(dto.EscudoUrl.FileName);

        var nombreBase =
            $"{dto.Nombre}_{dto.Pais}"
            .Replace(" ", "_")
            .Replace("/", "")
            .Replace("\\", "")
            .ToLower();

        var nombreArchivo =
            $"{nombreBase}_{Guid.NewGuid()}{extension}";

        var rutaCompleta = Path.Combine(carpeta, nombreArchivo);

        using (var stream = new FileStream(rutaCompleta, FileMode.Create))
        {
            await dto.EscudoUrl.CopyToAsync(stream);
        }

        return $"/uploads/clubes/{nombreArchivo}";

    }













    private void EliminarArchivo(string? archivoUrl)
    {
        if (string.IsNullOrWhiteSpace(archivoUrl))
            return;

        var rutaFisica = Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot",
            archivoUrl.TrimStart('/')
        );

        if (File.Exists(rutaFisica))
            File.Delete(rutaFisica);
    }

    public async Task<Clubes> UpdateAsync(int id, ClubesRequest clubes)
    {
        var club = await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("Club no encontrado");
        await ValidarDuplicadosAsync(clubes, id);

        if (clubes.EscudoUrl != null && clubes.EscudoUrl.Length > 0)
        {
            if (!string.IsNullOrEmpty(club.EscudoUrl))
                EliminarArchivo(club.EscudoUrl);

            club.EscudoUrl = await GuardarFotoAsync(clubes);
        }
        club.Nombre = clubes.Nombre;
        club.Confederacion = clubes.Confederacion;
        club.Seudonimo = clubes.Seudonimo;
        club.CodigoFifa = clubes.CodigoFifa;
        club.Pais = clubes.Pais;
        club.Ciudad = clubes.Ciudad;

        return club;
    }

    public async Task<Clubes?> GetByConfederacionAsync(string confederacion)
    {
        return await _repo.GetByConfederacionAsync(confederacion)
                  ?? throw new NotFoundException("Club no encontrado");
    }
}
