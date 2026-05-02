using System;
using System.Collections.Generic;
using System.Text;
using Application.Dto;
using Domain.Entities;
using Domain.Enums;

namespace Application.Interfaces.Services;

public interface IUsuarioService
{
    Task<Usuario> GetByIdAsync(int id);
    Task<List<Usuario>> GetAllAsync();
    Task<Usuario> GetByEmailAsync(string email);
    Task UpdateAsync(int id,UsuarioDto user);
    Task UpdateEstadoAsync(int id, Estado estado);
}