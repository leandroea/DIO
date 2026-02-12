# Desafio Infraestrutura Como Código com Serverless Framework na AWS

## 📋 Visão Geral

Este projeto implementa uma API RESTful completa utilizando a abordagem **Serverless** e **Infraestrutura como Código (IaC)** na AWS. A solução demonstra os conceitos práticos de computação sem servidor, utilizando o Serverless Framework para gerenciar a infraestrutura e implementar funções Lambda com banco de dados DynamoDB.

## 🏗️ Arquitetura

### Componentes Principais

- **AWS Lambda**: Funções serverless que processam as requisições HTTP
- **Amazon API Gateway**: Gateway de API que expõe os endpoints HTTP
- **Amazon DynamoDB**: Banco de dados NoSQL para armazenamento de dados
- **AWS IAM**: Controle de permissões e segurança

### Diagrama de Arquitetura

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client App    │───▶│   API Gateway    │───▶│   Lambda Fx     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │   DynamoDB      │
                                              └─────────────────┘
```

## 📦 Tecnologias Utilizadas

- **Runtime**: Node.js 20.x
- **Framework**: Serverless Framework
- **Linguagem**: JavaScript (ES6+)
- **Banco de Dados**: Amazon DynamoDB
- **Cloud Provider**: AWS (Amazon Web Services)

## 🔧 Configuração do Ambiente

### Pré-requisitos

1. **Node.js** (versão 18 ou superior)
2. **AWS CLI** configurado com credenciais válidas
3. **Serverless Framework** instalado globalmente

### Instalação

```bash
# Instalar o Serverless Framework globalmente
npm install -g serverless

# Navegar até o diretório do projeto
cd serverless-api

# Instalar dependências
npm install
```

## 🚀 Deploy da Aplicação

### Configuração AWS

Antes do deploy, certifique-se de que suas credenciais AWS estão configuradas:

```bash
# Configurar credenciais AWS
aws configure
```

### Deploy

```bash
# Deploy para o ambiente de desenvolvimento
serverless deploy

# Deploy para um stage específico
serverless deploy --stage production

# Deploy com nome de serviço personalizado
serverless deploy --service meu-servico
```

### Deploy Local (Desenvolvimento)

Para testar localmente sem fazer deploy:

```bash
# Iniciar ambiente offline
serverless offline start

# A API estará disponível em: http://localhost:3000
```

## 📡 Endpoints da API

### Operações CRUD de Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | `/users` | Cria um novo usuário |
| GET    | `/users/{id}` | Obtém um usuário por ID |
| PUT    | `/users/{id}` | Atualiza um usuário |
| DELETE | `/users/{id}` | Remove um usuário |
| GET    | `/users` | Lista todos os usuários |

### Exemplos de Uso

#### Criar Usuário

```bash
curl -X POST https://api-id.execute-api.region.amazonaws.com/dev/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao.silva@example.com",
    "age": 30
  }'
```

#### Obter Usuário

```bash
curl https://api-id.execute-api.region.amazonaws.com/dev/users/user-id
```

#### Listar Usuários

```bash
curl https://api-id.execute-api.region.amazonaws.com/dev/users
```

#### Atualizar Usuário

```bash
curl -X PUT https://api-id.execute-api.region.amazonaws.com/dev/users/user-id \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva Atualizado",
    "email": "joao.novo@example.com",
    "age": 31
  }'
```

#### Deletar Usuário

```bash
curl -X DELETE https://api-id.execute-api.region.amazonaws.com/dev/users/user-id
```

## 📊 Estrutura de Dados

### Modelo de Usuário

```json
{
  "id": "uuid-v4",
  "name": "string (obrigatório)",
  "email": "string (obrigatório, formato válido)",
  "age": "number (opcional)",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

### Validação de Dados

- **Nome**: Campo obrigatório, não pode ser vazio
- **Email**: Campo obrigatório, deve ser um email válido
- **Idade**: Campo opcional, deve ser um número positivo

## 🔍 Monitoramento e Logs

### Visualização de Logs

```bash
# Visualizar logs em tempo real
serverless logs -f createUser -t

# Visualizar logs de uma função específica
serverless logs -f getUser --startTime 1h

# Visualizar logs de todas as funções
serverless logs -t
```

### Métricas AWS

Acesse o console AWS para visualizar métricas detalhadas:

1. **CloudWatch Logs**: Logs das funções Lambda
2. **CloudWatch Metrics**: Métricas de performance
3. **X-Ray**: Tracing de requisições

## 🛡️ Segurança

### CORS

A API está configurada com CORS habilitado para permitir requisições de diferentes origens:

```yaml
cors: true
```

### IAM Permissions

As funções Lambda têm permissões mínimas necessárias para operar:

- DynamoDB: Query, Scan, GetItem, PutItem, UpdateItem, DeleteItem
- Somente para a tabela específica da aplicação

## 🧪 Testes

### Testes Locais

```bash
# Iniciar ambiente offline
serverless offline start

# Testar endpoints usando curl ou Postman
curl http://localhost:3000/dev/users
```

### Testes de Integração

Crie scripts de teste para validar o fluxo completo da API:

```javascript
// test/integration.test.js
const axios = require('axios');

describe('API Tests', () => {
  const baseUrl = 'http://localhost:3000/dev';
  
  test('should create a user', async () => {
    const response = await axios.post(`${baseUrl}/users`, {
      name: 'Test User',
      email: 'test@example.com',
      age: 25
    });
    
    expect(response.status).toBe(201);
    expect(response.data.user.name).toBe('Test User');
  });
});
```

## 📈 Performance

### Best Practices Implementadas

- **Provisioned Concurrency**: Para reduzir tempo de inicialização
- **Cold Start Optimization**: Código otimizado para inicialização rápida
- **DynamoDB**: Utilização de PAY_PER_REQUEST para custos otimizados
- **Response Caching**: Configuração de cache no API Gateway

### Monitoramento de Performance

- **Latência**: Monitorar tempo de resposta das funções
- **Erros**: Taxa de erro das requisições
- **Throughput**: Número de requisições por segundo

## 🔄 CI/CD

### Pipeline Básico

```yaml
# .github/workflows/deploy.yml
name: Deploy Serverless

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '20'
      - run: npm install
      - run: serverless deploy
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## 💰 Custos

### Estimativa de Custos

- **Lambda**: $0.0000167 por GB-s de memória consumida
- **API Gateway**: $3.50 por mil requisições
- **DynamoDB**: $1.25 por GB-mês de armazenamento
- **CloudWatch Logs**: $0.50 por GB de logs

### Otimização de Custos

- Utilização de PAY_PER_REQUEST no DynamoDB
- Configuração de timeouts adequados nas funções
- Monitoramento de uso para ajuste de recursos

## 🚨 Troubleshooting

### Problemas Comuns

1. **Permissões AWS**: Verifique se as credenciais têm permissões suficientes
2. **Timeout**: Ajuste o timeout das funções se necessário
3. **Memory**: Ajuste a memória alocada às funções
4. **Environment Variables**: Verifique variáveis de ambiente

### Comandos Úteis

```bash
# Verificar status do deploy
serverless info

# Remover recursos
serverless remove

# Verificar logs
serverless logs -f functionName -t
```

## 📚 Documentação Adicional

- [Serverless Framework Documentation](https://www.serverless.com/framework/docs/)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/)
- [API Gateway Documentation](https://docs.aws.amazon.com/apigateway/)
