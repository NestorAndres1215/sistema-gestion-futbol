using Application.Common.Exceptions;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Services;

public class PersonasService : IPersonasService
{
    private readonly IPersonasRepository _repo;


    public PersonasService(IPersonasRepository repo)
    {
        _repo = repo;

    }

    public async Task<Personas> AddAsync(Personas personas)
    {

        if (personas.FechaNacimiento.HasValue &&
            personas.FechaNacimiento > DateTime.Today)
        {
            throw new ArgumentException("La fecha de nacimiento no puede ser futura.");
        }

        personas.FechaCreacion = DateTime.Now;
        personas.Estado = "Activo";

        return await _repo.AddAsync(personas);
    }

    public async  Task<Personas?> GetByIdAsync(int id)
    {
        return await _repo.GetByIdAsync(id)
          ?? throw new NotFoundException("Personas no encontrada");
    }

    public async Task<Personas?> GetByNombreAsync(string nombre)
    {
        return await _repo.GetByNombreAsync(nombre)
            ?? throw new NotFoundException("Categoría no encontrada");
    }
}
