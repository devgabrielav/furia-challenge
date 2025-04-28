import { useState } from "react";
import { Form } from "./ChatBotStyles";

function ChatBot() {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  const chatId = 'furia_id_chat';

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/send-message", {
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

      if (data.success) {
        setMessages([...messages, `Você: ${currentMessage}`, `Bot: ${data.reply}`]);
      } else {
        setMessages([...messages, `Erro ao enviar mensagem`]);
      }
      setCurrentMessage('');
    } catch(error) {
      console.error("Erro ao enviar mensagem:", error);
      setMessages([...messages, `Erro ao enviar mensagem`]);
    }
  }
  return(
    <div>
      <div style={ { display: 'flex', flexDirection: 'column' } }>
        { messages.map((message, index) => (
          <p key={ index }>
            { message }
          </p>
        ))}
      </div>
      <Form onSubmit={ sendMessage }>
        <input
          type="text"
          value={ currentMessage }
          onChange={ (event) => setCurrentMessage(event.target.value) }
          placeholder="Digite sua mensagem"
          />
          <button>Enviar</button>
      </Form>
    </div>
  )
}

export default ChatBot;