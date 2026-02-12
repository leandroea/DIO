# Script de Provisionamento de Servidor Web (Apache)

## Desafio: Infraestrutura como Código - Script de Provisionamento de um Servidor Web (Apache)

**Bootcamp AWS - Cloud Amazon Web Services | DIO**

---

## 📋 Descrição do Projeto

Este projeto consiste em um script de provisionamento automatizado para a instalação e configuração de um servidor web Apache. O objetivo é demonstrar os princípios de Infraestrutura como Código (IaC), permitindo a implantação rápida e consistente de servidores web em diferentes ambientes.

### 🎯 Objetivos

- **Automatização**: Provisionar servidores web de forma automática e repetível
- **Padronização**: Garantir configurações consistentes em todos os ambientes
- **Eficiência**: Reduzir o tempo de implantação de servidores web
- **Documentação**: Manter um registro claro do processo de provisionamento

---

## 🚀 Funcionalidades

### Principais Características

- **Detecção Automática de Sistema Operacional**: Compatível com Ubuntu/Debian e CentOS/RHEL
- **Instalação do Apache Web Server**: Instalação automatizada do servidor web
- **Configuração de Firewall**: Segurança básica com UFW (Ubuntu) ou Firewalld (CentOS)
- **Página de Teste**: Criação de uma página HTML de demonstração
- **Instalação Opcional de PHP**: Suporte a aplicações web dinâmicas
- **Feedback em Tempo Real**: Mensagens de status e cores para melhor visualização

### Sistema Suportado

- **Ubuntu 16.04+**
- **Debian 8+**
- **CentOS 7+**
- **Red Hat Enterprise Linux 7+**
- **Amazon Linux 2**

---

## 📦 Requisitos

### Requisitos de Sistema

- Sistema Linux (Ubuntu, Debian, CentOS, RHEL)
- Acesso root ou sudo privilegiado
- Conexão com internet para download de pacotes

### Permissões Necessárias

```bash
# O script precisa ser executado com privilégios de administrador
sudo ./provisionamento_servidor_web.sh
```

---

## 🛠️ Instalação e Uso

### 1. Download do Script

```bash
# Clone o repositório ou baixe o script diretamente
wget https://github.com/seu-usuario/provisionamento-servidor-web/archive/main.zip
unzip main.zip
cd provisionamento-servidor-web
```

### 2. Tornar Executável (Linux/Unix)

```bash
chmod +x provisionamento_servidor_web.sh
```

### 3. Execução do Script

```bash
# Execução padrão
sudo ./provisionamento_servidor_web.sh

# Ou sem tornar executável
sudo bash provisionamento_servidor_web.sh
```

### 4. Processo de Instalação

O script executará as seguintes etapas:

1. **Detecção do Sistema Operacional**
2. **Atualização do Sistema**
3. **Instalação do Apache Web Server**
4. **Configuração e Início do Serviço**
5. **Configuração do Firewall**
6. **Criação da Página de Teste**
7. **Pergunta sobre Instalação do PHP**
8. **Exibição de Informações Finais**

---

## 📁 Estrutura de Arquivos

```
├── provisionamento_servidor_web.sh    # Script principal de provisionamento
├── README.md                          # Documentação do projeto
└── [documentação adicional]           # Outros arquivos de documentação
```

### Diretórios do Apache

- **Document Root**: `/var/www/html/` (Ubuntu/Debian) ou `/var/www/html/` (CentOS/RHEL)
- **Configuração**: `/etc/apache2/` (Ubuntu/Debian) ou `/etc/httpd/` (CentOS/RHEL)
- **Logs**: `/var/log/apache2/` (Ubuntu/Debian) ou `/var/log/httpd/` (CentOS/RHEL)

---

## 🔧 Configuração Personalizada

### Modificando a Página de Teste

A página de teste padrão é criada no arquivo `index.html`. Para personalizar:

```bash
# Edite a página de teste
sudo nano /var/www/html/index.html
```

### Configuração do Apache

Para modificar a configuração do Apache:

```bash
# Ubuntu/Debian
sudo nano /etc/apache2/apache2.conf

# CentOS/RHEL
sudo nano /etc/httpd/conf/httpd.conf
```

