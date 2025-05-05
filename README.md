
# FURIA Chat - Desafio Conversacional

Este projeto é uma aplicação de chat desenvolvida como parte do desafio da FURIA Esports, com foco exclusivo no time de CS:GO da organização. Ele permite que fãs acompanhem e interajam com o time por meio de uma experiência conversacional inteligente.

## ✨ Funcionalidades

- Chat inteligente com IA treinada exclusivamente para responder perguntas sobre o time de CS da FURIA.
- Atualizações ao vivo de notícias e informações do time.
- Interface web moderna e responsiva.
- Backend integrado para busca de dados e chamadas à IA.

## 📁 Estrutura do Projeto

- Backend: Desenvolvido em **JavaScript** com Node.js e Express.
- Frontend: Desenvolvido em **TypeScript** com React e Vite.

- `frontend`: Desenvolvido com React e Vite.
- `backend`: Servidor Node.js com Express, responsável por fornecer dados dinâmicos e conectar com o modelo de linguagem via OpenRouter.

## ⚙️ Como Rodar o Projeto

1. **Crie um arquivo `.env` na raiz do projeto**, com base no `.env.example`, e inclua as chaves necessárias.

2. **Obtenha suas chaves de API nos seguintes links:**
   - OpenRouter (para acesso ao modelo de linguagem): [https://openrouter.ai/](https://openrouter.ai/)
   - PandaScore (para dados de partidas e estatísticas): [https://developers.pandascore.co/](https://developers.pandascore.co/)

3. **Instale as dependências**:

```bash
npm install
```

4. **Inicie o projeto** (frontend + backend):

```bash
npm run dev
```

## 🧠 Integração com IA

A aplicação utiliza o modelo `meta-llama/llama-4-maverick:free` da OpenRouter, com um prompt personalizado que garante que o chatbot responda apenas a perguntas relacionadas à equipe de CS da FURIA. O backend também integra dados em tempo real da HLTV e da PandaScore.

## 📦 Dependências Principais

- React 19
- Vite
- Express 5
- Node-fetch
- OpenRouter API
- PandaScore API

---