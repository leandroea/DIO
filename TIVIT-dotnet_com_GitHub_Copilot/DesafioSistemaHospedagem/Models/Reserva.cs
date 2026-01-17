using System;
using System.Collections.Generic;

namespace DesafioSistemaHospedagem.Models
{
    public class Reserva
    {
        public List<Pessoa> Hospedes { get; private set; } = new List<Pessoa>();
        public Suite? Suite { get; private set; }
        public int DiasReservados { get; private set; }

        public Reserva(int diasReservados)
        {
            if (diasReservados <= 0)
                throw new ArgumentException("Dias reservados devem ser maiores que zero.");

            DiasReservados = diasReservados;
        }

        public void CadastrarSuite(Suite suite)
        {
            Suite = suite ?? throw new ArgumentNullException(nameof(suite));
        }

        public void CadastrarHospedes(List<Pessoa> hospedes)
        {
            if (Suite == null)
                throw new InvalidOperationException("Suite não foi cadastrada na reserva.");

            if (hospedes == null)
                throw new ArgumentNullException(nameof(hospedes));

            if (hospedes.Count > Suite.Capacidade)
                throw new ArgumentException("Número de hóspedes maior que a capacidade da suíte.");

            Hospedes = hospedes;
        }

        public int ObterQuantidadeHospedes()
        {
            return Hospedes?.Count ?? 0;
        }

        public decimal ObterValorDiaria()
        {
            return Suite?.ValorDiaria ?? 0m;
        }

        public decimal CalcularValorTotal()
        {
            if (Suite == null)
                return 0m;

            decimal total = Suite.ValorDiaria * DiasReservados;

            if (DiasReservados > 10)
                total *= 0.9m; // 10% de desconto

            return total;
        }
    }
}
