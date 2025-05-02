import AboutContact from "../AboutContact/AboutContact";
import ChatBot from "../ChatBot/ChatBot";
import MatchInfo from "../MatchInfo/MatchInfo";
import './mainContentStyles.css';

function MainContent() {
  return (
    <section className="mainContentSection">
      <MatchInfo />
      <ChatBot />
      <AboutContact />
    </section>
  )
}

export default MainContent;