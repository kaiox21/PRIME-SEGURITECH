// Servidor local: arquivos estáticos + funções de /api, imitando a Vercel.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = fileURLToPath(new URL("..", import.meta.url));
const PORTA = Number(process.env.PORT ?? 4321);
const TIPOS = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };
const ROTAS = { "/api/triagem": "../api/triagem.js", "/api/cenarios": "../api/cenarios.js" };

function adaptarResposta(res) {
  res.status = (codigo) => { res.statusCode = codigo; return res; };
  res.json = (dados) => { res.setHeader("Content-Type", "application/json; charset=utf-8"); res.end(JSON.stringify(dados)); return res; };
  return res;
}

async function lerCorpo(req) {
  let corpo = "";
  for await (const parte of req) corpo += parte;
  if (!corpo) return undefined;
  try { return JSON.parse(corpo); } catch { return corpo; }
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  try {
    if (ROTAS[pathname]) {
      const { default: handler } = await import(ROTAS[pathname]);
      req.body = await lerCorpo(req);
      return await handler(req, adaptarResposta(res));
    }
    let caminho = pathname === "/" ? "/index.html" : pathname;
    if (!extname(caminho)) caminho += ".html"; // cleanUrls, como na Vercel
    const arquivo = normalize(join(RAIZ, caminho));
    if (!arquivo.startsWith(RAIZ) || /\/(lib|api|scripts|node_modules|\.git)\//.test(arquivo.slice(RAIZ.length - 1))) {
      res.statusCode = 404; return res.end("Não encontrado");
    }
    const conteudo = await readFile(arquivo);
    res.setHeader("Content-Type", TIPOS[extname(arquivo)] ?? "application/octet-stream");
    res.end(conteudo);
  } catch (erro) {
    if (erro.code !== "ENOENT") console.error(erro);
    res.statusCode = erro.code === "ENOENT" ? 404 : 500;
    res.end(erro.code === "ENOENT" ? "Não encontrado" : "Erro");
  }
}).listen(PORTA, "127.0.0.1", () => {
  console.log(`Prime Seguritech em http://127.0.0.1:${PORTA}`);
  if (!process.env.ANTHROPIC_API_KEY) console.log("Aviso: ANTHROPIC_API_KEY não definida; a triagem vai responder com erro.");
});
