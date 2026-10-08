# Claude for Startups: pesquisa e rascunho da inscrição

Pesquisa feita em 08/10/2026. O programa foi reformulado em 06/10/2026.

## O programa

**Benefícios** (até ~US$ 7 mil em produtos e créditos, segundo a Anthropic):

- 1 ano de Claude Team grátis, até 5 assentos Premium. Só para quem nunca teve Team (estimado em US$ 6 mil).
- US$ 1.000 em créditos da API, liberados uma vez e válidos por **6 meses**.
- Limites de uso da API maiores, liberados automaticamente.
- Claude Startup Stack: até US$ 45 mil em ofertas de parceiros (ClickHouse, ElevenLabs, Firecrawl, Gamma, Granola, Hex, Linear, Lovable…), resgatadas no Claude Console.
- Plantões quinzenais (45 min) com o time de IA aplicada da Anthropic: prompts, uso de ferramentas, avaliações, latência.
- Listagem no Claude Marketplace, com ajuda para publicar conectores e plugins.
- Eventos (Founder House, hackathons, meetups) e newsletter para startups.
- Via fundo de investimento parceiro da Anthropic: até US$ 100 mil a mais em créditos.

**Quem pode entrar:** startups fundadas nos últimos 5 anos **ou** que captaram investimento nos últimos 2. Vale para empresas sem investimento externo (bootstrapped), pre-seed ou com VC.

**Requisitos para a inscrição:**

- Conta no Claude Console.
- E-mail da empresa **com o mesmo domínio do site**.
- Descrição curta do que a startup está construindo.
- Cumprir as políticas de uso da Anthropic. O Brasil está na lista de países atendidos pela API.

**Restrições:** os créditos só valem na API direta (Console), não no AWS Bedrock nem no Google Vertex AI.

**Formulário:** https://platform.claude.com/offers/startups-application. A maioria dos pedidos sai em minutos; análise manual leva de 2 a 3 dias úteis.

## Pendências antes de se inscrever

- [ ] Domínio próprio publicado com este site (ex.: `primeseguritech.com.br`)
- [ ] E-mail nesse domínio (ex.: `contato@primeseguritech.com.br`)
- [ ] Confirmar a data de abertura do CNPJ (até 5 anos)
- [ ] Criar a conta no Claude Console com esse e-mail
- [x] Protótipo da triagem de alertas com a API (`api/triagem.js` + página `/demo`)
- [ ] Rodar `npm run testar` com a chave do Console e conferir os 4 cenários
- [ ] Publicar na Vercel com `ANTHROPIC_API_KEY` e limite de gasto definido

## Rascunho: o que estamos construindo

> A Prime Seguritech presta monitoramento de segurança eletrônica 24h e suporte de TI para pequenas e médias empresas no Brasil. Estamos construindo o Prime Sentinel, uma central com IA sobre o Claude que (1) faz a triagem dos alertas de alarme e câmera, cruzando horário, zona e histórico para sugerir prioridade e escrever um resumo para o operador; (2) faz o primeiro atendimento dos chamados de TI pelo WhatsApp e encaminha ao técnico com o diagnóstico pronto; e (3) gera relatórios mensais e checklists de LGPD para cada cliente. O protótipo da triagem já roda sobre a API do Claude, com saída estruturada e uma demo pública. A decisão final, como acionar autoridades, é sempre humana. Nossa operação atual nos dá dados e clientes reais para validar o produto, e o plano é oferecer o Sentinel a outras centrais de monitoramento.
