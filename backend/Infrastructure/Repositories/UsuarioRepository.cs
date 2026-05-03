
using Application.Dto;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly AppDbContext _context;

    public UsuarioRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Usuario> GetByEmailAsync(string email)
    {
        return await _context.Usuarios
            .Include(x => x.Rol)
            .FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<Usuario> GetByIdAsync(int id)
    {
        return await _context.Usuarios
            .Include(x => x.Rol)
            .FirstOrDefaultAsync(x => x.Id == id);
    }
    /*
    public async Task<List<Usuario>> GetAllAsync()
    {
        return await _context.Usuarios
            .Include(x => x.Rol)
            .ToListAsync();
    }*/

    public async Task<PagedResult<Usuario>> GetAllAsync(
           int page,
           int pageSize,
           string? search
       )
    {
        var query = _context.Usuarios
            .Include(x => x.Rol)
            .AsQueryable();

        // 🔎 BÚSQUEDA
        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(x =>
                EF.Functions.Like(x.Username, $"%{search}%") ||
                EF.Functions.Like(x.Email, $"%{search}%")
            );
        }

        // 📊 TOTAL
        var total = await query.CountAsync();

        // 📄 PAGINACIÓN
        var items = await query
            .OrderBy(x => x.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<Usuario>
        {
            Items = items,
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task AddAsync(Usuario user)
    {
        await _context.Usuarios.AddAsync(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Usuario user)
    {
        _context.Usuarios.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateEstadoAsync(int id, string estado)
    {
        var user = await _context.Usuarios.FindAsync(id);

        if (user == null)
            return;

        user.Estado = estado;

        await _context.SaveChangesAsync();
    }
}