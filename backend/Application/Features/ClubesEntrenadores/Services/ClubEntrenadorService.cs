using Application.Common.Exceptions;
using Application.Common.Models;
using Application.Features.ClubesEntrenadores.Dto;
using Application.Features.ClubesEntrenadores.Interfaces;
using Application.Features.Entrenadores.Dto;
using Application.Interfaces.Repositories;
using Domain.Entities;

namespace Application.Features.ClubesEntrenadores.Services;

public class ClubEntrenadorService : IClubEntrenadorService
{


    private readonly IClubesEntrenadorRepository _repository;
    private readonly IEntrenadoresRepository _entrenadoresRepository;
    private readonly IClubesRepository _clubesRepository;

    public ClubEntrenadorService(
        IClubesEntrenadorRepository repository,
        IEntrenadoresRepository entrenadoresRepository,
        IClubesRepository clubesRepository)
    {
        _repository = repository;
        _entrenadoresRepository = entrenadoresRepository;
        _clubesRepository = clubesRepository;
    }

    public async Task<ClubEntrenador> AddAsync(ClubEntrenadorRequest clubesEntrenadorRequest)
    {

        var clubes = await _clubesRepository.GetByNombreAsync(clubesEntrenadorRequest.Clubes)
            ?? throw new NotFoundException("La Selección no existe.");

        var entrenador = await _entrenadoresRepository.GetByIdAsync(clubesEntrenadorRequest.Entrenador)
            ?? throw new NotFoundException("El Entrenador no existe.");

        if (clubesEntrenadorRequest.FechaFin.HasValue &&
            clubesEntrenadorRequest.FechaFin.Value < clubesEntrenadorRequest.FechaInicio)
        {
            throw new BadRequestException("La fecha de fin no puede ser menor que la fecha de inicio.");
        }

        var existeContrato = await _repository.ExisteCruceFechasAsync(
           clubes.Id,
           clubesEntrenadorRequest.FechaInicio,
           clubesEntrenadorRequest.FechaFin);

        if (existeContrato)
        {
            throw new BadRequestException("Ya existe un entrenador registrado para ese período.");
        }

        string estado = "Activo";

        if (clubesEntrenadorRequest.FechaFin.HasValue &&
            clubesEntrenadorRequest.FechaFin.Value.Date < DateTime.Today)
        {
            estado = "Inactivo";
        }

        var clubesEntrenador = new ClubEntrenador
        {
            EntrenadorId = entrenador.Id,
            ClubId = clubes.Id,
            Cargo = "Principal",
            FechaInicio = clubesEntrenadorRequest.FechaInicio,
            FechaFin = clubesEntrenadorRequest.FechaFin,
            Estado = estado
        };

        return await _repository.AddAsync(clubesEntrenador);
    }

    public async Task<ClubEntrenador> UpdateAsync(int id, ClubEntrenadorRequest clubesEntrenadorRequest)
    {

        var entrenadorClubes = await _repository.GetByIdAsync(id)
          ?? throw new NotFoundException("La relación entrenador-selección no existe.");

        var clubes = await _clubesRepository.GetByNombreAsync(clubesEntrenadorRequest.Clubes)
            ?? throw new NotFoundException("La Selección no existe.");

        var entrenador = await _entrenadoresRepository.GetByIdAsync(clubesEntrenadorRequest.Entrenador)
            ?? throw new NotFoundException("El Entrenador no existe.");

        if (clubesEntrenadorRequest.FechaFin.HasValue &&
            clubesEntrenadorRequest.FechaFin.Value < clubesEntrenadorRequest.FechaInicio)
        {
            throw new BadRequestException("La fecha de fin no puede ser menor que la fecha de inicio.");
        }


        var existeCruce = await _repository.ExisteCruceFechasActualizarAsync(
           clubes.Id,
           clubesEntrenadorRequest.FechaInicio,
           clubesEntrenadorRequest.FechaFin,
           id);

        if (existeCruce)
        {
            throw new BadRequestException("Ya existe un entrenador registrado para ese período.");
        }

        entrenadorClubes.EntrenadorId = entrenador.Id;
        entrenadorClubes.ClubId = clubes.Id;
        entrenadorClubes.Cargo = clubesEntrenadorRequest.Cargo;
        entrenadorClubes.FechaInicio = clubesEntrenadorRequest.FechaInicio;
        entrenadorClubes.FechaFin = clubesEntrenadorRequest.FechaFin;

        entrenadorClubes.Estado =
            clubesEntrenadorRequest.FechaFin.HasValue &&
            clubesEntrenadorRequest.FechaFin.Value.Date < DateTime.Today
                ? "Inactivo"
                : "Activo";


        return await _repository.UpdateAsync(entrenadorClubes);
    }

    public async Task<ClubEntrenador?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }
    public async Task<PagedResult<ClubEntrenadorResponse>> ListarPorClub(int page, int pageSize, string? club)
    {
        return await _repository.ListarPorSeleccion(page, pageSize, club);
    }

    public async Task<List<EntrenadorSelectResponse>> GetEntrenadoresAsync()
    {
        return await _repository.GetEntrenadoresAsync();
    }


    public async Task<List<ClubEntrenador>> ListarPorClubNombre(string nombre)
    {
        return await _repository.ListarPorClubesNombre(nombre);
    }


    public async Task<ClubEntrenador> DespedirAsync(int id)
    {
        var clubEntrenador = await _repository.GetByIdAsync(id)
           ?? throw new NotFoundException("La relación entrenador-selección no existe.");

        if (clubEntrenador.Estado == "Inactivo")
        {
            throw new BadRequestException("El entrenador ya está inactivo.");
        }

        clubEntrenador.Estado = "Inactivo";
        clubEntrenador.FechaFin = DateTime.Today;

        return await _repository.UpdateAsync(clubEntrenador);
    }





}
