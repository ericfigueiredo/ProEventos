using DJERICMAX_App.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DJERICMAX_App.Repositorio.Config
{
    public class ItemPedidoConfiguration : IEntityTypeConfiguration<ItemPedido>
    {
        public void Configure(EntityTypeBuilder<ItemPedido> builder)
        {
            builder.HasKey(i => i.Id);

            // Adicionar EventoId
            builder.Property(i => i.EventoId).IsRequired();
            builder.Property(i => i.ServicoId).IsRequired();
            builder.Property(i => i.Quantidade_Horas).IsRequired();

            // Adicionar PrecoUnitario
            builder.Property(i => i.PrecoUnitario)
                   .HasColumnType("decimal(19,4)")
                   .IsRequired();

            // CONFIGURAR AS RELAÇÕES (FOREIGN KEYS)
            builder.HasOne(i => i.Evento)
                   .WithMany(e => e.ItensPedido)
                   .HasForeignKey(i => i.EventoId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(i => i.Servico)
                   .WithMany(s => s.ItensPedido)
                   .HasForeignKey(i => i.ServicoId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}