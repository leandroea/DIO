using System;
using System.Collections.Generic;
using DesafioSistemaHospedagem.Models;

namespace DesafioSistemaHospedagem
{
    class Program
    {
        static void Main(string[] args)
        {
            // Criando suíte
            var suite = new Suite("Premium", capacidade: 2, valorDiaria: 150m);

            // Criando hóspedes
            var hospede1 = new Pessoa("João Silva", 30);
            var hospede2 = new Pessoa("Maria Oliveira", 28);

            // Criando reserva para 11 dias (aplica desconto de 10%)
            var reserva = new Reserva(diasReservados: 11);
            reserva.CadastrarSuite(suite);
            reserva.CadastrarHospedes(new List<Pessoa> { hospede1, hospede2 });

            Console.WriteLine($"Quantidade de hóspedes: {reserva.ObterQuantidadeHospedes()}");
            Console.WriteLine($"Valor da diária: {reserva.ObterValorDiaria():C}");
            Console.WriteLine($"Valor total da reserva: {reserva.CalcularValorTotal():C}");

            // Exemplo de tentativa de cadastro além da capacidade (lança exceção)
            try
            {
                var hospede3 = new Pessoa("Pedro", 40);
                reserva.CadastrarHospedes(new List<Pessoa> { hospede1, hospede2, hospede3 });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao cadastrar hóspedes: {ex.Message}");
            }
        }
    }
}

