using Application.Common.Exceptions;
using Application.Dto.config;
using Application.Dto.selecciones;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;

namespace Application.Services;

public class EntrenadorSeleccionService : IEntrenadorSeleccionService
{
    private readonly IEntrenadorSeleccionRepository _repository;
    private readonly ISeleccionRepository _seleccionRepository;
    private readonly IEntrenadoresRepository _entrenadoresRepository;

    public EntrenadorSeleccionService(
        IEntrenadorSeleccionRepository repository,
        ISeleccionRepository seleccionRepository,
        IEntrenadoresRepository entrenadoresRepository)
    {
        _repository = repository;
        _entrenadoresRepository = entrenadoresRepository;
        _seleccionRepository = seleccionRepository;
    }

    public async Task<EntrenadorSeleccion> AddAsync(SeleccioEntrenadorRequest seleccioEntrenadorRequest)
    {
        var seleccion = await _seleccionRepository.GetByNombreAsync(seleccioEntrenadorRequest.Seleccion)
         ?? throw new NotFoundException("La Seleccion no existe.");

        var entrenador = await _entrenadoresRepository.GetByNombreAsync(seleccioEntrenadorRequest.Entrenador)
          ?? throw new NotFoundException("El Entrenador no existe.");

        if (seleccioEntrenadorRequest.FechaFin.HasValue && 
            seleccioEntrenadorRequest.FechaFin.Value < seleccioEntrenadorRequest.FechaInicio)
        {
            throw new BadRequestException("La fecha de fin no puede ser menor que la fecha de inicio.");
        }

        var entrenadorSeleccion = new EntrenadorSeleccion
        {
            EntrenadorId = entrenador.Id,
            SeleccionId = seleccion.Id,
            Cargo = seleccioEntrenadorRequest.Cargo,
            FechaInicio = seleccioEntrenadorRequest.FechaInicio,
            FechaFin = seleccioEntrenadorRequest.FechaFin,
        };

        return await _repository.AddAsync(entrenadorSeleccion);
    }

    public async Task<EntrenadorSeleccion?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<List<string>> GetEntrenadoresAsync(string seleccion)
    {
        return await _repository.GetEntrenadoresAsync(seleccion);
    }

    public async Task<PagedResult<SeleccionEntrenadorResponse>> ListarPorSeleccion( int page, int pageSize, string? seleccion)
    {
        return await _repository.ListarPorSeleccion(page, pageSize, seleccion);
    }

    public async Task<List<EntrenadorSeleccion>> ListarPorSeleccionNombre(string nombre)
    {
        return await _repository.ListarPorSeleccionNombre(nombre);
    }

    public async Task<EntrenadorSeleccion> UpdateAsync(
        int id,
        SeleccioEntrenadorRequest seleccioEntrenadorRequest)
    {
        var entrenadorSeleccion = await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("La relación entrenador-selección no existe.");

        var seleccion = await _seleccionRepository.GetByNombreAsync(seleccioEntrenadorRequest.Seleccion)
            ?? throw new NotFoundException("La Selección no existe.");

        var entrenador = await _entrenadoresRepository.GetByNombreAsync(seleccioEntrenadorRequest.Entrenador)
            ?? throw new NotFoundException("El Entrenador no existe.");

        if (seleccioEntrenadorRequest.FechaFin.HasValue &&
            seleccioEntrenadorRequest.FechaFin.Value < seleccioEntrenadorRequest.FechaInicio)
        {
            throw new BadRequestException("La fecha de fin no puede ser menor que la fecha de inicio.");
        }

        entrenadorSeleccion.EntrenadorId = entrenador.Id;
        entrenadorSeleccion.SeleccionId = seleccion.Id;
        entrenadorSeleccion.Cargo = seleccioEntrenadorRequest.Cargo;
        entrenadorSeleccion.FechaInicio = seleccioEntrenadorRequest.FechaInicio;
        entrenadorSeleccion.FechaFin = seleccioEntrenadorRequest.FechaFin;

        return await _repository.UpdateAsync(entrenadorSeleccion);
    }
}
