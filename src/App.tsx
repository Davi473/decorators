import { useState, useEffect } from 'react'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Calendario from './Pages/Calendario';
import Kanban from './Pages/Kanban';

function App() {

  const [paginaAtual, setPaginaAtual] = useState('login');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setPaginaAtual('home');
    } else {
      setPaginaAtual('login');
    }
  }, []);

  const renderPagina = () => {
    switch (paginaAtual) {
      case 'login':
        return <Login onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
      case 'register':
        return <Register onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
      case 'home':
        return <Home onTrocarPagina={(valor: string) => setPaginaAtual(valor)}/>;
      case "calendario":
        return <Calendario onTrocarPagina={(valor: string) => setPaginaAtual(valor)}/>;
      case "kanban":
        return <Kanban onTrocarPagina={(valor: string) => setPaginaAtual(valor)}/>;
      default:
        return <Login onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
    }
  };

  return (
    <div>
      {renderPagina()}
    </div>
  )
}

export default App
