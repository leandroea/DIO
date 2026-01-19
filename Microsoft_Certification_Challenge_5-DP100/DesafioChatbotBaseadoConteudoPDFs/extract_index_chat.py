"""Script demonstrativo: extrai texto de PDFs/txt, gera embeddings e cria índice FAISS.

Uso: python extract_index_chat.py
"""
import os
from pathlib import Path
from typing import List, Tuple

import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import PyPDF2

DATA_DIR = Path("inputs")
EMBEDDING_MODEL = "all-MiniLM-L6-v2"
INDEX_FILE = Path("faiss_index.bin")
DOCS_FILE = Path("docs.npy")


def read_text_files(folder: Path) -> List[Tuple[str, str]]:
    """Retorna lista de tuplas (id, texto)"""
    docs = []
    for file in folder.iterdir():
        if file.suffix.lower() == ".pdf":
            try:
                reader = PyPDF2.PdfReader(str(file))
                text = "\n".join(page.extract_text() or "" for page in reader.pages)
                docs.append((file.name, text))
            except Exception as e:
                print(f"Erro ao ler {file.name}: {e}")
        elif file.suffix.lower() in [".txt", ".md"]:
            text = file.read_text(encoding="utf-8")
            docs.append((file.name, text))
    return docs


def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
    tokens = text.split()
    chunks = []
    i = 0
    while i < len(tokens):
        chunk = " ".join(tokens[i:i+chunk_size])
        chunks.append(chunk)
        i += chunk_size - overlap
    return chunks


def build_index(docs: List[Tuple[str, str]]):
    model = SentenceTransformer(EMBEDDING_MODEL)
    texts = []
    meta = []
    for doc_id, content in docs:
        for i, chunk in enumerate(chunk_text(content)):
            texts.append(chunk)
            meta.append({"doc_id": doc_id, "chunk_id": i})

    print("Gerando embeddings para", len(texts), "chunks...")
    embeddings = model.encode(texts, show_progress_bar=True)
    dim = embeddings.shape[1]

    index = faiss.IndexFlatL2(dim)
    index.add(np.array(embeddings).astype('float32'))
    faiss.write_index(index, str(INDEX_FILE))

    np.save(DOCS_FILE, np.array(texts, dtype=object))
    print("Índice criado e salvo em:", INDEX_FILE)
    return index, texts


def load_index():
    if INDEX_FILE.exists() and DOCS_FILE.exists():
        index = faiss.read_index(str(INDEX_FILE))
        texts = list(np.load(DOCS_FILE, allow_pickle=True))
        model = SentenceTransformer(EMBEDDING_MODEL)
        return index, texts, model
    else:
        return None, None, None


def query_index(query: str, k: int = 3):
    index, texts, model = load_index()
    if index is None:
        raise RuntimeError("Índice não encontrado. Rode primeiro para construir o índice.")
    q_emb = model.encode([query]).astype('float32')
    D, I = index.search(q_emb, k)
    results = [(i, texts[i]) for i in I[0]]
    return results


if __name__ == "__main__":
    docs = read_text_files(DATA_DIR)
    if not docs:
        print("Nenhum documento em 'inputs/'. Adicione PDFs ou arquivos .txt e execute novamente.")
    else:
        build_index(docs)
        print("Exemplo de busca: 'inteligência artificial e artigos científicos'\n")
        res = query_index("inteligência artificial e artigos científicos", k=3)
        for idx, txt in res:
            print("--- resultado chunk id:", idx)
            print(txt[:400].replace('\n', ' '), "...\n")
