using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repositories;

public class PersonasRepository : IPersonasRepository
{
    private readonly AppDbContext _context;
    public PersonasRepository(AppDbContext context)
    {
        _context = context;
    }

    public async  Task<Personas> AddAsync(Personas personas)
    {
        await _context.Personas.AddAsync(personas);
        await _context.SaveChangesAsync();
        return personas;
    }

    public async Task<Personas?> GetByIdAsync(int id)
    {
        return await _context.Personas
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Personas?> GetByNombreAsync(string nombre)
    {
        return await _context.Personas
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Nombre == nombre);
    }

    public async Task<Personas?> GetByNombreCompletoAsync(
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

    public async Task<Personas> UpdateAsync(Personas personas)
    {
        _context.Personas.Update(personas);
        await _context.SaveChangesAsync();
        return personas;
    }
}
