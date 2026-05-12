using Application.Common.Exceptions;
using Application.Dto;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;

namespace Application.Services;

public class TorneoService : ITorneoService
{
    private readonly ITorneoRepository _repo;
    private readonly IUsuarioRepository _usuarioRepository;

    public TorneoService(ITorneoRepository repo,IUsuarioRepository usuarioRepository)
    {
        _repo = repo;
        _usuarioRepository = usuarioRepository;
    }

    public async Task<Torneo> AddAsync(TorneoDto torneoDto)
    {
        ValidarDto(torneoDto);

        var existe = await _repo
            .GetByNombreAsync(torneoDto.nombre);

        if (existe != null)
            throw new BadRequestException("El torneo ya existe" );

        var existeUsuario = await _usuarioRepository
            .GetByUsernameAsync(torneoDto.creado);

        if (existeUsuario == null)
            throw new BadRequestException(  "El usuario no existe");

        var torneo = new Torneo
        {
            Nombre = torneoDto.nombre,
            Tipo = torneoDto.tipo,
            TipoParticipante = torneoDto.tipoParticipante,
            Descripcion = torneoDto.descricpcion,
            Estado = string.IsNullOrWhiteSpace(torneoDto.estado)
                        ? "Activo"
                        : torneoDto.estado,

            FechaCreacion = DateTime.UtcNow,
            CreadoPor = existeUsuario.Id
        };

        await _repo.AddAsync(torneo);

        return torneo;
    }


    private void ValidarDto(TorneoDto torneoDto)
    {
        if (torneoDto == null)
            throw new BadRequestException("El cuerpo de la solicitud es obligatorio");

        if (string.IsNullOrWhiteSpace(torneoDto.nombre))
            throw new BadRequestException("El nombre es obligatorio");

        if (string.IsNullOrWhiteSpace(torneoDto.tipo))
            throw new BadRequestException("El tipo es obligatorio");

        if (string.IsNullOrWhiteSpace(torneoDto.tipoParticipante))
        {
            throw new BadRequestException(   "El tipo de participante es obligatorio");
        }

        if (string.IsNullOrWhiteSpace(torneoDto.descricpcion))
        {
            throw new BadRequestException("La descripción es obligatoria");
        }

        if (string.IsNullOrWhiteSpace(  torneoDto.creado))
        {
            throw new BadRequestException("El usuario creador es obligatorio");
        }
    }

    public async Task<PagedResult<Torneo>> GetAllAsync(int page,
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

    public async Task<Torneo> UpdateAsync(int id, TorneoDto torneoDto)
    {
        var torneo = await _repo.GetByIdAsync(id);

        if (torneo == null)
            throw new NotFoundException("Torneo no encontrado");

        var existeNombre = await _repo.GetByNombreAsync(torneoDto.nombre);

        if (existeNombre != null && existeNombre.Id != id)
            throw new BadRequestException("Ya existe un torneo con ese nombre");

        var usuario = await _usuarioRepository
            .GetByUsernameAsync(torneoDto.modificado);

        if (usuario == null)
            throw new BadRequestException("El usuario no existe");

        torneo.Nombre = torneoDto.nombre;
        torneo.Tipo = torneoDto.tipo;
        torneo.TipoParticipante = torneoDto.tipoParticipante;
        torneo.Descripcion = torneoDto.descricpcion;
        torneo.Estado = torneoDto.estado;

        torneo.FechaActualizacion = DateTime.UtcNow;
        torneo.ModificadoPor = usuario.Id;

        await _repo.UpdateAsync(torneo);

        return torneo;
    }
}