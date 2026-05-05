
using Application.Common.Exceptions;
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

    public async Task<PagedResult<Usuario>> GetAllAsync(
      int page,
      int pageSize,
      string? search,
      string? estado,
      string? rol
  )
    {
        var query = _context.Usuarios
            .Include(x => x.Rol)
            .AsNoTracking()
            .AsQueryable();

        // 🔎 SEARCH
        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.Trim();

            query = query.Where(x =>
                x.Username.Contains(search) ||
                x.Email.Contains(search)
            );
        }

        // 🟢 ESTADO
        if (!string.IsNullOrWhiteSpace(estado))
        {
            estado = estado.Trim().ToUpper();

            query = query.Where(x =>
                x.Estado != null &&
                x.Estado.ToUpper() == estado
            );
        }

        // 🟣 FILTRO POR NOMBRE DE ROL (NUEVO)
        if (!string.IsNullOrWhiteSpace(rol))
        {
            rol = rol.Trim().ToLower();

            query = query.Where(x =>
                x.Rol != null &&
                x.Rol.Nombre.ToLower().Contains(rol)
            );
        }

        // 📊 TOTAL
        var total = await query.CountAsync();

        // 📄 PAGINACIÓN
        var items = await query
            .OrderBy(x => x.Id)
            .Take(pageSize)
            .Skip((page - 1) * pageSize)
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

    public async Task<Usuario> UpdateAsync(Usuario user)
    {
        _context.Usuarios.Update(user);
        await _context.SaveChangesAsync();

        return user;
    }

}