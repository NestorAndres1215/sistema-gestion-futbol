using Application.Dto;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Linq;

namespace Infrastructure.Repositories;

public class ArbitrosRepository : IArbitroRepository
{
    private readonly AppDbContext _context;
    public ArbitrosRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Arbitros> AddAsync(Arbitros arbitros)
    {
        _context.Arbitros.Add(arbitros);
        await _context.SaveChangesAsync();
        return arbitros;
    }

    public async Task<PagedResult<Arbitros>> GetAllAsync(
    int page,
    int pageSize,
    string? search,
    string? categoria,
    string? pais,
    string? estado)
    {
        var query = _context.Arbitros
           .Include(a => a.Persona)
               .ThenInclude(p => p.PaisNacimiento)
           .Include(a => a.Persona)
               .ThenInclude(p => p.CiudadNacimiento)
           .AsQueryable();


        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(a =>
                a.Persona != null &&
                (
                    a.Persona.Nombre.Contains(search) ||
                    a.Persona.Apellido.Contains(search) 
                )
            );
        }

        if (!string.IsNullOrWhiteSpace(categoria))
            query = query.Where(a => a.Categoria == categoria);

        if (!string.IsNullOrWhiteSpace(pais))
            query = query.Where(a =>
                a.Persona != null &&
                a.Persona.PaisNacimiento != null &&
                a.Persona.PaisNacimiento.Nombre.Contains(pais)
            );

        if (!string.IsNullOrWhiteSpace(estado))
            query = query.Where(a => a.Estado == estado);

        var total = await query.CountAsync();


        var data = await query
            .OrderByDescending(a => a.Nivel)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

 
        return new PagedResult<Arbitros>
        {
            Items = data,
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<Arbitros?> GetByIdAsync(int id)
    {
        return await _context.Arbitros
            .Include(x => x.Persona)
                .ThenInclude(p => p.CiudadNacimiento)
            .Include(x => x.Persona)
                .ThenInclude(p => p.PaisNacimiento)
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Arbitros> UpdateAsync(Arbitros arbitros)
    {
        _context.Arbitros.Update(arbitros);
        await _context.SaveChangesAsync();
        return arbitros;
    }
}
