import path from "path";
import express from "express";
import cors from "cors";
import { callOpenRouter, getLatestMatches } from "../utils/backendUtils.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(process.cwd(), "src", "dist")));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get("/matches", async (_req, res) => {
  try {
    const latestMatches = await getLatestMatches();
    res.json(latestMatches);
  } catch (error) {
    console.error("Erro ao buscar as partidas:", error);
    res.status(500).json({ success: false, error: "Erro ao buscar as partidas" });
  }
});

app.post("/send-message", async (req, res) => {
  const { message } = req.body;
  try {
    const reply = await callOpenRouter(message);
    res.json({ success: true, reply });
  } catch (error) {
    console.error("Erro ao processar a mensagem:", error);
    res.status(500).json({ success: false, error: "Erro ao processar a mensagem" });
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src", "dist", "index.html"));
});
