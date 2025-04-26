import fetch from 'node-fetch';
import express, { json } from 'express';
import cors from 'cors';
import TelegramBot from 'node-telegram-bot-api';
import { config } from 'dotenv';
import { getFuriaUpdatedInfo, getInfosHLTV } from '../utils/scraping.js';

config();

const app = express();

app.use(cors());
app.use(json());

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const systemPrompt = `
Você é um especialista em Counter-Strike, com foco exclusivo no time FURIA Esports.
Responda todas as perguntas apenas se forem sobre o time de CS da FURIA.
Não repita que você é um especialista ou que só responde sobre a FURIA em todas as respostas — diga isso apenas se for perguntado algo fora do tema.
Se a pergunta for fora do tema, recuse educadamente explicando que seu foco é somente esse tema.
`;

const callOpenRouter = async (userMessage) => {
  const furiaUpdatedInfo = await getFuriaUpdatedInfo();
  const furiaNews = await getInfosHLTV();
  const promptComNoticias = `
    ${systemPrompt}

    Aqui estão algumas atualizações recentes sobre a FURIA:
    • ${furiaUpdatedInfo}
    • ${furiaNews}

    Lembre-se, você comenta somente sobre o time de CS da FURIA.
  `;
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-4-maverick:free',
      messages: [
        { role: 'system', content: promptComNoticias },
        { role: 'user', content: userMessage }
      ]
    })
  });

  const data = await response.json();

  return data.choices[0]?.message?.content || 'Desculpe, não consegui responder.';
};

const sendMessageToTelegramBot = (chatId, message) => {
  bot.sendMessage(chatId, message);
}

app.post('/send-message', async (req, res) => {
  const { chatId, message } = req.body;

  try {
    const reply = await callOpenRouter(message);

    sendMessageToTelegramBot(chatId, reply);
    res.json({ success: true, reply });
  } catch (error) {
    console.error('Erro ao processar a mensagem:', error);
    res.status(500).json({ success: false, error: 'Erro ao processar a mensagem' });
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});