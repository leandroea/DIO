"""
Aplicação de exemplo para deploy no Google App Engine.
Desafio GCP - Customização de instâncias e autoscaling.
"""
import os
from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    """Página inicial com informações da aplicação."""
    return jsonify({
        "mensagem": "Aplicação deployada no Google App Engine",
        "desafio": "GCP Specialist - Deploy com Autoscaling",
        "status": "online",
        "instancia": os.environ.get("GAE_INSTANCE", "local"),
    })


@app.route("/_ah/warmup")
def warmup():
    """Responde às requisições de warmup do App Engine (pré-aquecimento)."""
    return "", 200


@app.route("/health")
def health():
    """Endpoint de health check para o App Engine."""
    return jsonify({"status": "healthy"}), 200


@app.route("/api/info")
def info():
    """Retorna informações do ambiente."""
    return jsonify({
        "runtime": "Python",
        "servico": os.environ.get("GAE_SERVICE", "default"),
        "versao": os.environ.get("GAE_VERSION", "dev"),
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
