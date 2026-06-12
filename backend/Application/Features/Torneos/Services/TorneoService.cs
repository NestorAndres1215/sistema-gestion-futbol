using Application.Common.Exceptions;
using Application.Common.Models;
using Application.Features.Torneos.Dto;
using Application.Features.Torneos.Interfaces;
using Application.Interfaces.Repositories;
using Domain.Entities;

namespace Application.Features.Torneos.Services;

public class TorneoService : ITorneoService
{
    private readonly ITorneoRepository _repo;
    private readonly IUsuarioRepository _usuarioRepository;

    public TorneoService(ITorneoRepository repo,IUsuarioRepository usuarioRepository)
    {
        _repo = repo;
        _usuarioRepository = usuarioRepository;
    }

    public async Task<Torneo> AddAsync(TorneoRequest dto)
    {
        Validate(dto);

        await ValidarReglasAsync(dto);

        var usuario = await _usuarioRepository.GetByUsernameAsync(dto.creado)
            ?? throw new BadRequestException("El usuario no existe");

        var torneo = new Torneo
        {
            Nombre = dto.nombre,
            Tipo = dto.tipo,
            TipoParticipante = dto.tipoParticipante,
            Descripcion = dto.descricpcion,
            Estado = string.IsNullOrWhiteSpace(dto.estado) ? "Activo" : dto.estado,
            FechaCreacion = DateTime.UtcNow,
            CreadoPor = usuario.Id
        };

        return await _repo.AddAsync(torneo);
    }

    private void Validate(TorneoRequest dto)
    {
        if (dto == null)
            throw new BadRequestException("El cuerpo es obligatorio");

        if (string.IsNullOrWhiteSpace(dto.nombre))
            throw new BadRequestException("Nombre obligatorio");

        if (string.IsNullOrWhiteSpace(dto.tipo))
            throw new BadRequestException("Tipo obligatorio");

        if (string.IsNullOrWhiteSpace(dto.tipoParticipante))
            throw new BadRequestException("Tipo participante obligatorio");

        if (string.IsNullOrWhiteSpace(dto.descricpcion))
            throw new BadRequestException("Descripción obligatoria");

        if (string.IsNullOrWhiteSpace(dto.creado))
            throw new BadRequestException("Usuario creador obligatorio");
    }

    private async Task ValidarReglasAsync(TorneoRequest dto)
    {
        var existe = await _repo.GetByNombreAsync(dto.nombre);

        if (existe != null)
            throw new BadRequestException("El torneo ya existe");
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
        var torneo = await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("Torneo no encontrado");

        var existeNombre = await _repo.GetByNombreAsync(dto.nombre);

        if (existeNombre != null && existeNombre.Id != id)
            throw new BadRequestException("Ya existe un torneo con ese nombre");

        var usuario = await _usuarioRepository.GetByUsernameAsync(dto.modificado)
            ?? throw new BadRequestException("El usuario no existe");

        torneo.Nombre = dto.nombre;
        torneo.Tipo = dto.tipo;
        torneo.TipoParticipante = dto.tipoParticipante;
        torneo.Descripcion = dto.descricpcion;
        torneo.Estado = dto.estado;

        torneo.FechaActualizacion = DateTime.UtcNow;
        torneo.ModificadoPor = usuario.Id;

        return await _repo.UpdateAsync(torneo);
    }
}