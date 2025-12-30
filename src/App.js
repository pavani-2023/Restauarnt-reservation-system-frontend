import './App.css';
import Home from './pages/Home';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/dashboard" element={<UserDashboard/>} />
         <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
