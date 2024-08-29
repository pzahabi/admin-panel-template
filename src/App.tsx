import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PanelLayout } from './layouts/PanelLayout';
import { Login } from './components/login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin/*' element={<PanelLayout/>} />
        <Route path='/admin/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
