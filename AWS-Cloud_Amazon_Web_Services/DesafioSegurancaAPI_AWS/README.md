# Desafio: Adicionando Segurança em APIs na AWS com Amazon Cognito

## Visão Geral

Este projeto demonstra a implementação de segurança em APIs REST utilizando serviços AWS, com foco no Amazon Cognito para autenticação e autorização. O desafio faz parte do bootcamp **AWS - Cloud Amazon Web Services** da DIO (Digital Innovation One).

## Arquitetura

O projeto utiliza os seguintes serviços AWS:

- **Amazon Cognito**: Para gerenciamento de identidade e acesso
- **Amazon API Gateway**: Para criação e gerenciamento de APIs REST
- **AWS Lambda**: Para lógica de negócios serverless
- **Amazon DynamoDB**: Para armazenamento de dados NoSQL

## Estrutura do Projeto

```
DesafioSegurancaAPI_AWS/
├── README.md              # Este arquivo
├── INSTRUCOES.md          # Instruções detalhadas de implementação
└── src/
    └── put_item_function.js  # Função Lambda para inserção de itens
```

## Funcionalidades Implementadas

### 1. API REST Segura
- Endpoint POST para inserção de itens
- Integração Lambda + API Gateway
- Proxy Lambda para tratamento de requisições

### 2. Autenticação e Autorização
- Configuração de User Pool no Amazon Cognito
- App Client para integração com aplicativos
- Autorizador Cognito no API Gateway
- Suporte a OAuth 2.0 flows

### 3. Banco de Dados
- Tabela DynamoDB "Items"
- Chave primária: id
- Atributos: id, price

## Configuração dos Serviços AWS

### Amazon Cognito
1. **User Pool**: TestPool
   - Tipo de login: Email ou telefone
   - Verificação por email (link)
   - MFA desabilitado

2. **App Client**: TestClient
   - OAuth 2.0 flows: Authorization code grant e Implicit grant
   - Scopes: email, openid
   - Callback URL: https://example.com/logout

3. **Domain**: diolive.auth.sa-east-1.amazoncognito.com

### Amazon API Gateway
- **API**: dio_live_api
- **Resource**: /Items
- **Method**: POST
- **Authorizer**: CognitoAuth
- **Stage**: dev

### AWS Lambda
- **Function**: put_item_function
- **Runtime**: Node.js
- **Permissions**: DynamoDB putItem

### Amazon DynamoDB
- **Table**: Items
- **Partition Key**: id (String)

## Como Testar

### 1. Obter Token de Acesso
Utilize o OAuth 2.0 flow no Postman:

```
Auth Type: OAuth 2.0
Auth URL: https://diolive.auth.sa-east-1.amazoncognito.com/login
Client ID: [seu-client-id]
Scope: email openid
Callback URL: https://example.com/logout
```

### 2. Fazer Requisição à API
```
Method: POST
URL: [API Gateway endpoint]/dev/Items
Headers:
  Authorization: Bearer [seu-token]
Body (JSON):
{
  "id": "001",
  "price": 100
}
```

## Tecnologias Utilizadas

- **Node.js**: Runtime da função Lambda
- **AWS SDK**: Integração com serviços AWS
- **OAuth 2.0**: Protocolo de autorização
- **JSON Web Tokens (JWT)**: Formato de tokens

## Segurança Implementada

- **Autenticação**: Amazon Cognito User Pools
- **Autorização**: OAuth 2.0 scopes
- **Validação**: Lambda Proxy Integration
- **Proteção**: Authorizer no API Gateway

## Benefícios da Solução

1. **Escalabilidade**: Arquitetura serverless totalmente gerenciada
2. **Segurança**: Autenticação e autorização robustas
3. **Custo-Efetivo**: Pague apenas pelo que usar
4. **Manutenção**: Serviços totalmente gerenciados
5. **Integração**: Fácil integração com outros serviços AWS

## Próximos Passos

Para expandir este projeto, considere:

1. **Frontend**: Criar aplicação web/mobile para consumir a API
2. **Validação**: Implementar validação de dados mais robusta
3. **Logs**: Configurar CloudWatch para monitoramento
4. **CI/CD**: Implementar pipeline de deploy automatizado
5. **Testes**: Adicionar testes unitários e de integração

---

**Desafio**: Adicionando Segurança em APIs na AWS com Amazon Cognito
**Bootcamp**: AWS - Cloud Amazon Web Services
**Plataforma**: DIO (Digital Innovation One)