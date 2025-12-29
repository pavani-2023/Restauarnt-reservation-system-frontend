import './App.css';
import Home from './pages/Home';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
