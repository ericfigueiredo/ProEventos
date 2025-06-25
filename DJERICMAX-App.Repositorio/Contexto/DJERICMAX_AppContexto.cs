using DJERICMAX_App.Dominio.Entidades;
using DJERICMAX_App.Dominio.ObjetoDeValor;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DJERICMAX_App.Repositorio.Contexto
{
    public class DJERICMAX_AppContexto : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Servico> Servicos { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<ItemPedido> ItemPedidos { get; set; }
        public DbSet<FormaPagamento> FormaPagamento { get; set; }

        public DJERICMAX_AppContexto(DbContextOptions options) : base(options)
        {
        }
    }
}
