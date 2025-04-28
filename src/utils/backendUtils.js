import fetch from 'node-fetch';
import TelegramBot from 'node-telegram-bot-api';
import { config } from 'dotenv';
import { getFuriaUpdatedInfo, getInfosHLTV } from '../utils/scraping.js';

config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const apiKey = process.env.PANDASCORE_API_KEY;

const systemPrompt = `
Você é um especialista em Counter-Strike, com foco exclusivo no time FURIA Esports.
Responda todas as perguntas apenas se forem sobre o time de CS da FURIA.
Não repita que você é um especialista ou que só responde sobre a FURIA em todas as respostas — diga isso apenas se for perguntado algo fora do tema.
Se a pergunta for fora do tema, recuse educadamente explicando que seu foco é somente esse tema.
`;

export const callOpenRouter = async (userMessage) => {
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

export const sendMessageToTelegramBot = (chatId, message) => {
  bot.sendMessage(chatId, message);
}

const getTeamId = async () => {
  const data = await fetch('https://api.pandascore.co/teams/furia', {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  });
  const team = await data.json();
  return team.id;
}

export const getLatestMatches = async () => {
  const teamId = await getTeamId();
  const data = await fetch(`https://api.pandascore.co/csgo/matches?filter[opponent_id]=${teamId}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  });
  const matches = await data.json(); 

  return matches;
}
