using Microsoft.EntityFrameworkCore;
using DesafioSistemaAgendamentoTarefas.Models;

namespace DesafioSistemaAgendamentoTarefas.Context
{
    public class OrganizadorContext : DbContext
    {
        public OrganizadorContext(DbContextOptions<OrganizadorContext> options) : base(options)
        {
            
        }

        public DbSet<Tarefa> Tarefas { get; set; }
    }
}