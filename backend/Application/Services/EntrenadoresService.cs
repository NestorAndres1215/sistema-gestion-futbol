
using Application.Common.Exceptions;
using Application.Dto;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services;

public class EntrenadoresService : IEntrenadoresService
{

    private readonly IEntrenadoresRepository _repository;
    private readonly IPersonasService _personasService;
    private readonly IPaisesRepository _paisRepo;
    private readonly ICiudadesRepository _ciudadRepo;

    public EntrenadoresService(
        IEntrenadoresRepository repository,
        IPersonasService service,
        IPaisesRepository paisRepo,
        ICiudadesRepository ciudadRepo)
    {
        _repository = repository;
        _personasService = service;
        _paisRepo = paisRepo;
        _ciudadRepo = ciudadRepo;
    }

    public async  Task<Entrenadores> AddAsync(EntrenadoresDto entrenadores)
    {

        var pais = await _paisRepo.GetByNombreAsync(entrenadores.PaisNacimiento);

        if (pais == null)
            throw new NotFoundException("El país no existe.");

        var ciudad = await _ciudadRepo.GetByNombreAsync(entrenadores.CiudadNacimiento);

        if (ciudad == null)
            throw new NotFoundException("La ciudad no existe.");

        string fotoUrl = "";

        if (entrenadores.Foto != null)
        {
            var carpeta = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot/uploads/entrenadores"
            );

            if (!Directory.Exists(carpeta))
                Directory.CreateDirectory(carpeta);

            var extension = Path.GetExtension(entrenadores.Foto.FileName);

            var nombreBase =
                $"{entrenadores.Nombre}_{entrenadores.PaisNacimiento}_{entrenadores.CiudadNacimiento}"
                .Replace(" ", "_")
                .Replace("/", "")
                .Replace("\\", "")
                .ToLower();

            var nombreArchivo =
                $"{nombreBase}_{Guid.NewGuid()}{extension}";

            var rutaCompleta = Path.Combine(carpeta, nombreArchivo);

            using (var stream = new FileStream(rutaCompleta, FileMode.Create))
            {
                await entrenadores.Foto.CopyToAsync(stream);
            }

            fotoUrl = $"/uploads/entrenadores/{nombreArchivo}";
        }

        var persona = new Personas
        {
            Nombre = entrenadores.Nombre,
            ApellidoPaterno = entrenadores.ApellidoPaterno,
            ApellidoMaterno = entrenadores.ApellidoMaterno,

            FechaNacimiento = entrenadores.FechaNacimiento,

            PaisNacimientoId = pais.Id,
            CiudadNacimientoId = ciudad.Id,

            AlturaCm = entrenadores.AlturaCm,
            PesoKg = entrenadores.PesoKg,

            PieDominante = entrenadores.PieDominante,
            FotoUrl = fotoUrl,

            Estado = "Activo"
        };



        var personaCreada = await _personasService.AddAsync(persona);

        var entrenador = new Entrenadores
        {
            PersonaId = personaCreada.Id,
            EstiloJuego = entrenadores.EstiloJuego,
            Licencia = entrenadores.Licencia,
            FechaDebut = entrenadores.FechaDebut,
            FechaRetiro = entrenadores.FechaRetiro,
            AnosExperiencia = entrenadores.AnosExperiencia,
            Nivel = entrenadores.Nivel,
            Reputacion = entrenadores.Reputacion,
            Salario = entrenadores.Salario,
            Estado = "Activo"
        };

        await _repository.AddAsync(entrenador);

        return entrenador;
    }

    public async Task<PagedResult<Entrenadores>> GetAllAsync(int page, int pageSize, string? search, string? estiloJuego, string? pais, string? estado)
    {
        return await _repository.GetAllAsync(page, pageSize, search, estiloJuego, pais, estado);
    }

    public async Task<Entrenadores> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("Entrenador no encontrado");
    }

    public Task<Entrenadores> UpdateAsync(int id, EntrenadoresDto entrenadores)
    {
        throw new NotImplementedException();
    }
}
