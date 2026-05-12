using Application.Common.Exceptions;
using Application.Dto;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Services;

public class EstadioService : IEstadioService
{

    private readonly IEstadioRepository _repository;

    public EstadioService(IEstadioRepository repository)
    {
        _repository = repository;
    }


    public async Task<Estadio> AddAsync(EstadioDTo dto)
    {

        ValidarDto(dto);
        string fotoUrl = await GuardarFotoAsync(dto);

        var estadio = new Estadio
        {
            Nombre = dto.Nombre,
            Descripcion = dto.Descripcion ?? "",

            FechaApertura = dto.FechaApertura,
            Anio = dto.Anio,

            Ciudad = dto.Ciudad,
            Pais = dto.Pais,

            Latitud = dto.Latitud,
            Longitud = dto.Longitud,

            Capacidad = dto.Capacidad,

            TipoCesped = dto.TipoCesped,
            FotoUrl = fotoUrl,

            Estado = "Disponible",
            FechaCreacion = DateTime.Now
        };

            await _repository.AddAsync(estadio);
            return estadio;
 
    }

    private async Task<string> GuardarFotoAsync(EstadioDTo dto)
    {
        if (dto.Foto == null)
            return "";

        var carpeta = Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot/uploads/estadios"
        );

        if (!Directory.Exists(carpeta))
            Directory.CreateDirectory(carpeta);

        var extension = Path.GetExtension(dto.Foto.FileName);

        var nombreBase =
            $"{dto.Nombre}_{dto.Pais}_{dto.Ciudad}"
            .Replace(" ", "_")
            .Replace("/", "")
            .Replace("\\", "")
            .ToLower();

        var nombreArchivo =
            $"{nombreBase}_{Guid.NewGuid()}{extension}";

        var rutaCompleta = Path.Combine(carpeta, nombreArchivo);

        using (var stream = new FileStream(rutaCompleta, FileMode.Create))
        {
            await dto.Foto.CopyToAsync(stream);
        }

       return  $"/uploads/estadios/{nombreArchivo}";

    }

    private void ValidarDto(EstadioDTo dto)
    {
        if (dto == null)
            throw new BadRequestException(nameof(dto));

        if (string.IsNullOrWhiteSpace(dto.Nombre))
            throw new BadRequestException("El nombre es obligatorio");

        if (string.IsNullOrWhiteSpace(dto.Pais))
            throw new BadRequestException("El país es obligatorio");

        if (string.IsNullOrWhiteSpace(dto.Ciudad))
            throw new BadRequestException("La ciudad es obligatoria");

        if (dto.Capacidad <= 0)
            throw new BadRequestException("La capacidad debe ser mayor a 0");

        if (dto.FechaApertura > DateTime.Now)
            throw new BadRequestException(
                "La fecha de apertura no puede ser mayor a la fecha actual"
            );

        if ( dto.Anio <= 0 || dto.Anio > DateTime.Now.Year)
        {
            throw new BadRequestException( "El año no es válido");
        }
    }

    public async  Task<PagedResult<Estadio>> GetAllAsync(int page, int pageSize, string? search, string? tipoCesped, string? pais, int? anio, string? estado)
    {
        return await _repository.GetAllAsync(page, pageSize, search, tipoCesped, pais, anio, estado);
    }

    public async Task<List<int>> GetAniosAsync()
    {
       return await _repository.GetAniosAsync();
    }

    public async  Task<Estadio?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<Estadio?> GetByNombreAsync(string nombre)
    {
        return await _repository.GetByNombreAsync(nombre);
    }
}

