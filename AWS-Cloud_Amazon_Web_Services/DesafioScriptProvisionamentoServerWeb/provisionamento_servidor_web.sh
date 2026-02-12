#!/bin/bash

# Script de Provisionamento de Servidor Web (Apache)
# Desafio AWS - Cloud Amazon Web Services
# Bootcamp DIO

# Configurações de Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir cabeçalho
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}   PROVISIONAMENTO SERVIDOR WEB APACHE  ${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo -e "${YELLOW}Data: $(date)${NC}"
    echo -e "${YELLOW}Usuário: $(whoami)${NC}"
    echo ""
}

# Função para imprimir status
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[ATENÇÃO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERRO]${NC} $1"
}

# Função para verificar se o comando foi executado com sucesso
check_status() {
    if [ $? -eq 0 ]; then
        print_status "$1 concluído com sucesso!"
    else
        print_error "$1 falhou!"
        exit 1
    fi
}

# Função para detectar o sistema operacional
detect_os() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        OS=$NAME
        VERSION=$VERSION_ID
    elif command -v lsb_release &> /dev/null; then
        OS=$(lsb_release -si)
        VERSION=$(lsb_release -sr)
    elif [ -f /etc/redhat-release ]; then
        OS="Red Hat Enterprise Linux"
        VERSION=$(cat /etc/redhat-release | grep -oE '[0-9]+\.[0-9]+')
    else
        OS=$(uname -s)
        VERSION=$(uname -r)
    fi
    print_status "Sistema Operacional Detectado: $OS $VERSION"
}

# Função para atualizar o sistema
update_system() {
    print_status "Atualizando o sistema..."
    
    if command -v apt-get &> /dev/null; then
        sudo apt-get update -y
        check_status "Atualização do sistema"
    elif command -v yum &> /dev/null; then
        sudo yum update -y
        check_status "Atualização do sistema"
    elif command -v dnf &> /dev/null; then
        sudo dnf update -y
        check_status "Atualização do sistema"
    else
        print_warning "Gerenciador de pacotes não reconhecido. Pulando atualização."
    fi
}

# Função para instalar o Apache
install_apache() {
    print_status "Instalando Apache Web Server..."
    
    if command -v apt-get &> /dev/null; then
        sudo apt-get install -y apache2
        check_status "Instalação do Apache"
    elif command -v yum &> /dev/null; then
        sudo yum install -y httpd
        check_status "Instalação do Apache"
    elif command -v dnf &> /dev/null; then
        sudo dnf install -y httpd
        check_status "Instalação do Apache"
    else
        print_error "Gerenciador de pacotes não suportado para instalação automática do Apache"
        exit 1
    fi
}

# Função para iniciar e habilitar o Apache
start_apache() {
    print_status "Iniciando e habilitando o Apache..."
    
    if command -v systemctl &> /dev/null; then
        sudo systemctl start apache2 2>/dev/null || sudo systemctl start httpd
        sudo systemctl enable apache2 2>/dev/null || sudo systemctl enable httpd
        check_status "Início e habilitação do Apache"
    elif command -v service &> /dev/null; then
        sudo service apache2 start 2>/dev/null || sudo service httpd start
        sudo chkconfig apache2 on 2>/dev/null || sudo chkconfig httpd on
        check_status "Início e habilitação do Apache"
    else
        print_warning "Sistema init não reconhecido. Inicie o Apache manualmente."
    fi
}

# Função para instalar o firewall (UFW)
install_firewall() {
    print_status "Instalando e configurando firewall..."
    
    if command -v apt-get &> /dev/null; then
        sudo apt-get install -y ufw
        sudo ufw allow 'Apache Full'
        sudo ufw --force enable
        check_status "Configuração do UFW"
    elif command -v yum &> /dev/null; then
        sudo yum install -y firewalld
        sudo systemctl start firewalld
        sudo systemctl enable firewalld
        sudo firewall-cmd --permanent --add-service=http
        sudo firewall-cmd --permanent --add-service=https
        sudo firewall-cmd --reload
        check_status "Configuração do Firewalld"
    elif command -v dnf &> /dev/null; then
        sudo dnf install -y firewalld
        sudo systemctl start firewalld
        sudo systemctl enable firewalld
        sudo firewall-cmd --permanent --add-service=http
        sudo firewall-cmd --permanent --add-service=https
        sudo firewall-cmd --reload
        check_status "Configuração do Firewalld"
    else
        print_warning "Gerenciador de pacotes não reconhecido. Configure o firewall manualmente."
    fi
}

