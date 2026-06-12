using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class PersonaConfiguration : IEntityTypeConfiguration<Persona>
{
    public void Configure(EntityTypeBuilder<Persona> builder)
    {
        builder.ToTable("Personas");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Nombre)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(p => p.Apellido)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(p => p.Genero)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(p => p.Estado)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(p => p.FotoUrl)
            .HasMaxLength(500);

        builder.Property(p => p.FechaCreacion)
            .HasDefaultValueSql("GETDATE()");

        builder.HasOne(p => p.PaisNacimiento)
            .WithMany()
            .HasForeignKey(p => p.PaisNacimientoId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(p => p.CiudadNacimiento)
            .WithMany()
            .HasForeignKey(p => p.CiudadNacimientoId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(p => new
        {
            p.Nombre,
            p.Apellido,
            p.FechaNacimiento
        });
    }
}