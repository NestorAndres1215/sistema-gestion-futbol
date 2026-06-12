using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.Repositories;

public class PersonasRepository : IPersonasRepository
{
    private readonly AppDbContext _context;
    public PersonasRepository(AppDbContext context)
    {
        _context = context;
    }

    public async  Task<Persona> AddAsync(Persona personas)
    {
        await _context.Personas.AddAsync(personas);
        await _context.SaveChangesAsync();
        return personas;
    }

    public async Task<Persona?> GetByIdAsync(int id)
    {
        return await _context.Personas
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Persona?> GetByNombreAsync(string nombre)
    {
        return await _context.Personas
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Nombre == nombre);
    }

    public async Task<Persona?> GetByNombreCompletoAsync(
       string nombre,
       string apellido
       
   )
    {
        return await _context.Personas
            .FirstOrDefaultAsync(p =>
                p.Nombre == nombre &&
                p.Apellido == apellido 
            );
    }

    public async Task<Persona> UpdateAsync(Persona personas)
    {
        _context.Personas.Update(personas);
        await _context.SaveChangesAsync();
        return personas;
    }
}
