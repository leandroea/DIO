# Desafio GCP: VPC e Máquinas Virtuais pelo Console

Este documento descreve o processo de criação de **VPCs (Virtual Private Clouds)** e **Máquinas Virtuais (VMs)** utilizando o **Google Cloud Console**, a interface web do Google Cloud Platform.

---

## Pré-requisitos

- Conta no [Google Cloud Platform](https://cloud.google.com/)
- Projeto GCP criado (ou permissão para criar um)
- Navegador web atualizado

---

## Parte 1: Criando uma VPC (Rede Virtual)

A **VPC** é a rede privada isolada onde suas máquinas virtuais e outros recursos vão se comunicar.

### Passo a passo no Console

1. **Acesse o Console GCP**
   - Acesse [console.cloud.google.com](https://console.cloud.google.com)
   - Faça login e selecione seu **projeto**

2. **Abrir o menu de redes**
   - No menu lateral (☰), vá em **Rede VPC** → **Redes**  
   - Ou pesquise por "VPC" na barra de pesquisa do Console

3. **Criar uma nova rede**
   - Clique em **CRIAR REDE VPC**
   - Preencha:
     - **Nome**: ex.: `minha-vpc` ou `rede-desafio`
     - **Modo**: escolha **Automático** (sub-redes em cada região) ou **Personalizado** (você define sub-redes)
     - **Região** (se personalizado): ex.: `us-central1`, `southamerica-east1`
     - **Intervalo de IP** (se personalizado): ex.: `10.0.0.0/24`

4. **Sub-redes (modo personalizado)**
   - Defina nome da sub-rede, região e intervalo de IP (ex.: `10.0.1.0/24`)

5. **Criar**
   - Clique em **CRIAR** para que a VPC seja provisionada

### Conceitos importantes da VPC

| Conceito        | Descrição |
|-----------------|-----------|
| **Modo automático** | O GCP cria sub-redes em cada região automaticamente |
| **Modo personalizado** | Você cria apenas as sub-redes que precisar |
| **Firewall**     | Regras de firewall podem ser configuradas em **Rede VPC** → **Firewall** |

---

## Parte 2: Criando uma Máquina Virtual (VM)

As **VMs** rodam dentro de uma VPC e usam uma sub-rede para obter IP e se comunicar.

### Passo a passo no Console

1. **Abrir Compute Engine**
   - No menu lateral: **Compute Engine** → **Instâncias de VM**  
   - Ou pesquise por "VM" ou "instâncias"

2. **Criar instância**
   - Clique em **CRIAR INSTÂNCIA**

3. **Configurações básicas**
   - **Nome**: ex.: `vm-desafio` ou `servidor-web`
   - **Região**: ex.: `us-central1` (americano) ou `southamerica-east1` (São Paulo)
   - **Zona**: ex.: `us-central1-a` (escolha conforme disponibilidade)

4. **Configurações da máquina**
   - **Série**: E2 (econômica), N1, N2, etc.
   - **Tipo de máquina**: ex.: `e2-micro` (free tier), `e2-small`, `n1-standard-1`

5. **Disco de inicialização**
   - **Sistema operacional**: Ubuntu, Debian, Windows Server, etc.
   - **Tipo de disco**: SSD padrão ou HDD padrão
   - **Tamanho**: em GB (ex.: 10, 20, 30)

6. **Rede e VPC**
   - Em **Rede**, clique em **Rede** para expandir
   - **Rede**: selecione a VPC criada (ex.: `minha-vpc`)
   - **Sub-rede**: escolha a sub-rede da região da VM
   - **IP externo**: 
     - **Ephemeral** = IP público temporário (padrão)
     - **Nenhum** = só IP privado (mais seguro para back-end)

7. **Firewall (opcional)**
   - Marque **Permitir tráfego HTTP** e/ou **Permitir tráfego HTTPS** se for um servidor web

8. **Criar a VM**
   - Clique em **CRIAR**
   - Aguarde alguns segundos até o ícone de status ficar verde

### Acessando a VM

- **SSH pelo navegador**: na lista de VMs, clique em **SSH** ao lado da instância
- **IP externo**: use o endereço exibido na coluna "IP externo" para acessar serviços (ex.: HTTP na porta 80)

---

## Resumo do fluxo

```
1. Criar/ter um Projeto GCP
        ↓
2. Criar uma VPC (Rede VPC → Redes → Criar)
        ↓
3. (Opcional) Ajustar regras de Firewall
        ↓
4. Criar VM (Compute Engine → Instâncias → Criar)
        ↓
5. Associar a VM à VPC e sub-rede desejadas
        ↓
6. Conectar via SSH ou usar o IP público/privado
```

---

## Boas práticas

- Use **modo automático** na VPC se estiver começando; use **personalizado** quando precisar controlar sub-redes por região.
- Para produção, prefira VMs **sem IP externo** quando possível e use **Cloud NAT** ou um **Proxy/Load Balancer** para saída à internet.
- Aplique **tags de rede** nas VMs e regras de firewall por tag para segmentar tráfego.
- Mantenha um **orçamento e alertas** no projeto para evitar custos inesperados.

---

## Links úteis

- [Documentação VPC](https://cloud.google.com/vpc/docs)
- [Documentação Compute Engine / VMs](https://cloud.google.com/compute/docs/instances)
- [Console GCP](https://console.cloud.google.com)

---

*Desafio GCP – Criação de VPC e Máquinas Virtuais pelo Console*
