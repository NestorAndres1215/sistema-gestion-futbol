using Application.Common.Exceptions;
using Application.Features.Personas.Interfaces;
using Application.Interfaces.Repositories;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Features.Personas.Service;

public class PersonasService : IPersonasService
{
    private readonly IPersonasRepository _repo;


    public PersonasService(IPersonasRepository repo)
    {
        _repo = repo;

    }

    public async Task<Persona> AddAsync(Persona personas)
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

    public async  Task<Persona?> GetByIdAsync(int id)
    {
        return await _repo.GetByIdAsync(id)
          ?? throw new NotFoundException("Personas no encontrada");
    }

    public async Task<Persona?> GetByNombreAsync(string nombre)
    {
        return await _repo.GetByNombreAsync(nombre)
            ?? throw new NotFoundException("Categoría no encontrada");
    }

    public async Task<Persona?> GetByNombreCompletoAsync(
      string nombre,
      string apellido
  )
    {
        if (string.IsNullOrWhiteSpace(nombre))
            throw new BadRequestException("El nombre es obligatorio");

        if (string.IsNullOrWhiteSpace(apellido))
            throw new BadRequestException("El apellido paterno es obligatorio");


        return await _repo.GetByNombreCompletoAsync(
            nombre,
            apellido
        );
    }

    public async  Task<Persona> UpdateAsync(Persona personas)
    {
        return await _repo.UpdateAsync(personas);
    }
}
