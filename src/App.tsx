import AboutContact from './Components/AboutContact/AboutContact';
import ChatBot from './Components/ChatBot/ChatBot';
import MatchInfo from './Components/MatchInfo/MatchInfo';
import './styles.css';

function App() {
export const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  return (
    <div className='mainPage'>
      <MatchInfo />
      <ChatBot />
      <AboutContact />
    </div>
  )
}

export default App;
