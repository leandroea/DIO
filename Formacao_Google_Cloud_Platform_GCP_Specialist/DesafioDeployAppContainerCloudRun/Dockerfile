# Imagem base leve para Python
FROM python:3.11-slim

# Diretório de trabalho
WORKDIR /app

# Copiar dependências
COPY requirements.txt .

# Instalar dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código da aplicação
COPY main.py .

# Cloud Run usa a variável PORT (padrão 8080)
ENV PORT=8080
EXPOSE 8080

# Gunicorn para produção (compatível com Cloud Run)
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app
