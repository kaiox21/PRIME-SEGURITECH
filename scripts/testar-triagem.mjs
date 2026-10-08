// Roda a triagem nos cenários fictícios e confere se a prioridade faz sentido.
// Uso: npm run testar  (precisa de ANTHROPIC_API_KEY no ambiente ou no .env)
import { triarEvento, PRIORIDADES, MODELO } from "../lib/sentinel.js";
import { CENARIOS } from "../lib/cenarios.js";

// US$ por milhão de tokens (entrada, saída), prompts até 100K tokens.
const PRECOS = { "claude-haiku-5-5": [0.1, 0.5], "claude-sonnet-5-5": [2, 10], "claude-opus-5-5": [4, 20] };
let custoTotal = 0;

// Faixa aceitável de prioridade para cada cenário.
const ESPERADO = {
  deposito: ["critica", "alta"],
  recepcao: ["media", "baixa"],
  energia: ["media", "baixa"],
  panico: ["critica"],
};

let falhas = 0;
for (const [id, { titulo, evento }] of Object.entries(CENARIOS)) {
  const inicio = Date.now();
  try {
    const { triagem, uso, modelo } = await triarEvento(evento);
    const [pe, ps] = PRECOS[modelo] ?? PRECOS[MODELO] ?? [0, 0];
    const custo = (uso.entrada * pe + uso.saida * ps) / 1e6;
    custoTotal += custo;
    const ok = ESPERADO[id].includes(triagem.prioridade) && PRIORIDADES.includes(triagem.prioridade);
    if (!ok) falhas++;
    console.log(`\n${ok ? "OK " : "ERRO"} ${titulo}`);
    console.log(`  prioridade: ${triagem.prioridade} (esperado: ${ESPERADO[id].join(" ou ")}) · confiança: ${triagem.confianca} · falso alarme: ${triagem.provavel_falso_alarme}`);
    console.log(`  resumo: ${triagem.resumo}`);
    console.log(`  ações: ${triagem.acoes_sugeridas.join(" → ")}`);
    console.log(`  tokens: ${uso.entrada} entrada / ${uso.saida} saída · US$ ${custo.toFixed(5)} · ${((Date.now() - inicio) / 1000).toFixed(1)} s`);
  } catch (erro) {
    falhas++;
    console.log(`\nERRO ${titulo}: ${erro.message}`);
  }
}
console.log(`\n${Object.keys(CENARIOS).length - falhas}/${Object.keys(CENARIOS).length} cenários dentro do esperado · ${MODELO} · custo estimado US$ ${custoTotal.toFixed(4)}`);
process.exitCode = falhas ? 1 : 0;
