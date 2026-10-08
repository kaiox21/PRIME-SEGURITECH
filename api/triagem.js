// POST /api/triagem: recebe um evento e devolve a triagem sugerida pelo Sentinel.
import { triarEvento, ErroTriagem } from "../lib/sentinel.js";

// Limite simples por IP para a demo pública não virar custo descontrolado.
// Em serverless cada instância tem a sua memória: é uma proteção básica, não um rate limit global.
const JANELA_MS = 10 * 60 * 1000;
const MAX_POR_JANELA = 10;
const acessos = new Map();

function permitido(ip) {
  const agora = Date.now();
  const recentes = (acessos.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  if (recentes.length >= MAX_POR_JANELA) return false;
  recentes.push(agora);
  acessos.set(ip, recentes);
  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ erro: "Use POST." });
  }

  const ip = String(req.headers["x-forwarded-for"] ?? "local").split(",")[0].trim();
  if (!permitido(ip)) {
    return res.status(429).json({ erro: "Muitas análises seguidas. Aguarde alguns minutos." });
  }

  try {
    const evento = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const resultado = await triarEvento(evento);
    return res.status(200).json(resultado);
  } catch (erro) {
    if (erro instanceof SyntaxError) {
      return res.status(400).json({ erro: "JSON inválido." });
    }
    if (erro instanceof ErroTriagem) {
      return res.status(erro.status).json({ erro: erro.message });
    }
    console.error("[triagem]", erro);
    return res.status(500).json({ erro: "Erro inesperado na triagem." });
  }
}
