# Prime Seguritech

Site da Prime Seguritech e protótipo do **Prime Sentinel**, a triagem de eventos de monitoramento com Claude (Anthropic).

## Estrutura

| Caminho | O que é |
|---|---|
| `index.html` | Site (landing page estática) |
| `demo.html` | Página `/demo` para testar a triagem com cenários fictícios |
| `api/triagem.js` | `POST /api/triagem`: recebe um evento em JSON e devolve a triagem |
| `api/cenarios.js` | `GET /api/cenarios`: cenários fictícios da demo |
| `lib/sentinel.js` | Prompt, schema da resposta e chamada ao Claude |
| `lib/cenarios.js` | Cenários fictícios (sem dados reais) |
| `scripts/dev.mjs` | Servidor local que imita a Vercel |
| `scripts/testar-triagem.mjs` | Roda os cenários e confere se a prioridade faz sentido |
| `docs/claude-for-startups.md` | Pesquisa do programa e rascunho da inscrição |

## Rodar localmente

```bash
npm install
cp .env.example .env   # coloque a ANTHROPIC_API_KEY
npm run dev            # http://127.0.0.1:4321
npm run testar         # testa a triagem nos 4 cenários
```

Sem a chave, o site abre normalmente e a demo mostra o erro "chave não configurada".

## Publicar na Vercel

1. Importe o repositório na Vercel. Não é preciso framework nem build.
2. Em *Settings → Environment Variables*, crie `ANTHROPIC_API_KEY`.
3. Ligue o domínio próprio em *Settings → Domains*.
4. No Claude Console, defina um limite de gasto mensal. A demo é pública e tem só um limite básico por IP.

## Regras do Sentinel

- A IA **sugere** prioridade e ações. Confirmar e acionar autoridades é sempre decisão do operador.
- O modelo padrão é `claude-haiku-5-5` (menos de US$ 0,001 por análise), com saída em JSON validado por schema. Para trocar, defina `SENTINEL_MODELO` (ex.: `claude-sonnet-5-5`); em modelos Opus e Sonnet, a chamada também usa `fallbacks: "default"`.
- Na demo, use apenas dados fictícios.
