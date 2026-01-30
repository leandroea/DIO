# ☁️ Projeto Azure Data Factory - Redundância de Arquivos

Este projeto prático tem como objetivo criar um processo completo de **redundância de arquivos** utilizando recursos do **Microsoft Azure**.  
Através do **Azure Data Factory**, é possível configurar uma infraestrutura robusta para mover dados de ambientes locais para a nuvem, garantindo organização, segurança e escalabilidade.

---

## 🎯 Objetivos do Projeto

- Criar um pipeline de dados com Azure Data Factory.
- Conectar ambientes **on-premises** via **Integration Runtime**.
- Integrar bancos de dados **SQL locais e Azure SQL**.
- Armazenar dados em **Blob Storage** no formato `.TXT`.
- Organizar os arquivos por camadas (ex: `raw`, `bronze`).
- Validar, publicar e executar pipelines com análise de performance.
- Aplicar boas práticas de configuração e nomenclatura.

---

## 🏗️ Etapas do Projeto

### 1. Preparação do Ambiente
- Criação de **Resource Group** e **Data Factory**.
- Configuração do **Integration Runtime** para acesso local.

### 2. Conexões e Serviços
- Criação de **Linked Services** para:
  - SQL Server local
  - Azure SQL Database
  - Azure Blob Storage

### 3. Modelagem de Dados
- Criação de **Datasets** para leitura e escrita.
- Definição de **esquemas de dados** e formatos de saída.

### 4. Pipeline de Redundância
- Criação de **pipeline** para mover dados da tabela SQL local para o Azure Data Lake.
- Conversão dos dados em arquivos `.TXT`.
- Organização dos arquivos em camadas (`raw`, `bronze`).

### 5. Execução e Monitoramento
- Validação e publicação do pipeline.
- Execução manual e agendada.
- Monitoramento de performance e logs de execução.

---

## ⚙️ Tecnologias Utilizadas

- **Microsoft Azure**
- **Azure Data Factory**
- **Azure SQL Database**
- **Integration Runtime**
- **Azure Blob Storage**
- **ARM Templates**
- **Azure Cloud Shell**

---

## 🚀 Como Reproduzir

1. Crie uma conta gratuita no [Azure para Estudantes](https://azure.microsoft.com/free/students/).
2. Configure os recursos conforme descrito no `relatorio.md`.
3. Implemente os pipelines no Azure Data Factory.
4. Execute e monitore os resultados no portal do Azure.

---

## 📌 Benefícios Esperados

- Redundância segura de dados entre ambientes locais e nuvem.
- Organização eficiente dos arquivos por camadas.
- Facilidade de monitoramento e manutenção.
- Aprendizado prático sobre integração de dados no Azure.

---

