using DJERICMAX_App.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DJERICMAX_App.Repositorio.Config
{
    public class PedidoConfiguration : IEntityTypeConfiguration<Pedido>
    {
        public void Configure(EntityTypeBuilder<Pedido> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.DataPedido).IsRequired();

            // Configurar relações
            builder.HasOne(p => p.Cliente)
                   .WithMany()
                   .HasForeignKey(p => p.ClienteId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(p => p.FormaPagamento)
                   .WithMany()
                   .HasForeignKey(p => p.FormaPagamentoId)
                   .OnDelete(DeleteBehavior.Restrict);

          //  builder.HasMany(p => p.ItensPedido)
            //       .WithOne(ip => ip.Pedido)
              //     .HasForeignKey(ip => ip.PedidoId)
                //   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}