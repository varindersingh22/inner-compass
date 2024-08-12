import './App.css';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Chat from './chatting';
import Home from './Home';
import Master from './Common/Master1';
import Master2 from './Common/Master2';
import Master3 from './Common/Master3';
import Dashboard from './Dashboard';


function App() {
  return (
    <>
       <Router>
          <Routes>
            <Route path="/" element={<Master/>}>
            <Route path="/" element={<Home />} />
            </Route>

            <Route path="/" element={<Master2/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
           </Route>
      
            <Route path="/" element={<Master3/>}>
            <Route path='/dashboard' element={<Dashboard/>} />
           <Route path="/chat" element={<Chat/>} />
            </Route>

    
          </Routes>
        </Router>
    </>        
    
   
  );
}

export default App;