using Application.Dto.config;
using Application.Dto.entrenadores;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class EntrenadoresRepository : IEntrenadoresRepository
{

    private readonly AppDbContext _context;
    public EntrenadoresRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Entrenadores> AddAsync(Entrenadores entrenadores)
    {
        _context.Entrenadores.Add(entrenadores);
        await _context.SaveChangesAsync();
        return entrenadores;
    }

    public async Task<PagedResult<EntrenadoresResponse>> GetAllAsync(
        int page,
        int pageSize,
        string? search,
        string? estiloJuego,
        string? pais,
        string? estado)
    {
        var query = _context.Entrenadores
            .Include(e => e.Persona)
                .ThenInclude(p => p.PaisNacimiento)
            .Include(e => e.Persona)
                .ThenInclude(p => p.CiudadNacimiento)
            .AsNoTracking()
            .AsQueryable();

        // 🔎 SEARCH
        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim();

            query = query.Where(e =>
                e.Persona != null &&
                (
                    e.Persona.Nombre.Contains(s) ||
                    e.Persona.Apellido.Contains(s)
                ));
        }

        // ⚽ ESTILO JUEGO
        if (!string.IsNullOrWhiteSpace(estiloJuego))
        {
            var est = estiloJuego.Trim();

            query = query.Where(e =>
                e.EstiloJuego != null &&
                e.EstiloJuego.Contains(est));
        }

        // 🌍 PAÍS
        if (!string.IsNullOrWhiteSpace(pais))
        {
            var p = pais.Trim();

            query = query.Where(e =>
                e.Persona != null &&
                e.Persona.PaisNacimiento != null &&
                e.Persona.PaisNacimiento.Nombre.Contains(p));
        }

        // 📌 ESTADO
        if (!string.IsNullOrWhiteSpace(estado))
        {
            var est = estado.Trim();

            query = query.Where(e => e.Estado == est);
        }

        var total = await query.CountAsync();

        var data = await query
            .OrderByDescending(e => e.Nivel)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(e => new EntrenadoresResponse
            {
                Id = e.Id,
                Nombre = e.Persona != null ? e.Persona.Nombre : "",
                Apellido = e.Persona != null ? e.Persona.Apellido : "",
                PaisNacimiento = e.Persona != null && e.Persona.PaisNacimiento != null
                    ? e.Persona.PaisNacimiento.Nombre
                    : "",
                CiudadNacimiento = e.Persona != null && e.Persona.CiudadNacimiento != null
                    ? e.Persona.CiudadNacimiento.Nombre
                    : "",
                FechaNacimiento = e.Persona != null ? e.Persona.FechaNacimiento : null,
                EstiloJuego = e.EstiloJuego ?? "",
                FechaDebut = e.FechaDebut,
                FotoUrl = e.Persona != null ? e.Persona.FotoUrl : null
            })
            .ToListAsync();

        return new PagedResult<EntrenadoresResponse>
        {
            Items = data,
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<Entrenadores?> GetByIdAsync(int id)
    {
        return await _context.Entrenadores
            .Include(x => x.Persona)
                .ThenInclude(p => p.CiudadNacimiento)
            .Include(x => x.Persona)
                .ThenInclude(p => p.PaisNacimiento)
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Entrenadores?> GetByNombreAsync(string nombre)
    {
        return await _context.Entrenadores
            .Include(x => x.Persona!)
                .ThenInclude(p => p.CiudadNacimiento)
            .Include(x => x.Persona!)
                .ThenInclude(p => p.PaisNacimiento)
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Persona != null && x.Persona.Nombre == nombre);
    }

    public async Task<List<EntrenadorComboRequest>> GetComboAsync()
    {
        var entrenadoresSeleccionados = _context.EntrenadorSeleccion
            .Where(x => x.Estado == "Activo")
            .Select(x => x.EntrenadorId);

        return await _context.Entrenadores
            .Where(x => x.Estado == "Activo" &&
                        !entrenadoresSeleccionados.Contains(x.Id))
            .Select(x => new EntrenadorComboRequest
            {
                Id = x.Id,
                NombreCompleto = x.Persona.Nombre + " " + x.Persona.Apellido
            })
            .OrderBy(x => x.NombreCompleto)
            .ToListAsync();
    }

    public async Task<Entrenadores> UpdateAsync(Entrenadores entrenadores)
    {
        _context.Entrenadores.Update(entrenadores);
        await _context.SaveChangesAsync();
        return entrenadores;
    }
}
