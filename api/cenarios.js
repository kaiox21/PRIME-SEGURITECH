// GET /api/cenarios: cenários fictícios para a página de demonstração.
import { CENARIOS } from "../lib/cenarios.js";

export default function handler(req, res) {
  res.setHeader("Cache-Control", "public, max-age=3600");
  return res.status(200).json(CENARIOS);
}
