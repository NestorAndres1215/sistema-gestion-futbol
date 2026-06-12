using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class ParametroSistemaConfiguration : IEntityTypeConfiguration<ParametroSistema>
{
    public void Configure(EntityTypeBuilder<ParametroSistema> builder)
    {
        builder.ToTable("ParametrosSistema");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Clave)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(p => p.Valor)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(p => p.Nombre)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(p => p.Descripcion)
            .HasMaxLength(500);

        builder.Property(p => p.Categoria)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(p => p.TipoDato)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(p => p.Estado)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(p => p.Editable)
            .IsRequired()
            .HasMaxLength(2);

        builder.Property(p => p.FechaCreacion)
            .HasDefaultValueSql("GETDATE()");

        builder.HasIndex(p => p.Clave)
            .IsUnique();
    }
}