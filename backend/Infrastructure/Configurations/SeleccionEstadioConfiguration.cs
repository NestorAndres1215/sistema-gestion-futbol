using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class SeleccionEstadioConfiguration : IEntityTypeConfiguration<SeleccionEstadio>
{
    public void Configure(EntityTypeBuilder<SeleccionEstadio> builder)
    {
        builder.ToTable("SeleccionEstadio");

        builder.HasKey(se => se.Id);

        builder.Property(se => se.Tipo)
            .IsRequired()
            .HasMaxLength(20);

        builder.HasOne(se => se.Seleccion)
            .WithMany()
            .HasForeignKey(se => se.SeleccionId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(se => se.Estadio)
            .WithMany()
            .HasForeignKey(se => se.EstadioId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(se => new
        {
            se.SeleccionId,
            se.EstadioId
        })
        .IsUnique();
    }
}