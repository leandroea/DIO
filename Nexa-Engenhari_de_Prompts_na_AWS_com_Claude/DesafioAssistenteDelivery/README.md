# Assistente de Delivery com AWS Step Functions e Amazon Bedrock

## 📌 Descrição
Este projeto implementa um **Assistente de Delivery** utilizando **AWS Step Functions** para orquestrar o fluxo de pedidos e **Amazon Bedrock** para personalizar a experiência do cliente.  
O objetivo é automatizar e gerenciar todo o processo de delivery, desde a recepção do pedido até a entrega final, garantindo eficiência, escalabilidade e uma experiência otimizada para o usuário.

---

## 🚀 Arquitetura do Projeto
O fluxo é definido em uma **State Machine (Step Functions)** que coordena diferentes serviços da AWS:

1. **ReceberPedido** → Função Lambda que recebe o pedido do cliente.  
2. **ValidarPedido** → Verifica disponibilidade dos itens e dados do cliente.  
3. **ProcessarPagamento** → Integração com serviços de pagamento.  
4. **PersonalizarExperiencia** → Chamada ao **Amazon Bedrock (Claude 3 Sonnet)** para gerar recomendações e mensagens personalizadas.  
5. **AtualizarStatus** → Atualiza o status do pedido (em preparação, em rota, entregue).  
6. **EntregaFinal** → Confirma a entrega e encerra o fluxo.  

---

## 🛠️ Tecnologias Utilizadas
- **AWS Step Functions** → Orquestração de workflows.  
- **AWS Lambda** → Execução de funções serverless para cada etapa.  
- **Amazon Bedrock (Claude 3)** → Personalização e inteligência conversacional.  
- **Amazon CloudWatch** → Monitoramento e logs.  
- **Amazon DynamoDB (opcional)** → Armazenamento de pedidos e status.  

---

## ⚙️ Como Executar
1. Faça o deploy das funções **Lambda** no AWS.  
2. Configure a **State Machine** no **AWS Step Functions** utilizando o arquivo `delivery-assistant.json`.  
3. Ajuste os ARNs das funções Lambda e do modelo Bedrock conforme sua conta AWS.  
4. Inicie uma execução da máquina de estados para simular um pedido de delivery.  

---

## 📊 Fluxo de Trabalho (Resumo)
- Cliente realiza pedido → **ReceberPedido**  
- Pedido validado → **ValidarPedido**  
- Pagamento processado → **ProcessarPagamento**  
- Experiência personalizada → **PersonalizarExperiencia (Bedrock)**  
- Status atualizado → **AtualizarStatus**  
- Pedido entregue → **EntregaFinal**  

---

## 🎯 Objetivo
Garantir um fluxo de delivery automatizado, escalável e inteligente, utilizando o poder da **orquestração serverless** com Step Functions e a **IA generativa** do Amazon Bedrock.

---

## 📖 Referências
- [AWS Step Functions](https://docs.aws.amazon.com/step-functions/)  
- [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/)  
- [Anthropic Claude 3 no Bedrock](https://aws.amazon.com/bedrock/claude/)  
