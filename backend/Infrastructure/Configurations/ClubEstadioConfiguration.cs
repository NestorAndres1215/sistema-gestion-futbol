using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class ClubEstadioConfiguration : IEntityTypeConfiguration<ClubEstadio>
{
    public void Configure(EntityTypeBuilder<ClubEstadio> builder)
    {
        builder.ToTable("ClubEstadio");

        builder.HasKey(ce => ce.Id);

        builder.Property(ce => ce.Tipo)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasOne(ce => ce.Club)
            .WithMany()
            .HasForeignKey(ce => ce.ClubesId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(ce => ce.Estadio)
            .WithMany()
            .HasForeignKey(ce => ce.EstadioId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(ce => new
        {
            ce.ClubesId,
            ce.EstadioId,
            ce.FechaIncio
        });
    }
}