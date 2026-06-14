using Application.Common.Exceptions;
using Application.Common.Helpers;
using Application.Common.Models;
using Application.Common.Validators;
using Application.Features.Entrenadores.Dto;
using Application.Features.Entrenadores.Interfaces;
using Application.Features.Fotos.Interfaces;
using Application.Features.Personas.Interfaces;
using Application.Interfaces.Repositories;
using Domain.Catalogs;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Features.Entrenadores.Services;

public class EntrenadorService : IEntrenadorService
{

    private readonly IEntrenadoresRepository _repository;
    private readonly IPersonasService _personasService;
    private readonly IPaisesRepository _paisRepo;
    private readonly ICiudadesRepository _ciudadRepo;
    private readonly IFotoService _fotoService;

    public EntrenadorService(
        IFotoService fotoService,
        IEntrenadoresRepository repository,
        IPersonasService service,
        IPaisesRepository paisRepo,
        ICiudadesRepository ciudadRepo)
    {
        _repository = repository;
        _personasService = service;
        _paisRepo = paisRepo;
        _fotoService = fotoService;
        _ciudadRepo = ciudadRepo;
    }

    public async Task<Entrenador> AddAsync(EntrenadoresRequest entrenadores)
    {
        ValidateEntrenador(entrenadores);

        var pais = await _paisRepo.GetByNombreAsync(entrenadores.PaisNacimiento);

        if (pais == null)
            throw new NotFoundException("El país no existe.");

        var ciudad = await _ciudadRepo.GetByNombreAsync(entrenadores.CiudadNacimiento);

        if (ciudad == null)
            throw new NotFoundException("La ciudad no existe.");


        string fotoUrl = await _fotoService.GuardarFotoAsync(entrenadores.Foto!, "entrenadores", $"{entrenadores.Nombre}_{entrenadores.Apellido}");

        var persona = new Persona
        {
            Nombre = entrenadores.Nombre,
            Apellido = entrenadores.Apellido,
            FechaNacimiento = entrenadores.FechaNacimiento,
            PaisNacimientoId = pais.Id,
            CiudadNacimientoId = ciudad.Id,
            FotoUrl = fotoUrl,
            Genero= entrenadores.Genero,
            FechaCreacion = DateTime.Now,
            Estado = Estado.Activo
        };

        var personaCreada = await _personasService.AddAsync(persona);

        var entrenador = new Entrenador
        {
            PersonaId = personaCreada.Id,
            EstiloJuego = entrenadores.EstiloJuego,
            Licencia = entrenadores.Licencia,
            FechaDebut = entrenadores.FechaDebut,
            FechaRetiro = entrenadores.FechaRetiro,
            AnosExperiencia = ExperienciaHelper.Calcular(entrenadores.FechaDebut),
            Nivel = entrenadores.Nivel,
            Reputacion = entrenadores.Reputacion,
            ManejoEquipo = 0,
            Motivacion = 0,
            Disciplina = 0,
            Adaptabilidad = 0,
            Estado = Estado.Activo
        };

        await _repository.AddAsync(entrenador);

        return entrenador;
    }

    private void ValidateEntrenador(EntrenadoresRequest dto)
    {
        if (dto == null)
            throw new BadRequestException("Datos inválidos");

        if (string.IsNullOrWhiteSpace(dto.Nombre))
            throw new BadRequestException("El nombre es obligatorio");

        if (string.IsNullOrWhiteSpace(dto.Apellido))
            throw new BadRequestException("El apellido paterno es obligatorio");

        if (string.IsNullOrWhiteSpace(dto.PaisNacimiento))
            throw new BadRequestException("El país de nacimiento es obligatorio");

        if (dto.FechaNacimiento > DateTime.Now)
            throw new BadRequestException("La fecha de nacimiento no puede ser futura");

        if (dto.FechaDebut != null && dto.FechaDebut < dto.FechaNacimiento)
            throw new BadRequestException("La fecha de debut no puede ser menor a la fecha de nacimiento");
    }

    public async Task<PagedResult<EntrenadoresResponse>> GetAllAsync(int page, int pageSize, string? search, string? estiloJuego, string? pais, string? estado)
    {
        return await _repository.GetAllAsync(page, pageSize, search, estiloJuego, pais, estado);
    }

    public async Task<Entrenador> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("Entrenador no encontrado");
    }

    public async Task<Entrenador> UpdateAsync(int id, EntrenadoresRequest dto)
    {
        if (dto is null)
            throw new BadRequestException("Datos inválidos");

        ValidateEntrenador(dto);

        var entrenador = await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException($"No se encontró el entrenador con id {id}");

        var persona = entrenador.Persona
            ?? throw new NotFoundException("Persona no encontrada");

        var pais = await _paisRepo.GetByNombreAsync(dto.PaisNacimiento)
            ?? throw new NotFoundException("El país no existe");

        var ciudad = await _ciudadRepo.GetByNombreAsync(dto.CiudadNacimiento)
            ?? throw new NotFoundException("La ciudad no existe");



        if (dto.Foto != null && dto.Foto.Length > 0)
        {
            if (!string.IsNullOrEmpty(persona.FotoUrl))
                _fotoService.EliminarFoto(persona.FotoUrl);

            persona.FotoUrl = await _fotoService.GuardarFotoAsync(dto.Foto, "entrenadores", $"{dto.Nombre}_{dto.Apellido}");
        }


        persona.Nombre = dto.Nombre;
        persona.Apellido = dto.Apellido;
        persona.FechaNacimiento = dto.FechaNacimiento;
        persona.PaisNacimientoId = pais.Id;
        persona.CiudadNacimientoId = ciudad.Id;
        persona.FechaActualizacion = DateTime.Now;

        await _personasService.UpdateAsync(persona);

        entrenador.EstiloJuego = dto.EstiloJuego;
        entrenador.Licencia = dto.Licencia;
        entrenador.FechaDebut = dto.FechaDebut;
        entrenador.FechaRetiro = dto.FechaRetiro;
        entrenador.AnosExperiencia = ExperienciaHelper.Calcular(dto.FechaDebut);
        entrenador.Nivel = dto.Nivel;
        entrenador.Reputacion = dto.Reputacion;
        entrenador.Adaptabilidad = dto.Adaptabilidad;
        entrenador.ManejoEquipo = dto.ManejoEquipo;
        entrenador.Motivacion = dto.Motivacion;
        entrenador.Disciplina = dto.Disciplina;
        await _repository.UpdateAsync(entrenador);

        return entrenador;
    }

    public async Task<List<EntrenadorComboRequest>> GetComboAsync()
    {
        return await _repository.GetComboAsync();
    }

}
