using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Repositories;

public interface IPersonasRepository
{

    Task<Personas> AddAsync(Personas personas);
    Task<Personas> UpdateAsync(Personas personas);
    Task<Personas?> GetByIdAsync(int id);
    Task<Personas?> GetByNombreAsync(string nombre);
    Task<Personas?> GetByNombreCompletoAsync(
        string nombre,
        string apellido
    );
}
