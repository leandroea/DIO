# Projeto: Aplicação Web com Docker Compose e Apache

Este projeto cria um container Docker rodando um servidor **Apache (httpd)** para servir uma aplicação HTML simples.

---

## 🚀 Passo a Passo

### 1. Pré-requisitos
- Docker instalado
- Docker Compose instalado

### 2. Estrutura do Projeto
meu-projeto-web/
│── docker-compose.yml
│── app/
│   └── index.html


### 3. Executar o Container
No terminal, dentro da pasta do projeto, execute:
```bash
docker-compose up -d
```

### 4. Acessar a Aplicação

Abra o navegador e acesse: http://localhost:8080

Você verá a mensagem Hello World com Docker + Apache!

### 5. Parar o Container

```bash
docker-compose down
```

### 📌 Observações

    O volume ./app:/usr/local/apache2/htdocs/ permite editar o index.html localmente e ver as mudanças imediatamente no navegador.

    É possível adicionar mais arquivos HTML, CSS ou JS dentro da pasta app.