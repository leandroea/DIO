# 🛡️ Desafio DIO - Ransomware em Python

Este projeto foi desenvolvido como parte de um desafio da [Digital Innovation One (DIO)](https://www.dio.me/), com o objetivo de implementar um **Ransomware simples** em Python para criptografar e descriptografar arquivos utilizando a biblioteca `pyaes`.

⚠️ **Aviso Importante**:  
Este projeto tem **finalidade exclusivamente educacional**. Não deve ser utilizado para fins maliciosos. O uso indevido pode ser ilegal e acarretar consequências sérias.  

---

## 📂 Estrutura do Projeto

- `encrypter.py` → Script responsável por **criptografar** arquivos.  
- `decrypter.py` → Script responsável por **descriptografar** arquivos.  
- `teste.txt` → Arquivo de exemplo utilizado para testes.  

---

## 🚀 Funcionamento

### 1. Criptografia (`encrypter.py`)
- Abre o arquivo original (`teste.txt`).
- Lê os dados em binário.
- Remove o arquivo original.
- Criptografa os dados utilizando AES no modo CTR com a chave `testeransomwares`.
- Salva o resultado em um novo arquivo com extensão `.ransomwaretroll`.

Exemplo de saída:
teste.txt.ransomwaretroll


### 2. Descriptografia (`decrypter.py`)
- Abre o arquivo criptografado (`teste.txt.ransomwaretroll`).
- Lê os dados em binário.
- Descriptografa os dados utilizando a mesma chave `testeransomwares`.
- Remove o arquivo criptografado.
- Cria novamente o arquivo original (`teste.txt`) com o conteúdo restaurado.

Exemplo de saída:
Hello World


---

## 🛠️ Tecnologias Utilizadas
- **Python 3.x**
- **Biblioteca [pyaes](https://pypi.org/project/pyaes/)** → Implementação de AES puro em Python.

Instalação da biblioteca:
```bash
pip install pyaes


