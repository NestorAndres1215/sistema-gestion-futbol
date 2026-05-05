using Application.Common.Exceptions;
using Application.Dto;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Services
{
    public class CategoriaService : ICategoriaService
    {

        private readonly ICategoriaRepository _repo;

        public CategoriaService(ICategoriaRepository repo)
        {
            _repo = repo;
        }

        public async Task<Categoria?> AddAsync(CategoriaDto categoriaDto)
        {

            var existe = await _repo.GetByNombreAsync(categoriaDto.nombre);
            if (existe != null)
                throw new BadRequestException("La categoría ya existe");

            var entity = new Categoria
            {
                Nombre = categoriaDto.nombre,
                Descripcion = categoriaDto.descripcion,
            };

            return await _repo.AddAsync(entity);
        }

        public async Task<PagedResult<Categoria>> GetAllAsync(int page, int pageSize, string? search)
        {
            page = page < 1 ? 1 : page;
            pageSize = pageSize < 1 ? 10 : pageSize;

            if (pageSize > 100)
                pageSize = 100;

            search = search?.Trim();


            return await _repo.GetAllAsync(page, pageSize, search);
        }

        public async Task<Categoria?> GetByIdAsync(int id)
        {
            return await _repo.GetByIdAsync(id);
        }

        public async Task<Categoria?> GetByNombreAsync(string nombre)
        {
            return await _repo.GetByNombreAsync(nombre);
        }
    }
}
