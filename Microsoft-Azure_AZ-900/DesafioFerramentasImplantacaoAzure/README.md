# Ferramentas de Implantação na Azure

## Guia Completo para o Curso Microsoft Azure AZ-900

Este documento fornece um guia abrangente sobre as principais ferramentas de implantação na Microsoft Azure, essenciais para a certificação AZ-900.

## 📋 Sumário

- [Cloud Shell](#cloud-shell)
- [Gerenciamento de Recursos com CLI](#gerenciamento-de-recursos-com-cli)
- [Exportação de Templates](#exportação-de-templates)
- [Azure Arc](#azure-arc)
- [Referências](#referências)

---

## Cloud Shell

### Visão Geral

O Azure Cloud Shell é um ambiente de shell baseado em navegador que fornece uma experiência de linha de comando rica e baseada no navegador para gerenciar recursos do Azure.

### Principais Características

- **Acesso Web**: Disponível diretamente no portal Azure
- **Ambientes**: PowerShell e Bash
- **Persistência**: Armazenamento de arquivos no Azure Files
- **Ferramentas Pré-instaladas**: CLI do Azure, Azure PowerShell, Git, Docker, kubectl, entre outros
- **Gratuito**: Não há custos adicionais além do armazenamento

### Como Acessar

1. Acesse o [Portal Azure](https://portal.azure.com)
2. Clique no ícone do Cloud Shell na barra superior
3. Escolha entre Bash ou PowerShell
4. Configure o armazenamento se for a primeira vez

### Comandos Básicos

```bash
# Verificar versão da CLI
az --version

# Listar assinaturas disponíveis
az account list

# Definir assinatura ativa
az account set --subscription "Nome da Assinatura"

# Verificar conta atual
az account show
```

---

## Gerenciamento de Recursos com CLI

### Introdução à Azure CLI

A Azure Command-Line Interface (CLI) é uma ferramenta poderosa para gerenciar recursos do Azure de forma programática e automatizada.

### Instalação Local

```bash
# Windows (via Chocolatey)
choco install azure-cli

# macOS (via Homebrew)
brew update && brew install azure-cli

# Linux (via script)
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### Autenticação

```bash
# Login interativo
az login

# Login com service principal
az login --service-principal -u <app-id> -p <password-or-cert> --tenant <tenant-id>

# Login com certificado
az login --service-principal --certificate-file <path-to-certificate-file> --tenant <tenant-id> -u <app-id>
```

### Exemplos Práticos de Gerenciamento de Recursos

#### 1. Criar um Grupo de Recursos

```bash
# Criar grupo de recursos
az group create \
  --name meu-grupo-recursos \
  --location "Brazil South"

# Listar grupos de recursos
az group list

# Ver detalhes de um grupo de recursos
az group show --name meu-grupo-recursos
```

#### 2. Criar uma Máquina Virtual

```bash
# Criar rede virtual e sub-rede
az network vnet create \
  --resource-group meu-grupo-recursos \
  --name minha-vnet \
  --address-prefix 10.0.0.0/16 \
  --subnet-name minha-subnet \
  --subnet-prefix 10.0.1.0/24

# Criar NIC (Network Interface)
az network nic create \
  --resource-group meu-grupo-recursos \
  --name minha-nic \
  --vnet-name minha-vnet \
  --subnet minha-subnet

# Criar máquina virtual
az vm create \
  --resource-group meu-grupo-recursos \
  --name minha-vm \
  --nics minha-nic \
  --image UbuntuLTS \
  --admin-username azureuser \
  --generate-ssh-keys

# Ver detalhes da VM
az vm show --resource-group meu-grupo-recursos --name minha-vm --show-details
```

#### 3. Criar um Storage Account

```bash
# Criar storage account
az storage account create \
  --name minhastorageaccount \
  --resource-group meu-grupo-recursos \
  --location "Brazil South" \
  --sku Standard_LRS \
  --kind StorageV2

# Listar storage accounts
az storage account list

# Obter chave de acesso
az storage account keys list \
  --resource-group meu-grupo-recursos \
  --account-name minhastorageaccount
```

#### 4. Criar um Banco de Dados SQL

```bash
# Criar servidor SQL
az sql server create \
  --name meuservidor-sql \
  --resource-group meu-grupo-recursos \
  --location "Brazil South" \
  --admin-user azureuser \
  --admin-password MinhaSenha123!

# Criar banco de dados
az sql db create \
  --resource-group meu-grupo-recursos \
  --server meuservidor-sql \
  --name meubanco \
  --service-objective S0

# Configurar firewall
az sql server firewall-rule create \
  --resource-group meu-grupo-recursos \
  --server meuservidor-sql \
  --name AllowAllAzureIPs \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0
```

#### 5. Gerenciamento de Aplicativos Web

```bash
# Criar plano de serviço de aplicativo
az appservice plan create \
  --name meu-plano \
  --resource-group meu-grupo-recursos \
  --location "Brazil South" \
  --sku B1 \
  --is-linux

# Criar aplicativo web
az webapp create \
  --resource-group meu-grupo-recursos \
  --plan meu-plano \
  --name meu-aplicativo-web \
  --runtime "NODE|14-lts"

# Configurar configurações de aplicativo
az webapp config appsettings set \
  --resource-group meu-grupo-recursos \
  --name meu-aplicativo-web \
  --settings WEBSITE_RUN_FROM_PACKAGE=1
```

### Comandos de Consulta e Monitoramento

```bash
# Listar todos os recursos em um grupo
az resource list --resource-group meu-grupo-recursos

# Consultar recursos por tipo
az resource list --resource-type Microsoft.Compute/virtualMachines

# Ver logs de atividades
az monitor activity-log list --resource-group meu-grupo-recursos

# Ver métricas de recursos
az monitor metrics list \
  --resource /subscriptions/{subscription-id}/resourceGroups/meu-grupo-recursos/providers/Microsoft.Compute/virtualMachines/minha-vm \
  --metric "Percentage CPU"
```

---

## Exportação de Templates

### Visão Geral

Os modelos do Azure Resource Manager (ARM) permitem automatizar a implantação de infraestrutura como código (IaC), garantindo consistência e reprodutibilidade.

### Exportação de Templates

#### 1. Exportar Template de um Grupo de Recursos

```bash
# Exportar template completo
az group export \
  --name meu-grupo-recursos \
  --output json > meu-template.json

# Exportar template com parâmetros
az group export \
  --name meu-grupo-recursos \
  --include-parameter-default-value \
  --output json > meu-template-com-parametros.json
```

#### 2. Exportar Template de um Recurso Específico

```bash
# Exportar template de uma VM
az resource export \
  --ids /subscriptions/{subscription-id}/resourceGroups/meu-grupo-recursos/providers/Microsoft.Compute/virtualMachines/minha-vm \
  --output json > vm-template.json
```

### Estrutura de um Template ARM

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "storageAccountName": {
      "type": "string",
      "defaultValue": "mystorageaccount",
      "metadata": {
        "description": "Nome da conta de armazenamento"
      }
    },
    "location": {
      "type": "string",
      "defaultValue": "[resourceGroup().location]",
      "metadata": {
        "description": "Localização dos recursos"
      }
    }
  },
  "variables": {
    "storageAccountType": "Standard_LRS"
  },
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2021-04-01",
      "name": "[parameters('storageAccountName')]",
      "location": "[parameters('location')]",
      "sku": {
        "name": "[variables('storageAccountType')]"
      },
      "kind": "StorageV2",
      "properties": {}
    }
  ],
  "outputs": {
    "storageAccountConnectionString": {
      "type": "string",
      "value": "[concat('DefaultEndpointsProtocol=https;AccountName=', parameters('storageAccountName'), ';AccountKey=', listKeys(resourceId('Microsoft.Storage/storageAccounts', parameters('storageAccountName')), '2021-04-01').keys[0].value)]"
    }
  }
}
```

### Implantação de Templates

#### 1. Implantação em Grupo de Recursos

```bash
# Implantação com parâmetros inline
az deployment group create \
  --resource-group meu-grupo-recursos \
  --template-file meu-template.json \
  --parameters storageAccountName="novostorage" location="Brazil South"

# Implantação com arquivo de parâmetros
az deployment group create \
  --resource-group meu-grupo-recursos \
  --template-file meu-template.json \
  --parameters parametros.json
```

#### 2. Implantação em Assinatura

```bash
# Implantação no nível de assinatura
az deployment sub create \
  --location "Brazil South" \
  --template-file meu-template.json \
  --parameters parametros.json
```

#### 3. Implantação em Management Group

```bash
# Implantação em grupo de gerenciamento
az deployment mg create \
  --management-group-id meu-grupo-gerenciamento \
  --location "Brazil South" \
  --template-file meu-template.json
```

### Boas Práticas para Templates

#### 1. Uso de Parâmetros

```json
{
  "parameters": {
    "environment": {
      "type": "string",
      "allowedValues": [
        "dev",
        "test",
        "prod"
      ],
      "defaultValue": "dev"
    },
    "vmSize": {
      "type": "string",
      "defaultValue": "Standard_DS1_v2"
    }
  }
}
```

#### 2. Uso de Variáveis

```json
{
  "variables": {
    "storageAccountName": "[concat('storage', uniqueString(resourceGroup().id))]",
    "vmName": "[concat('vm-', parameters('environment'))]",
    "tags": {
      "environment": "[parameters('environment')]",
      "department": "IT"
    }
  }
}
```

#### 3. Dependências

```json
{
  "resources": [
    {
      "type": "Microsoft.Network/virtualNetworks",
      "apiVersion": "2021-02-01",
      "name": "minha-vnet",
      "location": "[resourceGroup().location]",
      "properties": {
        "addressSpace": {
          "addressPrefixes": [
            "10.0.0.0/16"
          ]
        }
      }
    },
    {
      "type": "Microsoft.Network/networkInterfaces",
      "apiVersion": "2021-02-01",
      "name": "minha-nic",
      "location": "[resourceGroup().location]",
      "dependsOn": [
        "[resourceId('Microsoft.Network/virtualNetworks', 'minha-vnet')]"
      ],
      "properties": {
        "ipConfigurations": [
          {
            "name": "ipconfig1",
            "properties": {
              "subnet": {
                "id": "[resourceId('Microsoft.Network/virtualNetworks/subnets', 'minha-vnet', 'minha-subnet')]"
              }
            }
          }
        ]
      }
    }
  ]
}
```

#### 4. Condições

```json
{
  "resources": [
    {
      "condition": "[equals(parameters('createVM'), 'true')]",
      "type": "Microsoft.Compute/virtualMachines",
      "apiVersion": "2021-03-01",
      "name": "minha-vm",
      "location": "[resourceGroup().location]",
      "properties": {
        // Configuração da VM
      }
    }
  ]
}
```

---

## Azure Arc

### Visão Geral

O Azure Arc estende a plataforma Azure para servidores, Kubernetes e data services, permitindo gerenciar recursos em qualquer lugar - on-premises, em provedores de nuvem ou na borda.

### Principais Benefícios

- **Gerenciamento Unificado**: Gerencie recursos híbridos e multicloud a partir do Azure
- **Governança**: Aplique políticas do Azure em recursos fora do Azure
- **Observabilidade**: Monitoramento e logs unificados
- **Automação**: Runbooks e automação do Azure em qualquer lugar
- **Segurança**: Azure Security Center em recursos híbridos

### Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   On-Premises   │    │   AWS/GCP       │    │   Azure         │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │   Server    │ │    │ │   Server    │ │    │ │   Server    │ │
│ │   (Linux/  │ │    │ │   (Linux/    │ │    │ │   (Linux/    │ │
│ │   Windows)  │ │    │ │   Windows)  │ │    │ │   Windows)  │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│        │        │    │        │        │    │        │        │
│        ▼        │    │        ▼        │    │        ▼        │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │ Azure Arc   │ │    │ │ Azure Arc   │ │    │ │ Azure Arc   │ │
│ │ Connected   │ │    │ │ Connected   │ │    │ │ Connected   │ │
│ │ Machine     │ │    │ │ Machine     │ │    │ │ Machine     │ │
│ │ Extension   │ │    │ │ Extension   │ │    │ │ Extension   │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Azure Arc     │
                    │   Control Plane │
                    │                 │
                    │ ┌─────────────┐ │
                    │ │ Azure       │ │
                    │ │ Resource    │ │
                    │ │ Manager     │ │
                    │ └─────────────┘ │
                    │ ┌─────────────┐ │
                    │ │ Azure Policy│ │
                    │ └─────────────┘ │
                    │ ┌─────────────┐ │
                    │ │ Azure Monitor│ │
                    │ └─────────────┘ │
                    │ ┌─────────────┐ │
                    │ │ Azure       │ │
                    │ │ Automation  │ │
                    │ └─────────────┘ │
                    └─────────────────┘
```

### Componentes Principais

#### 1. Azure Arc-enabled Servers

Permite gerenciar servidores físicos e virtuais fora do Azure como se fossem recursos nativos do Azure.

#### 2. Azure Arc-enabled Kubernetes

Estende o gerenciamento do Azure para clusters Kubernetes em qualquer lugar.

#### 3. Azure Arc-enabled Data Services

Permite executar serviços de dados do Azure em ambientes híbridos e multicloud.

### Instalação do Azure Arc

#### 1. Pré-requisitos

- Acesso ao Azure (permissões de Contribuinte)
- Conexão de rede com o Azure
- Sistema operacional suportado (Windows Server 2012 R2+, Ubuntu 16.04+, RHEL 7.2+, CentOS 7.2+, SLES 12+)

#### 2. Registro do Provedor de Recursos

```bash
# Registrar provedor de recursos
az provider register --namespace Microsoft.HybridCompute
az provider register --namespace Microsoft.GuestConfiguration

# Verificar status
az provider show --namespace Microsoft.HybridCompute
az provider show --namespace Microsoft.GuestConfiguration
```

#### 3. Instalação no Windows

```powershell
# Baixar script de instalação
Invoke-WebRequest -Uri https://aka.ms/AzureConnectedMachineAgent -OutFile AzureConnectedMachineAgent.msi

# Instalar agente
msiexec.exe /i AzureConnectedMachineAgent.msi /l*v installationlog.txt

# Reiniciar serviço
Restart-Service -Name "Azure Connected Machine Agent"

# Conectar ao Azure
& "$env:ProgramFiles\AzureConnectedMachineAgent\azcmagent.exe" connect --resource-group meu-grupo-recursos --tenant-id <tenant-id> --location "Brazil South"
```

#### 4. Instalação no Linux

```bash
# Baixar script de instalação
wget https://aka.ms/azcmagent.sh

# Instalar agente
sudo bash ./azcmagent.sh install

# Conectar ao Azure
sudo azcmagent connect --resource-group meu-grupo-recursos --tenant-id <tenant-id> --location "Brazil South"
```

### Comandos Comuns do Azure Arc

#### 1. Listar Servidores Conectados

```bash
# Listar todos os servidores Arc
az connectedmachine list

# Listar servidores por grupo de recursos
az connectedmachine list --resource-group meu-grupo-recursos

# Ver detalhes de um servidor específico
az connectedmachine show --name meu-servidor --resource-group meu-grupo-recursos
```

#### 2. Gerenciamento de Extensões

```bash
# Listar extensões disponíveis
az connectedmachine extension list --machine-name meu-servidor --resource-group meu-grupo-recursos

# Instalar extensão de log analytics
az connectedmachine extension create \
  --machine-name meu-servidor \
  --name OMSAgentForLinux \
  --location "Brazil South" \
  --resource-group meu-grupo-recursos \
  --type "OmsAgentForLinux" \
  --publisher "Microsoft.EnterpriseCloud.Monitoring" \
  --settings '{"workspaceId":"<workspace-id>"}' \
  --protected-settings '{"workspaceKey":"<workspace-key>"}'

# Instalar extensão de antimalware
az connectedmachine extension create \
  --machine-name meu-servidor \
  --name "IaaSAntimalware" \
  --location "Brazil South" \
  --resource-group meu-grupo-recursos \
  --type "IaaSAntimalware" \
  --publisher "Microsoft.Azure.Security" \
  --settings '{"AntimalwareEnabled": true}'
```

#### 3. Aplicar Configurações de Convidado

```bash
# Criar definição de política de configuração de convidado
az policy definition create \
  --name "require-password-complexity" \
  --mode All \
  --rules '{
    "if": {
      "allOf": [
        {
          "field": "type",
          "equals": "Microsoft.Compute/virtualMachines"
        },
        {
          "field": "Microsoft.HybridCompute/osType",
          "equals": "windows"
        }
      ]
    },
    "then": {
      "effect": "deployIfNotExists",
      "details": {
        "type": "Microsoft.GuestConfiguration/guestConfigurationAssignments",
        "name": "PasswordComplexity",
        "deployment": {
          "properties": {
            "mode": "incremental",
            "template": {
              "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
              "contentVersion": "1.0.0.0",
              "parameters": {
                "vmName": {
                  "type": "string"
                }
              },
              "resources": [
                {
                  "type": "Microsoft.GuestConfiguration/guestConfigurationAssignments",
                  "apiVersion": "2020-06-25",
                  "name": "[concat(parameters('vmName'), '/PasswordComplexity')]",
                  "properties": {
                    "guestConfiguration": {
                      "name": "PasswordComplexity",
                      "version": "1.0.0"
                    }
                  }
                }
              ]
            },
            "parameters": {
              "vmName": {
                "value": "[field('name')]"
              }
            }
          }
        }
      }
    }
  }'

# Atribuir política
az policy assignment create \
  --policy "require-password-complexity" \
  --scope "/subscriptions/<subscription-id>/resourceGroups/meu-grupo-recursos"
```

### Integração com Azure Monitor

#### 1. Configurar Log Analytics Workspace

```bash
# Criar workspace
az monitor log-analytics workspace create \
  --resource-group meu-grupo-recursos \
  --workspace-name meu-workspace \
  --location "Brazil South"

# Obter workspace ID e chave
WORKSPACE_ID=$(az monitor log-analytics workspace show \
  --resource-group meu-grupo-recursos \
  --workspace-name meu-workspace \
  --query customerId -o tsv)

WORKSPACE_KEY=$(az monitor log-analytics workspace get-shared-keys \
  --resource-group meu-grupo-recursos \
  --workspace-name meu-workspace \
  --query primarySharedKey -o tsv)
```

#### 2. Configurar Monitoramento

```bash
# Instalar extensão de monitoramento
az connectedmachine extension create \
  --machine-name meu-servidor \
  --name AzureMonitorWindowsAgent \
  --location "Brazil South" \
  --resource-group meu-grupo-recursos \
  --type "AzureMonitorWindowsAgent" \
  --publisher "Microsoft.Azure.Monitor"

# Configurar regras de coleta
az monitor diagnostic-settings create \
  --resource "/subscriptions/<subscription-id>/resourceGroups/meu-grupo-recursos/providers/Microsoft.HybridCompute/machines/meu-servidor" \
  --workspace meu-workspace \
  --logs '[{"category": "Heartbeat","enabled": true},{"category": "Performance","enabled": true}]' \
  --metrics '[{"category": "AllMetrics","enabled": true}]'
```

### Azure Arc-enabled Kubernetes

#### 1. Conectar Cluster Kubernetes

```bash
# Instalar CLI do Azure Arc
az extension add --name connectedk8s

# Conectar cluster
az connectedk8s connect \
  --name meu-cluster-arc \
  --resource-group meu-grupo-recursos \
  --location "Brazil South"

# Verificar conexão
az connectedk8s list --resource-group meu-grupo-recursos -o table
```

#### 2. Configurar Configurações GitOps

```bash
# Instalar extensão k8s-configuration
az extension add --name k8s-configuration

# Criar configuração GitOps
az k8s-configuration create \
  --name meu-gitops-config \
  --cluster-name meu-cluster-arc \
  --resource-group meu-grupo-recursos \
  --operator-instance-name flux \
  --operator-namespace flux-system \
  --repository-url https://github.com/meu-usuario/meu-repositorio \
  --scope cluster \
  --cluster-type connectedClusters
```

### Azure Arc-enabled Data Services

#### 1. Criar Control Plane

```bash
# Criar grupo de recursos de dados
az group create --name grupo-dados-arc --location "Brazil South"

# Criar control plane
az arcdata dc create \
  --name control-plane-arc \
  --resource-group grupo-dados-arc \
  --location "Brazil South" \
  --connectivity-mode indirect \
  --subscription <subscription-id> \
  --tags environment=test
```

#### 2. Criar Instância de SQL Managed Instance

```bash
# Criar instância SQL
az sql mi-arc create \
  --name sql-instance-arc \
  --resource-group grupo-dados-arc \
  --location "Brazil South" \
  --subscription <subscription-id> \
  --cores-limit 4 \
  --memory-limit 8Gi \
  --dev
```

### Monitoramento e Troubleshooting

#### 1. Verificar Status do Agente

```bash
# Windows
Get-Service -Name "Azure Connected Machine Agent"

# Linux
systemctl status azure-arc-agent
```

#### 2. Logs de Conexão

```bash
# Windows
Get-EventLog -LogName "Application" -Source "Azure Connected Machine Agent"

# Linux
journalctl -u azure-arc-agent -f
```

#### 3. Testar Conectividade

```bash
# Testar conectividade com Azure
telnet management.azure.com 443

# Verificar certificados
openssl s_client -connect management.azure.com:443
```

---

## Referências

### Documentação Oficial

- [Azure Cloud Shell](https://docs.microsoft.com/pt-br/azure/cloud-shell/overview)
- [Azure CLI](https://docs.microsoft.com/pt-br/cli/azure/)
- [Azure Resource Manager Templates](https://docs.microsoft.com/pt-br/azure/azure-resource-manager/templates/)
- [Azure Arc](https://docs.microsoft.com/pt-br/azure/azure-arc/)

### Comandos Úteis

```bash
# Verificar versão da CLI
az --version

# Atualizar CLI
az upgrade

# Listar comandos disponíveis
az --help

# Obter ajuda específica
az vm --help
az group --help
```

### Ferramentas de Desenvolvimento

- [Azure Portal](https://portal.azure.com)
- [Azure Cloud Shell](https://shell.azure.com)
- [Azure Resource Manager Visualizer](https://resources.azure.com)
- [Azure Policy Samples](https://github.com/Azure/azure-policy)

---

## 📚 Conclusão

Este guia cobre as principais ferramentas de implantação na Azure, essenciais para a certificação AZ-900. O domínio dessas ferramentas permite:

- **Eficiência**: Automatização de tarefas repetitivas
- **Consistência**: Implantação padronizada de recursos
- **Governança**: Controle e monitoramento de recursos
- **Flexibilidade**: Gerenciamento híbrido e multicloud

Para obter a certificação AZ-900, é fundamental compreender não apenas como usar essas ferramentas, mas também quando e por que utilizá-las em diferentes cenários de implantação na nuvem.

---

*Este documento foi criado como parte do curso Microsoft Azure AZ-900 da DIO.*