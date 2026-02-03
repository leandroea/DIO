"# Construindo Arquiteturas na Azure - Desafio AZ-900

## 📋 Resumo do Tema

Este desafio faz parte do curso **Microsoft Azure AZ-900 (Azure Fundamentals)** e tem como objetivo principal ensinar os conceitos fundamentais de **organização, gerenciamento e provisionamento de recursos** na plataforma Azure. O foco está em entender como **Grupos de Recursos** e **Redes Virtuais** formam a base para construir arquiteturas cloud robustas, seguras e escaláveis.

### 🎯 Objetivos de Aprendizagem

- Compreender o propósito e a importância dos **Grupos de Recursos** como contêineres lógicos
- Aprender a **organizar e gerenciar recursos** de forma eficiente
- Dominar as **funcionalidades administrativas** do Grupo de Recursos
- Configurar **Redes Virtuais (VNets)** para comunicação entre recursos
- Aplicar **boas práticas** de governança e segurança

---

## 📚 Conceitos Fundamentais

### 1. Grupo de Recursos (Resource Group)

É um **contêiner lógico** que armazena recursos relacionados de uma solução Azure. Todos os recursos dentro de um grupo de recursos devem compartilhar o mesmo **ciclo de vida, políticas e metadados**.

#### Principais Características

- ✅ **Ciclo de Vida Unificado**: Recursos são criados, atualizados e excluídos juntos
- ✅ **Gerenciamento Centralizado**: Aplicação de políticas, controle de acesso e monitoramento em nível de grupo
- ✅ **Orçamento e Custos**: Facilita o acompanhamento de gastos por projeto ou departamento
- ✅ **Metadados**: Usa **marcações (tags)** para organização e categorização

### 2. Rede Virtual (Virtual Network - VNet)

É uma representação de sua própria **rede na nuvem**. Uma VNet permite que recursos Azure como VMs, bancos de dados e aplicativos se comuniquem de forma segura entre si, com a internet e com redes locais.

---

## 🚀 Guia Prático Passo a Passo

### 1️⃣ Como Criar um Grupo de Recursos

#### Via Portal do Azure

