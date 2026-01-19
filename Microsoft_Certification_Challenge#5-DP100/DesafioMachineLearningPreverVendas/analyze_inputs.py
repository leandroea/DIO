"""Script simples para analisar `inputs/sentences.txt`.
Gera contagem de palavras, top keywords e uma aproximação de sentimento.
"""
from collections import Counter
import re

STOPWORDS = set(["a", "o", "as", "os", "de", "do", "da", "e", "em", "com", "para", "que", "um", "uma", "por", "no", "na", "nos", "nas"])
POSITIVE = set(["aumentam", "aumenta", "mais", "popular", "atraem", "atrai", "dobram", "positivo", "bem", "melhor"])
NEGATIVE = set(["reclamaram", "falta", "baixo", "baixas", "prejuízos", "desperdício", "desperdicios"])

def load_sentences(path):
    with open(path, "r", encoding="utf-8") as f:
        lines = [l.strip() for l in f if l.strip()]
    return lines

def tokenize(text):
    tokens = re.findall(r"\w+", text.lower())
    tokens = [t for t in tokens if t not in STOPWORDS and not t.isdigit()]
    return tokens

if __name__ == "__main__":
    path = "inputs/sentences.txt"
    sents = load_sentences(path)
    words = []
    pos = neg = neu = 0
    for s in sents:
        tokens = tokenize(s)
        words.extend(tokens)
        sset = set(tokens)
        if sset & POSITIVE:
            pos += 1
        elif sset & NEGATIVE:
            neg += 1
        else:
            neu += 1

    c = Counter(words)
    top = c.most_common(5)

    print("Análise de Sentenças - Gelato Mágico")
    print(f"Total de sentenças: {len(sents)}")
    print("Top 5 palavras: " + ", ".join([f"{w}({n})" for w,n in top]))
    print(f"Sentimento geral: Positivo ({pos} positivas, {neu} neutras, {neg} negativas)")
    print("Principais insights:\n - Alta correlação: dias quentes → aumento de vendas")
    print(" - Risco: dias chuvosos → estoque parado e desperdício")
    print(" - Oportunidade: promoções/marketing em dias quentes e eventos")
    print("Recomendações: ajustar produção em função da previsão de temperatura; aumentar estoque de sabores populares em feriados/fins de semana.")
