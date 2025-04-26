import * as cheerio from 'cheerio';

export const getFuriaUpdatedInfo = async () => {
  try {
    const res = await fetch('https://liquipedia.net/counterstrike/api.php?action=parse&page=FURIA&format=json', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const json = await res.json();
    const html = json.parse.text["*"];
    const info = cheerio.load(html);
    return `Informações da Liquipedia: ${info}`;

  } catch (err) {
    console.error('Erro ao obter dados da FURIA:', err);
    return 'Erro ao buscar informações.';
  }
};


export const getInfosHLTV = async () => {
  try {
    const res = await fetch('https://www.hltv.org/team/4447/FURIA');
    const html = await res.text();
    const info = cheerio.load(html);
    return `Informações da HLTV: ${info}`;
  } catch (err) {
    console.error('Erro ao pegar notícias recentes da HLTV:', err);
    return 'Erro ao buscar notícias recentes.';
  }
};