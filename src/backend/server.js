import express, { json } from 'express';
import cors from 'cors';
import { callOpenRouter, getLatestMatches } from '../utils/backendUtils.js';

const app = express();

app.use(cors());

app.use(json());

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});

app.get('/matches', async (_req, res) => {
  try {
    const latestMatches = await getLatestMatches();
    
    res.json(latestMatches);
  } catch (error) {
    console.error('Erro ao buscar as partidas:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar as partidas' });
  }
});

app.post('/send-message', async (req, res) => {
  const { chatId, message } = req.body;

  try {
    const reply = await callOpenRouter(message);

    res.json({ success: true, reply });
  } catch (error) {
    console.error('Erro ao processar a mensagem:', error);
    res.status(500).json({ success: false, error: 'Erro ao processar a mensagem' });
  }
});
