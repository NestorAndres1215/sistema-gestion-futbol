using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Repositories;

public interface IPersonasRepository
{

    Task<Persona> AddAsync(Persona personas);
    Task<Persona> UpdateAsync(Persona personas);
    Task<Persona?> GetByIdAsync(int id);
    Task<Persona?> GetByNombreAsync(string nombre);
    Task<Persona?> GetByNombreCompletoAsync(
        string nombre,
        string apellido
    );
}
