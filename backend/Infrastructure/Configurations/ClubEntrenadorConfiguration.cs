using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class ClubEntrenadorConfiguration : IEntityTypeConfiguration<ClubEntrenador>
{
    public void Configure(EntityTypeBuilder<ClubEntrenador> builder)
    {
        builder.ToTable("ClubEntrenador");

        builder.HasKey(ce => ce.Id);

        builder.Property(ce => ce.Cargo)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(ce => ce.Estado)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(ce => ce.FechaInicio)
            .IsRequired();

        builder.HasOne(ce => ce.Entrenador)
            .WithMany()
            .HasForeignKey(ce => ce.EntrenadorId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(ce => ce.Club)
            .WithMany()
            .HasForeignKey(ce => ce.ClubId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(ce => new
        {
            ce.EntrenadorId,
            ce.ClubId,
            ce.FechaInicio
        });
    }
}