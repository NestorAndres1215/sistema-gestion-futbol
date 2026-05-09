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
        // 🔥 DEBUG COMPLETO
        Console.WriteLine("========== DTO DEBUG ==========");
        Console.WriteLine($"Nombre: {dto.Nombre}");
        Console.WriteLine($"Descripcion: {dto.Descripcion}");
        Console.WriteLine($"FechaApertura: {dto.FechaApertura}");
        Console.WriteLine($"Anio: {dto.Anio}");
        Console.WriteLine($"Ciudad: {dto.Ciudad}");
        Console.WriteLine($"Pais: {dto.Pais}");
        Console.WriteLine($"Latitud: {dto.Latitud}");
        Console.WriteLine($"Longitud: {dto.Longitud}");
        Console.WriteLine($"Capacidad RAW: '{dto.Capacidad}'");
        Console.WriteLine($"TipoCesped: {dto.TipoCesped}");
        Console.WriteLine($"Foto: {(dto.Foto != null ? dto.Foto.FileName : "NULL")}");
        Console.WriteLine("================================");



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

        try
        {
            await _repository.AddAsync(estadio);
            return estadio;
        }
        catch (Exception ex)
        {
            Console.WriteLine("========== ERROR REAL ==========");
            Console.WriteLine(ex.InnerException?.Message ?? ex.Message);
            Console.WriteLine("================================");
            throw;
        }
    }
}

