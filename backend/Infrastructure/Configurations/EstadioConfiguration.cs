using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class EstadioConfiguration : IEntityTypeConfiguration<Estadio>
{
    public void Configure(EntityTypeBuilder<Estadio> builder)
    {
        builder.ToTable("Estadios");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Nombre)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(e => e.Descripcion)
            .HasMaxLength(500);

        builder.Property(e => e.Ciudad)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(e => e.Pais)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(e => e.Capacidad)
            .IsRequired();

        builder.Property(e => e.TipoCesped)
            .HasMaxLength(50);

        builder.Property(e => e.Latitud)
            .HasPrecision(10, 7);

        builder.Property(e => e.Longitud)
            .HasPrecision(10, 7);

        builder.Property(e => e.FotoUrl)
            .HasMaxLength(500);

        builder.Property(e => e.Estado)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(e => e.FechaCreacion)
            .HasDefaultValueSql("GETDATE()");

        builder.HasIndex(e => e.Nombre);
    }
}