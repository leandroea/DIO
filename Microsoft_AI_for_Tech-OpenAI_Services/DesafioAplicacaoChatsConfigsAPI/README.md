# 🚀 Desafio DIO - Azure OpenAI + Semantic Kernel

Este projeto foi desenvolvido como parte de um desafio da [Digital Innovation One (DIO)](https://www.dio.me/), com o objetivo de **explorar o desenvolvimento de aplicações práticas utilizando o Azure OpenAI**, incluindo chamadas de API e integração com o **Semantic Kernel**.

⚠️ **Aviso Importante**:  
Este projeto tem **finalidade exclusivamente educacional**. O uso das ferramentas deve ser feito em ambientes controlados e com responsabilidade.

---

## 📂 Objetivo do Projeto

- Compreender como realizar chamadas de API para o **Azure OpenAI Service**.  
- Explorar a integração com o **Semantic Kernel**, criando fluxos inteligentes e reutilizáveis.  
- Documentar os experimentos e reflexões sobre o uso combinado dessas tecnologias.  

---

## ⚙️ Tecnologias Utilizadas

- **Azure OpenAI Service** → Modelos de linguagem avançados para geração de texto, análise e automação.  
- **Semantic Kernel** → Framework que permite integrar IA em aplicações, orquestrando prompts, plugins e memória.  
- **Python / C#** → Linguagens de programação para implementação dos exemplos.  
- **REST API / SDKs** → Chamadas diretas ao serviço do Azure OpenAI.  

---

## 🚀 Passo a Passo

### 1. Configuração do Ambiente
- Criar recurso **Azure OpenAI** no portal do Azure.  
- Obter **Endpoint** e **API Key**.  
- Configurar variáveis de ambiente para autenticação segura.  

### 2. Chamadas de API
Exemplo em Python:
```python
import openai
import os

openai.api_type = "azure"
openai.api_base = os.getenv("AZURE_OPENAI_ENDPOINT")
openai.api_key = os.getenv("AZURE_OPENAI_KEY")
openai.api_version = "2023-05-15"

response = openai.ChatCompletion.create(
    engine="gpt-35-turbo",
    messages=[{"role":"user","content":"Explique o que é Semantic Kernel"}]
)

print(response.choices[0].message["content"])
```

3. Integração com Semantic Kernel

    Criar skills e plugins para organizar prompts.

    Utilizar memória semântica para armazenar contexto.

    Orquestrar chamadas ao Azure OpenAI dentro de fluxos inteligentes.

Exemplo em C#:
```C#
var kernel = Kernel.Builder
    .WithAzureChatCompletionService("gpt-35-turbo", endpoint, apiKey)
    .Build();

var result = await kernel.RunAsync("Explique como o Semantic Kernel funciona.");
Console.WriteLine(result);
```

## 📖 Reflexões

Este desafio permitiu compreender:

    Como realizar chamadas de API para o Azure OpenAI.

    O papel do Semantic Kernel na integração de IA em aplicações reais.

    A importância de organizar prompts e fluxos para maior reutilização e escalabilidade.

## 🎯 Objetivos de Aprendizagem

Agora sou capaz de:

    Compreender o funcionamento do Azure OpenAI Service.

    Realizar chamadas de API para modelos de linguagem.

    Integrar o Semantic Kernel em aplicações práticas.

    Documentar experimentos e utilizar o GitHub como portfólio técnico.