# Criando Máquinas Virtuais na Azure 🚀

Este repositório faz parte do desafio da **DIO - Digital Innovation One**:  
**Criando máquinas Virtuais na Azure**.  

O objetivo é aprender a criar uma máquina virtual Windows no **Portal do Azure**, conectá-la via RDP e instalar um servidor web básico (IIS).

---

## 📋 Pré-requisitos

- Conta no [Microsoft Azure](https://azure.microsoft.com/pt-br/free/) (pode ser gratuita).
- Acesso ao **Portal do Azure**: [https://portal.azure.com](https://portal.azure.com).
- Cliente de Área de Trabalho Remota (RDP):
  - Windows: já incluso no sistema.
  - Mac: disponível na [Mac App Store](https://apps.apple.com/br/app/microsoft-remote-desktop/id1295203466).

---

## 🛠️ Passo a Passo

### 1. Entrar no Portal do Azure
- Acesse [portal.azure.com](https://portal.azure.com) e faça login com sua conta.

---

### 2. Criar a Máquina Virtual
1. No campo de pesquisa, digite **Máquinas Virtuais** e selecione o serviço.
2. Clique em **Criar** → **Máquina virtual do Azure**.
3. Na tela de criação, configure:
   - **Nome da VM**: `myVM`
   - **Imagem**: *Windows Server 2022 Datacenter: Azure Edition - x64 Gen2*
   - **Usuário administrador**: `azureuser`
   - **Senha**: mínimo de 12 caracteres, seguindo requisitos de complexidade.
4. Em **Regras de porta de entrada**, selecione:
   - **RDP (3389)** → para acesso remoto.
   - **HTTP (80)** → para acesso ao servidor web.
5. Clique em **Examinar + Criar** e depois em **Criar**.

---

### 3. Conectar-se à Máquina Virtual
1. Após a implantação, clique em **Ir para o recurso**.
2. Na página da VM, selecione **Conectar → RDP**.
3. Baixe o arquivo `.rdp` e abra-o.
4. Insira as credenciais criadas (`azureuser` e senha).
5. Confirme o aviso de certificado e conecte-se.

---

### 4. Instalar o Servidor Web (IIS)
1. Dentro da VM, abra o **PowerShell**.
2. Execute o comando:

   ```powershell
   Install-WindowsFeature -name Web-Server -IncludeManagementTools
   ```
   
3. Após a instalação, feche a conexão RDP.

## 5. Testar o Servidor Web

    No Portal do Azure, copie o endereço IP público da VM.

    Cole o IP em um navegador.

    Você deverá ver a página padrão do IIS confirmando que o servidor está ativo.

## 6. Limpar Recursos (opcional)

    Se não precisar mais da VM:

        Vá até o Grupo de Recursos da VM.

        Clique em Excluir grupo de recursos.

        Confirme digitando o nome do grupo.

## 7. Configurar Desligamento Automático (opcional)

    Para evitar custos desnecessários:

        Na seção Operações da VM, selecione Desligamento automático.

        Ative e configure o horário desejado.

        Clique em Salvar.

## ✅ Resultado Esperado

    Uma máquina virtual Windows criada no Azure.

    Conexão via RDP funcionando.

    Servidor IIS instalado e acessível pelo navegador através do IP público.

## 📚 Referência

    Documentação Oficial Microsoft - Criar uma VM Windows no Portal do Azure