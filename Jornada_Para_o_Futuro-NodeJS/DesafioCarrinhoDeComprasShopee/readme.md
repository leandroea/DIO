<!--START_SECTION:header-->
<div align="center">
  <p align="center">
    <img 
      alt="DIO Education" 
      src="https://raw.githubusercontent.com/digitalinnovationone/template-github-trilha/main/.github/assets/logo.webp" 
      width="100px" 
    />
    <h1>Recriando a lógica do carrinho de compras da Shopee</h1>
  </p>
</div>
<!--END_SECTION:header-->

## 💻 Descrição Do Projeto

Este projeto tem por objetivo criar a lógica por trás do carrinho de compras da shopee, onde o carrinho armazene itens e faça o cálculo total e de sub-itens automaticamente.

## 📚 Pré-requisitos de Habilidades e Níveis de Conhecimento

Antes de ingressar neste conteúdo, é necessário possuir conhecimento prévio nas seguintes áreas:

- [habilidades ou conhecimentos prévios necessários]

  - Javascript | Intermediário
  - Node | Básico
  - Modularização | Básica

- [Outros pré-requisitos]

  - Lógica de Programação | Intermediário

## 🛠️ Habilidades e Sub-habilidades que vamos aprender neste conteúdo

- Modularização | Intermediária

## 🎯 Objetivos e Resultados Esperados

Este projeto permite adquirir as seguintes habilidades:

- Modularizar projetos com maior propriedade
- Como organizar pensamento lógico e funcional
- Base para organizar projetos

---

## 🚀 Funcionalidades Implementadas

### 1. Gerenciamento de Itens
- **Adicionar itens**: Adiciona produtos ao carrinho
- **Remover itens**: Diminui a quantidade ou remove o item completamente
- **Excluir itens**: Remove um item pelo nome

### 2. Tratamento de Duplicatas
Quando um item com o mesmo nome é adicionado, o sistema incrementa a quantidade ao invés de criar uma entrada duplicada.

### 3. Limites de Quantidade
- **Mínimo**: 1 unidade por item
- **Máximo**: 99 unidades por item
- Validação automática ao adicionar itens

### 4. Formatação de Moeda
Todos os preços são formatados automaticamente para o padrão brasileiro (R$):
- Exemplo: `R$ 20,90`

### 5. Persistência do Carrinho
O carrinho é automaticamente salvo em um arquivo JSON (`cart-data.json`) após cada modificação, permitindo que os dados sejam recuperados na próxima execução.

### 6. Códigos de Desconto
Sistema de cupons de desconto integrados:

| Código | Desconto |
|--------|----------|
| `SHOPEE10` | 10% off |
| `SAVE20` | 20% off |
| `VIP50` | 50% off |

---

## 📁 Estrutura do Projeto

```
├── package.json              # Configuração do projeto
├── cart-data.json            # Dados do carrinho (gerado automaticamente)
├── readme.md                 # Documentação do projeto
├── documentação.md           # Referência de classes CSS
├── arquitetura.png          # Diagrama de arquitetura
└── src/
    ├── index.js              # Ponto de entrada (execução)
    └── services/
        ├── cart.js          # Operações do carrinho
        └── item.js          # Criação de itens
```

---

## ▶️ Como Executar

```bash
# Executar o projeto
node src/index.js
```

---

## 📝 API do Carrinho

### Funções Exportadas ([`cart.js`](src/services/cart.js))

| Função | Descrição | Parâmetros |
|--------|-----------|-------------|
| `addItem()` | Adiciona item ao carrinho | `(cart, item)` |
| `removeItem()` | Remove/diminui quantidade | `(cart, item)` |
| `deleteItem()` | Remove item pelo nome | `(cart, name)` |
| `displayCart()` | Exibe todos os itens | `(cart)` |
| `calculateTotal()` | Calcula total com desconto | `(cart, discountCode?)` |
| `applyDiscount()` | Valida código de desconto | `(code)` |
| `initCart()` | Inicializa carrinho (carrega do arquivo) | `()` |
| `formatCurrency()` | Formata preço em BRL | `(value)` |

---

## 💡 Exemplo de Uso

```javascript
import * as cartService from "./services/cart.js";
import createItem from "./services/item.js";

// Inicializar carrinho (carrega dados salvos)
const myCart = cartService.initCart();

// Criar itens
const item1 = await createItem("HotWheels Ferrari", 20.99, 2);

// Adicionar item (se duplicado, incrementará a quantidade)
cartService.addItem(myCart, item1);

// Exibir carrinho
cartService.displayCart(myCart);

// Calcular total com desconto
cartService.calculateTotal(myCart, "SHOPEE10");
```

---

<!--START_SECTION:footer-->

<br />
<br />

<p align="center">
  <a href="https://dio.me/" target="_blank">
    <img align="center" src="https://raw.githubusercontent.com/digitalinnovationone/template-github-trilha/main/.github/assets/footer.png" alt="banner"/>
  </a>
</p>
