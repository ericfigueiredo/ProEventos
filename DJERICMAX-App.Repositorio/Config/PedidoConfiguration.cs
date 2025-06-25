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
            builder.Property(p => p.Data_Cadastro).IsRequired();
            builder.Property(p => p.Data_Contrato);
            builder.Property(p => p.Data_Evento);
            builder.Property(p => p.Parcelado);
            builder.Property(p => p.Qtde_Parcelas);
            builder.Property(p => p.CEP_Usuario).HasMaxLength(10);
            builder.Property(p => p.UF_Usuario).HasMaxLength(2);
            builder.Property(p => p.Cidade_Usuario).HasMaxLength(100);
            builder.Property(p => p.Logradouro_Usuario).HasMaxLength(200);
            builder.Property(p => p.NumeroLogradouro_Usuario).HasMaxLength(10);
            builder.Property(p => p.CEP_Evento).HasMaxLength(10);
            builder.Property(p => p.UF_Evento).HasMaxLength(2);
            builder.Property(p => p.Cidade_Evento).HasMaxLength(100);
            builder.Property(p => p.Logradouro_Evento).HasMaxLength(200);
            builder.Property(p => p.NumeroLogradouro_Evento).HasMaxLength(10);
        }
    }
}
