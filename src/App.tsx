import AboutContact from './Components/AboutContact/AboutContact';
import ChatBot from './Components/ChatBot/ChatBot';
import MatchInfo from './Components/MatchInfo/MatchInfo';
import './styles.css';

function App() {

  return (
    <div className='mainPage'>
      <MatchInfo />
      <ChatBot />
      <AboutContact />
    </div>
  )
}

export default App;
