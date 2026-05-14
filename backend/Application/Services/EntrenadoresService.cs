
using Application.Common.Exceptions;
using Application.Dto;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;
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

    public async Task<Entrenadores> AddAsync(EntrenadoresDto entrenadores)
    {
        ValidateEntrenador(entrenadores);

        var pais = await _paisRepo.GetByNombreAsync(entrenadores.PaisNacimiento);

        if (pais == null)
            throw new NotFoundException("El país no existe.");

        var ciudad = await _ciudadRepo.GetByNombreAsync(entrenadores.CiudadNacimiento);

        if (ciudad == null)
            throw new NotFoundException("La ciudad no existe.");

        var personaExistente = await _personasService
            .GetByNombreCompletoAsync(
                entrenadores.Nombre,
                entrenadores.ApellidoPaterno,
                entrenadores.ApellidoMaterno
            );

        if (personaExistente != null)
            throw new BadRequestException("Ya existe una persona con ese nombre");

        string fotoUrl = await GuardarFotoAsync(entrenadores);

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

    private void ValidateEntrenador(EntrenadoresDto dto)
    {
        if (dto == null)
            throw new BadRequestException("Datos inválidos");

        if (string.IsNullOrWhiteSpace(dto.Nombre))
            throw new BadRequestException("El nombre es obligatorio");

        if (string.IsNullOrWhiteSpace(dto.ApellidoPaterno))
            throw new BadRequestException("El apellido paterno es obligatorio");

        if (string.IsNullOrWhiteSpace(dto.PaisNacimiento))
            throw new BadRequestException("El país de nacimiento es obligatorio");

        if (dto.AlturaCm <= 0)
            throw new BadRequestException("La altura debe ser mayor a 0");

        if (dto.PesoKg <= 0)
            throw new BadRequestException("El peso debe ser mayor a 0");

        if (dto.FechaNacimiento > DateTime.Now)
            throw new BadRequestException("La fecha de nacimiento no puede ser futura");

        if (dto.FechaDebut != null && dto.FechaDebut < dto.FechaNacimiento)
            throw new BadRequestException("La fecha de debut no puede ser menor a la fecha de nacimiento");
    }
    private async Task<string> GuardarFotoAsync(EntrenadoresDto entrenadoresDto)
    {
        if (entrenadoresDto.Foto == null)
            return "";

        var carpeta = Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot/uploads/entrenadores"
        );

        if (!Directory.Exists(carpeta))
            Directory.CreateDirectory(carpeta);

        var extension = Path.GetExtension(entrenadoresDto.Foto.FileName);

        var nombreBase =
            $"{entrenadoresDto.Nombre}_{entrenadoresDto.PaisNacimiento}_{entrenadoresDto.CiudadNacimiento}"
            .Replace(" ", "_")
            .Replace("/", "")
            .Replace("\\", "")
            .ToLower();

        var nombreArchivo =
            $"{nombreBase}_{Guid.NewGuid()}{extension}";

        var rutaCompleta = Path.Combine(carpeta, nombreArchivo);

        using (var stream = new FileStream(rutaCompleta, FileMode.Create))
        {
            await entrenadoresDto.Foto.CopyToAsync(stream);
        }

        return $"/uploads/entrenadores/{nombreArchivo}";

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

    public async Task<Entrenadores> UpdateAsync(int id, EntrenadoresDto dto)
    {
        if (dto == null)
            throw new BadRequestException("Datos inválidos");

        ValidateEntrenador(dto);

        var entrenador = await _repository.GetByIdAsync(id);
        if (entrenador == null)
            throw new NotFoundException($"No se encontró el entrenador con id {id}");

        var persona = entrenador.Persona;
        if (persona == null)
            throw new NotFoundException("Persona no encontrada");

        var pais = await _paisRepo.GetByNombreAsync(dto.PaisNacimiento)
            ?? throw new NotFoundException("El país no existe");

        var ciudad = await _ciudadRepo.GetByNombreAsync(dto.CiudadNacimiento)
            ?? throw new NotFoundException("La ciudad no existe");

        if (dto.Foto != null)
        {
            persona.FotoUrl = await GuardarFotoAsync(dto);
        }

        persona.Nombre = dto.Nombre;
        persona.ApellidoPaterno = dto.ApellidoPaterno;
        persona.ApellidoMaterno = dto.ApellidoMaterno;
        persona.FechaNacimiento = dto.FechaNacimiento;
        persona.PaisNacimientoId = pais.Id;
        persona.CiudadNacimientoId = ciudad.Id;
        persona.AlturaCm = dto.AlturaCm;
        persona.PesoKg = dto.PesoKg;
        persona.PieDominante = dto.PieDominante;

        await _personasService.UpdateAsync(persona);

        entrenador.EstiloJuego = dto.EstiloJuego;
        entrenador.Licencia = dto.Licencia;
        entrenador.FechaDebut = dto.FechaDebut;
        entrenador.FechaRetiro = dto.FechaRetiro;
        entrenador.AnosExperiencia = dto.AnosExperiencia;
        entrenador.Nivel = dto.Nivel;
        entrenador.Reputacion = dto.Reputacion;
        entrenador.Salario = dto.Salario;

        await _repository.UpdateAsync(entrenador);

        return entrenador;
    }
}
