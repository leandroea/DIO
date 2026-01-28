from datetime import date


class Transacao:
    def registrar(self, conta):
        pass


class Deposito(Transacao):
    def __init__(self, valor):
        self.valor = valor

    def registrar(self, conta):
        sucesso = conta.depositar(self.valor)
        if sucesso:
            conta.historico.adicionar_transacao(self)


class Saque(Transacao):
    def __init__(self, valor):
        self.valor = valor

    def registrar(self, conta):
        sucesso = conta.sacar(self.valor)
        if sucesso:
            conta.historico.adicionar_transacao(self)


class Historico:
    def __init__(self):
        self.transacoes = []

    def adicionar_transacao(self, transacao):
        self.transacoes.append(transacao)


class Conta:
    def __init__(self, numero, cliente):
        self.saldo = 0.0
        self.numero = numero
        self.agencia = "0001"
        self.cliente = cliente
        self.historico = Historico()

    def depositar(self, valor):
        if valor > 0:
            self.saldo += valor
            print(f"Depósito de R$ {valor:.2f} realizado com sucesso.")
            return True
        print("Valor de depósito inválido.")
        return False

    def sacar(self, valor):
        if valor > 0 and valor <= self.saldo:
            self.saldo -= valor
            print(f"Saque de R$ {valor:.2f} realizado com sucesso.")
            return True
        print("Saque não realizado. Verifique o valor ou saldo.")
        return False

    def exibir_extrato(self):
        print("\n=== EXTRATO ===")
        if not self.historico.transacoes:
            print("Não foram realizadas movimentações.")
        else:
            for transacao in self.historico.transacoes:
                tipo = transacao.__class__.__name__
                print(f"{tipo}: R$ {transacao.valor:.2f}")
        print(f"Saldo atual: R$ {self.saldo:.2f}")
        print("================")


class ContaCorrente(Conta):
    def __init__(self, numero, cliente, limite=500.0, limite_saques=3):
        super().__init__(numero, cliente)
        self.limite = limite
        self.limite_saques = limite_saques
        self.saques_realizados = 0

    def sacar(self, valor):
        if self.saques_realizados >= self.limite_saques:
            print("Limite de saques diários atingido.")
            return False
        if valor > self.limite:
            print("Valor excede o limite de saque permitido.")
            return False
        if super().sacar(valor):
            self.saques_realizados += 1
            return True
        return False


class Cliente:
    def __init__(self, endereco):
        self.endereco = endereco
        self.contas = []

    def adicionar_conta(self, conta):
        self.contas.append(conta)

    def realizar_transacao(self, conta, transacao):
        transacao.registrar(conta)


class PessoaFisica(Cliente):
    def __init__(self, nome, cpf, data_nascimento, endereco):
        super().__init__(endereco)
        self.nome = nome
        self.cpf = cpf
        self.data_nascimento = data_nascimento


# ============================
# Programa principal (main)
# ============================

def main():
    usuarios = []
    contas = []
    contador_contas = 1

    menu = """
[d] Depositar
[s] Sacar
[e] Extrato
[nu] Novo usuário
[nc] Nova conta
[lc] Listar contas
[q] Sair
=> """

    while True:
        opcao = input(menu)

        if opcao == "nu":
            cpf = input("CPF (somente números): ")
            if any(u.cpf == cpf for u in usuarios):
                print("Usuário já cadastrado.")
                continue
            nome = input("Nome completo: ")
            nascimento = input("Data de nascimento (dd-mm-aaaa): ")
            endereco = input("Endereço (logradouro, nro - bairro - cidade/sigla estado): ")
            usuario = PessoaFisica(nome, cpf, nascimento, endereco)
            usuarios.append(usuario)
            print("Usuário criado com sucesso.")

        elif opcao == "nc":
            cpf = input("CPF do titular: ")
            usuario = next((u for u in usuarios if u.cpf == cpf), None)
            if not usuario:
                print("Usuário não encontrado.")
                continue
            conta = ContaCorrente(contador_contas, usuario)
            usuario.adicionar_conta(conta)
            contas.append(conta)
            contador_contas += 1
            print("Conta criada com sucesso.")

        elif opcao == "lc":
            if not contas:
                print("Não há contas abertas.")
            else:
                for conta in contas:
                    print(f"Agência: {conta.agencia} | Conta: {conta.numero} | Titular: {conta.cliente.nome}")

        elif opcao in ["d", "s", "e"]:
            cpf = input("CPF do titular: ")
            usuario = next((u for u in usuarios if u.cpf == cpf), None)
            if not usuario or not usuario.contas:
                print("Usuário ou conta não encontrada.")
                continue
            conta = usuario.contas[0]  # usa a primeira conta do usuário

            if opcao == "d":
                valor = float(input("Valor do depósito: "))
                transacao = Deposito(valor)
                usuario.realizar_transacao(conta, transacao)

            elif opcao == "s":
                valor = float(input("Valor do saque: "))
                transacao = Saque(valor)
                usuario.realizar_transacao(conta, transacao)

            elif opcao == "e":
                conta.exibir_extrato()

        elif opcao == "q":
            print("Encerrando o sistema bancário...")
            break

        else:
            print("Opção inválida. Tente novamente.")

main()