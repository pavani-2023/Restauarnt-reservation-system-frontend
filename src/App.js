import './App.css';
import Home from './pages/Home';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/dashboard" element={<UserDashboard/>} />

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
