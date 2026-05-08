using Application.Common.Exceptions;
using Application.Dto;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.Repositories;

public class TorneoRepository : ITorneoRepository
{

    private readonly AppDbContext _context;
    public TorneoRepository(AppDbContext context)
    {
        _context = context;
    }
    public async  Task<Torneo> AddAsync(Torneo torneo)
    {
        await _context.Torneos.AddAsync(torneo);
        await _context.SaveChangesAsync();
        return torneo;
    }

    public async Task<PagedResult<Torneo>> GetAllAsync(
        int page,
        int pageSize,
        string? search,
        string? tipo,
        string? tipoParticipante,
        string? estado)
    {
        var query = _context.Torneos
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.Trim();

            query = query.Where(x =>
                x.Nombre.Contains(search)
            );
        }


        if (!string.IsNullOrWhiteSpace(tipo))
        {
            tipo = tipo.Trim().ToUpper();

            query = query.Where(x =>
                x.Tipo != null &&
                x.Tipo.ToUpper() == tipo
            );
        }

        if (!string.IsNullOrWhiteSpace(tipoParticipante))
        {
            tipoParticipante = tipoParticipante.Trim().ToUpper();

            query = query.Where(x =>
                x.TipoParticipante != null &&
                x.TipoParticipante.ToUpper() == tipoParticipante
            );
        }

        if (!string.IsNullOrWhiteSpace(estado))
        {
            estado = estado.Trim().ToUpper();

            query = query.Where(x =>
                x.Estado != null &&
                x.Estado.ToUpper() == estado
            );
        }

        var total = await query.CountAsync();

        var items = await query
            .OrderBy(x => x.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<Torneo>
        {
            Items = items,
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<Torneo?> GetByIdAsync(int id)
    {
        return await _context.Torneos
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Torneo?> GetByNombreAsync(string nombre)
    {
        return await _context.Torneos
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Nombre == nombre);
    }

    public async Task<Torneo> UpdateAsync(Torneo torneo)
    {
        _context.Torneos.Update(torneo);

        await _context.SaveChangesAsync();

        return torneo;
    }
}