1. **Acesse o Portal do Azure**  
   Navegue até [portal.azure.com](https://portal.azure.com) e faça login com suas credenciais.

2. **Navegue até Grupos de Recursos**  
   - No menu lateral esquerdo, clique em **\"Resource groups\"**  
   - Clique em **+ Create** ou **+ New resource group**

3. **Preencha os Detalhes Básicos**

```
- Subscription: Selecione sua assinatura Azure
- Resource group: Insira um nome único (ex: rg-projeto-dev-001)
- Region: Escolha a região desejada (ex: East US, Brazil South)
```

4. **Clique em \"Review + create\"**  
   Revise as informações e clique em **\"Create\"** para provisionar.

5. **Confirmação**  
   Após alguns segundos, você verá a mensagem **\"Your deployment is complete\"**.

#### Via Azure CLI (exemplo)

```bash
# Criar um grupo de recursos
az group create \
  --name rg-projeto-dev-001 \
  --location eastus \
  --tags ambiente=dev projeto=meuapp equipe=backend
```

---

### 2️⃣ Funcionalidades do Grupo de Recursos

Após criar o Grupo de Recursos, explore as seguintes **funcionalidades essenciais** no menu de navegação esquerdo:

#### 📊 Log de Atividades (Activity Log)

**O que é**: Registro de todas as operações realizadas nos recursos do grupo.

**Funcionalidades**:
- Visualizar **eventos de criação, modificação e exclusão**
- Filtrar por **data, tipo de operação, status e usuário**
- Exportar logs para análise ou auditoria
- Identificar falhas e problemas de provisionamento

**Como Acessar**:  
Dentro do Grupo de Recursos → Clique em **\"Activity log\"** no menu lateral.

---

#### 🔐 Controle de Acesso (Access Control - IAM)

**O que é**: Gerencia **quem pode fazer o quê** nos recursos do grupo.

**Funcionalidades Principais**:
- **Adicionar atribuições de função**: Conceder permissões a usuários, grupos ou aplicativos
- **Funções Built-in**: Administrador, Colaborador, Leitor, entre outras
- **Funções Personalizadas**: Criar permissões específicas para sua organização
- **Verificar acesso**: Auditar quem tem acesso a cada recurso

**Como Acessar**:  
Dentro do Grupo de Recursos → Clique em **\"Access control (IAM)\"** → **\"Add role assignment\"**.

**Exemplo de Atribuição**:
```
- Role: Contributor
- Assign access to: User, group, or service principal
- Select: seu-email@empresa.com
```

---

#### 🏷️ Marcações (Tags)

**O que é**: Metadados no formato **chave-valor** para organizar e categorizar recursos.

**Objetivos**:
- **Gerenciamento de custos**: Identificar gastos por projeto/departamento
- **Automação**: Aplicar políticas ou scripts baseados em tags
- **Organização**: Facilitar a busca e filtragem de recursos

**Como Configurar**:
1. Dentro do Grupo de Recursos → Clique em **\"Tags\"**  
2. Adicione pares chave-valor:
```
- ambiente: produção
- projeto: ecommerce
- equipe: desenvolvimento
- custcenter: cc001
```

**Boas Práticas de Tagging**:
- Use nomenclatura consistente em toda a organização
- Inclua tags obrigatórias: ambiente, projeto, responsável
- Automatize o tagging via Azure Policy

---

#### 📅 Eventos (Events)

**O que é**: Monitoramento de **eventos de integridade** e manutenção planejada.

**Funcionalidades**:
- Visualizar **eventos de serviço** da Microsoft
- Ver **avisos de manutenção** que podem afetar seus recursos
- Configurar **alertas** para eventos críticos

**Como Acessar**:  
Dentro do Grupo de Recursos → Menu lateral → **\"Events\"**.

---

#### ⚙️ Configurações (Settings)

**O que é**: Configurações avançadas do grupo de recursos.

**Funcionalidades**:
- **Políticas (Policies)**: Aplicar governança e conformidade
- **Bloqueios (Locks)**: Prevenir exclusão ou modificação acidental
- **Implantações (Deployments)**: Visualizar modelos ARM utilizados

**Bloqueios de Recursos (Resource Locks)**:
- **Read-only**: Impede modificações, mas permite leitura
- **Delete**: Impede exclusão, mas permite modificações

---

#### 💼 Gerenciamento de Recursos (Manage Resources)

**O que é**: Visão geral e administração centralizada de todos os recursos do grupo.

**Funcionalidades**:
- **Listar todos os recursos**: VMs, Bancos de Dados, Storage Accounts, etc.
- **Filtrar por tipo**: Ver apenas recursos específicos
- **Mover recursos**: Transferir recursos entre grupos ou assinaturas
- **Excluir em massa**: Remover vários recursos simultaneamente

**Como Acessar**:  
Dentro do Grupo de Recursos → Clique em **\"Resources\"**.

---

### 3️⃣ Como Criar uma Rede Virtual (VNet)

#### Pré-requisitos
- ✅ Grupo de Recursos criado
- ✅ Defina o espaço de endereçamento IP (ex: 10.0.0.0/16)

#### Passo a Passo Via Portal

1. **Navegue até Redes Virtuais**  
   - No menu principal, clique em **\"Virtual networks\"**  
   - Clique em **+ Create** ou **\"Create virtual network\"**

2. **Abas de Configuração**:

**Aba 1: Basics**
```
- Subscription: Selecione sua assinatura
- Resource group: Selecione o grupo criado (ex: rg-projeto-dev-001)
- Virtual network name: vnet-projeto-dev-001
- Region: Mesma região do grupo de recursos
```

**Aba 2: IP Addresses**
```
- IPv4 address space: 10.0.0.0/16
- Subnet name: default
- Subnet address range: 10.0.1.0/24
```

**Aba 3: Security**
```
- BastionHost: Desabilitar (a menos que precise)
- DDoS protection standard: Desabilitar (para ambiente dev/test)
- Firewall: Configurar conforme necessário
```

3. **Review + create**  
   Revise todas as configurações e clique em  **\"Create\"**  .

4. **Validação**  
   Aguarde a conclusão e confirme que o status está  **\"Succeeded\"**  .

#### Via Azure CLI (exemplo completo)

```bash
# 1. Criar a VNet
az network vnet create \
  --resource-group rg-projeto-dev-001 \
  --name vnet-projeto-dev-001 \
  --address-prefixes 10.0.0.0/16 \
  --location eastus \
  --tags ambiente=dev projeto=meuapp

# 2. Adicionar uma subnet (opcional, já cria uma default)
az network vnet subnet create \
  --resource-group rg-projeto-dev-001 \
  --vnet-name vnet-projeto-dev-001 \
  --name backend-subnet \
  --address-prefixes 10.0.2.0/24
```

---

## 🏆 Boas Práticas Recomendadas

### 📝 Nomenclatura (Naming Convention)

Siga o padrão: `recurso-ambiente-local-sequencia`

**Exemplos**:
- Resource Group: `rg-projeto-dev-001`
- Virtual Network: `vnet-projeto-dev-001`
- Storage Account: `stprojdev001`

### 🗂️ Organização

- ✅ **Use Grupos de Recursos por ciclo de vida**: Agrupe recursos que serão gerenciados juntos
- ✅ **Aplique Tags consistentes**: Use as mesmas tags em todos os recursos
- ✅ **Crie VNets por ambiente**: Uma VNet para dev, outra para prod
- ✅ **Planeje espaços de endereço**: Evite sobreposição de IPs entre ambientes

### 🔒 Segurança

- ✅ **Use Azure Locks** em recursos críticos de produção
- ✅ **Controle acesso via RBAC**: Princípio do menor privilégio
- ✅ **Monitore com Activity Logs**: Auditoria contínua
- ✅ **Habilite logs e monitoramento**: Azure Monitor, Log Analytics

---

## 📚 Recursos Adicionais

- [Documentação Oficial Azure - Resource Groups](https://docs.microsoft.com/azure/azure-resource-manager/management/manage-resource-groups-portal)
- [Documentação Oficial Azure - Virtual Networks](https://docs.microsoft.com/azure/virtual-network/virtual-networks-overview)
- [Azure Architecture Center](https://docs.microsoft.com/azure/architecture/)
- [Microsoft Learn - AZ-900](https://docs.microsoft.com/learn/certifications/azure-fundamentals)

---
