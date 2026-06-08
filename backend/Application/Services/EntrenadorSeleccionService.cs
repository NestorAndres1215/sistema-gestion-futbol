using Application.Common.Exceptions;
using Application.Dto.Config;
using Application.Dto.Entrenadores;
using Application.Dto.Selecciones;
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

    public async Task<EntrenadorSeleccion> AddAsync(SeleccionEntrenadorRequest seleccioEntrenadorRequest)
    {
        var seleccion = await _seleccionRepository.GetByNombreAsync(seleccioEntrenadorRequest.Seleccion)
            ?? throw new NotFoundException("La Selección no existe.");

        var entrenador = await _entrenadoresRepository.GetByIdAsync(seleccioEntrenadorRequest.Entrenador)
            ?? throw new NotFoundException("El Entrenador no existe.");

        if (seleccioEntrenadorRequest.FechaFin.HasValue &&
            seleccioEntrenadorRequest.FechaFin.Value < seleccioEntrenadorRequest.FechaInicio)
        {
            throw new BadRequestException("La fecha de fin no puede ser menor que la fecha de inicio.");
        }

        var existeContrato = await _repository.ExisteCruceFechasAsync(
            seleccion.Id,
            seleccioEntrenadorRequest.FechaInicio,
            seleccioEntrenadorRequest.FechaFin);

        if (existeContrato)
        {
            throw new BadRequestException("Ya existe un entrenador registrado para ese período.");
        }

        string estado = "Activo";

        if (seleccioEntrenadorRequest.FechaFin.HasValue &&
            seleccioEntrenadorRequest.FechaFin.Value.Date < DateTime.Today)
        {
            estado = "Inactivo";
        }

        var entrenadorSeleccion = new EntrenadorSeleccion
        {
            EntrenadorId = entrenador.Id,
            SeleccionId = seleccion.Id,
            Cargo = "Principal",
            FechaInicio = seleccioEntrenadorRequest.FechaInicio,
            FechaFin = seleccioEntrenadorRequest.FechaFin,
            Estado = estado
        };

        return await _repository.AddAsync(entrenadorSeleccion);
    }

    public async Task<EntrenadorSeleccion?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<List<EntrenadorSelectResponse>> GetEntrenadoresAsync()
    {
        return await _repository.GetEntrenadoresAsync();
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
        SeleccionEntrenadorRequest seleccioEntrenadorRequest)
    {
        var entrenadorSeleccion = await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("La relación entrenador-selección no existe.");

        var seleccion = await _seleccionRepository.GetByNombreAsync(seleccioEntrenadorRequest.Seleccion)
            ?? throw new NotFoundException("La Selección no existe.");

        var entrenador = await _entrenadoresRepository.GetByIdAsync(seleccioEntrenadorRequest.Entrenador)
            ?? throw new NotFoundException("El Entrenador no existe.");

        if (seleccioEntrenadorRequest.FechaFin.HasValue &&
            seleccioEntrenadorRequest.FechaFin.Value < seleccioEntrenadorRequest.FechaInicio)
        {
            throw new BadRequestException("La fecha de fin no puede ser menor que la fecha de inicio.");
        }

        var existeCruce = await _repository.ExisteCruceFechasActualizarAsync(
            seleccion.Id,
            seleccioEntrenadorRequest.FechaInicio,
            seleccioEntrenadorRequest.FechaFin,
            id);

        if (existeCruce)
        {
            throw new BadRequestException("Ya existe un entrenador registrado para ese período.");
        }

        entrenadorSeleccion.EntrenadorId = entrenador.Id;
        entrenadorSeleccion.SeleccionId = seleccion.Id;
        entrenadorSeleccion.Cargo = seleccioEntrenadorRequest.Cargo;
        entrenadorSeleccion.FechaInicio = seleccioEntrenadorRequest.FechaInicio;
        entrenadorSeleccion.FechaFin = seleccioEntrenadorRequest.FechaFin;

        entrenadorSeleccion.Estado =
            seleccioEntrenadorRequest.FechaFin.HasValue &&
            seleccioEntrenadorRequest.FechaFin.Value.Date < DateTime.Today
                ? "Inactivo"
                : "Activo";

        return await _repository.UpdateAsync(entrenadorSeleccion);
    }

    public async Task<EntrenadorSeleccion> DespedirAsync(int id)
    {
        var entrenadorSeleccion = await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException("La relación entrenador-selección no existe.");

        if (entrenadorSeleccion.Estado == "Inactivo")
        {
            throw new BadRequestException("El entrenador ya está inactivo.");
        }

        entrenadorSeleccion.Estado = "Inactivo";
        entrenadorSeleccion.FechaFin = DateTime.Today;

        return await _repository.UpdateAsync(entrenadorSeleccion);
    }
}
