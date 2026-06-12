
using Application.Common.Models;
using Application.Features.ClubesEntrenadores.Dto;
using Application.Features.Entrenadores.Dto;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ClubesEntrenadorRepository:IClubesEntrenadorRepository
{

    private readonly AppDbContext _context;
    public ClubesEntrenadorRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ClubEntrenador> AddAsync(ClubEntrenador clubEntrenador)
    {
        _context.ClubEntrenador.Add(clubEntrenador);
        await _context.SaveChangesAsync();
        return clubEntrenador;
    }

    public async Task<bool> ExisteCruceFechasActualizarAsync(int clubId, DateTime fechaInicio, DateTime? fechaFin, int idExcluir)
    {
        return await _context.ClubEntrenador
          .AnyAsync(x =>
              x.Id != idExcluir &&
              x.ClubId == clubId &&
              fechaFin.HasValue &&
              fechaInicio <= x.FechaFin &&
              fechaFin.Value >= x.FechaInicio);
    }

    public async Task<bool> ExisteCruceFechasAsync(int clubId, DateTime fechaInicio, DateTime? fechaFin)
    {
        return await _context.ClubEntrenador
            .AnyAsync(x =>
                x.ClubId == clubId &&
                fechaFin.HasValue &&
                fechaInicio <= x.FechaFin &&
                fechaFin.Value >= x.FechaInicio);
    }

    public async Task<ClubEntrenador?> GetByIdAsync(int id)
    {
        return await _context.ClubEntrenador
            .Include(x => x.Club)
            .Include(x => x.Entrenador)
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<List<EntrenadorSelectResponse>> GetEntrenadoresAsync()
    {
        return await _context.ClubEntrenador
            .Where(x => x.Entrenador != null
                        && x.Entrenador.Persona != null
                        && x.Estado == "Activo")
            .Select(x => new EntrenadorSelectResponse
            {
                Id = x.Id,
                NombreCompleto = (x.Entrenador.Persona.Nombre ?? "") + " " +
                                 (x.Entrenador.Persona.Apellido ?? "")
            })
            .Distinct()
            .OrderBy(x => x.NombreCompleto)
            .ToListAsync();
    }

    public async Task<PagedResult<ClubEntrenadorResponse>> ListarPorSeleccion(int page, int pageSize, string? club)
    {
        var query = _context.ClubEntrenador
            .Include(x => x.Club)
            .Include(x => x.Entrenador)
                .ThenInclude(x => x.Persona)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(club))
        {
            query = query.Where(x => x.Club.Nombre == club);
        }


        query = query.OrderByDescending(x => x.FechaInicio);

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new ClubEntrenadorResponse
            {
                Id = x.Id,
                Clubes = x.Club.Nombre,
                EntrenadorNombre = x.Entrenador.Persona.Nombre,
                EntrenadorApellido = x.Entrenador.Persona.Apellido,
                Cargo = x.Cargo,
                FechaInicio = x.FechaInicio,
                FechaFin = x.FechaFin,
                Estado = x.Estado
            })
            .ToListAsync();


        return new PagedResult<ClubEntrenadorResponse>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<List<ClubEntrenador>> ListarPorClubesNombre(string nombre)
    {
        return await _context.ClubEntrenador
           .Include(x => x.Club)
           .Include(x => x.Entrenador)
           .Where(x => x.Club.Nombre == nombre)
           .ToListAsync();
    }

    public async Task<ClubEntrenador> UpdateAsync(ClubEntrenador clubEntrenador)
    {
        _context.ClubEntrenador.Update(clubEntrenador);
        await _context.SaveChangesAsync();
        return clubEntrenador;
    }
}
