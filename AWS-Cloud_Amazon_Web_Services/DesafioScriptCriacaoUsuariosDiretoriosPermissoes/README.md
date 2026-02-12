# AWS Cloud Amazon Web Services - Bootcamp Project

## Infraestrutura como Código (IaC) - Automação de Gerenciamento de Usuários e Diretórios

### 📋 Visão Geral do Projeto

Este projeto demonstra os princípios de Infraestrutura como Código (IaC) automatizando a criação e configuração de usuários, grupos, diretórios e permissões em um sistema Linux. Os scripts fornecem uma maneira reprodutível de configurar um ambiente padronizado em múltiplas máquinas.

### 🎯 Descrição do Desafio

Como parte do AWS Cloud Amazon Web Services Bootcamp, este projeto cria scripts automatizados que estabelecem a infraestrutura completa para gerenciamento de usuários, estrutura de diretórios e permissões de acesso. Isso garante que qualquer nova máquina virtual possa ser rapidamente configurada para uso em produção simplesmente executando os scripts fornecidos.

### 📁 Estrutura do Projeto

```
DesafioScriptCriacaoUsuariosDiretoriosPermissoes/
├── criar_user.sh          # Script básico de criação de usuários
├── iac1.sh               # Implementação completa de IaC
└── README.md             # Este arquivo de documentação
```

### 🛠️ Descrição dos Scripts

#### 1. `criar_user.sh` - Criação Básica de Usuários
- Cria usuários convidados individuais (guest10 até guest13)
- Define shell padrão como `/bin/bash`
- Atribui senha criptografada "Senha123"
- Força a troca de senha no primeiro login
- Cria diretórios home para cada usuário

#### 2. `iac1.sh` - Configuração Completa da Infraestrutura
- **Criação de Diretórios**: Cria quatro diretórios principais:
  - `/publico` - Diretório de acesso público
  - `/adm` - Diretório de administração
  - `/ven` - Diretório de vendas
  - `/sec` - Diretório de segurança

- **Gerenciamento de Grupos**: Cria três grupos de usuários:
  - `GRP_ADM` - Grupo de administração
  - `GRP_VEN` - Grupo de vendas
  - `GRP_SEC` - Grupo de segurança

- **Criação de Usuários**: Cria nove usuários organizados por departamento:
  - **Administração**: carlos, maria, joao
  - **Vendas**: debora, sebastiana, roberto
  - **Segurança**: josefina, amanda, rogerio

- **Configuração de Permissões**:
  - Define a propriedade apropriada para cada diretório
  - Configura permissões de acesso:
    - Diretórios departamentais: 770 (rwx para proprietário e grupo)
    - Diretório público: 777 (acesso total para todos)

### 🔧 Pré-requisitos

- Sistema operacional Linux com shell bash
- Privilégios de root ou sudo para criação de usuários e grupos
- OpenSSL para criptografia de senhas
- Entendimento básico de permissões de arquivos Linux

### 🚀 Utilização

#### Execução dos Scripts

1. **Tornar scripts executáveis**:
   ```bash
   chmod +x criar_user.sh
   chmod +x iac1.sh
   ```

2. **Executar os scripts**:
   ```bash
   # Para criação básica de usuários
   sudo ./criar_user.sh
   
   # Para configuração completa da infraestrutura
   sudo ./iac1.sh
   ```

#### Ordem de Execução dos Scripts

Para uma configuração completa, execute os scripts nesta ordem:
1. `iac1.sh` - Configura infraestrutura completa com grupos e permissões
2. `criar_user.sh` - Adiciona usuários convidados adicionais (opcional)

### 📊 Estrutura de Diretórios Após Execução

```
/
├── publico/          # Diretório público (permissões 777)
├── adm/             # Diretório de administração (770, pertencente a root:GRP_ADM)
├── ven/             # Diretório de vendas (770, pertencente a root:GRP_VEN)
└── sec/             # Diretório de segurança (770, pertencente a root:GRP_SEC)
```

### 👥 Mapeamento de Usuários e Grupos

| Usuário   | Grupos        | Departamento  |
|-----------|---------------|---------------|
| carlos    | GRP_ADM       | Administração |
| maria     | GRP_ADM       | Administração |
| joao      | GRP_ADM       | Administração |
| debora    | GRP_VEN       | Vendas        |
| sebastiana| GRP_VEN       | Vendas        |
| roberto   | GRP_VEN       | Vendas        |
| josefina  | GRP_SEC       | Segurança     |
| amanda    | GRP_SEC       | Segurança     |
| rogerio   | GRP_SEC       | Segurança     |
| guest10   | -             | Convidado     |
| guest11   | -             | Convidado     |
| guest12   | -             | Convidado     |
| guest13   | -             | Convidado     |

### 🔒 Recursos de Segurança

- **Criptografia de Senhas**: Usa OpenSSL para criptografar senhas
- **Troca Forçada de Senha**: Usuários convidados devem trocar senha no primeiro login
- **Acesso Baseado em Grupos**: Diretórios específicos por departamento com acesso restrito
- **Controle de Permissões**: Permissões de arquivos apropriadas para segurança e colaboração

### 🔄 Benefícios da Automação

- **Consistência**: Configuração idêntica em todas as máquinas
- **Velocidade**: Implantação rápida da infraestrutura de usuários
- **Reprodutibilidade**: Mesmos resultados toda vez que o script é executado
- **Controle de Versão**: Scripts podem ser rastreados e gerenciados no Git
- **Documentação**: Infraestrutura auto-documentada

### 📝 Observações

- Todos os usuários são criados com `/bin/bash` como shell padrão
- Senha para todos os usuários é definida como "Senha123" (alterar conforme necessário)
- Usuários convidados (guest10-guest13) são configurados para trocar senha no primeiro login
- Os scripts exigem privilégios de root para criar usuários e grupos

### 🤝 Contribuições

Este projeto faz parte do AWS Cloud Amazon Web Services Bootcamp. Contribuições e melhorias são bem-vindas!

### 📄 Licença

Este projeto faz parte do material educacional do AWS Cloud Amazon Web Services Bootcamp.

---

**Projeto Criado**: AWS Cloud Amazon Web Services Bootcamp  
**Objetivo**: Demonstração e automação de Infraestrutura como Código  
**Tecnologia**: Scripting Bash, administração de sistemas Linux
