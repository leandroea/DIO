# Recursos e Referências

## Documentação oficial (PT-BR)

- **Gerenciar instâncias do Amazon EC2 – AWS Toolkit for Visual Studio**  
  https://docs.aws.amazon.com/pt_br/toolkit-for-visual-studio/latest/user-guide/tkv-ec2-ami.html  
  - Visualizações de AMIs e instâncias  
  - Executar, conectar, parar e encerrar instâncias  
  - Tags, Show/Hide columns, comportamento de desligamento  

## Tópicos relacionados (para aprofundar)

- **Criar uma AMI a partir de uma instância EC2** (mencionado na doc do Toolkit).
- **Using tags** – [Manual do usuário para instâncias Linux do Amazon EC2](https://docs.aws.amazon.com/ec2/latest/userguide/).
- **IAM roles for EC2** – Guia do usuário IAM (perfis de instância).
- **Definição de preço EC2** – https://aws.amazon.com/ec2/pricing/

## Ferramentas

- **AWS Toolkit for Visual Studio** – integração com AWS Explorer para AMIs, instâncias, key pairs e security groups.
- **Key pairs no Toolkit** – armazenamento em `%LOCALAPPDATA%\AWSToolkit\keypairs` (Windows).

## Checklist rápido

- [ ] Região correta no AWS Explorer
- [ ] AMI com EBS se quiser usar Stop
- [ ] Security group com RDP (3389) ou SSH (22)
- [ ] Par de chaves selecionado/criado e guardado
- [ ] Nome e tags definidos no launch
- [ ] Shutdown behavior configurado (Stop vs Terminate) se aplicável
