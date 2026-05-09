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

        if (arbitros.FechaDebut.HasValue &&
            arbitros.FechaRetiro.HasValue &&
            arbitros.FechaDebut > arbitros.FechaRetiro)
        {
            throw new NotFoundException("La fecha de debut no puede ser mayor que la fecha de retiro.");
        }

        var pais = await _paisRepo.GetByNombreAsync(arbitros.PaisNacimiento);

        if (pais == null)
            throw new NotFoundException("El país no existe.");

        var ciudad = await _ciudadRepo.GetByNombreAsync(arbitros.CiudadNacimiento);

        if (ciudad == null)
            throw new NotFoundException("La ciudad no existe.");



        string fotoUrl = "";

        if (arbitros.Foto != null)
        {
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

            fotoUrl = $"/uploads/arbitros/{nombreArchivo}";
        }

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

    public async Task<PagedResult<Arbitros>> GetAllAsync(int page, int pageSize, string? search, string? categoria, string? pais, string? estado)
    {
        return await _repository.GetAllAsync(page, pageSize, search, categoria, pais, estado);
    }

    public Task<Arbitros> UpdateAsync(int id, ArbitrosDto arbitros)
    {
        throw new NotImplementedException();
    }
}
