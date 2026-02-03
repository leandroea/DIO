# Dominando o Armazenamento na Azure

## Guia Completo para o Curso Microsoft Azure AZ-900

Este documento fornece um guia abrangente sobre o armazenamento na Microsoft Azure, cobrindo desde a criação de contas de armazenamento até a migração de dados e estratégias avançadas de gerenciamento.

---

## 📋 Sumário

1. [Visão Geral do Armazenamento Azure](#visão-geral-do-armazenamento-azure)
2. [Tipos de Contas de Armazenamento](#tipos-de-contas-de-armazenamento)
3. [Criação e Configuração de Conta de Armazenamento](#criação-e-configuração-de-conta-de-armazenamento)
4. [Opções Pós-Criação](#opções-pós-criação)
5. [Migração de Banco de Dados para Azure](#migração-de-banco-de-dados-para-azure)
6. [Cópia de Dados](#cópia-de-dados)
7. [Melhores Práticas](#melhores-práticas)
8. [Referências](#referências)

---

## Visão Geral do Armazenamento Azure

O Azure Storage é um serviço de armazenamento em nuvem da Microsoft que oferece:

- **Escalabilidade**: Armazenamento praticamente ilimitado
- **Disponibilidade**: SLA de até 99,999999999% (11 noves)
- **Segurança**: Criptografia em repouso e em trânsito
- **Custo-efetivo**: Diversos níveis de armazenamento para diferentes necessidades

### Principais Serviços de Armazenamento

- **Blob Storage**: Para dados não estruturados (imagens, vídeos, documentos)
- **File Storage**: Sistemas de arquivos baseados em SMB
- **Queue Storage**: Mensagens para comunicação entre aplicações
- **Table Storage**: Banco de dados NoSQL chave-valor
- **Disk Storage**: Discos gerenciados para máquinas virtuais

---

## Tipos de Contas de Armazenamento

### 1. Armazenamento de Uso Geral v2 (GPv2)
- **Recomendado** para a maioria dos cenários
- Suporta todos os serviços de armazenamento
- Opções de camadas de acesso: Hot, Cool, Archive

### 2. Armazenamento de Uso Geral v1 (GPv1)
- Legado, sem suporte a camadas de acesso avançadas
- Recomendado apenas para compatibilidade

### 3. Blob Storage
- Apenas para dados de blob
- Não suporta arquivos, filas ou tabelas

### 4. Armazenamento Premium
- Alto desempenho para cargas de trabalho críticas
- SSD-based
- Ideal para máquinas virtuais e aplicativos de alto IOPS

---

## Criação e Configuração de Conta de Armazenamento

### Passo a Passo: Criação de Conta de Armazenamento

#### 1. Acessando o Portal Azure

1. Acesse [portal.azure.com](https://portal.azure.com)
2. Faça login com sua conta Microsoft
3. Clique em "Criar um recurso"

#### 2. Selecionando o Serviço

1. Pesquise por "Conta de armazenamento"
2. Selecione "Conta de armazenamento - blob, arquivo, tabela, fila"
3. Clique em "Criar"

#### 3. Configuração Básica

**Grupo de Recursos:**
- Selecione um grupo existente ou crie um novo
- Recomendação: Organize por ambiente (dev, test, prod)

**Nome da Conta de Armazenamento:**
- 3-24 caracteres alfanuméricos
- Deve ser único globalmente
- Apenas letras minúsculas e números
- Exemplo: `mystorageaccount123`

**Região:**
- Escolha a região mais próxima dos usuários
- Considere requisitos de conformidade de dados

**Desempenho:**
- **Standard**: HDD-based, custo-efetivo
- **Premium**: SSD-based, alto desempenho

**Tipo de Conta:**
- **StorageV2 (uso geral v2)**: Recomendado

**Replicação:**
- **LRS (Local Redundant Storage)**: 3 cópias na mesma região
- **ZRS (Zone Redundant Storage)**: 3 cópias em zonas de disponibilidade diferentes
- **GRS (Geo Redundant Storage)**: 3 cópias + 3 cópias em região secundária
- **RA-GRS (Read Access GRS)**: GRS com acesso de leitura na região secundária

#### 4. Configuração de Marcações

**Marcações (Tags):**
- **CostCenter**: Departamento responsável
- **Environment**: Ambiente (dev/test/prod)
- **Project**: Nome do projeto
- **Owner**: Responsável pelo recurso

Exemplo de marcações:
```
CostCenter: IT-001
Environment: Production
Project: E-commerce Platform
Owner: john.doe@company.com
```

#### 5. Configuração Avançada

**Camada de Acesso:**
- **Hot**: Dados acessados frequentemente
- **Cool**: Dados acessados raramente (arquivamento a curto prazo)
- **Archive**: Dados raramente acessados (arquivamento a longo prazo)

**Namespace Hierárquico:**
- Ative para Data Lake Storage Gen2
- Estrutura de diretórios para big data analytics

**Large File Shares:**
- Ative para suportar shares de arquivos maiores que 5 TiB
- Necessário para workloads intensivos

#### 6. Configuração de Rede

**Firewall e Redes Virtuais:**
- **Todas as redes**: Acesso público (padrão)
- **Redes selecionadas**: Acesso restrito a VNets e IPs específicos
- **Ponto de extremidade privado**: Conexão privada via Private Link

**Ponto de Extremidade de Serviço:**
- Permite acesso seguro de VNets
- Não atravessa a internet

**Ponto de Extremidade Privado:**
- IP privado na VNet
- Tráfego não atravessa internet pública

#### 7. Proteção de Dados

**Blob Versioning:**
- Mantém versões anteriores de blobs
- Recuperação automática de dados

**Blob Soft Delete:**
- Recuperação de blobs excluídos
- Período configurável (1-365 dias)

**Change Feed:**
- Registra alterações em blobs
- Útil para processamento de dados em tempo real

**Immutability Policies:**
- **Legal Hold**: Bloqueio indefinido
- **Time-based Retention**: Bloqueio por período específico

#### 8. Criptografia

**Criptografia em Repouso:**
- **Serviço de Armazenamento Azure (SSE)**: Criptografia padrão
- **Chave Gerenciada pelo Cliente (CMK)**: Controle total da chave
- **Chave Gerenciada pela Microsoft (MMK)**: Gerenciamento automático

**Criptografia em Trânsito:**
- HTTPS obrigatório
- TLS 1.2 recomendado

**Key Vault Integration:**
- Armazenamento seguro de chaves de criptografia
- Controle de acesso baseado em políticas

---

## Opções Pós-Criação

### 1. Gerenciamento de Dados

**Contêineres de Blob:**
- Crie contêineres para organizar seus blobs
- Defina níveis de acesso por contêiner
- Configure políticas de ciclo de vida

**Compartilhamentos de Arquivo:**
- Crie compartilhamentos SMB
- Configure quotas de armazenamento
- Gerencie permissões de acesso

**Filas:**
- Crie filas para mensagens
- Configure TTL (Time To Live)
- Monitore métricas de filas

### 2. Monitoramento e Diagnóstico

**Métricas do Azure Monitor:**
- Monitoramento de latência
- Taxas de transferência
- Erros de solicitação

**Logs de Diagnóstico:**
- Logs de acesso
- Logs de operações
- Integração com Log Analytics

**Alertas:**
- Alertas baseados em métricas
- Webhooks para integração
- Runbooks de automação

### 3. Segurança e Controle de Acesso

**Azure AD Integration:**
- Autenticação baseada em identidade
- Controle de acesso baseado em funções (RBAC)

**Assinaturas de Acesso Compartilhado (SAS):**
- Tokens de acesso temporário
- Permissões granulares
- Prazos de validade configuráveis

**Políticas de Firewall:**
- Restrição por IP
- Integração com NSGs
- Ponto de extremidade de serviço

---

## Migração de Banco de Dados para Azure

### Estratégias de Migração

#### 1. Migração Online (Zero Downtime)

**Azure Database Migration Service (DMS):**
1. Crie uma instância do DMS
2. Configure a conexão de origem e destino
3. Execute a migração com sincronização contínua
4. Corte para o ambiente Azure

**Vantagens:**
- Downtime mínimo
- Sincronização em tempo real
- Rollback fácil

#### 2. Migração Offline

**Backup e Restore:**
1. Faça backup do banco de dados local
2. Transfira para Azure Blob Storage
3. Restaure no Azure SQL Database
4. Atualize strings de conexão

**Vantagens:**
- Simplicidade
- Custo reduzido
- Controle total do processo

### Ferramentas de Migração

#### Azure Database Migration Service

**Tipos de Migração:**
- **SQL Server para Azure SQL Database**
- **MySQL para Azure Database for MySQL**
- **PostgreSQL para Azure Database for PostgreSQL**

**Etapas de Configuração:**
1. **Avaliação**: Analise o ambiente de origem
2. **Planejamento**: Defina estratégia e cronograma
3. **Execução**: Migre dados e esquemas
4. **Validação**: Verifique integridade dos dados

#### Data Migration Assistant (DMA)

**Funcionalidades:**
- Avaliação de compatibilidade
- Identificação de recursos não suportados
- Recomendações de otimização

### Considerações Importantes

#### Planejamento Pré-Migração

1. **Análise de Dependências**
   - Identifique dependências de aplicação
   - Mapeie relacionamentos entre bancos de dados
   - Avalie requisitos de latência

2. **Dimensionamento**
   - Estime carga de trabalho futura
   - Selecione o nível de serviço adequado
   - Considere auto-scaling

3. **Segurança**
   - Planeje a migração de credenciais
   - Configure políticas de firewall
   - Estabeleça backup e disaster recovery

#### Estratégias de Teste

1. **Ambiente de Teste**
   - Crie cópia de produção
   - Teste carga e performance
   - Valide integridade dos dados

2. **Validação de Dados**
   - Compare contagens de registros
   - Verifique consistência de relacionamentos
   - Teste consultas críticas

---

## Cópia de Dados

### Métodos de Cópia de Dados

#### 1. Azure Storage Explorer

**Para pequenos volumes de dados:**
1. Conecte-se à conta de armazenamento
2. Arraste e solte arquivos
3. Monitore o progresso da transferência

**Vantagens:**
- Interface gráfica intuitiva
- Ideal para arquivos pequenos
- Não requer conhecimento técnico avançado

#### 2. AzCopy

**Ferramenta de linha de comando:**
```bash
# Copiar arquivos locais para blob
azcopy copy "C:\local\path\*" "https://mystorage.blob.core.windows.net/container?sasToken" --recursive

# Copiar entre contas de armazenamento
azcopy copy "https://source.blob.core.windows.net/container/*" "https://dest.blob.core.windows.net/container/*" --recursive
```

**Recursos avançados:**
- Transferência paralela
- Retentativas automáticas
- Suporte a SAS tokens
- Criptografia em trânsito

#### 3. Azure Data Factory

**Para grandes volumes e pipelines complexos:**

**Configuração:**
1. Crie um Data Factory
2. Configure serviços vinculados (Linked Services)
3. Crie conjuntos de dados (Datasets)
4. Crie pipelines de cópia

**Recursos:**
- Escala automática
- Monitoramento avançado
- Integração com outros serviços Azure
- Transformação de dados durante a cópia

#### 4. Azure Import/Export

**Para grandes volumes (petabytes):**
1. Envie discos rígidos para datacenter Azure
2. Azure copia os dados para o armazenamento
3. Receba os discos de volta

**Vantagens:**
- Ideal para grandes volumes
- Custo de rede reduzido
- Segurança física dos dados

### Estratégias de Cópia

#### 1. Cópia Completa vs Incremental

**Cópia Completa:**
- Copia todos os dados
- Ideal para migrações iniciais
- Maior tempo de transferência

**Cópia Incremental:**
- Copia apenas alterações
- Ideal para sincronização contínua
- Menor uso de largura de banda

#### 2. Estratégias de Sincronização

**One-Way Sync:**
- Dados sincronizados em uma direção
- Ideal para backup e arquivamento

**Two-Way Sync:**
- Dados sincronizados em ambas direções
- Ideal para ambientes distribuídos

#### 3. Controle de Qualidade

**Validação de Dados:**
- Verifique checksums
- Compare tamanhos de arquivos
- Valide metadados

**Monitoramento:**
- Métricas de transferência
- Alertas de falhas
- Logs de auditoria

### Melhores Práticas para Cópia de Dados

#### 1. Planejamento

- **Avalie o volume de dados**: Estime o tempo de transferência
- **Escolha o método adequado**: Considere custo, tempo e complexidade
- **Planeje a janela de manutenção**: Minimize impacto nos usuários

#### 2. Segurança

- **Use HTTPS**: Sempre que possível
- **Proteja credenciais**: Use Azure Key Vault
- **Criptografe dados sensíveis**: Em repouso e em trânsito

#### 3. Performance

- **Transferência paralela**: Aproveite múltiplas conexões
- **Compressão**: Reduza volume de dados
- **Cache**: Use cache local quando apropriado

#### 4. Monitoramento

- **Métricas em tempo real**: Monitore progresso
- **Alertas proativos**: Identifique problemas rapidamente
- **Relatórios de status**: Comunicação clara com stakeholders

---

## Melhores Práticas

### 1. Estratégia de Naming

**Contas de Armazenamento:**
- Use nomes descritivos
- Inclua ambiente e região
- Exemplo: `prodweuappdata01`

**Contêineres e Diretórios:**
- Estrutura hierárquica clara
- Use convenções consistentes
- Evite nomes muito longos

### 2. Gestão de Custos

**Camadas de Armazenamento:**
- Mova dados inativos para camadas mais econômicas
- Configure políticas de ciclo de vida
- Monitore uso e custos regularmente

**Desempenho vs Custo:**
- Avalie necessidade de armazenamento premium
- Use caching para reduzir operações
- Considere compressão de dados

### 3. Segurança

**Princípio do Mínimo Privilégio:**
- Conceda apenas permissões necessárias
- Use RBAC para controle granular
- Revogue acesso quando não necessário

**Monitoramento de Segurança:**
- Habilite logs de diagnóstico
- Configure alertas de segurança
- Realize auditorias regulares

### 4. Backup e Recuperação

**Estratégia de Backup:**
- Defina RPO (Recovery Point Objective)
- Defina RTO (Recovery Time Objective)
- Teste planos de recuperação regularmente

**Tipos de Backup:**
- Backup completo diário
- Backup incremental
- Snapshot de blob

### 5. Performance

**Otimização de Acesso:**
- Use CDN para conteúdo estático
- Implemente caching local
- Otimize tamanhos de blob

**Monitoramento:**
- Métricas de latência
- Taxas de transferência
- Erros de solicitação

---

## Referências

### Documentação Oficial Azure

- [Azure Storage Documentation](https://docs.microsoft.com/azure/storage/)
- [Azure Storage Best Practices](https://docs.microsoft.com/azure/storage/blobs/storage-blob-scalable-apps)
- [Azure Database Migration Service](https://docs.microsoft.com/azure/dms/)

### Ferramentas e Recursos

- [Azure Storage Explorer](https://azure.microsoft.com/products/storage/storage-explorer/)
- [AzCopy Documentation](https://docs.microsoft.com/azure/storage/common/storage-use-azcopy-v10)
- [Azure Data Factory](https://azure.microsoft.com/products/data-factory/)

### Cursos e Certificações

- [Microsoft Learn: Azure Fundamentals](https://learn.microsoft.com/azure/fundamentals/)
- [Azure AZ-900 Certification Guide](https://learn.microsoft.com/certifications/exams/az-900/)
- [Azure Storage Learning Path](https://learn.microsoft.com/training/paths/azure-storage/)

---
