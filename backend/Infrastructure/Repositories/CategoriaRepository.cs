using Application.Dto;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace Infrastructure.Repositories
{
    public class CategoriaRepository : ICategoriaRepository
    {
        private readonly AppDbContext _context;
        public CategoriaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Categoria categoria)
        {
            await _context.Categorias.AddAsync(categoria);
            await _context.SaveChangesAsync();
        }

        public async Task<PagedResult<Categoria>> GetAllAsync(int page, int pageSize, string? search)
        {
            var query = _context.Categorias
                .AsNoTracking();

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.Trim();

                query = query.Where(x =>
                    x.Nombre.Contains(search)
                );
            }

            var total = await query.CountAsync();

            var items = await query
                .OrderBy(x => x.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<Categoria>
            {
                Items = items,
                TotalCount = total,
                Page = page,
                PageSize = pageSize
            };
        }

        public async Task<Categoria?> GetByIdAsync(int id)
        {
            return await _context.Categorias.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Categoria?> GetByNombreAsync(string nombre)
        {
            return await _context.Categorias.FirstOrDefaultAsync(x => x.Nombre == nombre);
        }
    }
}
