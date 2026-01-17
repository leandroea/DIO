namespace DesafioSistemaHospedagem.Models
{
    public class Suite
    {
        public string Tipo { get; set; }
        public int Capacidade { get; set; }
        public decimal ValorDiaria { get; set; }

        public Suite(string tipo, int capacidade, decimal valorDiaria)
        {
            Tipo = tipo;
            Capacidade = capacidade;
            ValorDiaria = valorDiaria;
        }
    }
}
