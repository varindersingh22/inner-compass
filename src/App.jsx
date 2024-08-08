import './App.css';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import BookList from './Dashboard';
import Login from './Login';
import Register from './Register';
import Chat from './chatting';


function App() {
  return (
    <>
       <Router>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat/>} />
          </Routes>
        </Router>
    </>        
    
   
  );
}

export default App;