using Application.Dto;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces.Repositories
{
    public  interface ICategoriaRepository
    {
        Task<PagedResult<Categoria>> GetAllAsync(int page,int pageSize,string? search);
        Task<Categoria?> AddAsync(Categoria categoria);
        Task<Categoria?> GetByIdAsync(int id);
        Task<Categoria?> GetByNombreAsync(string nombre);
    }
}
