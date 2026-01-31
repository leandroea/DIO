# Conectar a uma Instância EC2

## Windows (RDP – Área de Trabalho Remota)

### Passos

1. Na lista de instâncias, **clique direito** na instância Windows → **Abrir área de trabalho remota**.
2. Para autenticar por **senha**: antes, usar **Get Windows Passwords (Obter senhas do Windows)**.
3. Na caixa **Open Remote Desktop**: escolher **Use EC2 keypair to log on** e **OK**.
   - Se não houver par de chaves no Toolkit: informar o arquivo **.pem** com a chave privada.
4. A janela do Remote Desktop abre; com keypair, o login pode ser automático como **Administrator**.

### Problemas comuns

- **Instância recém-iniciada**: RDP pode falhar porque:
  - O serviço de Área de Trabalho Remota ainda não está ativo → aguardar alguns minutos.
  - A senha ainda não foi transferida/gerada (pode levar **mais de 30 minutos**) → usar a mensagem de “senha ainda não disponível” como indicador e tentar de novo depois.

## Linux (SSH)

- Usar cliente SSH com o arquivo **.pem** da key pair.
- Garantir que o security group permite **porta 22** (SSH) a partir do seu IP ou de uma rede permitida.
- Exemplo: `ssh -i "caminho/para/chave.pem" ec2-user@<IP-público>` (usuário pode variar por AMI: `ubuntu`, `ec2-user`, etc.).

## Insights

- Preferir **par de chaves armazenado no Toolkit** no Windows para RDP sem precisar informar senha manualmente.
- **Exportar a chave privada** só quando for usar em outra ferramenta ou máquina; manter o arquivo .pem com permissões restritas.
- Anotar o **IP público** ou usar um **Elastic IP** se precisar do mesmo endereço após reinício.