### Adicionando Virtual Hosts

Para configurar hosts virtuais:

```bash
# Ubuntu/Debian
sudo nano /etc/apache2/sites-available/seu-site.conf

# CentOS/RHEL
sudo nano /etc/httpd/conf.d/seu-site.conf
```

---

## 🌐 Acesso ao Servidor

### Verificando o Status

```bash
# Verificar status do Apache
sudo systemctl status apache2    # Ubuntu/Debian
sudo systemctl status httpd      # CentOS/RHEL

# Verificar status do firewall
sudo ufw status                  # Ubuntu/Debian
sudo firewall-cmd --state        # CentOS/RHEL
```

### Obtendo o Endereço IP

```bash
# Obter endereço IP do servidor
hostname -I
# ou
ip addr show
```

### Acessando via Navegador

1. Abra seu navegador web
2. Digite o endereço IP do servidor
3. A página de teste deve ser exibida

---

## 🐛 Troubleshooting

### Problemas Comuns

#### 1. Permissões de Execução

```bash
# Erro: Permission denied
chmod +x provisionamento_servidor_web.sh
```

#### 2. Falha na Instalação do Apache

```bash
# Verifique a conexão com a internet
ping google.com

# Atualize a lista de pacotes
sudo apt update    # Ubuntu/Debian
sudo yum update    # CentOS/RHEL
```

#### 3. Firewall Bloqueando Conexões

```bash
# Ubuntu/Debian
sudo ufw allow 'Apache Full'

# CentOS/RHEL
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

#### 4. Apache Não Iniciando

```bash
# Verifique logs de erro
sudo tail -f /var/log/apache2/error.log    # Ubuntu/Debian
sudo tail -f /var/log/httpd/error_log      # CentOS/RHEL

# Teste a configuração
sudo apache2ctl configtest                 # Ubuntu/Debian
sudo httpd -t                              # CentOS/RHEL
```

### Comandos Úteis

```bash
# Reiniciar Apache
sudo systemctl restart apache2    # Ubuntu/Debian
sudo systemctl restart httpd      # CentOS/RHEL

# Parar Apache
sudo systemctl stop apache2       # Ubuntu/Debian
sudo systemctl stop httpd         # CentOS/RHEL

# Iniciar Apache
sudo systemctl start apache2      # Ubuntu/Debian
sudo systemctl start httpd        # CentOS/RHEL

# Ver logs em tempo real
sudo tail -f /var/log/apache2/access.log    # Ubuntu/Debian
sudo tail -f /var/log/httpd/access_log      # CentOS/RHEL
```

---

## 🔒 Segurança

### Práticas Recomendadas

1. **Atualizações Regulares**: Mantenha o sistema e o Apache atualizados
2. **Firewall**: Sempre mantenha o firewall configurado
3. **Permissões de Arquivos**: Verifique as permissões dos arquivos web
4. **Monitoramento**: Monitore logs de acesso e erro regularmente

### Configurações de Segurança Adicionais

```bash
# Desativar informações do servidor
sudo nano /etc/apache2/conf-available/security.conf    # Ubuntu/Debian
sudo nano /etc/httpd/conf.d/security.conf              # CentOS/RHEL

# Adicionar cabeçalhos de segurança
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
```

---

## 📊 Monitoramento

### Métricas Básicas

- **Status do Serviço**: Verifique se o Apache está em execução
- **Uso de Memória**: Monitore o consumo de recursos
- **Logs de Acesso**: Analise padrões de tráfego
- **Erros Comuns**: Identifique e resolva problemas rapidamente

### Ferramentas de Monitoramento

- **htop**: Monitoramento de processos em tempo real
- **netstat**: Verificação de conexões de rede
- **Apache Status**: Módulo para monitoramento interno do Apache

---

## 🏷️ Tags

`#AWS` `#DIO` `#Apache` `#InfraestruturaComoCodigo` `#ShellScript` `#DevOps` `#CloudComputing` `#Linux` `#WebServer`

---

**⚠️ Aviso Legal**: Este script é fornecido "como está", sem garantias de qualquer tipo. Use por sua conta e risco. O autor não se responsabiliza por quaisquer danos ou perdas que possam ocorrer durante o uso deste script.