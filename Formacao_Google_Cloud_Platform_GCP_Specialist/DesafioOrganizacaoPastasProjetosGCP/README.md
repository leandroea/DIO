# Estrutura Organizacional e Grupos de Acesso no Google Cloud Platform (GCP)

Este repositório contém um **diagrama** da estrutura organizacional e dos grupos de acessos no GCP, para facilitar o entendimento da criação e organização de projetos na nuvem.

---

## Diagrama

O arquivo **`estrutura-organizacional-gcp.drawio`** pode ser aberto no [Draw.io](https://app.diagrams.net/) (diagrams.net) ou no VS Code com a extensão *Draw.io Integration*.

O diagrama ilustra:

1. **Organization (Organização)** – Nó raiz que representa o domínio da empresa no GCP.
2. **Folders (Pastas)** – Agrupamento lógico por departamento ou ambiente (ex.: Desenvolvimento, Produção, TI/Infraestrutura).
3. **Projects (Projetos)** – Unidade base onde são provisionados recursos (billing, APIs, VMs, buckets etc.).
4. **Grupos de Acesso (IAM)** – Quem tem acesso a quê, com papéis como Owner, Editor e Viewer.

---

## Hierarquia no GCP

A hierarquia de recursos no GCP segue esta ordem:

```
Organization (raiz)
    └── Folders (opcional, podem ser aninhados)
            └── Projects (projetos)
                    └── Recursos (VMs, buckets, APIs, etc.)
```

- **Organization**: nível mais alto; normalmente vinculada a um domínio (ex.: empresa.com).
- **Folders**: ajudam a separar por time, ambiente (dev/staging/prod) ou área (TI, dados, apps).
- **Projects**: cada projeto tem ID único, faturamento (billing) e ativação de APIs independentes.

---

## Grupos de Acesso e IAM

O **IAM (Identity and Access Management)** define quem pode fazer o quê em cada recurso. No diagrama aparecem exemplos de grupos:

| Grupo (exemplo) | Papéis típicos | Uso |
|-----------------|----------------|-----|
| `gcp-admins@empresa.com` | Owner, Organization Admin | Administração total da organização e projetos. |
| `gcp-developers@empresa.com` | Editor (em dev), Viewer (em prod) | Desenvolvedores alteram recursos em dev e só leem em prod. |
| `gcp-viewers@empresa.com` | Viewer | Apenas leitura (dashboards, logs, métricas). |

**Papéis básicos:**

- **Owner**: controle total, inclusive billing e IAM.
- **Editor**: criar/alterar/excluir recursos; não gerencia IAM nem billing.
- **Viewer**: somente leitura.

Políticas definidas em **Organization** ou **Folder** podem ser **herdadas** pelos projetos e recursos abaixo, o que centraliza o controle de acesso.

---

## Por que organizar assim?

1. **Controle de custos**: cada projeto pode ter uma conta de faturamento (billing) ou ser agrupado em pastas para relatórios.
2. **Isolamento**: ambientes (dev/prod) e times separados em pastas e projetos reduzem risco de alterações indevidas.
3. **Governança**: políticas (ex.: “só rede permitida”) aplicadas na Organization ou em Folders valem para todos os projetos filhos.
4. **Clareza**: fica explícito onde criar cada novo projeto e quem deve ter acesso (via grupos IAM).

---

## Como usar o diagrama

1. Abra o [Draw.io](https://app.diagrams.net/) no navegador ou use a extensão Draw.io no VS Code.
2. Abra o arquivo `estrutura-organizacional-gcp.drawio`.
3. Use o diagrama como referência para desenhar a estrutura da sua empresa ou para explicar a criação de projetos no GCP em treinamentos e documentação.

Você pode duplicar pastas e projetos no desenho e renomear conforme sua organização real (nomes de pastas, projetos e grupos de e-mail).

---

## Referências

- [Resource hierarchy (Organization, Folders, Projects)](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy)
- [Understanding roles (IAM)](https://cloud.google.com/iam/docs/understanding-roles)
- [Draw.io / diagrams.net](https://www.drawio.com/)

---

*Desafio: Organização de Pastas e Projetos no Google Cloud Platform – Formação GCP Specialist.*
