# Chatbot Baseado em Conteúdo de PDFs ✅

Este repositório contém um projeto de exemplo para construir um chatbot que responde com base no conteúdo de documentos (PDFs / textos). A ideia é: 1) extrair texto dos documentos, 2) gerar embeddings, 3) indexar em uma busca vetorial, 4) recuperar trechos relevantes e 5) gerar respostas contextuais.

---

## Estrutura do repositório 🔧

- `inputs/` — pasta onde você pode colocar seus PDFs e arquivos de texto. (Contém `sentencas.txt` como exemplo)
- `extract_index_chat.py` — script demonstrativo que mostra o fluxo completo (extração, embeddings, indexação, busca e chat).
- `requirements.txt` — dependências necessárias.

---

## Como usar (guia rápido) 🏃‍♂️

1. Crie um virtualenv e instale dependências:

```bash
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

2. Coloque seus PDFs ou arquivos `.txt` dentro da pasta `inputs/`.

3. Execute o script de exemplo:

```bash
python extract_index_chat.py
```

O script vai: ler os arquivos em `inputs/`, extrair texto, criar embeddings (usando `sentence-transformers`), indexar com `faiss` e oferecer uma função de busca para testes.

---

## Prints e evidências 📸

Abaixo há um exemplo de saída gerada pelo script `extract_index_chat.py` quando rodado com o arquivo `inputs/sentencas.txt` incluído neste repositório.

**Exemplo de saída esperada:**

```
Gerando embeddings para 5 chunks...
Índice criado e salvo em: faiss_index.bin
Exemplo de busca: 'inteligência artificial e artigos científicos'
--- resultado chunk id: 0
Este é um exemplo de documento para testar o chatbot. Inteligência artificial pode ajudar na revisão de artigos científicos. ...
--- resultado chunk id: 1
A busca vetorial facilita localizar conceitos similares em múltiplos PDFs. Embeddings transformam texto em vetores numéricos para indexação. ...
```

(Se possível, substitua esse bloco por prints reais ou anexos quando você rodar o projeto localmente.)

---

## Insights e possibilidades 💡

- Você pode melhorar a segmentação dos documentos com chunking por parágrafos ou sentenças para aumentar a precisão da recuperação.
- Testar diferentes modelos de embedding (p.ex. `all-MiniLM-L6-v2` vs maiores) e ajustar dimensionalidade para balancear custo e performance.
- Subir o índice em uma solução gerenciada (e.g., Pinecone) para maior escalabilidade.
- Integrar com um LLM para gerar respostas mais coerentes (OpenAI, models locais com `transformers` ou `llama.cpp`).

---


