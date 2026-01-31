"""
Aplicação Flask para deploy no Google Cloud Run.
Desafio GCP - Compilação e Deploy com configuração de CPU e memória.
"""
import os
from flask import Flask

app = Flask(__name__)

# Porta padrão do Cloud Run (variável PORT é definida pelo ambiente)
PORT = int(os.environ.get("PORT", 8080))


@app.route("/")
def home():
    """Endpoint raiz - health check e informações da aplicação."""
    return {
        "status": "ok",
        "message": "Aplicação rodando no Google Cloud Run",
        "desafio": "GCP - Deploy App Container Cloud Run",
    }


@app.route("/health")
def health():
    """Endpoint de health check para o Cloud Run."""
    return {"status": "healthy"}, 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=False)
