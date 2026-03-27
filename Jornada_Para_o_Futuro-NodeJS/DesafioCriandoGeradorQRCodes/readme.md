<!--START_SECTION:header-->
<div align="center">
  <p align="center">
    <img 
      alt="DIO Education" 
      src="https://raw.githubusercontent.com/digitalinnovationone/template-github-trilha/main/.github/assets/logo.webp" 
      width="100px" 
    />
    <h1>Gerador de QRcode para e-commerce</h1>
  </p>
</div>
<!--END_SECTION:header-->

<p align="center">
  <img src="https://img.shields.io/static/v1?label=DIO&message=Education&color=E94D5F&labelColor=202024" alt="DIO Project" />
  <a href="NIVEL"><img  src="https://img.shields.io/static/v1?label=Nivel&message=Basico&color=E94D5F&labelColor=202024" alt="Nivel"></a>

</p>

<!--  -->
<table align="center">
<thead>
  <tr>
    <td>
        <p align="center">Expert</p>
        <a href="https://github.com/felipeAguiarCode">
        <img src="https://avatars0.githubusercontent.com/u/37452836?v=3&s=115" alt="@felipeAguiarCode"><br>
      </a>
    </td>
    <td colspan="3">
    <p>🎉 10y+ em sistemas comerciais com .NET C# e NODE.JS.
      <br/>
     🌟 Desenvolvedor fullstack - Coordenador de educação na DIO
      <br/>
    👨‍💻 Foco em front-ends SPA com React, Angular e Vue.js
    </p>
      <a 
      href="https://www.linkedin.com/in/felipe-me/" 
      align="center">
           <img 
            align="center" 
            alt="Material de Apoio" 
            src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
            >
        </a>
        <a href="https://www.instagram.com/felipeaguiar.exe/" target="_blank">
            <img 
              align="center" 
              alt="Instagram" 
              src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white"
            >
        </a>
    </td>
  </tr>
</thead>
</table>
<!--  -->

<br/>
<br/>

## 💻 Sobre o Projeto

Vamos construir um kit de utilidades para um e-commerce, o projeto deve ser escalável para ter adição de novas features.

## 📚 Pré-requisitos de Habilidades e Níveis de Conhecimento

Antes de ingressar neste conteúdo, é necessário possuir conhecimento prévio nas seguintes áreas:

- Lógica de programação
- Javascript | Básico
- NodeJS | Básico
- Node Modules
- NPM, Packages, Dependencies
- Variáveis ambiente (.env)

## 🛠️ Habilidades e Sub-habilidades que vamos aprender neste conteúdo

- Como gerar qrcode com node
- Como lidar com várias dependências de um projeto
- Como pensar em projetos por camadas

## ✨ Funcionalidades Implementadas

### 🔳 Gerador de QR Code

| Funcionalidade | Descrição |
|----------------|------------|
| **Tipos de dados** | URL, WiFi, vCard, Texto |
| **Saida** | Terminal (ASCII) ou imagem (PNG/JPG) |
| **Correção de erro** | Niveis L, M, Q, H |
| **Cores personalizadas** | Cor do QR e cor de fundo (hexadecimal) |

#### Tipos de QR Code suportados:
- **URL**: Links para websites
- **WiFi**: Credenciais de rede sem fio (SSID, senha, tipo de criptografia)
- **vCard**: Contatos com nome, telefone e email
- **Texto**: Qualquer texto livre

### 🔐 Gerador de Senhas

| Funcionalidade | Descrição |
|----------------|------------|
| **Tipos de senha** | Aleatória ou Pronunciável |
| **Exclusão de caracteres** | Remove caracteres similares (0, O, 1, l, I) |
| **Indicador de força** | Mostra nível de segurança (Fraca/Média/Forte/Muito Forte) |
| **Área de transferência** | Copia automaticamente para o clipboard |

## 🚀 Como Usar

```bash
# Instalar dependências
npm install

# Executar o projeto
npm start
```

## ⚙️ Configurações (arquivo .env)

```env
UPPERCASE_LETTERS=true    # Incluir letras maiúsculas
LOWERCASE_LETTERS=true    # Incluir letras minúsculas
NUMBERS=true              # Incluir números
SPECIAL_CHARACTERS=true   # Incluir caracteres especiais
PASSWORD_LENGTH=12        # Tamanho da senha
```

## 📦 Dependências

| Pacote | Descrição |
|--------|------------|
| `prompt` | Interface de entrada interativa |
| `qrcode-terminal` | Renderização de QR no terminal |
| `qrcode` | Geração de QR como imagem |
| `chalk` | Cores no terminal |
| `clipboardy` | Copiar para área de transferência |

## 🎯 Objetivos e Resultados Esperados

Após a conclusão do curso/projeto, os estudantes estarão aptos a:

- Criar projetos nodejs que gerem multiplas dependências

<!--START_SECTION:footer-->

<br />
<br />

<p align="center">
  <a href="https://www.dio.me/" target="_blank">
    <img align="center" src="https://raw.githubusercontent.com/digitalinnovationone/template-github-trilha/main/.github/assets/footer.png" alt="banner"/>
  </a>
</p>
