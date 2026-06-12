
using Application.Common.Models;
using Application.Features.Usuarios.Dto;
using Application.Interfaces.Repositories;
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

    public async Task<Usuario?> GetByIdAsync(int id)
    {
        return await _context.Usuarios
            .AsNoTracking()
            .Include(x => x.Rol)
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Usuario?> GetByEmailAsync(string email)
    {
        return await _context.Usuarios
                 .Include(x => x.Rol)
                 .SingleOrDefaultAsync(x => x.Email == email);
    }

    public async Task<PagedResult<UsuarioReponse>> GetAllAsync(int page,int pageSize,string? search,string? estado,string? rol)
    {
        var query = _context.Usuarios
            .Include(x => x.Rol)
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.Trim();

            query = query.Where(x =>
                x.Username.Contains(search) ||
                x.Email.Contains(search)
            );
        }

        if (!string.IsNullOrWhiteSpace(estado))
        {
            var e = estado.Trim();

            query = query.Where(x =>
                x.Estado != null &&
                x.Estado == e);
        }

        if (!string.IsNullOrWhiteSpace(rol))
        {
            var r = rol.Trim();

            query = query.Where(x =>
                x.Rol != null &&
                x.Rol.Nombre == r);
        }

        var total = await query.CountAsync();

        var items = await query
               .OrderBy(x => x.Id)
               .Skip((page - 1) * pageSize)
               .Take(pageSize)
               .Select(x => new UsuarioReponse
               {
                   Id = x.Id,
                   UserName = x.Username,
                   Email = x.Email,
                   Role = x.Rol != null ? x.Rol.Nombre : ""
               })
               .ToListAsync();

        return new PagedResult<UsuarioReponse>
        {
            Items = items,
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task <Usuario> AddAsync(Usuario user)
    {
        await _context.Usuarios.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<Usuario> UpdateAsync(Usuario user)
    {
        _context.Usuarios.Update(user);
        await _context.SaveChangesAsync();

        return user;
    }

    public async Task<Usuario?> GetByUsernameAsync(string username)
    {
        return await _context.Usuarios
          .Include(x => x.Rol)
          .SingleOrDefaultAsync(x => x.Username == username);
    }
}