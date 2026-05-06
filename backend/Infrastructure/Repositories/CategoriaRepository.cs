using Application.Common.Exceptions;
using Application.Dto;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CategoriaRepository : ICategoriaRepository
{
    private readonly AppDbContext _context;
    public CategoriaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Categoria> AddAsync(Categoria categoria)
    {
        await _context.Categorias.AddAsync(categoria);
        await _context.SaveChangesAsync();
        return categoria;
    }

    public async Task<List<Categoria>> GetAllAsync()
    {
        return await _context.Categorias
            .AsNoTracking()
            .OrderBy(x => x.Id)
            .ToListAsync();
    }

    public async Task<Categoria> GetByIdAsync(int id)
    {
        return await _context.Categorias
            .SingleOrDefaultAsync(x => x.Id == id)
            ?? throw new NotFoundException("Categoría no encontrada");
    }

    public async Task<Categoria> GetByNombreAsync(string nombre)
    {
        return await _context.Categorias
            .FirstOrDefaultAsync(x => x.Nombre == nombre)
            ?? throw new NotFoundException("Categoría no encontrada");
    }
}

