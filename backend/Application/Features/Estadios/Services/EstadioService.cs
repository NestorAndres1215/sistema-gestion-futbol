using Application.Common.Estadisticas;
using Application.Common.Exceptions;
using Application.Common.Helpers;
using Application.Common.Models;
using Application.Features.Estadios.Dto;
using Application.Features.Estadios.Interfaces;
using Application.Features.Estadios.Validators;
using Application.Features.Fotos.Interfaces;
using Application.Interfaces.Repositories;
using Domain.Catalogs;
using Domain.Entities;
using FluentValidation;


namespace Application.Features.Estadios.Services;

public class EstadioService : IEstadioService
{

    private readonly IEstadioRepository _repository;
    private readonly IFotoService _fotoService;
    private readonly IValidator<EstadioRequest> _validator;

    public EstadioService(
        IEstadioRepository repository,
        IFotoService fotoService,
        IValidator<EstadioRequest> validator)
    {
        _repository = repository;
        _fotoService = fotoService;
        _validator= validator;  
    }


    public async Task<Estadio> AddAsync(EstadioRequest dto)
    {

        ValidationHelper.Validar(dto, _validator);

        string fotoUrl = await _fotoService.GuardarFotoAsync(dto.Foto!, "estadios", $"{dto.Nombre}");

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
            Estado = EstadoEstadio.Disponible,
            FechaCreacion = DateTime.Now
        };
        
        return await _repository.AddAsync(estadio);
 
    }


    public async  Task<PagedResult<EstadioResponse>> GetAllAsync(int page, int pageSize, string? search, string? tipoCesped, string? pais, int? anio, string? estado)
    {
        return await _repository.GetAllAsync(page, pageSize, search, tipoCesped, pais, anio, estado);
    }

    public async Task<List<int>> GetAniosAsync()
    {
        return await _repository.GetAniosAsync()
            ?? throw new NotFoundException("Anios no encontrado");
    }

    public async  Task<Estadio?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("Estadio no encontrado");
    }

    public async Task<Estadio?> GetByNombreAsync(string nombre)
    {
        return await _repository.GetByNombreAsync(nombre)
            ?? throw new NotFoundException("Estadio no encontrado");
    }
    public async Task<List<Estadio>> GetByPaisAsync(string pais)
    {
        return await _repository.GetByPaisAsync(pais);
    }

    public async Task<Estadio> UpdateAsync(int id, EstadioRequest estadioDTo)
    {
        var estadio = await _repository.GetByIdAsync(id);

        if (estadio == null)
            throw new NotFoundException($"No se encontró el estadio con id {id}");


        ValidationHelper.Validar(estadioDTo, _validator);


        if (estadioDTo.Foto != null && estadioDTo.Foto.Length > 0)
        {
            if (!string.IsNullOrEmpty(estadio.FotoUrl))
                _fotoService.EliminarFoto(estadio.FotoUrl);

            estadio.FotoUrl = await _fotoService.GuardarFotoAsync(estadioDTo.Foto!, "estadios", $"{estadioDTo.Nombre}"); ;
        }

        estadio.Nombre = estadioDTo.Nombre;
        estadio.Descripcion = estadioDTo.Descripcion ?? "";
        estadio.FechaApertura = estadioDTo.FechaApertura;
        estadio.Anio = estadioDTo.Anio;
        estadio.Ciudad = estadioDTo.Ciudad;
        estadio.Pais = estadioDTo.Pais;
        estadio.Latitud = estadioDTo.Latitud;
        estadio.Longitud = estadioDTo.Longitud;
        estadio.Capacidad = estadioDTo.Capacidad;
        estadio.TipoCesped = estadioDTo.TipoCesped;

        estadio.FechaActualizacion = DateTime.Now;

        return await _repository.UpdateAsync(estadio);
    }

    public async Task<TotalCountResponse> ObtenerTotalEstadiosAsync()
    {
        var total = await _repository.ObtenerTotalEstadiosAsync();

        return new TotalCountResponse
        {
            Total = total
        };
    }
    public async Task<AverageResponse> ObtenerPromedioCapacidadAsync()
    {
        var promedio = await _repository.ObtenerPromedioCapacidadAsync();

        return new AverageResponse
        {
            Promedio = promedio
        };
    }
    public async Task<TotalCountResponse> ObtenerTotalPaisesConEstadiosAsync()
    {
        var total = await _repository.ObtenerTotalPaisesConEstadiosAsync();

        return new TotalCountResponse
        {
            Total = total
        };
    }
    public async Task<List<ItemResponse>> ObtenerPaisesConMasEstadiosAsync(int cantidad)
    {
        return await _repository.ObtenerPaisesConMasEstadiosAsync(cantidad);
    }
    public async Task<List<ItemResponse>> ObtenerPaisesConMenosEstadiosAsync(int cantidad)
    {
        return await _repository.ObtenerPaisesConMenosEstadiosAsync(cantidad);
    }
    public async Task<List<ItemResponse>> ObtenerCiudadesConMasEstadiosAsync(int cantidad)
    {
        return await _repository.ObtenerCiudadesConMasEstadiosAsync(cantidad);
    }
    public async Task<List<ItemResponse>> ObtenerCiudadesConMenosEstadiosAsync(int cantidad)
    {
        return await _repository.ObtenerCiudadesConMenosEstadiosAsync(cantidad);
    }
    public async Task<List<ItemResponse>> ObtenerDistribucionPorEstadoAsync()
    {
        return await _repository.ObtenerDistribucionPorEstadoAsync();
    }
    public async Task<List<ItemResponse>> ObtenerDistribucionTipoCespedAsync()
    {
        return await _repository.ObtenerDistribucionTipoCespedAsync();
    }
    public async Task<List<ItemResponse>> ObtenerMayorCapacidadAsync(int cantidad)
    {
        return await _repository.ObtenerMayorCapacidadAsync(cantidad);
    }
    public async Task<List<ItemResponse>> ObtenerMenorCapacidadAsync(int cantidad)
    {
        return await _repository.ObtenerMenorCapacidadAsync(cantidad);
    }
    public async Task<List<ItemResponse>> ObtenerEstadiosMasAntiguosAsync(int cantidad)
    {
        return await _repository.ObtenerEstadiosMasAntiguosAsync(cantidad);
    }
    public async Task<List<ItemResponse>> ObtenerEstadiosMasNuevosAsync(int cantidad)
    {
        return await _repository.ObtenerEstadiosMasNuevosAsync(cantidad);
    }

}

