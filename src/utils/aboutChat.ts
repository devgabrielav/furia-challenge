import { SendMessageType } from "./Types";
import { API_URL } from '../../config';

export const aboutParagraphs: string[] = [
  `
  A FURIA é uma organização brasileira de esports fundada em 2017,
  com o compromisso de elevar o cenário competitivo por meio de alto desempenho,
  inovação e uma cultura única.
  Nosso time de Counter-Strike é conhecido internacionalmente por sua agressividade tática,
  intensidade e dedicação total.
  `,
  `
  Conquistamos títulos de destaque como a ESL Pro League Season 12: North America,
  o DreamHack Masters Spring 2020 e o Arctic Invitational 2019,
  além de participações constantes em Majors e presença entre as melhores equipes do mundo.
  `,
  `
  Representamos não apenas uma equipe, mas um movimento que inspira e transforma o esporte eletrônico.
  `
];

const chatId = 'furia_id_chat';

export const sendMessage = async ({
    setLoading, currentMessage,
    setMessages, setCurrentMessage, setButtonDisabled
  }: SendMessageType) => {
    setButtonDisabled(true);
  setMessages((prevMessages) => [
    ...prevMessages,
    { user: currentMessage }
  ]);
  setCurrentMessage('');
  setLoading(true);
  try {
    const response = await fetch(`${API_URL}/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId,
        message: currentMessage,
      }),
    });

    const data = await response.json();

    setMessages((prevMessages) => [
      ...prevMessages,
      { bot: data.success ? data.reply : 'Erro ao enviar mensagem' }
    ]);

  } catch(error) {
    console.error("Erro ao enviar mensagem:", error);
    setMessages((prevMessages) => [
      ...prevMessages,
      { bot: 'Erro ao enviar mensagem' }
    ]);
  }
  setLoading(false);
  setButtonDisabled(false);
}