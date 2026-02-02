# Criando e Configurando uma Instância de Banco de Dados na Azure 🗄️

Este repositório faz parte do desafio da **DIO - Digital Innovation One**:  
**Criando e Configurando uma Instância de Banco de Dados na Azure**.  

O objetivo é aprender a criar um **Azure SQL Database**, configurar regras de acesso e conectar-se ao banco para executar comandos SQL.

---

## 📋 Pré-requisitos

- Conta no [Microsoft Azure](https://azure.microsoft.com/pt-br/free/).
- Acesso ao **Portal do Azure**: [https://portal.azure.com](https://portal.azure.com).
- Ferramenta de gerenciamento SQL:
  - [Azure Data Studio](https://learn.microsoft.com/pt-br/sql/azure-data-studio/download-azure-data-studio)
  - ou [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/pt-br/sql/ssms/download-sql-server-management-studio-ssms)

---

## 🛠️ Passo a Passo

### 1. Entrar no Portal do Azure
- Acesse [portal.azure.com](https://portal.azure.com) e faça login com sua conta.

---

### 2. Criar Banco de Dados SQL
1. No campo de pesquisa, digite **SQL Database** e selecione o serviço.
2. Clique em **Criar** → **Banco de Dados SQL**.
3. Configure:
   - **Assinatura**: selecione sua assinatura.
   - **Grupo de Recursos**: escolha um existente ou crie um novo.
   - **Nome do Banco de Dados**: `dio-db`.
   - **Servidor**: se não tiver um, clique em **Criar novo** e defina:
     - Nome do servidor: `dio-sql-server`.
     - Login de administrador: `azureuser`.
     - Senha: crie uma senha segura.
     - Região: *Brazil South* (ou a mais próxima).
4. Em **Opções de Computação + Preço**, escolha o plano (para testes, use o nível gratuito ou básico).
5. Clique em **Examinar + Criar** e depois em **Criar**.

---

### 3. Configurar Rede e Segurança
- Após a criação, vá até o recurso do **Servidor SQL**.
- Em **Configurações de Rede**, habilite **Ponto de Extremidade Público**.
- Adicione uma regra de firewall para permitir acesso ao seu IP local:
  - Clique em **Adicionar regra de firewall de cliente**.
  - Isso permitirá que você se conecte ao banco pelo seu computador.

---

### 4. Conectar-se ao Banco
- Abra o **Azure Data Studio** ou **SSMS**.
- Use os dados de conexão:
  - **Servidor**: `dio-sql-server.database.windows.net`
  - **Login**: `azureuser`
  - **Senha**: a que você definiu
  - **Banco de Dados**: `dio-db`

---

### 5. Criar Tabelas e Inserir Dados
No editor SQL, execute comandos como:

```sql
CREATE TABLE Alunos (
    Id INT PRIMARY KEY IDENTITY,
    Nome NVARCHAR(100),
    Curso NVARCHAR(100)
);

INSERT INTO Alunos (Nome, Curso)
VALUES ('Leandro', 'Azure Fundamentals');
```

### 6. Monitorar e Gerenciar

    No Portal do Azure, acesse o recurso do banco de dados.

    Use Métricas para acompanhar desempenho.

    Configure Alertas para monitorar consumo e custos.

### 7. Limpar Recursos (opcional)

    Se não precisar mais do banco:

        Vá até o Grupo de Recursos.

        Clique em Excluir grupo de recursos.

        Confirme digitando o nome do grupo.

## ✅ Resultado Esperado

    Banco de dados SQL criado e acessível.

    Conexão estabelecida via SSMS ou Azure Data Studio.

    Tabelas e dados inseridos com sucesso.

## 📚 Referências

    Documentação Oficial Microsoft - Criar Banco de Dados SQL no Azure (learn.microsoft.com in Bing)