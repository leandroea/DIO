# Análise de Sentimentos com Azure Speech & Language Studio 📚

## ✅ O que eu fiz

Neste desafio, desenvolvi um fluxo prático para analisar fala e texto utilizando os serviços do **Azure Speech Studio** e **Azure Language Studio**. As atividades principais foram:

- Realizei a transcrição de áudios para texto usando o Azure Speech;
- Limpei e pré-processei transcrições para análise qualitativa;
- Apliquei técnicas de NLP (análise de sentimento, extração de entidades e key phrases) com Azure Language;
- Documentei os passos, decisões e resultados em notas e arquivos de apoio;
- Comparei resultados qualitativos para entender pontos fortes e limitações das ferramentas.

## 🎯 O que aprendi

- Entendimento prático do fluxo end-to-end: captura de áudio → transcrição → pré-processamento → análise de linguagem;
- Como configurar e consumir os serviços do Azure para tarefas de voz e NLP (autenticação, endpoints e uso responsável);
- Boas práticas de pré-processamento de transcrições (tratamento de ruído, pontuação e normalização);
- Interpretação de resultados de análise de sentimento e extração de entidades — e suas limitações em áudio gerado automaticamente;
- Importância da documentação clara para tornar experimentos reprodutíveis e ajudar na avaliação futura.

## 📝 Principais conclusões e insights

- Transcrições automáticas são uma base valiosa, mas exigem limpeza para análises confiáveis;
- A acurácia de extração de entidades e sentimento depende fortemente da qualidade do áudio e do pré-processamento;
- Documentar decisões e parâmetros (ex.: modelos usados, tratamentos aplicados) facilita a comparação entre experimentos;
- Pequenas melhorias no pipeline (normalização de texto, remoção de fillers) já trazem ganhos notáveis na análise.

## 📁 Organização do repositório (o que está neste projeto)

- `EntendendoDesafio.md` — descrição do desafio e objetivos;
- Notebooks e/ou `scripts/` — experimentos e análises (se houver);
- `docs/` ou `anotacoes/` — anotações, screenshots e decisões relevantes;
- `insights.md` — resumo das principais conclusões (opcional).

## 🔭 Próximos passos sugeridos

- Automatizar etapas do pipeline e registrar métricas de avaliação;
- Testar modelos customizados ou estratégias de pós-processamento para melhorar a precisão;
- Preparar um breve relatório com exemplos de antes/depois das transcrições para evidenciar ganhos.

---

Se quiser, eu posso adaptar esse `README.md` para usar a linguagem no primeiro ou terceiro pessoa, ou incluir um resumo mais técnico dos passos que você executou. Deseja que eu faça alguma alteração? ✨
