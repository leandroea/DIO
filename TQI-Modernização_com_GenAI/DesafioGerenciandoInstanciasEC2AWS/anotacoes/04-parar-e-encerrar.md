# Parar e Encerrar Instâncias EC2

## Stop vs Terminate

| Ação | Volume EBS | Cobrança instância | Cobrança EBS | Dados |
|------|------------|---------------------|--------------|--------|
| **Stop (Parar)** | Obrigatório | Não | Sim (volume persistente) | Mantidos no volume |
| **Terminate (Encerrar)** | Opcional | Não | Depende (volume padrão é deletado com a instância) | Perda dos dados no armazenamento local da instância |

- Se a instância **não** usar EBS, a única opção é **Terminate**.
- Em ambos os casos (Stop ou Terminate) **não há cobrança pela instância** enquanto estiver parada ou encerrada.

## Como parar (Stop)

1. AWS Explorer → **Amazon EC2** → **Instances** → **View**.
2. Clique direito na instância → **Stop (Interromper)**.
3. Confirmar com **Yes (Sim)**.
4. **Refresh (Atualizar)** na lista para ver o status atualizado (ex.: *stopped*). O volume EBS continua ativo.

## Instâncias encerradas na lista

- Instâncias **Terminate** continuam aparecendo na lista por um tempo.
- A AWS remove essas instâncias da lista depois; **não há cobrança** por instância no estado *terminated*.

## Comportamento no desligamento (Shutdown no SO)

É possível definir o que acontece quando alguém clica em **Desligar** no menu Iniciar (Windows) dentro da instância:

1. Na lista **Instances**, clique direito na instância → **Change shutdown behavior (Alterar comportamento de desligamento)**.
2. Em **Shutdown Behavior**: escolher **Stop (Interromper)** ou **Terminate (Encerrar)**.

Assim você evita que um desligamento “normal” do Windows encerre a instância se o desejado era apenas pará-la.

## Resumo prático

- **Parar**: quando quiser manter dados e retomar depois; exige EBS.
- **Encerrar**: quando a instância for descartável ou for um ambiente temporário.
- **Alterar shutdown behavior**: usar quando várias pessoas acessam a instância e é importante padronizar o efeito do “Desligar” do SO.

## Referência

- [Gerenciar instâncias do Amazon EC2 - AWS Toolkit](https://docs.aws.amazon.com/pt_br/toolkit-for-visual-studio/latest/user-guide/tkv-ec2-ami.html) — seções “Encerrar uma instância” e “Para especificar o comportamento de uma instância do EC2 no desligamento”.
