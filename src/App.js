import './App.css';
import Home from './pages/Home';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminHomePage from './pages/AdminHomePage';
import AdminTables from './pages/AdminTables';
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      
        <Route path='/login' element={<Login/>}/>
        <Route path="/dashboard" element={<UserDashboard/>} />
         <Route path="/admin" element={<AdminHomePage />} />
         <Route path="/admin/tables" element={<AdminTables />} />
         <Route path="/admin/reservation-list" element={<AdminDashboard />} />


      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
