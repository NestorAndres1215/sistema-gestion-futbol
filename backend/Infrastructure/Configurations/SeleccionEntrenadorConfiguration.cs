using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class SeleccionEntrenadorConfiguration : IEntityTypeConfiguration<SeleccionEntrenador>
{
    public void Configure(EntityTypeBuilder<SeleccionEntrenador> builder)
    {
        builder.ToTable("EntrenadorSeleccion");

        builder.HasKey(se => se.Id);

        builder.Property(se => se.Cargo)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(se => se.Estado)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(se => se.FechaInicio)
            .IsRequired();

        builder.HasOne(se => se.Entrenador)
            .WithMany()
            .HasForeignKey(se => se.EntrenadorId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(se => se.Seleccion)
            .WithMany()
            .HasForeignKey(se => se.SeleccionId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(se => new
        {
            se.EntrenadorId,
            se.SeleccionId,
            se.FechaInicio
        });
    }
}