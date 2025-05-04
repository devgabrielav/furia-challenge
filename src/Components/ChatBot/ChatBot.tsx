import { ChangeEvent, useEffect, useRef, useState } from "react";
import { sendMessage } from "../../utils/aboutChat";
import './chatBotStyles.css';

export type MessagesType = { user: string; } | { bot: string; }

function ChatBot() {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current?.lastElementChild?.scrollIntoView();
    }
  }, [messages]);

  const handleSendMessage = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendMessage({
      currentMessage, setMessages, messages, setCurrentMessage
      })
  }

  return(
    <section className="chatBotMainSection">
        <div className="chatTitleDiv">
          <h2 className="chatBotTitle">
            FURIA <br></br> CHAT-BOT</h2>
          <img className="furiaLogo" src="/src/assets/furiaLogo.png" />
        </div>
      <div className="chatsDiv">
        <div className="paragraphsDiv" ref={endOfMessagesRef}>
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
      <form onSubmit={ handleSendMessage }>
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
    </section>
  )
}

export default ChatBot;