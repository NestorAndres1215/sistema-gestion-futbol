

using Application.Common.Models;
using Application.Dto.Entrenadores;
using Application.Dto.Selecciones;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class EntrenadorSeleccionRepository : IEntrenadorSeleccionRepository
{

    private readonly AppDbContext _context;
    public EntrenadorSeleccionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<EntrenadorSeleccion> AddAsync(EntrenadorSeleccion entrenadorSeleccion)
    {
        _context.EntrenadorSeleccion.Add(entrenadorSeleccion);
        await _context.SaveChangesAsync();
        return entrenadorSeleccion;
    }


    public async Task<EntrenadorSeleccion?> GetByIdAsync(int id)
    {
        return await _context.EntrenadorSeleccion
            .Include(x => x.Seleccion)
            .Include(x => x.Entrenador)
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }
    public async Task<List<EntrenadorSelectResponse>> GetEntrenadoresAsync()
    {
        return await _context.EntrenadorSeleccion
            .Where(x => x.Entrenador != null
                        && x.Entrenador.Persona != null
                        && x.Estado == "Activo")
            .Select(x => new EntrenadorSelectResponse
            {
                Id = x.Id,
                NombreCompleto = (x.Entrenador.Persona.Nombre) + " " + (x.Entrenador.Persona.Apellido)
            })
            .Distinct()
            .OrderBy(x => x.NombreCompleto)
            .ToListAsync();
    }



    public async Task<PagedResult<SeleccionEntrenadorResponse>> ListarPorSeleccion(
        int page,
        int pageSize,
        string? seleccion)
    {
        var query = _context.EntrenadorSeleccion
            .Include(x => x.Seleccion)
            .Include(x => x.Entrenador)
                .ThenInclude(x => x.Persona)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(seleccion))
        {
            query = query.Where(x => x.Seleccion.Nombre == seleccion);
        }

 
        query = query.OrderByDescending(x => x.FechaInicio);

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new SeleccionEntrenadorResponse
            {
                Id = x.Id,
                Seleccion = x.Seleccion.Nombre,
                EntrenadorNombre = x.Entrenador.Persona.Nombre,
                EntrenadorApellido = x.Entrenador.Persona.Apellido,
                Cargo = x.Cargo,
                FechaInicio = x.FechaInicio,
                FechaFin = x.FechaFin,
                Estado = x.Estado
            })
            .ToListAsync();


        return new PagedResult<SeleccionEntrenadorResponse>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<List<EntrenadorSeleccion>> ListarPorSeleccionNombre(string nombre)
    {
        return await _context.EntrenadorSeleccion
            .Include(x => x.Seleccion)
            .Include(x => x.Entrenador)
            .Where(x => x.Seleccion.Nombre == nombre)
            .ToListAsync();
    }

    public async Task<EntrenadorSeleccion> UpdateAsync(EntrenadorSeleccion entrenadorSeleccion)
    {
        _context.EntrenadorSeleccion.Update(entrenadorSeleccion);
        await _context.SaveChangesAsync();
        return entrenadorSeleccion;
    }

    public async Task<bool> ExisteCruceFechasAsync(
        int seleccionId,
        DateTime fechaInicio,
        DateTime? fechaFin)
    {
        return await _context.EntrenadorSeleccion
            .AnyAsync(x =>
                x.SeleccionId == seleccionId &&
                fechaFin.HasValue &&
                fechaInicio <= x.FechaFin &&
                fechaFin.Value >= x.FechaInicio);
    }

    public async Task<bool> ExisteCruceFechasActualizarAsync(
        int seleccionId,
        DateTime fechaInicio,
        DateTime? fechaFin,
        int idExcluir)
    {
        return await _context.EntrenadorSeleccion
            .AnyAsync(x =>
                x.Id != idExcluir &&
                x.SeleccionId == seleccionId &&
                fechaFin.HasValue &&
                fechaInicio <= x.FechaFin &&
                fechaFin.Value >= x.FechaInicio);
    }
}
