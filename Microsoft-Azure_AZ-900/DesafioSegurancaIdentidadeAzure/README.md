# Microsoft Entra ID - Guia Completo

> **Desafio da DIO – Entendendo sobre Segurança e Identidade na Azure**
> Parte do curso Microsoft Azure AZ-900

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [O que é Microsoft Entra ID?](#o-que-é-microsoft-entra-id)
- [Principais Recursos](#principais-recursos)
- [Benefícios](#benefícios)
- [Arquitetura](#arquitetura)
- [Guia Passo a Passo](#guia-passo-a-passo)
- [Casos de Uso](#casos-de-uso)
- [Melhores Práticas](#melhores-práticas)
- [Referências](#referências)

## 🎯 Visão Geral

Microsoft Entra ID é o serviço de identidade e acesso na nuvem da Microsoft, anteriormente conhecido como Azure Active Directory (Azure AD). É um serviço de gerenciamento de identidade e acesso baseado em nuvem que ajuda as organizações a:

- **Proteger identidades** e dados sensíveis
- **Gerenciar acesso** a aplicativos e recursos
- **Autenticar usuários** de forma segura
- **Autorizar recursos** com políticas avançadas

## 🔐 O que é Microsoft Entra ID?

Microsoft Entra ID é a solução de identidade e acesso da Microsoft que combina:

- **Identidade na Nuvem**: Gerenciamento centralizado de identidades
- **Acesso Condicional**: Políticas de segurança baseadas em contexto
- **Proteção de Identidade**: Detecção e resposta a ameaças
- **Gerenciamento de Acesso**: Controle granular de permissões

### Principais Componentes

1. **Microsoft Entra ID (Core)**: Serviço de identidade e acesso
2. **Microsoft Entra ID for Customers**: Identidades para clientes externos
3. **Microsoft Entra Verified ID**: Identidades verificadas e descentralizadas
4. **Microsoft Entra Permissions Management**: Gerenciamento avançado de permissões

## ⚡ Principais Recursos

### 1. **Autenticação Multifatorial (MFA)**
- Autenticação em duas etapas
- Métodos de verificação: SMS, aplicativo, biometria
- Proteção contra ataques de força bruta

### 2. **Acesso Condicional**
- Políticas baseadas em risco
- Controle de acesso por localização
- Requisitos de dispositivo seguro
- Bloqueio de acesso em redes não confiáveis

### 3. **Single Sign-On (SSO)**
- Acesso único a múltiplos aplicativos
- Integração com milhares de aplicativos SaaS
- Experiência de login simplificada

### 4. **Gerenciamento de Identidades**
- Provisionamento automático de usuários
- Sincronização com Active Directory local
- Autoprovimento de usuários

### 5. **Proteção de Identidade**
- Detecção de anomalias
- Alertas de segurança em tempo real
- Resposta automatizada a ameaças

## 🚀 Benefícios

### Segurança Aprimorada
- **Proteção contra vazamentos de credenciais**
- **Detecção de ameaças avançadas**
- **Acesso baseado em risco**

### Experiência do Usuário
- **Login único (SSO)**
- **Autenticação sem senha**
- **Acesso de qualquer lugar**

### Governança e Conformidade
- **Auditoria completa de acesso**
- **Relatórios de conformidade**
- **Controle granular de permissões**

### Redução de Custos
- **Infraestrutura na nuvem**
- **Automação de processos**
- **Redução de suporte ao usuário**

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Usuários      │    │   Aplicativos    │    │   Recursos      │
│                 │    │   SaaS           │    │   Azure         │
└─────────┬───────┘    └─────────┬────────┘    └─────────┬───────┘
          │                      │                       │
          └──────────────────────┼───────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   Microsoft Entra ID    │
                    │                         │
                    │ • Autenticação          │
                    │ • Autorização           │
                    │ • Acesso Condicional    │
                    │ • Proteção de Identidade│
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   Active Directory      │
                    │   Local (Opcional)      │
                    └─────────────────────────┘
```

## 📚 Guia Passo a Passo

### Passo 1: Configuração Inicial

#### 1.1 Criar um Locatário Microsoft Entra ID

1. **Acesse o Portal Azure**
   ```
   https://portal.azure.com
   ```

2. **Navegue até Microsoft Entra ID**
   - Clique em "Azure Active Directory" no menu esquerdo
   - Ou pesquise por "Microsoft Entra ID"

3. **Verifique o Locatário**
   - Confirme o nome do locatário
   - Anote o ID do locatário para referência futura

#### 1.2 Configurar Domínio Personalizado

1. **Adicionar Domínio**
   ```
   Microsoft Entra ID → Nomes de domínio → Adicionar domínio
   ```

2. **Verificar Domínio**
   - Adicione um registro TXT no DNS do seu provedor
   - Espere a propagação DNS (até 24 horas)

3. **Definir como Padrão**
   - Marque o domínio como padrão para novos usuários

### Passo 2: Gerenciamento de Usuários

#### 2.1 Criar Usuários

```powershell
# PowerShell para criar usuários
Connect-MgGraph -Scopes "User.ReadWrite.All"

$UserParams = @{
    AccountEnabled = $true
    DisplayName = "João Silva"
    MailNickname = "joao.silva"
    UserPrincipalName = "joao.silva@seuDominio.com"
    PasswordProfile = @{
        ForceChangePasswordNextSignIn = $true
        Password = "SenhaComplexa123!"
    }
}

New-MgUser @UserParams
```

#### 2.2 Criar Grupos

```powershell
# Criar grupo de segurança
$GroupParams = @{
    DisplayName = "Equipe de Desenvolvimento"
    MailEnabled = $false
    MailNickname = "dev-team"
    SecurityEnabled = $true
    GroupTypes = @()
}

New-MgGroup @GroupParams
```

#### 2.3 Atribuir Licenças

1. **Acesse Licenças**
   ```
   Microsoft Entra ID → Licenças → Todas as licenças
   ```

2. **Atribuir Licenças**
   - Selecione a licença desejada
   - Escolha os usuários ou grupos
   - Aplique as licenças

### Passo 3: Configurar Acesso Condicional

#### 3.1 Criar Política de Acesso Condicional

1. **Navegar até Acesso Condicional**
   ```
   Microsoft Entra ID → Segurança → Acesso Condicional
   ```

2. **Criar Nova Política**
   ```yaml
   Nome: "Acesso Seguro a Aplicativos"
   Usuários: "Todos os usuários"
   Aplicativos: "Todos os aplicativos da nuvem"
   Condições:
     - Dispositivo: "Dispositivos gerenciados"
     - Localização: "Excluir locais confiáveis"
   Controles de Acesso:
     - Conceder: "Exigir MFA"
     - Bloquear: "Dispositivos não gerenciados"
   ```

#### 3.2 Configurar Autenticação Multifatorial

1. **Habilitar MFA**
   ```
   Microsoft Entra ID → Segurança → Métodos de autenticação
   ```

2. **Configurar Métodos**
   - Aplicativo Authenticator
   - SMS
   - E-mail
   - Certificados

### Passo 4: Integração com Aplicativos

#### 4.1 Adicionar Aplicativo SaaS

1. **Navegar até Aplicativos Empresariais**
   ```
   Microsoft Entra ID → Aplicativos Empresariais → Novo aplicativo
   ```

2. **Selecionar Aplicativo**
   - Escolha entre a galeria de aplicativos
   - Ou crie um aplicativo não-gallery

3. **Configurar SSO**
   - SAML
   - OpenID Connect
   - Senha

#### 4.2 Configurar SSO SAML

```xml
<!-- Configuração SAML Básica -->
<EntityID>https://seuDominio.com/saml/metadata</EntityID>
<ReplyURL>https://seuDominio.com/saml/acs</ReplyURL>
<LogoutURL>https://seuDominio.com/saml/logout</LogoutURL>
```

### Passo 5: Monitoramento e Segurança

#### 5.1 Configurar Registros de Auditoria

1. **Acessar Registros de Auditoria**
   ```
   Microsoft Entra ID → Monitoramento → Registros de auditoria
   ```

2. **Configurar Alertas**
   - Falhas de login
   - Alterações de permissões
   - Acesso de localizações suspeitas

#### 5.2 Configurar Proteção de Identidade

1. **Habilitar Proteção de Identidade**
   ```
   Microsoft Entra ID → Segurança → Proteção de Identidade
   ```

2. **Configurar Políticas de Risco**
   - Detecção de credenciais vazadas
   - Login de localizações anômalas
   - Dispositivos não gerenciados

### Passo 6: Sincronização com AD Local

#### 6.1 Instalar Azure AD Connect

1. **Baixar Azure AD Connect**
   ```
   https://www.microsoft.com/en-us/download/details.aspx?id=47594
   ```

2. **Instalar e Configurar**
   ```powershell
   # Executar como administrador
   .\AzureADConnect.msi
   ```

#### 6.2 Configurar Sincronização

1. **Configurar Conexão**
   - Domínio e credenciais
   - Opções de sincronização
   - Filtros de OU

2. **Habilitar Recursos**
   - Sincronização de senha
   - Logon único por federação
   - Proteção contra exclusão acidental

## 🎯 Casos de Uso

### 1. **Acesso Remoto Seguro**
- **Cenário**: Funcionários acessando recursos corporativos de casa
- **Solução**: VPN + MFA + Acesso Condicional
- **Benefícios**: Segurança reforçada, experiência do usuário simplificada

### 2. **Acesso a Aplicativos SaaS**
- **Cenário**: Integração com Office 365, Salesforce, etc.
- **Solução**: SSO + Provisionamento Automático
- **Benefícios**: Redução de senhas, gerenciamento centralizado

### 3. **Identidades de Clientes**
- **Cenário**: Aplicativo B2C com cadastro de clientes
- **Solução**: Microsoft Entra ID for Customers
- **Benefícios**: Experiência personalizada, segurança avançada

### 4. **Acesso Condicional por Localização**
- **Cenário**: Bloquear acesso de países de risco
- **Solução**: Políticas de Acesso Condicional
- **Benefícios**: Prevenção de ataques externos

## 💡 Melhores Práticas

### Segurança

1. **Sempre exigir MFA** para acesso a recursos críticos
2. **Utilizar senhas fortes** e políticas de expiração
3. **Monitorar registros de auditoria** regularmente
4. **Aplicar princípio do menor privilégio**

### Gerenciamento

1. **Organizar usuários em grupos** lógicos
2. **Utilizar nomes de domínio personalizados**
3. **Implementar ciclos de revisão** de acesso
4. **Documentar políticas** de segurança

### Operações

1. **Testar políticas** em ambiente de teste
2. **Manter Azure AD Connect atualizado**
3. **Realizar backups regulares**
4. **Treinar usuários** sobre segurança

## 📚 Referências

### Documentação Oficial
- [Microsoft Entra ID Documentation](https://learn.microsoft.com/pt-br/entra/)
- [Azure Active Directory Documentation](https://learn.microsoft.com/pt-br/azure/active-directory/)
- [Microsoft Security Documentation](https://learn.microsoft.com/pt-br/security/)

### Cursos e Treinamento
- [Microsoft Learn - Azure AD](https://learn.microsoft.com/pt-br/training/azure/active-directory/)
- [AZ-900: Microsoft Azure Fundamentals](https://learn.microsoft.com/pt-br/certifications/exams/az-900/)
- [SC-900: Microsoft Security, Compliance, and Identity Fundamentals](https://learn.microsoft.com/pt-br/certifications/exams/sc-900/)

### Ferramentas Úteis
- [Azure AD Connect Health](https://learn.microsoft.com/pt-br/azure/active-directory/hybrid/how-to-connect-health)
- [Microsoft Entra ID PowerShell](https://learn.microsoft.com/pt-br/powershell/azure/active-directory/install-adv2)
- [Azure AD B2C](https://learn.microsoft.com/pt-br/azure/active-directory-b2c/)

---

## 📞 Suporte

Para dúvidas e suporte técnico:

- **Documentação**: [Microsoft Learn](https://learn.microsoft.com/pt-br/)
- **Fórum de Comunidade**: [Microsoft Q&A](https://learn.microsoft.com/pt-br/answers/)
- **Suporte Técnico**: [Azure Support](https://azure.microsoft.com/pt-br/support/)

