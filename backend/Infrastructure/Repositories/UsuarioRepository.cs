
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces.Repositories;
using Domain.Enums;


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

    public async Task<List<Usuario>> GetAllAsync()
    {
        return await _context.Usuarios
            .Include(x => x.Rol)
            .ToListAsync();
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

    public async Task UpdateEstadoAsync(int id, Estado estado)
    {
        var user = await _context.Usuarios.FindAsync(id);

        if (user == null)
            return;

        user.Estado = estado;

        await _context.SaveChangesAsync();
    }
}