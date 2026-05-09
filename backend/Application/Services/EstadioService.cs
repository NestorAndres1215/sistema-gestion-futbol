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

        string fotoUrl = "";

        if (dto.Foto != null)
        {
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

            fotoUrl = $"/uploads/estadios/{nombreArchivo}";
        }

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

