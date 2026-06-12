using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class CiudadConfiguration : IEntityTypeConfiguration<Ciudad>
{
    public void Configure(EntityTypeBuilder<Ciudad> builder)
    {
        builder.ToTable("Ciudades");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Nombre)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasOne(c => c.Pais)
            .WithMany()
            .HasForeignKey(c => c.PaisId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(c => new { c.Nombre, c.PaisId })
            .IsUnique();
    }
}