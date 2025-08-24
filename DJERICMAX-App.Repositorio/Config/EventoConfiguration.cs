using DJERICMAX_App.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DJERICMAX_App.Repositorio.Config
{
    public class EventoConfiguration : IEntityTypeConfiguration<Evento>
    {
        public void Configure(EntityTypeBuilder<Evento> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Data_Cadastro).IsRequired();
            builder.Property(e => e.Data_Contrato);
            builder.Property(e => e.Data_Evento);
            builder.Property(e => e.Parcelado);
            builder.Property(e => e.Qtde_Parcelas);
            builder.Property(e => e.CEP_Evento).HasMaxLength(10);
            builder.Property(e => e.UF_Evento).HasMaxLength(2);
            builder.Property(e => e.Cidade_Evento).HasMaxLength(50);
            builder.Property(e => e.Logradouro_Evento).HasMaxLength(50);
            builder.Property(e => e.NumeroLogradouro_Evento).HasMaxLength(5);

            //builder.HasOne(e => e.Cliente);

            builder.HasOne(e => e.FormaPagamento);
        }
    }
}
