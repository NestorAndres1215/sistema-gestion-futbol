using Application.Common.Exceptions;
using Application.Common.Helpers;
using Application.Common.Models;
using Application.Features.Torneos.Dto;
using Application.Features.Torneos.Interfaces;
using Application.Features.Usuarios.Dto;
using Application.Interfaces.Repositories;
using Domain.Entities;
using FluentValidation;

namespace Application.Features.Torneos.Services;

public class TorneoService : ITorneoService
{
    private readonly ITorneoRepository _repo;
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IValidator<TorneoRequest> _validator;

    public TorneoService(
        ITorneoRepository repo,
        IValidator<TorneoRequest> validator,
        IUsuarioRepository usuarioRepository)
    {
        _repo = repo;
        _validator = validator;
        _usuarioRepository = usuarioRepository;
    }

    public async Task<Torneo> AddAsync(TorneoRequest dto)
    {

        ValidationHelper.Validar(dto, _validator);
        var existe = await _repo.GetByNombreAsync(dto.Nombre);

        if (existe != null)
            throw new ConflictException("El torneo ya existe");

        var usuario = await _usuarioRepository.GetByUsernameAsync(dto.Creado)
            ?? throw new NotFoundException("El usuario no existe");

        var torneo = new Torneo
        {
            Nombre = dto.Nombre,
            Tipo = dto.Tipo,
            TipoParticipante = dto.TipoParticipante,
            Descripcion = dto.Descripcion,
            Estado = string.IsNullOrWhiteSpace(dto.Estado) ? "Activo" : dto.Estado,
            FechaCreacion = DateTime.UtcNow,
            CreadoPor = usuario.Id
        };

        return await _repo.AddAsync(torneo);
    }


    public async Task<PagedResult<TorneoResponse>> GetAllAsync(int page,
        int pageSize,
        string? search,
        string? tipo,
        string? tipoParticipante,
        string? estado)
    {
        return await _repo.GetAllAsync(page, pageSize, search, tipo, tipoParticipante,estado);
    }

    public async Task<Torneo> GetByIdAsync(int id)
    {
        return await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("Torneo no encontrada");
    }

    public async  Task<Torneo> GetByNombreAsync(string nombre)
    {
        return await _repo.GetByNombreAsync(nombre)
            ?? throw new NotFoundException("Torneo no encontrada");
    }

    public async Task<Torneo> UpdateAsync(int id, TorneoRequest dto)
    {
        ValidationHelper.Validar(dto, _validator);

        var torneo = await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("Torneo no encontrado");

        if (!string.Equals(torneo.Nombre, dto.Nombre, StringComparison.OrdinalIgnoreCase))
        {
            var existeNombre = await _repo.GetByNombreAsync(dto.Nombre);

            if (existeNombre != null && existeNombre.Id != id)
                throw new ConflictException("Ya existe un torneo con ese nombre");
        }

        var usuario = await _usuarioRepository.GetByUsernameAsync(dto.Modificado)
            ?? throw new NotFoundException("El usuario no existe");

        torneo.Nombre = dto.Nombre;
        torneo.Tipo = dto.Tipo;
        torneo.TipoParticipante = dto.TipoParticipante;
        torneo.Descripcion = dto.Descripcion;
        torneo.Estado = string.IsNullOrWhiteSpace(dto.Estado)
            ? torneo.Estado
            : dto.Estado;

        torneo.FechaActualizacion = DateTime.UtcNow;
        torneo.ModificadoPor = usuario.Id;

        return await _repo.UpdateAsync(torneo);
    }
}