# Função para criar página HTML de teste
create_test_page() {
    print_status "Criando página HTML de teste..."
    
    # Determinar o diretório do Apache
    if [ -d "/var/www/html" ]; then
        WEB_DIR="/var/www/html"
    elif [ -d "/srv/www/htdocs" ]; then
        WEB_DIR="/srv/www/htdocs"
    else
        WEB_DIR="/var/www/html"
    fi
    
    # Criar backup da página padrão se existir
    if [ -f "$WEB_DIR/index.html" ]; then
        sudo cp "$WEB_DIR/index.html" "$WEB_DIR/index.html.backup"
        print_status "Backup da página padrão criado"
    fi
    
    # Criar página de teste
    sudo tee "$WEB_DIR/index.html" > /dev/null << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Servidor Web Provisionado - AWS/DIO</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #333;
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 600px;
        }
        h1 {
            color: #2c3e50;
            margin-bottom: 20px;
        }
        .status {
            background-color: #27ae60;
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            display: inline-block;
            margin: 20px 0;
            font-weight: bold;
        }
        .info-box {
            background-color: #ecf0f1;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
            text-align: left;
        }
        .footer {
            margin-top: 30px;
            font-size: 0.9em;
            color: #7f8c8d;
        }
        .logo {
            width: 100px;
            height: 100px;
            background-color: #3498db;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: block;
            position: relative;
        }
        .logo::after {
            content: 'AWS';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-weight: bold;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo"></div>
        <h1>🎉 Servidor Web Apache Provisionado com Sucesso!</h1>
        <div class="status">SERVIDOR ONLINE</div>
        
        <div class="info-box">
            <h3>Informações do Servidor:</h3>
            <p><strong>Sistema:</strong> $(uname -s) $(uname -r)</p>
            <p><strong>Data:</strong> $(date)</p>
            <p><strong>IP do Servidor:</strong> $(hostname -I 2>/dev/null || echo "Indisponível")</p>
            <p><strong>Apache Status:</strong> $(systemctl is-active apache2 2>/dev/null || systemctl is-active httpd 2>/dev/null || echo "Verifique manualmente")</p>
        </div>
        
        <p>Este servidor foi provisionado automaticamente através do script de provisionamento da AWS/DIO.</p>
        
        <div class="footer">
            <p>Desafio: Infraestrutura como Código - Script de Provisionamento de um Servidor Web (Apache)</p>
            <p>Bootcamp AWS - Cloud Amazon Web Services | DIO</p>
        </div>
    </div>
</body>
</html>
EOF
    
    check_status "Criação da página HTML de teste"
}

# Função para instalar PHP (opcional)
install_php() {
    print_status "Deseja instalar PHP? (s/n)"
    read -r install_php_choice
    
    if [[ $install_php_choice =~ ^[Ss]$ ]]; then
        print_status "Instalando PHP..."
        
        if command -v apt-get &> /dev/null; then
            sudo apt-get install -y php libapache2-mod-php php-mysql
            sudo systemctl restart apache2
        elif command -v yum &> /dev/null; then
            sudo yum install -y php php-mysql
            sudo systemctl restart httpd
        elif command -v dnf &> /dev/null; then
            sudo dnf install -y php php-mysqlnd
            sudo systemctl restart httpd
        fi
        
        check_status "Instalação do PHP"
        
        # Criar página PHP de teste
        sudo tee "$WEB_DIR/info.php" > /dev/null << 'EOF'
<?php
phpinfo();
?>
EOF
        print_status "Página de teste PHP criada em /info.php"
    else
        print_status "PHP não será instalado"
    fi
}

# Função para exibir informações finais
show_final_info() {
    echo ""
    echo -e "${BLUE}========================================${NC}"
    echo -e "${GREEN}PROVISIONAMENTO CONCLUÍDO COM SUCESSO!${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
    echo -e "${GREEN}✓ Apache Web Server instalado e configurado${NC}"
    echo -e "${GREEN}✓ Firewall configurado${NC}"
    echo -e "${GREEN}✓ Página de teste criada${NC}"
    echo ""
    echo -e "${YELLOW}Próximos passos:${NC}"
    echo "1. Acesse o servidor via navegador usando o IP público"
    echo "2. Verifique se a página de teste está carregando corretamente"
    echo "3. Se instalou PHP, acesse /info.php para ver as informações do PHP"
    echo ""
    echo -e "${BLUE}Comandos úteis:${NC}"
    echo "  Verificar status do Apache: sudo systemctl status apache2 (ou httpd)"
    echo "  Reiniciar Apache: sudo systemctl restart apache2 (ou httpd)"
    echo "  Logs do Apache: sudo tail -f /var/log/apache2/error.log (ou /var/log/httpd/error_log)"
    echo ""
    echo -e "${BLUE}Diretórios importantes:${NC}"
    echo "  Document Root: $WEB_DIR"
    echo "  Configuração Apache: /etc/apache2/ (ou /etc/httpd/)"
    echo "  Logs: /var/log/apache2/ (ou /var/log/httpd/)"
    echo ""
}

# Função principal
main() {
    print_header
    
    # Verificar se o script está sendo executado como root
    if [ "$EUID" -ne 0 ]; then
        print_warning "Este script precisa ser executado como root. Use: sudo ./provisionamento_servidor_web.sh"
        exit 1
    fi
    
    # Execução das funções
    detect_os
    update_system
    install_apache
    start_apache
    install_firewall
    create_test_page
    install_php
    show_final_info
}

# Executar o script
main "$@"