using Application.Common.Exceptions;
using Application.Dto;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Services;

public class ArbitrosService : IArbitrosService
{
    private readonly IArbitroRepository _repository;
    private readonly IPersonasService _personasService;
    private readonly IPaisesRepository _paisRepo;
    private readonly ICiudadesRepository _ciudadRepo;

    public ArbitrosService(
        IArbitroRepository repository,
        IPersonasService service,
        IPaisesRepository paisRepo,
        ICiudadesRepository ciudadRepo)
    {
        _repository = repository;
        _personasService = service;
        _paisRepo = paisRepo;
        _ciudadRepo = ciudadRepo;
    }


    public async Task<Arbitros> AddAsync(ArbitrosDto arbitros)
    {

        ValidarDto(arbitros);
         string fotoUrl = await GuardarFotoAsync(arbitros);
        var pais = await _paisRepo.GetByNombreAsync(arbitros.PaisNacimiento);

        if (pais == null)
            throw new NotFoundException("El país no existe.");

        var ciudad = await _ciudadRepo.GetByNombreAsync(arbitros.CiudadNacimiento);

        if (ciudad == null)
            throw new NotFoundException("La ciudad no existe.");

        var persona = new Personas
        {
            Nombre = arbitros.Nombre,
            ApellidoPaterno = arbitros.ApellidoPaterno,
            ApellidoMaterno = arbitros.ApellidoMaterno,

            FechaNacimiento = arbitros.FechaNacimiento,

            PaisNacimientoId = pais.Id,
            CiudadNacimientoId = ciudad.Id,

            AlturaCm = arbitros.AlturaCm,
            PesoKg = arbitros.PesoKg,

            PieDominante = arbitros.PieDominante,
            FotoUrl = fotoUrl,

            Estado = "Activo"
        };

        var personaCreada = await _personasService.AddAsync(persona);

        var arbitro = new Arbitros
        {
            PersonaId = personaCreada.Id,

            Categoria = arbitros.Categoria,
            Especialidad = arbitros.Especialidad,

            FechaDebut = arbitros.FechaDebut,
            FechaRetiro = arbitros.FechaRetiro,

            AnosExperiencia = arbitros.AnosExperiencia,
            Nivel = arbitros.Nivel,
            Reputacion = arbitros.Reputacion,

            Estado = "Activo"
        };

        await _repository.AddAsync(arbitro);

        return arbitro;
    }

    private async Task<string> GuardarFotoAsync( ArbitrosDto arbitros)
    {
        if (arbitros.Foto == null)
            return "";

        var carpeta = Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot/uploads/arbitros"
        );

        if (!Directory.Exists(carpeta))
            Directory.CreateDirectory(carpeta);

        var extension = Path.GetExtension(arbitros.Foto.FileName);

        var nombreBase =
            $"{arbitros.Nombre}_{arbitros.PaisNacimiento}_{arbitros.CiudadNacimiento}"
            .Replace(" ", "_")
            .Replace("/", "")
            .Replace("\\", "")
            .ToLower();

        var nombreArchivo =
            $"{nombreBase}_{Guid.NewGuid()}{extension}";

        var rutaCompleta = Path.Combine(carpeta, nombreArchivo);

        using (var stream = new FileStream(rutaCompleta, FileMode.Create))
        {
            await arbitros.Foto.CopyToAsync(stream);
        }

        return $"/uploads/arbitros/{nombreArchivo}";

    }
    private void ValidarDto(ArbitrosDto arbitros)
    {
        if (arbitros == null)
            throw new BadRequestException(
                "El cuerpo de la solicitud es obligatorio"
            );

        if (string.IsNullOrWhiteSpace(arbitros.Nombre))
            throw new BadRequestException(
                "El nombre es obligatorio"
            );

        if (string.IsNullOrWhiteSpace(
            arbitros.ApellidoPaterno))
        {
            throw new BadRequestException(
                "El apellido paterno es obligatorio"
            );
        }

        if (string.IsNullOrWhiteSpace(
            arbitros.PaisNacimiento))
        {
            throw new BadRequestException(
                "El país es obligatorio"
            );
        }

        if (string.IsNullOrWhiteSpace(
            arbitros.CiudadNacimiento))
        {
            throw new BadRequestException(
                "La ciudad es obligatoria"
            );
        }

        if (
            arbitros.FechaNacimiento >
            DateTime.Now
        )
        {
            throw new BadRequestException(
                "La fecha de nacimiento no es válida"
            );
        }

        if (
            arbitros.FechaRetiro.HasValue &&
            arbitros.FechaRetiro <
            arbitros.FechaDebut
        )
        {
            throw new BadRequestException(
                "La fecha de retiro no puede ser menor al debut"
            );
        }
    }

    public async Task<PagedResult<Arbitros>> GetAllAsync(int page, int pageSize, string? search, string? categoria, string? pais, string? estado)
    {
        return await _repository.GetAllAsync(page, pageSize, search, categoria, pais, estado);
    }

    public async Task<Arbitros> GetByIdAsync(int id)
    {
       return await _repository.GetByIdAsync(id)
         ?? throw new NotFoundException("Árbitro no encontrado");
    }

    public async  Task<Arbitros> UpdateAsync(int id, ArbitrosDto arbitros)
    {
        throw new NotImplementedException();
    }
}
