# Exemplo de Uso do Copiloto e OpenAI

Este arquivo demonstra um exemplo prático de criação de conteúdo usando IA.

## Código Gerado
```python
# Exemplo de geração de texto com OpenAI
from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[{"role": "user", "content": "Explique o conceito de IA generativa"}]
)
print(response.choices[0].message.content)
```

## Resultado Esperado
Um texto explicativo sobre IA generativa, destacando como modelos de linguagem podem criar novos conteúdos de forma autônoma.