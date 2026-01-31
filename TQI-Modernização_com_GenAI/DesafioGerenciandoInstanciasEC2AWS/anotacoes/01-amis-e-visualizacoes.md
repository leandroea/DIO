# AMIs e Visualizações no AWS Explorer

## Onde encontrar

- No **AWS Explorer**, expandir o nó **Amazon EC2**.
- **AMIs**: primeiro subnó → menu de contexto (clique direito) → **View (Exibir)**.
- **Instâncias**: nó **Instances (Instâncias)** → menu de contexto → **View (Exibir)**.
- Alternativa: duplo clique no nó desejado.

## Escopo e região

- As visualizações são **por região** (ex.: Oeste dos EUA – Norte da Califórnia), conforme a região selecionada no AWS Explorer.
- Sempre verificar em qual região você está antes de filtrar AMIs ou instâncias.

## Configuração da visualização

| Recurso | Uso |
|--------|-----|
| **Colunas** | Arrastar cabeçalhos para reorganizar; clicar no cabeçalho para ordenar. |
| **Viewing** | Listas suspensas e caixa de filtro para configurar o que é exibido. |
| **Show/Hide** | Menu suspenso no topo para escolher quais colunas exibir. A escolha é **persistente** ao fechar e reabrir. |

## Tags em AMIs, instâncias e volumes

- **Tags** = pares nome/valor para metadados.
- Nomes de tag têm escopo **por conta** e são **separados** para AMIs e instâncias (mesmo nome em AMI e instância não conflita).
- Nomes de tag **não diferenciam** maiúsculas de minúsculas.

### Adicionar tag

1. Em **Add (Adicionar)**, digitar o nome da tag → botão verde (+) → **Apply (Aplicar)**.
2. Nova tag aparece em *itálico* (sem valor ainda).
3. Para definir valor: duplo clique na célula da coluna da tag e digitar. Para remover, limpar o texto.
4. Se a tag for removida do Show/Hide **sem valores**, o Toolkit **exclui** a tag. Com valores, a tag permanece na AWS mesmo se a coluna for ocultada.

## Filtros úteis para AMIs

- **Amazon Images** + **Windows** (ou Linux).
- Na caixa de filtro: `ebs` para AMIs com Elastic Block Storage (recomendado para persistência ao parar a instância).

## Insights

- Usar **Show/Hide** para manter só as colunas que importam no dia a dia (ID, nome, estado, tipo, etc.).
- Tags bem definidas (ex.: `Projeto`, `Ambiente`, `Responsável`) facilitam custo e governança depois.
