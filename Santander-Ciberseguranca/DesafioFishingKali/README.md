# Projeto Phishing Facebook - DIO Bootcamp

Este projeto demonstra a criação de uma página falsa do Facebook utilizando o Social-Engineer Toolkit (SET) na distribuição Kali Linux, com o objetivo de capturar credenciais de login.

## Objetivo

O objetivo deste projeto é demonstrar técnicas de engenharia social e conscientizar sobre os riscos de phishing, mostrando como páginas falsas podem ser criadas para capturar informações sensíveis.

## Ambiente

- **Sistema Operacional:** Kali Linux
- **Ferramenta Principal:** Social-Engineer Toolkit (SET)
- **Alvo:** Facebook (apenas para fins educacionais)

## Passo a Passo da Configuração

### 1. Iniciando o SEToolkit
Abra o terminal e execute:
```bash
setoolkit
```

### 2. Navegando pelo Menu do SET
Siga estas opções no menu:

1. **Select from the menu:**
   ```
   1) Social-Engineering Attacks
   ```

2. **Selecione o vetor de ataque:**
   ```
   2) Website Attack Vectors
   ```

3. **Método de ataque:**
   ```
   3) Credential Harvester Attack Method
   ```

4. **Escolha a técnica de clonagem:**
   ```
   2) Site Cloner
   ```

### 3. Configuração do Site Cloner

Após selecionar a opção "Site Cloner", você precisará fornecer:

- **URL do site a ser clonado:** Insira a URL do Facebook original
- **IP do servidor Web:** Insira o seu IP local ou o IP da máquina que hospedará o site falso

### 4. Execução do Ataque

O SET irá:
1. Clonar a página do Facebook
2. Hospedar o site falso em seu servidor local
3. Capturar as credenciais inseridas pelos usuários

## Aviso Legal

**IMPORTANTE:** Este projeto foi criado **APENAS PARA FINS EDUCACIONAIS**. O uso de técnicas de phishing para capturar informações de terceiros sem consentimento é **ILEGAL** e pode resultar em penalidades criminais. Este material tem como objetivo conscientizar sobre os riscos de segurança e ensinar como se proteger contra ataques de phishing.

## Considerações de Segurança

- Nunca utilize estas técnicas em pessoas sem permissão
- Este projeto deve ser executado apenas em ambientes controlados e isolados
- Sempre obtenha consentimento explícito antes de testar qualquer técnica de segurança
- Use este conhecimento para proteger a si mesmo e outros contra ataques reais

## Aprendizado Obtido

Com este projeto, aprendi:
- Como funciona a ferramenta SEToolkit
- Técnicas de engenharia social
- Como identificar páginas de phishing
- A importância da verificação de URLs antes de inserir credenciais


---

## Sobre o Projeto

Este é um projeto educacional do [DIO Bootcamp](https://web.digitalinnovation.one/) focado em segurança da informação e conscientização sobre phishing. O objetivo é demonstrar como ataques de engenharia social funcionam para que possamos nos proteger melhor.

## Tags

`#DIO #Bootcamp #SegurançaDaInformação #Phishing #SEToolkit #KaliLinux #EngenhariaSocial #Cibersegurança`