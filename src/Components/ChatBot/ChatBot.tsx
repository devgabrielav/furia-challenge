import { useState } from "react";
import { sendMessage } from "../../utils/aboutChat";
import './chatBotStyles.css';

export type MessagesType = { user: string; } | { bot: string; }

function ChatBot() {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessagesType[]>([]);

  return(
    <div>
      <section className="chatBotMainSection">
        <div className="chatTitleDiv">
          <h2 className="chatBotTitle">FURIA CHAT-BOT</h2>
          <img className="furiaLogo" src="/src/assets/furiaLogo.png" />
        </div>
        <div className="paragraphsDiv">
          { messages.map((message, index) => (
            "user" in message ? (
              <div className="userParagraphDiv" key={index}>
                <p className="userParagraph">{message.user}</p>
              </div>
            ) : (
              <div className="botParagraphDiv" key={index}>
                <p className="botParagraph">{message.bot}</p>
              </div>
            )
          ))}
        </div>
      </section>
      <form onSubmit={(event) => sendMessage({
        event, currentMessage, setMessages, messages, setCurrentMessage
        }) }>
        <input
          type="text"
          value={ currentMessage }
          className="inputForm"
          onChange={ (event) => setCurrentMessage(event.target.value) }
          placeholder="Digite sua mensagem"
          />
          <button className="formButton"></button>
      </form>
    </div>
  )
}

export default ChatBot;