# Executar uma Instância EC2 (Launch)

## Fluxo resumido

1. Escolher uma **AMI** na visualização.
2. Clique direito na AMI → **Launch Instance (Executar instância)**.
3. Preencher a caixa de diálogo **Launch New Amazon EC2 Instance**.
4. Clicar em **Executar**.
5. Em **Instances**, usar **Refresh (Atualizar)** para ver a nova instância (estado pode começar como *pending* e depois *running*).

## Configurações na caixa de diálogo

| Campo | Descrição |
|-------|-----------|
| **Tipo de instância** | Define vCPUs, memória e preço. Consultar [Definição de preço do EC2](https://aws.amazon.com/ec2/pricing/). |
| **Name** | Nome da instância (máx. 256 caracteres). |
| **Par de chaves** | Usado para obter a senha do Windows (RDP) ou acesso SSH em Linux. Escolher um par existente ou criar um. Chaves criadas no Toolkit ficam em `%LOCALAPPDATA%\AWSToolkit\keypairs` (criptografadas). |
| **Grupo de segurança** | Controla tráfego de rede. Para Windows: permitir porta **3389** (RDP). Para Linux: porta **22** (SSH). |
| **Perfil da instância** | Associa uma **função IAM** à instância. Permite que o software na instância use permissões IAM sem credenciais na máquina. |

## Par de chaves no Toolkit

- Pares criados/gerenciados pelo Toolkit: **Stored in AWSToolkit**.
- **Exportar chave privada**: AWS Explorer → EC2 → Key Pairs → botão direito no par → **Export Private Key**. A chave exportada fica **não criptografada** no caminho escolhido (cuidado com permissões do arquivo).

## Exemplo: Windows Server

1. AMIs: **Amazon Images** → **Windows**; filtro `ebs`.
2. Selecionar AMI → **Launch Instance**.
3. Configurar tipo, nome, par de chaves, security group (RDP 3389), perfil IAM se necessário.
4. **Executar**.

## Insights

- Sempre usar AMI com **EBS** se quiser **parar** a instância (e não apenas encerrar); instâncias com armazenamento de instância só podem ser encerradas.
- Definir **nome** e **tags** no launch facilita identificar a instância depois.
- Revisar o **security group** antes do launch evita ter que editar depois para abrir RDP/SSH.
