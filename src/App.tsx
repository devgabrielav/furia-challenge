import { Routes, Route } from 'react-router';
import './App.css';
import OutletComponent from './Components/Outlet/Outlet';
import ChatBot from './Components/ChatBot/ChatBot';
import FanInfo from './Components/FanInfo/FanInfo';

function App() {

  return (
    <Routes>
      <Route path='' element={ <OutletComponent /> }>
        <Route path='/' element={ <ChatBot /> } />
        <Route path='/fanInfo' element={ <FanInfo /> } />
      </Route>
    </Routes>
  )
}

export default App;
